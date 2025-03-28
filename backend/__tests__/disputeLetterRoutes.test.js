import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../server';
import DisputeLetter from '../models/DisputeLetter';
import User from '../models/User';

let mongoServer;
let testUser;
let authToken;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
  
  // Create a test user and get auth token
  testUser = await User.create({
    name: 'Dispute Test User',
    email: 'dispute@example.com',
    password: 'password123'
  });
  
  authToken = testUser.getSignedJwtToken();
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

beforeEach(async () => {
  // Clear the dispute letters before each test
  await DisputeLetter.deleteMany({});
});

describe('Dispute Letter API Endpoints', () => {
  it('should create a new dispute letter when authenticated', async () => {
    const res = await request(app)
      .post('/api/disputes')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        disputeType: 'Late Payment',
        bureau: 'Experian',
        accountInfo: {
          creditorName: 'Test Bank',
          accountNumber: 'XXXX-XXXX-XXXX-1234',
          reportedAmount: 500
        },
        reason: 'This payment was made on time but incorrectly reported as late',
        letterFormat: 'Metro 2 Compliant'
      });
    
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body).toHaveProperty('disputeType', 'Late Payment');
    expect(res.body).toHaveProperty('bureau', 'Experian');
    expect(res.body).toHaveProperty('user', testUser._id.toString());
    expect(res.body.accountInfo).toHaveProperty('creditorName', 'Test Bank');
  });

  it('should not create a dispute letter without authentication', async () => {
    const res = await request(app)
      .post('/api/disputes')
      .send({
        disputeType: 'Late Payment',
        bureau: 'Experian',
        accountInfo: {
          creditorName: 'Test Bank',
          accountNumber: 'XXXX-XXXX-XXXX-1234',
          reportedAmount: 500
        },
        reason: 'This payment was made on time but incorrectly reported as late',
        letterFormat: 'Metro 2 Compliant'
      });
    
    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty('message', 'Not authorized, no token');
  });

  it('should get all dispute letters for authenticated user', async () => {
    // Create a few dispute letters first
    await DisputeLetter.create({
      user: testUser._id,
      disputeType: 'Late Payment',
      bureau: 'Experian',
      accountInfo: {
        creditorName: 'Bank A',
        accountNumber: 'XXXX-1111',
        reportedAmount: 100
      },
      reason: 'Payment was made on time',
      letterFormat: 'Metro 2 Compliant',
      status: 'Draft'
    });
    
    await DisputeLetter.create({
      user: testUser._id,
      disputeType: 'Collection Account',
      bureau: 'Equifax',
      accountInfo: {
        creditorName: 'Collection Agency',
        accountNumber: 'CA-2222',
        reportedAmount: 200
      },
      reason: 'This account is not mine',
      letterFormat: 'FCRA/FTC/FDCPA-Based',
      status: 'Sent'
    });

    const res = await request(app)
      .get('/api/disputes')
      .set('Authorization', `Bearer ${authToken}`);
    
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(2);
    expect(res.body[0]).toHaveProperty('disputeType', 'Late Payment');
    expect(res.body[1]).toHaveProperty('disputeType', 'Collection Account');
  });

  it('should get a specific dispute letter by ID', async () => {
    // Create a dispute letter first
    const disputeLetter = await DisputeLetter.create({
      user: testUser._id,
      disputeType: 'Hard Inquiry',
      bureau: 'TransUnion',
      accountInfo: {
        creditorName: 'Credit Card Company',
        accountNumber: 'INQ-3333',
      },
      reason: 'I did not authorize this inquiry',
      letterFormat: 'FCRA/FTC/FDCPA-Based',
      status: 'Draft'
    });

    const res = await request(app)
      .get(`/api/disputes/${disputeLetter._id}`)
      .set('Authorization', `Bearer ${authToken}`);
    
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id', disputeLetter._id.toString());
    expect(res.body).toHaveProperty('disputeType', 'Hard Inquiry');
    expect(res.body).toHaveProperty('bureau', 'TransUnion');
  });

  it('should update a dispute letter', async () => {
    // Create a dispute letter first
    const disputeLetter = await DisputeLetter.create({
      user: testUser._id,
      disputeType: 'Late Payment',
      bureau: 'Experian',
      accountInfo: {
        creditorName: 'Bank A',
        accountNumber: 'XXXX-1111',
        reportedAmount: 100
      },
      reason: 'Payment was made on time',
      letterFormat: 'Metro 2 Compliant',
      status: 'Draft'
    });

    const res = await request(app)
      .put(`/api/disputes/${disputeLetter._id}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        reason: 'Updated reason: I have proof of payment',
        status: 'Ready to Send'
      });
    
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id', disputeLetter._id.toString());
    expect(res.body).toHaveProperty('reason', 'Updated reason: I have proof of payment');
    expect(res.body).toHaveProperty('status', 'Ready to Send');
    // Original fields should remain unchanged
    expect(res.body).toHaveProperty('disputeType', 'Late Payment');
    expect(res.body).toHaveProperty('bureau', 'Experian');
  });

  it('should delete a dispute letter', async () => {
    // Create a dispute letter first
    const disputeLetter = await DisputeLetter.create({
      user: testUser._id,
      disputeType: 'Late Payment',
      bureau: 'Experian',
      accountInfo: {
        creditorName: 'Bank A',
        accountNumber: 'XXXX-1111',
        reportedAmount: 100
      },
      reason: 'Payment was made on time',
      letterFormat: 'Metro 2 Compliant',
      status: 'Draft'
    });

    const res = await request(app)
      .delete(`/api/disputes/${disputeLetter._id}`)
      .set('Authorization', `Bearer ${authToken}`);
    
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Dispute letter removed');
    
    // Verify it's actually deleted
    const checkDeleted = await DisputeLetter.findById(disputeLetter._id);
    expect(checkDeleted).toBeNull();
  });
});

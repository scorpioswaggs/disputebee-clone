import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../server';
import CreditReport from '../models/CreditReport';
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
    name: 'Credit Report Test User',
    email: 'creditreport@example.com',
    password: 'password123'
  });
  
  authToken = testUser.getSignedJwtToken();
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

beforeEach(async () => {
  // Clear the credit reports before each test
  await CreditReport.deleteMany({});
});

describe('Credit Report API Endpoints', () => {
  it('should create a new credit report when authenticated', async () => {
    const res = await request(app)
      .post('/api/credit-reports')
      .set('Authorization', `Bearer ${authToken}`)
      .field('bureau', 'Experian')
      .field('reportDate', '2025-03-15')
      .field('creditScore', '720')
      .attach('reportFile', Buffer.from('mock pdf content'), 'experian-report.pdf');
    
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body).toHaveProperty('bureau', 'Experian');
    expect(res.body).toHaveProperty('creditScore', 720);
    expect(res.body).toHaveProperty('user', testUser._id.toString());
    expect(res.body).toHaveProperty('reportFile');
  });

  it('should not create a credit report without authentication', async () => {
    const res = await request(app)
      .post('/api/credit-reports')
      .field('bureau', 'Experian')
      .field('reportDate', '2025-03-15')
      .field('creditScore', '720')
      .attach('reportFile', Buffer.from('mock pdf content'), 'experian-report.pdf');
    
    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty('message', 'Not authorized, no token');
  });

  it('should get all credit reports for authenticated user', async () => {
    // Create a few credit reports first
    await CreditReport.create({
      user: testUser._id,
      bureau: 'Experian',
      reportDate: '2025-03-15',
      creditScore: 720,
      reportFile: 'uploads/experian-report.pdf',
      accounts: [
        {
          accountName: 'Bank A Credit Card',
          accountType: 'Credit Card',
          balance: 1500,
          status: 'Current'
        }
      ]
    });
    
    await CreditReport.create({
      user: testUser._id,
      bureau: 'Equifax',
      reportDate: '2025-03-15',
      creditScore: 715,
      reportFile: 'uploads/equifax-report.pdf',
      accounts: [
        {
          accountName: 'Bank A Credit Card',
          accountType: 'Credit Card',
          balance: 1500,
          status: 'Current'
        }
      ]
    });

    const res = await request(app)
      .get('/api/credit-reports')
      .set('Authorization', `Bearer ${authToken}`);
    
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(2);
    expect(res.body[0]).toHaveProperty('bureau', 'Experian');
    expect(res.body[1]).toHaveProperty('bureau', 'Equifax');
  });

  it('should get a specific credit report by ID', async () => {
    // Create a credit report first
    const creditReport = await CreditReport.create({
      user: testUser._id,
      bureau: 'TransUnion',
      reportDate: '2025-03-15',
      creditScore: 730,
      reportFile: 'uploads/transunion-report.pdf',
      accounts: [
        {
          accountName: 'Bank A Credit Card',
          accountType: 'Credit Card',
          balance: 1500,
          status: 'Current'
        }
      ]
    });

    const res = await request(app)
      .get(`/api/credit-reports/${creditReport._id}`)
      .set('Authorization', `Bearer ${authToken}`);
    
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id', creditReport._id.toString());
    expect(res.body).toHaveProperty('bureau', 'TransUnion');
    expect(res.body).toHaveProperty('creditScore', 730);
  });

  it('should delete a credit report', async () => {
    // Create a credit report first
    const creditReport = await CreditReport.create({
      user: testUser._id,
      bureau: 'Experian',
      reportDate: '2025-03-15',
      creditScore: 720,
      reportFile: 'uploads/experian-report.pdf',
      accounts: [
        {
          accountName: 'Bank A Credit Card',
          accountType: 'Credit Card',
          balance: 1500,
          status: 'Current'
        }
      ]
    });

    const res = await request(app)
      .delete(`/api/credit-reports/${creditReport._id}`)
      .set('Authorization', `Bearer ${authToken}`);
    
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Credit report removed');
    
    // Verify it's actually deleted
    const checkDeleted = await CreditReport.findById(creditReport._id);
    expect(checkDeleted).toBeNull();
  });
});

import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../server';
import User from '../models/User';
import DisputeLetter from '../models/DisputeLetter';
import CreditReport from '../models/CreditReport';

let mongoServer;
let testUser;
let authToken;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
  
  // Create a test user and get auth token
  testUser = await User.create({
    name: 'Integration Test User',
    email: 'integration@example.com',
    password: 'password123'
  });
  
  authToken = testUser.getSignedJwtToken();
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

beforeEach(async () => {
  // Clear the collections before each test
  await DisputeLetter.deleteMany({});
  await CreditReport.deleteMany({});
});

describe('Integration Test - Full User Journey', () => {
  it('should allow a user to upload a credit report, create a dispute, and track status', async () => {
    // Step 1: Upload a credit report
    const uploadResponse = await request(app)
      .post('/api/credit-reports')
      .set('Authorization', `Bearer ${authToken}`)
      .field('bureau', 'Experian')
      .field('reportDate', '2025-03-15')
      .field('creditScore', '720')
      .attach('reportFile', Buffer.from('mock pdf content'), 'experian-report.pdf');
    
    expect(uploadResponse.statusCode).toEqual(201);
    expect(uploadResponse.body).toHaveProperty('_id');
    const creditReportId = uploadResponse.body._id;
    
    // Step 2: Create a dispute letter based on the credit report
    const disputeResponse = await request(app)
      .post('/api/disputes')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        creditReport: creditReportId,
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
    
    expect(disputeResponse.statusCode).toEqual(201);
    expect(disputeResponse.body).toHaveProperty('_id');
    expect(disputeResponse.body).toHaveProperty('disputeType', 'Late Payment');
    expect(disputeResponse.body).toHaveProperty('status', 'Draft');
    const disputeId = disputeResponse.body._id;
    
    // Step 3: Update dispute status to "Sent"
    const updateResponse = await request(app)
      .put(`/api/disputes/${disputeId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        status: 'Sent',
        sentDate: '2025-03-28'
      });
    
    expect(updateResponse.statusCode).toEqual(200);
    expect(updateResponse.body).toHaveProperty('status', 'Sent');
    expect(updateResponse.body).toHaveProperty('sentDate');
    
    // Step 4: Get all disputes to verify tracking
    const getDisputesResponse = await request(app)
      .get('/api/disputes')
      .set('Authorization', `Bearer ${authToken}`);
    
    expect(getDisputesResponse.statusCode).toEqual(200);
    expect(getDisputesResponse.body).toHaveLength(1);
    expect(getDisputesResponse.body[0]).toHaveProperty('_id', disputeId);
    expect(getDisputesResponse.body[0]).toHaveProperty('status', 'Sent');
    
    // Step 5: Get credit report details with associated disputes
    const getCreditReportResponse = await request(app)
      .get(`/api/credit-reports/${creditReportId}`)
      .set('Authorization', `Bearer ${authToken}`);
    
    expect(getCreditReportResponse.statusCode).toEqual(200);
    expect(getCreditReportResponse.body).toHaveProperty('_id', creditReportId);
    expect(getCreditReportResponse.body).toHaveProperty('disputes');
    expect(getCreditReportResponse.body.disputes).toHaveLength(1);
    expect(getCreditReportResponse.body.disputes[0]).toHaveProperty('_id', disputeId);
  });
  
  it('should handle subscription management for a user', async () => {
    // Step 1: Create a subscription for the user
    const createSubscriptionResponse = await request(app)
      .post('/api/subscriptions')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        plan: 'Premium',
        paymentMethod: 'card_mock_123',
        price: 39.99,
        billingCycle: 'monthly'
      });
    
    expect(createSubscriptionResponse.statusCode).toEqual(201);
    expect(createSubscriptionResponse.body).toHaveProperty('_id');
    expect(createSubscriptionResponse.body).toHaveProperty('plan', 'Premium');
    expect(createSubscriptionResponse.body).toHaveProperty('status', 'active');
    const subscriptionId = createSubscriptionResponse.body._id;
    
    // Step 2: Get user profile to verify subscription is attached
    const getUserResponse = await request(app)
      .get('/api/users/profile')
      .set('Authorization', `Bearer ${authToken}`);
    
    expect(getUserResponse.statusCode).toEqual(200);
    expect(getUserResponse.body).toHaveProperty('subscription');
    expect(getUserResponse.body.subscription).toHaveProperty('_id', subscriptionId);
    expect(getUserResponse.body.subscription).toHaveProperty('plan', 'Premium');
    
    // Step 3: Update subscription to a different plan
    const updateSubscriptionResponse = await request(app)
      .put(`/api/subscriptions/${subscriptionId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        plan: 'Professional',
        price: 99.99
      });
    
    expect(updateSubscriptionResponse.statusCode).toEqual(200);
    expect(updateSubscriptionResponse.body).toHaveProperty('plan', 'Professional');
    expect(updateSubscriptionResponse.body).toHaveProperty('price', 99.99);
    
    // Step 4: Cancel subscription
    const cancelSubscriptionResponse = await request(app)
      .put(`/api/subscriptions/${subscriptionId}/cancel`)
      .set('Authorization', `Bearer ${authToken}`);
    
    expect(cancelSubscriptionResponse.statusCode).toEqual(200);
    expect(cancelSubscriptionResponse.body).toHaveProperty('status', 'cancelled');
    expect(cancelSubscriptionResponse.body).toHaveProperty('cancellationDate');
  });
});

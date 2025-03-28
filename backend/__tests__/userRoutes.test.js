import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../server';
import User from '../models/User';

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

beforeEach(async () => {
  // Clear the database before each test
  await User.deleteMany({});
});

describe('User API Endpoints', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/users/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      });
    
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('token');
    expect(res.body.user).toHaveProperty('name', 'Test User');
    expect(res.body.user).toHaveProperty('email', 'test@example.com');
    expect(res.body.user).not.toHaveProperty('password');
  });

  it('should not register a user with existing email', async () => {
    // Create a user first
    await User.create({
      name: 'Existing User',
      email: 'existing@example.com',
      password: 'password123'
    });

    // Try to register with the same email
    const res = await request(app)
      .post('/api/users/register')
      .send({
        name: 'Another User',
        email: 'existing@example.com',
        password: 'password123'
      });
    
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('message', 'User already exists');
  });

  it('should login a user with valid credentials', async () => {
    // Create a user first
    const user = new User({
      name: 'Login Test',
      email: 'login@example.com',
      password: 'password123'
    });
    await user.save();

    // Login with valid credentials
    const res = await request(app)
      .post('/api/users/login')
      .send({
        email: 'login@example.com',
        password: 'password123'
      });
    
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body.user).toHaveProperty('name', 'Login Test');
    expect(res.body.user).toHaveProperty('email', 'login@example.com');
  });

  it('should not login a user with invalid credentials', async () => {
    // Create a user first
    const user = new User({
      name: 'Invalid Login Test',
      email: 'invalid@example.com',
      password: 'password123'
    });
    await user.save();

    // Login with invalid password
    const res = await request(app)
      .post('/api/users/login')
      .send({
        email: 'invalid@example.com',
        password: 'wrongpassword'
      });
    
    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty('message', 'Invalid credentials');
  });

  it('should get user profile when authenticated', async () => {
    // Create a user first
    const user = new User({
      name: 'Profile Test',
      email: 'profile@example.com',
      password: 'password123'
    });
    const savedUser = await user.save();
    const token = savedUser.getSignedJwtToken();

    // Get profile with valid token
    const res = await request(app)
      .get('/api/users/profile')
      .set('Authorization', `Bearer ${token}`);
    
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('name', 'Profile Test');
    expect(res.body).toHaveProperty('email', 'profile@example.com');
  });

  it('should not get user profile without authentication', async () => {
    // Try to get profile without token
    const res = await request(app)
      .get('/api/users/profile');
    
    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty('message', 'Not authorized, no token');
  });
});

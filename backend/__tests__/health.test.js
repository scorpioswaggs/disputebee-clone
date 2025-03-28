const request = require('supertest');
const app = require('../server');

describe('Health Check Endpoint', () => {
  it('should return 200 OK with correct message', async () => {
    const response = await request(app)
      .get('/api/health')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toEqual({
      status: 'ok',
      message: 'API is running'
    });
  });
}); 
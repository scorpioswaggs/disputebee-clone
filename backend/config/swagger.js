const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CrediSure API Documentation',
      version: '1.0.0',
      description: 'API documentation for CrediSure - Take Control Now Credit Empowerment Web Application',
      contact: {
        name: 'CrediSure Support',
        email: 'support@credisure.com'
      }
    },
    servers: [
      {
        url: process.env.API_URL || 'http://localhost:5000',
        description: process.env.NODE_ENV === 'production' ? 'Production server' : 'Development server',
      }
    ],
    tags: [
      { name: 'Auth', description: 'Authentication endpoints' },
      { name: 'Users', description: 'User management endpoints' },
      { name: 'Credit Reports', description: 'Credit report management endpoints' },
      { name: 'Dispute Letters', description: 'Dispute letter management endpoints' },
      { name: 'Subscriptions', description: 'Subscription management endpoints' },
      { name: 'Educational Content', description: 'Educational content endpoints' }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        User: {
          type: 'object',
          required: ['email', 'firstName', 'lastName', 'password'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              description: 'User email address'
            },
            firstName: {
              type: 'string',
              description: 'User first name'
            },
            lastName: {
              type: 'string',
              description: 'User last name'
            },
            password: {
              type: 'string',
              format: 'password',
              description: 'User password'
            },
            phoneNumber: {
              type: 'string',
              description: 'User phone number'
            }
          }
        },
        CreditReport: {
          type: 'object',
          required: ['filename', 'userId'],
          properties: {
            id: {
              type: 'string',
              description: 'Unique identifier for the credit report'
            },
            userId: {
              type: 'string',
              description: 'ID of the user who owns this credit report'
            },
            filename: {
              type: 'string',
              description: 'Name of the uploaded file'
            },
            uploadDate: {
              type: 'string',
              format: 'date-time',
              description: 'Date and time when the report was uploaded'
            },
            status: {
              type: 'string',
              enum: ['pending', 'analyzed', 'error'],
              description: 'Current status of the credit report'
            },
            analysis: {
              type: 'object',
              description: 'Results of the credit report analysis',
              properties: {
                creditScore: {
                  type: 'integer',
                  description: 'User\'s credit score'
                },
                negativeItems: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      type: {
                        type: 'string',
                        description: 'Type of negative item'
                      },
                      description: {
                        type: 'string',
                        description: 'Description of the negative item'
                      },
                      date: {
                        type: 'string',
                        format: 'date',
                        description: 'Date of the negative item'
                      }
                    }
                  }
                },
                recommendations: {
                  type: 'array',
                  items: {
                    type: 'string'
                  },
                  description: 'List of recommendations for improving credit'
                }
              }
            }
          }
        },
        DisputeLetter: {
          type: 'object',
          required: ['userId', 'creditReportId', 'templateId', 'items'],
          properties: {
            id: {
              type: 'string',
              description: 'Unique identifier for the dispute letter'
            },
            userId: {
              type: 'string',
              description: 'ID of the user who owns this letter'
            },
            creditReportId: {
              type: 'string',
              description: 'ID of the credit report being disputed'
            },
            templateId: {
              type: 'string',
              description: 'ID of the letter template used'
            },
            status: {
              type: 'string',
              enum: ['draft', 'sent', 'received', 'resolved', 'rejected'],
              description: 'Current status of the dispute letter'
            },
            items: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  type: {
                    type: 'string',
                    description: 'Type of item being disputed'
                  },
                  description: {
                    type: 'string',
                    description: 'Description of the item'
                  },
                  date: {
                    type: 'string',
                    format: 'date',
                    description: 'Date of the item'
                  }
                }
              }
            },
            content: {
              type: 'string',
              description: 'Generated letter content'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Date and time when the letter was created'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Date and time when the letter was last updated'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            status: {
              type: 'string',
              example: 'error'
            },
            message: {
              type: 'string',
              example: 'Error message'
            }
          }
        }
      },
      responses: {
        UnauthorizedError: {
          description: 'Access token is missing or invalid',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              }
            }
          }
        }
      }
    },
    security: [{
      bearerAuth: []
    }]
  },
  apis: [
    './routes/*.js',
    './models/*.js'
  ]
};

const specs = swaggerJsdoc(options);

module.exports = specs; 
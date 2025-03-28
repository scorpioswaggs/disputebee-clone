const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./config/swagger');
const { errorHandler } = require('./middleware/errorMiddleware');
const { securityMiddleware } = require('./middleware/securityMiddleware');
const logger = require('./config/logger');
const connectDB = require('./config/db');

// Import routes
const userRoutes = require('./routes/userRoutes');
const creditReportRoutes = require('./routes/creditReportRoutes');
const disputeLetterRoutes = require('./routes/disputeLetterRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const educationalContentRoutes = require('./routes/educationalContentRoutes');

// Initialize express app
const app = express();

// Connect to MongoDB with retry logic
connectDB();

// Apply security middleware
app.use(securityMiddleware);

// Apply compression middleware
app.use(compression());

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/credit-reports', creditReportRoutes);
app.use('/api/dispute-letters', disputeLetterRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/educational-content', educationalContentRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Error handling middleware
app.use(errorHandler);

// Handle 404 errors
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found'
  });
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  logger.error('Unhandled Promise Rejection:', err);
  // Close server & exit process
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception:', err);
  // Close server & exit process
  process.exit(1);
});

// For Vercel deployment, we don't need to listen on a port
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  });
}

// Export the Express app for Vercel
module.exports = app;

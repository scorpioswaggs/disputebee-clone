const express = require('express');
const router = express.Router();
const { 
  getSubscriptionPlans,
  getCurrentSubscription,
  createSubscription,
  updateSubscription,
  cancelSubscription,
  getPaymentMethods,
  addPaymentMethod,
  removePaymentMethod,
  getInvoices
} = require('../controllers/subscriptionController');
const { protect } = require('../middleware/authMiddleware');

// Public routes
router.get('/plans', getSubscriptionPlans);

// Protected routes (require authentication)
router.use(protect);

// Get current user's subscription
router.get('/current', getCurrentSubscription);

// Create a new subscription
router.post('/', createSubscription);

// Update subscription (upgrade/downgrade)
router.put('/', updateSubscription);

// Cancel subscription
router.delete('/', cancelSubscription);

// Payment methods
router.get('/payment-methods', getPaymentMethods);
router.post('/payment-methods', addPaymentMethod);
router.delete('/payment-methods/:id', removePaymentMethod);

// Invoices
router.get('/invoices', getInvoices);

module.exports = router;

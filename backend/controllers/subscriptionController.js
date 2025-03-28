const Subscription = require('../models/Subscription');
const User = require('../models/User');
const asyncHandler = require('express-async-handler');

// @desc    Get all subscription plans
// @route   GET /api/subscriptions/plans
// @access  Public
const getSubscriptionPlans = asyncHandler(async (req, res) => {
  // Mock subscription plans - in a real app, these would come from a database
  const plans = [
    {
      id: 'basic',
      name: 'Basic Plan',
      price: 9.99,
      interval: 'month',
      features: [
        'Up to 5 dispute letters per month',
        'Access to basic letter templates',
        'Credit report analysis',
        'Email support'
      ],
      recommended: false
    },
    {
      id: 'premium',
      name: 'Premium Plan',
      price: 19.99,
      interval: 'month',
      features: [
        'Up to 15 dispute letters per month',
        'Access to all letter templates',
        'Advanced credit report analysis',
        'Score simulator',
        'Priority email support'
      ],
      recommended: true
    },
    {
      id: 'professional',
      name: 'Professional Plan',
      price: 39.99,
      interval: 'month',
      features: [
        'Unlimited dispute letters',
        'Access to all letter templates',
        'Advanced credit report analysis',
        'Score simulator',
        'Bulk letter generation',
        'Priority phone support',
        'Personalized dispute strategy'
      ],
      recommended: false
    },
    {
      id: 'annual-basic',
      name: 'Annual Basic',
      price: 99.99,
      interval: 'year',
      features: [
        'All Basic Plan features',
        'Save 16% compared to monthly billing'
      ],
      recommended: false
    },
    {
      id: 'annual-premium',
      name: 'Annual Premium',
      price: 199.99,
      interval: 'year',
      features: [
        'All Premium Plan features',
        'Save 16% compared to monthly billing'
      ],
      recommended: false
    }
  ];
  
  res.json({
    success: true,
    plans
  });
});

// @desc    Get current user's subscription
// @route   GET /api/subscriptions/current
// @access  Private
const getCurrentSubscription = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  
  const subscription = await Subscription.findOne({ user: req.user._id, status: 'active' });
  
  res.json({
    success: true,
    subscription: subscription || null
  });
});

// @desc    Create a new subscription
// @route   POST /api/subscriptions
// @access  Private
const createSubscription = asyncHandler(async (req, res) => {
  const { planId, paymentMethodId } = req.body;
  
  if (!planId || !paymentMethodId) {
    res.status(400);
    throw new Error('Please provide plan ID and payment method ID');
  }
  
  // Check if user already has an active subscription
  const existingSubscription = await Subscription.findOne({ 
    user: req.user._id, 
    status: 'active' 
  });
  
  if (existingSubscription) {
    res.status(400);
    throw new Error('User already has an active subscription');
  }
  
  // TODO: Integrate with Stripe to create actual subscription
  // For now, we'll create a mock subscription
  
  // Determine plan details based on planId
  let planName, planPrice, planInterval, planFeatures;
  
  switch (planId) {
    case 'basic':
      planName = 'Basic Plan';
      planPrice = 9.99;
      planInterval = 'month';
      planFeatures = ['Up to 5 dispute letters per month', 'Basic templates'];
      break;
    case 'premium':
      planName = 'Premium Plan';
      planPrice = 19.99;
      planInterval = 'month';
      planFeatures = ['Up to 15 dispute letters per month', 'All templates'];
      break;
    case 'professional':
      planName = 'Professional Plan';
      planPrice = 39.99;
      planInterval = 'month';
      planFeatures = ['Unlimited dispute letters', 'All features'];
      break;
    case 'annual-basic':
      planName = 'Annual Basic';
      planPrice = 99.99;
      planInterval = 'year';
      planFeatures = ['Up to 5 dispute letters per month', 'Basic templates'];
      break;
    case 'annual-premium':
      planName = 'Annual Premium';
      planPrice = 199.99;
      planInterval = 'year';
      planFeatures = ['Up to 15 dispute letters per month', 'All templates'];
      break;
    default:
      res.status(400);
      throw new Error('Invalid plan ID');
  }
  
  // Calculate next billing date
  const nextBillingDate = new Date();
  if (planInterval === 'month') {
    nextBillingDate.setMonth(nextBillingDate.getMonth() + 1);
  } else {
    nextBillingDate.setFullYear(nextBillingDate.getFullYear() + 1);
  }
  
  // Create subscription
  const subscription = await Subscription.create({
    user: req.user._id,
    planId,
    planName,
    planPrice,
    planInterval,
    planFeatures,
    paymentMethodId,
    status: 'active',
    currentPeriodStart: new Date(),
    currentPeriodEnd: nextBillingDate,
    cancelAtPeriodEnd: false
  });
  
  // Update user's subscription status
  await User.findByIdAndUpdate(req.user._id, {
    subscriptionStatus: 'active',
    subscriptionId: subscription._id
  });
  
  res.status(201).json({
    success: true,
    subscription
  });
});

// @desc    Update subscription (upgrade/downgrade)
// @route   PUT /api/subscriptions
// @access  Private
const updateSubscription = asyncHandler(async (req, res) => {
  const { planId } = req.body;
  
  if (!planId) {
    res.status(400);
    throw new Error('Please provide plan ID');
  }
  
  // Find user's active subscription
  const subscription = await Subscription.findOne({ 
    user: req.user._id, 
    status: 'active' 
  });
  
  if (!subscription) {
    res.status(404);
    throw new Error('No active subscription found');
  }
  
  // Determine new plan details based on planId
  let planName, planPrice, planInterval, planFeatures;
  
  switch (planId) {
    case 'basic':
      planName = 'Basic Plan';
      planPrice = 9.99;
      planInterval = 'month';
      planFeatures = ['Up to 5 dispute letters per month', 'Basic templates'];
      break;
    case 'premium':
      planName = 'Premium Plan';
      planPrice = 19.99;
      planInterval = 'month';
      planFeatures = ['Up to 15 dispute letters per month', 'All templates'];
      break;
    case 'professional':
      planName = 'Professional Plan';
      planPrice = 39.99;
      planInterval = 'month';
      planFeatures = ['Unlimited dispute letters', 'All features'];
      break;
    case 'annual-basic':
      planName = 'Annual Basic';
      planPrice = 99.99;
      planInterval = 'year';
      planFeatures = ['Up to 5 dispute letters per month', 'Basic templates'];
      break;
    case 'annual-premium':
      planName = 'Annual Premium';
      planPrice = 199.99;
      planInterval = 'year';
      planFeatures = ['Up to 15 dispute letters per month', 'All templates'];
      break;
    default:
      res.status(400);
      throw new Error('Invalid plan ID');
  }
  
  // TODO: Integrate with Stripe to update actual subscription
  
  // Update subscription
  subscription.planId = planId;
  subscription.planName = planName;
  subscription.planPrice = planPrice;
  subscription.planInterval = planInterval;
  subscription.planFeatures = planFeatures;
  subscription.updatedAt = Date.now();
  
  await subscription.save();
  
  res.json({
    success: true,
    subscription
  });
});

// @desc    Cancel subscription
// @route   DELETE /api/subscriptions
// @access  Private
const cancelSubscription = asyncHandler(async (req, res) => {
  const { cancelImmediately } = req.body;
  
  // Find user's active subscription
  const subscription = await Subscription.findOne({ 
    user: req.user._id, 
    status: 'active' 
  });
  
  if (!subscription) {
    res.status(404);
    throw new Error('No active subscription found');
  }
  
  // TODO: Integrate with Stripe to cancel actual subscription
  
  if (cancelImmediately) {
    // Cancel immediately
    subscription.status = 'canceled';
    subscription.canceledAt = Date.now();
    
    // Update user's subscription status
    await User.findByIdAndUpdate(req.user._id, {
      subscriptionStatus: 'canceled',
    });
  } else {
    // Cancel at period end
    subscription.cancelAtPeriodEnd = true;
    
    // Update user's subscription status
    await User.findByIdAndUpdate(req.user._id, {
      subscriptionStatus: 'cancel_pending',
    });
  }
  
  await subscription.save();
  
  res.json({
    success: true,
    subscription
  });
});

// @desc    Get payment methods
// @route   GET /api/subscriptions/payment-methods
// @access  Private
const getPaymentMethods = asyncHandler(async (req, res) => {
  // TODO: Integrate with Stripe to get actual payment methods
  // For now, return mock data
  
  const paymentMethods = [
    {
      id: 'pm_mock_visa',
      type: 'card',
      card: {
        brand: 'visa',
        last4: '4242',
        expMonth: 12,
        expYear: 2025,
      },
      isDefault: true,
    },
    {
      id: 'pm_mock_mastercard',
      type: 'card',
      card: {
        brand: 'mastercard',
        last4: '5555',
        expMonth: 10,
        expYear: 2026,
      },
      isDefault: false,
    },
  ];
  
  res.json({
    success: true,
    paymentMethods
  });
});

// @desc    Add payment method
// @route   POST /api/subscriptions/payment-methods
// @access  Private
const addPaymentMethod = asyncHandler(async (req, res) => {
  const { paymentMethodId, makeDefault } = req.body;
  
  if (!paymentMethodId) {
    res.status(400);
    throw new Error('Please provide payment method ID');
  }
  
  // TODO: Integrate with Stripe to add actual payment method
  
  res.status(201).json({
    success: true,
    message: 'Payment method added successfully',
    paymentMethod: {
      id: paymentMethodId,
      type: 'card',
      card: {
        brand: 'visa',
        last4: '1234',
        expMonth: 12,
        expYear: 2025,
      },
      isDefault: makeDefault || false,
    }
  });
});

// @desc    Remove payment method
// @route   DELETE /api/subscriptions/payment-methods/:id
// @access  Private
const removePaymentMethod = asyncHandler(async (req, res) => {
  const paymentMethodId = req.params.id;
  
  // TODO: Integrate with Stripe to remove actual payment method
  
  res.json({
    success: true,
    message: 'Payment method removed successfully'
  });
});

// @desc    Get invoices
// @route   GET /api/subscriptions/invoices
// @access  Private
const getInvoices = asyncHandler(async (req, res) => {
  // TODO: Integrate with Stripe to get actual invoices
  // For now, return mock data
  
  const invoices = [
    {
      id: 'inv_mock_1',
      number: 'INV-001',
      amount: 19.99,
      status: 'paid',
      date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      pdfUrl: '#',
    },
    {
      id: 'inv_mock_2',
      number: 'INV-002',
      amount: 19.99,
      status: 'paid',
      date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
      pdfUrl: '#',
    },
  ];
  
  res.json({
    success: true,
    invoices
  });
});

module.exports = {
  getSubscriptionPlans,
  getCurrentSubscription,
  createSubscription,
  updateSubscription,
  cancelSubscription,
  getPaymentMethods,
  addPaymentMethod,
  removePaymentMethod,
  getInvoices,
};

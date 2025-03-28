const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const Subscription = require('../models/Subscription');

// @desc    Create payment intent
// @route   POST /api/payment/create-payment-intent
// @access  Private
const createPaymentIntent = asyncHandler(async (req, res) => {
  const { amount, currency = 'usd', paymentMethodType = 'card' } = req.body;
  
  if (!amount) {
    res.status(400);
    throw new Error('Please provide an amount');
  }
  
  try {
    // In a production environment, we would use the actual Stripe API
    // For now, we'll simulate the response
    
    // Mock payment intent
    const mockPaymentIntent = {
      id: `pi_${Date.now()}`,
      object: 'payment_intent',
      amount: amount,
      currency: currency,
      payment_method_types: [paymentMethodType],
      status: 'requires_payment_method',
      client_secret: `pi_${Date.now()}_secret_${Math.random().toString(36).substring(2, 15)}`,
      created: Math.floor(Date.now() / 1000),
    };
    
    res.json({
      success: true,
      clientSecret: mockPaymentIntent.client_secret,
      paymentIntent: mockPaymentIntent
    });
  } catch (error) {
    console.error('Stripe API Error:', error);
    res.status(500);
    throw new Error('Error creating payment intent');
  }
});

// @desc    Create a customer
// @route   POST /api/payment/create-customer
// @access  Private
const createCustomer = asyncHandler(async (req, res) => {
  try {
    // In a production environment, we would use the actual Stripe API
    // For now, we'll simulate the response
    
    // Mock customer
    const mockCustomer = {
      id: `cus_${Date.now()}`,
      object: 'customer',
      email: req.user.email,
      name: `${req.user.firstName} ${req.user.lastName}`,
      created: Math.floor(Date.now() / 1000),
    };
    
    // Update user with Stripe customer ID
    await User.findByIdAndUpdate(req.user._id, {
      stripeCustomerId: mockCustomer.id
    });
    
    res.json({
      success: true,
      customer: mockCustomer
    });
  } catch (error) {
    console.error('Stripe API Error:', error);
    res.status(500);
    throw new Error('Error creating customer');
  }
});

// @desc    Create a subscription
// @route   POST /api/payment/create-subscription
// @access  Private
const createSubscription = asyncHandler(async (req, res) => {
  const { planId, paymentMethodId } = req.body;
  
  if (!planId || !paymentMethodId) {
    res.status(400);
    throw new Error('Please provide plan ID and payment method ID');
  }
  
  try {
    // Get user
    const user = await User.findById(req.user._id);
    
    if (!user) {
      res.status(404);
      throw new Error('User not found');
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
    
    // In a production environment, we would use the actual Stripe API
    // For now, we'll simulate the response
    
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
    
    // Mock Stripe subscription
    const mockSubscription = {
      id: `sub_${Date.now()}`,
      object: 'subscription',
      customer: user.stripeCustomerId || `cus_${Date.now()}`,
      status: 'active',
      current_period_start: Math.floor(Date.now() / 1000),
      current_period_end: Math.floor((Date.now() + (planInterval === 'month' ? 30 : 365) * 24 * 60 * 60 * 1000) / 1000),
      items: {
        data: [
          {
            id: `si_${Date.now()}`,
            price: {
              id: `price_${planId}`,
              product: `prod_${planId}`,
              unit_amount: planPrice * 100,
              currency: 'usd',
              recurring: {
                interval: planInterval,
              },
            },
          },
        ],
      },
    };
    
    // Calculate next billing date
    const nextBillingDate = new Date();
    if (planInterval === 'month') {
      nextBillingDate.setMonth(nextBillingDate.getMonth() + 1);
    } else {
      nextBillingDate.setFullYear(nextBillingDate.getFullYear() + 1);
    }
    
    // Create subscription in our database
    const subscription = await Subscription.create({
      user: req.user._id,
      stripeSubscriptionId: mockSubscription.id,
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
      subscriptionId: subscription._id,
      stripeCustomerId: mockSubscription.customer
    });
    
    res.status(201).json({
      success: true,
      subscription,
      stripeSubscription: mockSubscription
    });
  } catch (error) {
    console.error('Stripe API Error:', error);
    res.status(500);
    throw new Error('Error creating subscription');
  }
});

// @desc    Cancel a subscription
// @route   POST /api/payment/cancel-subscription
// @access  Private
const cancelSubscription = asyncHandler(async (req, res) => {
  const { subscriptionId, cancelImmediately = false } = req.body;
  
  if (!subscriptionId) {
    res.status(400);
    throw new Error('Please provide subscription ID');
  }
  
  try {
    // Find subscription
    const subscription = await Subscription.findById(subscriptionId);
    
    if (!subscription) {
      res.status(404);
      throw new Error('Subscription not found');
    }
    
    // Check if subscription belongs to user
    if (subscription.user.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('Not authorized to cancel this subscription');
    }
    
    // In a production environment, we would use the actual Stripe API
    // For now, we'll simulate the response
    
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
  } catch (error) {
    console.error('Stripe API Error:', error);
    res.status(500);
    throw new Error('Error canceling subscription');
  }
});

// @desc    Get payment methods
// @route   GET /api/payment/payment-methods
// @access  Private
const getPaymentMethods = asyncHandler(async (req, res) => {
  try {
    // In a production environment, we would use the actual Stripe API
    // For now, we'll return mock data
    
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
  } catch (error) {
    console.error('Stripe API Error:', error);
    res.status(500);
    throw new Error('Error retrieving payment methods');
  }
});

module.exports = {
  createPaymentIntent,
  createCustomer,
  createSubscription,
  cancelSubscription,
  getPaymentMethods
};

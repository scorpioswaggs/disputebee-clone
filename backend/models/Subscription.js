const mongoose = require('mongoose');

const SubscriptionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  planType: {
    type: String,
    enum: ['free', 'basic', 'premium'],
    default: 'free',
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'canceled', 'expired', 'past_due'],
    default: 'active',
    required: true
  },
  startDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  endDate: {
    type: Date
  },
  renewalDate: {
    type: Date
  },
  price: {
    type: Number,
    required: function() {
      return this.planType !== 'free';
    }
  },
  billingCycle: {
    type: String,
    enum: ['monthly', 'annual', 'none'],
    default: 'none'
  },
  features: {
    maxDisputeLetters: {
      type: Number,
      default: 3
    },
    bulkLetterGeneration: {
      type: Boolean,
      default: false
    },
    enhancedLegalArguments: {
      type: Boolean,
      default: false
    },
    prioritySupport: {
      type: Boolean,
      default: false
    },
    scoreSimulator: {
      type: Boolean,
      default: false
    },
    advancedAnalytics: {
      type: Boolean,
      default: false
    }
  },
  paymentMethod: {
    type: {
      type: String,
      enum: ['card', 'paypal', 'none'],
      default: 'none'
    },
    lastFour: String,
    expiryDate: String,
    brand: String
  },
  stripeCustomerId: {
    type: String
  },
  stripeSubscriptionId: {
    type: String
  },
  stripePaymentIntentId: {
    type: String
  },
  invoices: [{
    invoiceId: String,
    amount: Number,
    date: Date,
    status: {
      type: String,
      enum: ['paid', 'unpaid', 'pending']
    },
    pdfUrl: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field on save
SubscriptionSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Subscription', SubscriptionSchema);

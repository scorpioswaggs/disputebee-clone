const mongoose = require('mongoose');

const ActivityLogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  action: {
    type: String,
    required: true,
    enum: [
      'Login', 
      'Logout', 
      'PasswordChange', 
      'ProfileUpdate', 
      'SubscriptionChange',
      'CreditReportUpload',
      'DisputeLetterCreated',
      'DisputeLetterSent',
      'DisputeStatusUpdate'
    ]
  },
  details: {
    type: Object
  },
  ipAddress: {
    type: String
  },
  userAgent: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create index for faster queries
ActivityLogSchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model('ActivityLog', ActivityLogSchema);

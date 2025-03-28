const mongoose = require('mongoose');

const CreditReportSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  reportSource: {
    type: String,
    required: [true, 'Please specify the credit report source'],
    enum: ['Experian', 'Equifax', 'TransUnion', 'Other']
  },
  reportDate: {
    type: Date,
    required: [true, 'Please add the report date'],
    default: Date.now
  },
  uploadDate: {
    type: Date,
    default: Date.now
  },
  fileName: {
    type: String,
    required: true
  },
  filePath: {
    type: String,
    required: true
  },
  fileType: {
    type: String,
    required: true
  },
  fileSize: {
    type: Number,
    required: true
  },
  ocrProcessed: {
    type: Boolean,
    default: false
  },
  ocrData: {
    type: Object
  },
  creditScore: {
    type: Number,
    min: [300, 'Score must be at least 300'],
    max: [850, 'Score cannot be more than 850']
  },
  accounts: [{
    accountName: String,
    accountNumber: String,
    accountType: {
      type: String,
      enum: ['Revolving', 'Installment', 'Mortgage', 'OpenAccount', 'Collection', 'Other']
    },
    balance: Number,
    creditLimit: Number,
    paymentStatus: String,
    dateOpened: Date,
    lastReported: Date,
    paymentHistory: Object,
    hasErrors: {
      type: Boolean,
      default: false
    },
    errorTypes: [{
      type: String,
      enum: ['LatePayment', 'IncorrectBalance', 'AccountNotMine', 'IncorrectAccountInfo', 'Other']
    }],
    disputed: {
      type: Boolean,
      default: false
    }
  }],
  personalInfo: {
    name: String,
    address: String,
    previousAddresses: [String],
    employers: [String],
    hasErrors: {
      type: Boolean,
      default: false
    }
  },
  inquiries: [{
    inquiryDate: Date,
    creditorName: String,
    inquiryType: String,
    hasErrors: {
      type: Boolean,
      default: false
    },
    disputed: {
      type: Boolean,
      default: false
    }
  }],
  publicRecords: [{
    recordType: String,
    courtName: String,
    referenceNumber: String,
    dateFiled: Date,
    dateSatisfied: Date,
    hasErrors: {
      type: Boolean,
      default: false
    },
    disputed: {
      type: Boolean,
      default: false
    }
  }],
  analysisComplete: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('CreditReport', CreditReportSchema);

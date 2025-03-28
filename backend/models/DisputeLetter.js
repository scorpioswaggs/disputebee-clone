const mongoose = require('mongoose');

const DisputeLetterSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  creditReport: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CreditReport'
  },
  disputeType: {
    type: String,
    required: [true, 'Please specify the dispute type'],
    enum: ['LatePayment', 'Collection', 'PersonalInformation', 'AccountDispute', 'Inquiry', 'Other']
  },
  letterFormat: {
    type: String,
    required: [true, 'Please specify the letter format'],
    enum: ['Metro2', 'FCRA', 'FTC', 'FDCPA', 'Custom']
  },
  recipient: {
    name: String,
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String
    },
    bureauType: {
      type: String,
      enum: ['Experian', 'Equifax', 'TransUnion', 'Creditor', 'CollectionAgency', 'Other']
    }
  },
  accountDetails: {
    accountName: String,
    accountNumber: String,
    accountType: String,
    errorDescription: String
  },
  personalInfo: {
    fullName: String,
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String
    },
    phone: String,
    ssn: String,
    dob: Date
  },
  content: {
    introduction: String,
    body: String,
    conclusion: String,
    legalReferences: [String],
    customArguments: [String]
  },
  attachments: [{
    name: String,
    filePath: String,
    fileType: String
  }],
  status: {
    type: String,
    enum: ['Draft', 'Generated', 'Sent', 'Responded', 'Resolved', 'Unresolved'],
    default: 'Draft'
  },
  sentMethod: {
    type: String,
    enum: ['Mail', 'CertifiedMail', 'Email', 'Fax', 'NotSent'],
    default: 'NotSent'
  },
  sentDate: {
    type: Date
  },
  trackingNumber: {
    type: String
  },
  responseReceived: {
    type: Boolean,
    default: false
  },
  responseDate: {
    type: Date
  },
  responseDetails: {
    type: String
  },
  outcome: {
    type: String,
    enum: ['Pending', 'Removed', 'Updated', 'Verified', 'PartiallyResolved', 'Rejected'],
    default: 'Pending'
  },
  followUpRequired: {
    type: Boolean,
    default: false
  },
  followUpDate: {
    type: Date
  },
  notes: {
    type: String
  },
  generatedPdfPath: {
    type: String
  },
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
DisputeLetterSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('DisputeLetter', DisputeLetterSchema);

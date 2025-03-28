const mongoose = require('mongoose');

const EducationalContentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [200, 'Title cannot be more than 200 characters']
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  category: {
    type: String,
    enum: ['CreditBasics', 'DisputeStrategies', 'LegalRights', 'CreditScoring', 'DebtManagement', 'FinancialPlanning'],
    required: [true, 'Please specify a category']
  },
  contentType: {
    type: String,
    enum: ['Article', 'Video', 'Template', 'Guide', 'Infographic', 'FAQ'],
    required: [true, 'Please specify content type']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  content: {
    type: String,
    required: function() {
      return this.contentType !== 'Video' && this.contentType !== 'Infographic';
    }
  },
  videoUrl: {
    type: String,
    required: function() {
      return this.contentType === 'Video';
    }
  },
  imageUrl: {
    type: String
  },
  attachments: [{
    name: String,
    filePath: String,
    fileType: String
  }],
  tags: [String],
  accessLevel: {
    type: String,
    enum: ['Free', 'Basic', 'Premium'],
    default: 'Free',
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  featured: {
    type: Boolean,
    default: false
  },
  published: {
    type: Boolean,
    default: true
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
EducationalContentSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Create slug from title
EducationalContentSchema.pre('save', function(next) {
  if (!this.isModified('title')) {
    next();
    return;
  }
  
  this.slug = this.title
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
  
  next();
});

module.exports = mongoose.model('EducationalContent', EducationalContentSchema);

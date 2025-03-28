const DisputeLetter = require('../models/DisputeLetter');
const CreditReport = require('../models/CreditReport');
const asyncHandler = require('express-async-handler');
const fs = require('fs');
const path = require('path');

// @desc    Create a new dispute letter
// @route   POST /api/dispute-letters
// @access  Private
const createDisputeLetter = asyncHandler(async (req, res) => {
  const { 
    creditReportId, 
    bureau, 
    accountName, 
    accountNumber, 
    disputeType, 
    disputeReason, 
    customText,
    letterFormat 
  } = req.body;

  // Validation
  if (!creditReportId || !bureau || !disputeType || !letterFormat) {
    res.status(400);
    throw new Error('Please provide all required fields');
  }

  // Check if credit report exists and belongs to user
  const creditReport = await CreditReport.findById(creditReportId);
  if (!creditReport) {
    res.status(404);
    throw new Error('Credit report not found');
  }
  
  if (creditReport.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to use this credit report');
  }

  // Create dispute letter
  const disputeLetter = await DisputeLetter.create({
    user: req.user._id,
    creditReport: creditReportId,
    bureau,
    accountName,
    accountNumber,
    disputeType,
    disputeReason,
    customText,
    letterFormat,
    status: 'draft',
  });

  if (disputeLetter) {
    // Generate letter content based on template and inputs
    const letterContent = generateLetterContent(
      req.user,
      bureau,
      accountName,
      accountNumber,
      disputeType,
      disputeReason,
      customText,
      letterFormat
    );
    
    disputeLetter.letterContent = letterContent;
    await disputeLetter.save();
    
    res.status(201).json({
      success: true,
      disputeLetter,
    });
  } else {
    res.status(400);
    throw new Error('Invalid dispute letter data');
  }
});

// @desc    Get all dispute letters for the logged in user
// @route   GET /api/dispute-letters
// @access  Private
const getDisputeLetters = asyncHandler(async (req, res) => {
  const disputeLetters = await DisputeLetter.find({ user: req.user._id })
    .sort({ createdAt: -1 })
    .populate('creditReport', 'reportSource reportDate');
  
  res.json({
    success: true,
    count: disputeLetters.length,
    disputeLetters,
  });
});

// @desc    Get available letter templates
// @route   GET /api/dispute-letters/templates
// @access  Private
const getLetterTemplates = asyncHandler(async (req, res) => {
  // Mock templates data - in a real app, these would come from a database
  const templates = [
    {
      id: 'metro2',
      name: 'Metro 2 Compliant',
      description: 'Standard dispute letter following Metro 2 format',
      suitableFor: ['Late Payment', 'Account Not Mine', 'Incorrect Balance'],
    },
    {
      id: 'fcra',
      name: 'FCRA/FTC/FDCPA-Based',
      description: 'Advanced dispute letter citing consumer protection laws',
      suitableFor: ['Collection Account', 'Bankruptcy', 'Identity Theft'],
    },
    {
      id: 'goodwill',
      name: 'Goodwill Letter',
      description: 'Request for goodwill adjustment for legitimate late payments',
      suitableFor: ['Late Payment'],
    },
    {
      id: 'debt-validation',
      name: 'Debt Validation',
      description: 'Request for debt validation under FDCPA',
      suitableFor: ['Collection Account', 'Charge Off'],
    },
    {
      id: 'cease-desist',
      name: 'Cease and Desist',
      description: 'Letter demanding creditors stop contact',
      suitableFor: ['Collection Account', 'Harassment'],
    },
  ];
  
  res.json({
    success: true,
    templates,
  });
});

// @desc    Get a specific dispute letter by ID
// @route   GET /api/dispute-letters/:id
// @access  Private
const getDisputeLetterById = asyncHandler(async (req, res) => {
  const disputeLetter = await DisputeLetter.findById(req.params.id)
    .populate('creditReport', 'reportSource reportDate');
  
  if (!disputeLetter) {
    res.status(404);
    throw new Error('Dispute letter not found');
  }
  
  // Check if the dispute letter belongs to the logged in user
  if (disputeLetter.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to access this dispute letter');
  }
  
  res.json({
    success: true,
    disputeLetter,
  });
});

// @desc    Update dispute letter status
// @route   PUT /api/dispute-letters/:id/status
// @access  Private
const updateDisputeLetterStatus = asyncHandler(async (req, res) => {
  const { status, responseDate, responseDetails } = req.body;
  
  if (!status) {
    res.status(400);
    throw new Error('Please provide a status');
  }
  
  const disputeLetter = await DisputeLetter.findById(req.params.id);
  
  if (!disputeLetter) {
    res.status(404);
    throw new Error('Dispute letter not found');
  }
  
  // Check if the dispute letter belongs to the logged in user
  if (disputeLetter.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to update this dispute letter');
  }
  
  // Update status and related fields
  disputeLetter.status = status;
  
  if (status === 'sent') {
    disputeLetter.sentDate = Date.now();
  } else if (status === 'responded') {
    disputeLetter.responseDate = responseDate || Date.now();
    disputeLetter.responseDetails = responseDetails || '';
  } else if (status === 'successful' || status === 'unsuccessful') {
    disputeLetter.closedDate = Date.now();
  }
  
  await disputeLetter.save();
  
  res.json({
    success: true,
    disputeLetter,
  });
});

// @desc    Delete a dispute letter
// @route   DELETE /api/dispute-letters/:id
// @access  Private
const deleteDisputeLetter = asyncHandler(async (req, res) => {
  const disputeLetter = await DisputeLetter.findById(req.params.id);
  
  if (!disputeLetter) {
    res.status(404);
    throw new Error('Dispute letter not found');
  }
  
  // Check if the dispute letter belongs to the logged in user
  if (disputeLetter.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to delete this dispute letter');
  }
  
  await disputeLetter.remove();
  
  res.json({
    success: true,
    message: 'Dispute letter deleted successfully',
  });
});

// @desc    Generate bulk dispute letters
// @route   POST /api/dispute-letters/bulk
// @access  Private
const generateBulkDisputeLetters = asyncHandler(async (req, res) => {
  const { creditReportId, items, letterFormat } = req.body;
  
  if (!creditReportId || !items || !items.length || !letterFormat) {
    res.status(400);
    throw new Error('Please provide all required fields');
  }
  
  // Check if credit report exists and belongs to user
  const creditReport = await CreditReport.findById(creditReportId);
  if (!creditReport) {
    res.status(404);
    throw new Error('Credit report not found');
  }
  
  if (creditReport.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to use this credit report');
  }
  
  // Create dispute letters for each item
  const createdLetters = [];
  
  for (const item of items) {
    const { bureau, accountName, accountNumber, disputeType, disputeReason } = item;
    
    if (!bureau || !disputeType) {
      continue; // Skip invalid items
    }
    
    // Generate letter content
    const letterContent = generateLetterContent(
      req.user,
      bureau,
      accountName,
      accountNumber,
      disputeType,
      disputeReason,
      '',
      letterFormat
    );
    
    // Create dispute letter
    const disputeLetter = await DisputeLetter.create({
      user: req.user._id,
      creditReport: creditReportId,
      bureau,
      accountName,
      accountNumber,
      disputeType,
      disputeReason,
      letterFormat,
      letterContent,
      status: 'draft',
    });
    
    if (disputeLetter) {
      createdLetters.push(disputeLetter);
    }
  }
  
  res.status(201).json({
    success: true,
    count: createdLetters.length,
    disputeLetters: createdLetters,
  });
});

// Helper function to generate letter content based on template and inputs
const generateLetterContent = (
  user,
  bureau,
  accountName,
  accountNumber,
  disputeType,
  disputeReason,
  customText,
  letterFormat
) => {
  // Get user's full name and address
  const fullName = `${user.firstName} ${user.lastName}`;
  const address = user.address || '123 Main St, Anytown, USA 12345';
  
  // Get bureau address based on selection
  let bureauAddress = '';
  if (bureau === 'experian') {
    bureauAddress = 'Experian\nP.O. Box 4500\nAllen, TX 75013';
  } else if (bureau === 'equifax') {
    bureauAddress = 'Equifax Information Services LLC\nP.O. Box 740256\nAtlanta, GA 30374';
  } else if (bureau === 'transunion') {
    bureauAddress = 'TransUnion LLC\nConsumer Dispute Center\nP.O. Box 2000\nChester, PA 19016';
  }
  
  // Current date in format: March 28, 2025
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  // Base letter content
  let letterContent = `${fullName}\n${address}\n\n${currentDate}\n\n${bureauAddress}\n\nRe: Dispute of Inaccurate Information in Credit Report\n\nTo Whom It May Concern:\n\n`;
  
  // Add appropriate content based on letter format
  if (letterFormat === 'metro2') {
    letterContent += `I am writing to dispute the following information in my credit report. The items I am disputing are as follows:\n\n`;
    
    if (accountName && accountNumber) {
      letterContent += `Account Name: ${accountName}\nAccount Number: ${accountNumber}\n`;
    }
    
    letterContent += `Dispute Type: ${disputeType}\n\n`;
    
    if (disputeReason) {
      letterContent += `Reason for Dispute: ${disputeReason}\n\n`;
    }
    
    letterContent += `As per the Fair Credit Reporting Act (FCRA), I request that you investigate this matter and remove the inaccurate information from my credit report. The information is inaccurate because ${disputeReason || 'it is not being reported correctly'}.\n\n`;
    
    if (customText) {
      letterContent += `${customText}\n\n`;
    }
    
    letterContent += `Please investigate this matter and correct the disputed information to ensure the accuracy of my credit report. According to the FCRA, you must complete your investigation within 30 days of receiving this dispute.\n\n`;
  } else if (letterFormat === 'fcra') {
    letterContent += `I am writing to dispute information in my credit report pursuant to my rights under the Fair Credit Reporting Act (FCRA), 15 U.S.C. § 1681 et seq., and the Fair Debt Collection Practices Act (FDCPA), 15 U.S.C. § 1692 et seq.\n\n`;
    
    if (accountName && accountNumber) {
      letterContent += `I dispute the following item: ${accountName} (Account #: ${accountNumber})\n\n`;
    }
    
    letterContent += `Dispute Type: ${disputeType}\n\n`;
    
    if (disputeReason) {
      letterContent += `This information is ${disputeReason}. `;
    }
    
    letterContent += `Under Section 611(a) of the FCRA, you are required to conduct a reasonable investigation into this matter and remove any information that cannot be verified.\n\n`;
    
    if (customText) {
      letterContent += `${customText}\n\n`;
    }
    
    letterContent += `I request that you forward a copy of this dispute to the furnisher of this information. Additionally, please provide me with copies of any documentation used to verify the accuracy of this account.\n\n`;
    
    letterContent += `Be advised that I am keeping a copy of this dispute letter and maintaining records of all communications in this matter. Under the FCRA, you have 30 days to investigate and respond to this dispute.\n\n`;
  }
  
  // Common closing for all letter formats
  letterContent += `Thank you for your prompt attention to this matter.\n\nSincerely,\n\n${fullName}`;
  
  return letterContent;
};

module.exports = {
  createDisputeLetter,
  getDisputeLetters,
  getDisputeLetterById,
  updateDisputeLetterStatus,
  deleteDisputeLetter,
  generateBulkDisputeLetters,
  getLetterTemplates,
};

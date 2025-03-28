const CreditReport = require('../models/CreditReport');
const asyncHandler = require('express-async-handler');
const fs = require('fs');
const path = require('path');

// @desc    Upload a new credit report
// @route   POST /api/credit-reports/upload
// @access  Private
const uploadCreditReport = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error('Please upload a file');
  }

  const { reportSource, reportDate } = req.body;

  if (!reportSource) {
    res.status(400);
    throw new Error('Please provide the credit report source');
  }

  // Create credit report record
  const creditReport = await CreditReport.create({
    user: req.user._id,
    filePath: req.file.path,
    fileName: req.file.filename,
    fileType: req.file.mimetype,
    fileSize: req.file.size,
    reportSource,
    reportDate: reportDate || Date.now(),
    status: 'uploaded',
  });

  if (creditReport) {
    res.status(201).json({
      success: true,
      creditReport,
    });
  } else {
    res.status(400);
    throw new Error('Invalid credit report data');
  }
});

// @desc    Get all credit reports for the logged in user
// @route   GET /api/credit-reports
// @access  Private
const getCreditReports = asyncHandler(async (req, res) => {
  const creditReports = await CreditReport.find({ user: req.user._id })
    .sort({ createdAt: -1 });
  
  res.json({
    success: true,
    count: creditReports.length,
    creditReports,
  });
});

// @desc    Get a specific credit report by ID
// @route   GET /api/credit-reports/:id
// @access  Private
const getCreditReportById = asyncHandler(async (req, res) => {
  const creditReport = await CreditReport.findById(req.params.id);
  
  if (!creditReport) {
    res.status(404);
    throw new Error('Credit report not found');
  }
  
  // Check if the credit report belongs to the logged in user
  if (creditReport.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to access this credit report');
  }
  
  res.json({
    success: true,
    creditReport,
  });
});

// @desc    Analyze a credit report
// @route   POST /api/credit-reports/:id/analyze
// @access  Private
const analyzeCreditReport = asyncHandler(async (req, res) => {
  const creditReport = await CreditReport.findById(req.params.id);
  
  if (!creditReport) {
    res.status(404);
    throw new Error('Credit report not found');
  }
  
  // Check if the credit report belongs to the logged in user
  if (creditReport.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to analyze this credit report');
  }
  
  // TODO: Implement OCR and AI analysis of credit report
  // This would typically involve:
  // 1. Using OCR to extract text from the PDF/image
  // 2. Using NLP to identify accounts, balances, payment history, etc.
  // 3. Identifying potential issues that can be disputed
  
  // For now, we'll simulate the analysis with mock data
  const mockAnalysis = {
    creditScore: Math.floor(Math.random() * (850 - 300 + 1)) + 300,
    accounts: {
      total: Math.floor(Math.random() * 10) + 1,
      negative: Math.floor(Math.random() * 3),
      positive: Math.floor(Math.random() * 7) + 1,
    },
    utilization: Math.floor(Math.random() * 100),
    inquiries: Math.floor(Math.random() * 5),
    derogatory: Math.floor(Math.random() * 2),
    potentialDisputes: [
      {
        accountName: 'Sample Bank Credit Card',
        accountNumber: 'XXXX-XXXX-XXXX-1234',
        issueType: 'Late Payment',
        description: 'Payment reported 30 days late in January 2025',
        recommendedAction: 'Dispute as "Never Late"',
      },
      {
        accountName: 'Collection Agency',
        accountNumber: 'CA-12345',
        issueType: 'Collection Account',
        description: 'Medical collection for $750',
        recommendedAction: 'Dispute as "Not Mine" or "Already Paid"',
      },
    ],
  };
  
  // Update credit report with analysis results
  creditReport.status = 'analyzed';
  creditReport.analysisResults = mockAnalysis;
  creditReport.analyzedAt = Date.now();
  
  await creditReport.save();
  
  res.json({
    success: true,
    creditReport,
  });
});

// @desc    Delete a credit report
// @route   DELETE /api/credit-reports/:id
// @access  Private
const deleteCreditReport = asyncHandler(async (req, res) => {
  const creditReport = await CreditReport.findById(req.params.id);
  
  if (!creditReport) {
    res.status(404);
    throw new Error('Credit report not found');
  }
  
  // Check if the credit report belongs to the logged in user
  if (creditReport.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to delete this credit report');
  }
  
  // Delete the file from the filesystem
  if (creditReport.filePath) {
    try {
      fs.unlinkSync(creditReport.filePath);
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  }
  
  // Delete the credit report from the database
  await creditReport.remove();
  
  res.json({
    success: true,
    message: 'Credit report deleted successfully',
  });
});

module.exports = {
  uploadCreditReport,
  getCreditReports,
  getCreditReportById,
  analyzeCreditReport,
  deleteCreditReport,
};

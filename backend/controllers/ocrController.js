const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { createWorker } = require('tesseract.js');
const asyncHandler = require('express-async-handler');

// @desc    Extract text from credit report using OCR
// @route   POST /api/ocr/extract
// @access  Private
const extractTextFromCreditReport = asyncHandler(async (req, res) => {
  const { filePath } = req.body;
  
  if (!filePath) {
    res.status(400);
    throw new Error('Please provide a file path');
  }
  
  // Check if file exists
  if (!fs.existsSync(filePath)) {
    res.status(404);
    throw new Error('File not found');
  }
  
  // Get file extension
  const fileExt = path.extname(filePath).toLowerCase();
  
  try {
    let extractedText = '';
    
    // For PDF files, we would typically use a PDF parser like pdf-parse
    // For this implementation, we'll use Tesseract.js for image-based OCR
    if (fileExt === '.pdf') {
      // In a production environment, we would convert PDF to images first
      // For now, we'll return a mock response for PDFs
      extractedText = 'This is mock extracted text from a PDF file. In production, we would use a proper PDF parser.';
    } else if (['.jpg', '.jpeg', '.png'].includes(fileExt)) {
      // Use Tesseract.js for image OCR
      const worker = await createWorker();
      await worker.loadLanguage('eng');
      await worker.initialize('eng');
      const { data } = await worker.recognize(filePath);
      extractedText = data.text;
      await worker.terminate();
    } else {
      res.status(400);
      throw new Error('Unsupported file type');
    }
    
    res.json({
      success: true,
      extractedText,
    });
  } catch (error) {
    console.error('OCR Error:', error);
    res.status(500);
    throw new Error('Error processing file with OCR');
  }
});

// @desc    Analyze credit report text and identify accounts and issues
// @route   POST /api/ocr/analyze
// @access  Private
const analyzeCreditReportText = asyncHandler(async (req, res) => {
  const { text, reportSource } = req.body;
  
  if (!text) {
    res.status(400);
    throw new Error('Please provide text to analyze');
  }
  
  try {
    // In a production environment, we would use NLP or OpenAI API to analyze the text
    // For now, we'll return a mock analysis
    
    // Mock analysis based on report source
    let analysis = {
      creditScore: Math.floor(Math.random() * (850 - 300 + 1)) + 300,
      accounts: [],
      inquiries: [],
      publicRecords: [],
      personalInfo: {
        name: 'John Doe',
        address: '123 Main St, Anytown, USA',
        ssn: 'XXX-XX-1234',
      },
      potentialIssues: [],
    };
    
    // Generate mock accounts based on report source
    if (reportSource === 'experian') {
      analysis.accounts = [
        {
          accountName: 'CHASE BANK',
          accountNumber: 'XXXX-XXXX-XXXX-1234',
          accountType: 'Credit Card',
          balance: 2500,
          creditLimit: 5000,
          paymentStatus: 'Current',
          paymentHistory: [
            { date: '2025-02', status: 'OK' },
            { date: '2025-01', status: 'OK' },
            { date: '2024-12', status: '30' },
          ],
          dateOpened: '2020-05-15',
          lastReported: '2025-03-01',
        },
        {
          accountName: 'BANK OF AMERICA',
          accountNumber: 'XXXXXXXXXXXX5678',
          accountType: 'Auto Loan',
          balance: 12000,
          originalAmount: 25000,
          paymentStatus: 'Current',
          paymentHistory: [
            { date: '2025-02', status: 'OK' },
            { date: '2025-01', status: 'OK' },
            { date: '2024-12', status: 'OK' },
          ],
          dateOpened: '2022-01-10',
          lastReported: '2025-03-01',
        },
      ];
      
      analysis.potentialIssues = [
        {
          accountName: 'CHASE BANK',
          accountNumber: 'XXXX-XXXX-XXXX-1234',
          issueType: 'Late Payment',
          description: 'Payment reported 30 days late in December 2024',
          recommendedAction: 'Dispute as "Never Late" or "Goodwill Adjustment"',
        },
      ];
    } else if (reportSource === 'equifax') {
      analysis.accounts = [
        {
          accountName: 'CAPITAL ONE',
          accountNumber: 'XXXX-XXXX-XXXX-5678',
          accountType: 'Credit Card',
          balance: 1800,
          creditLimit: 3000,
          paymentStatus: 'Current',
          paymentHistory: [
            { date: '2025-02', status: 'OK' },
            { date: '2025-01', status: 'OK' },
            { date: '2024-12', status: 'OK' },
          ],
          dateOpened: '2019-08-22',
          lastReported: '2025-03-01',
        },
        {
          accountName: 'MEDICAL COLLECTION',
          accountNumber: 'MC12345',
          accountType: 'Collection',
          balance: 750,
          originalAmount: 750,
          paymentStatus: 'Collection',
          dateOpened: '2023-11-05',
          lastReported: '2025-02-15',
        },
      ];
      
      analysis.potentialIssues = [
        {
          accountName: 'MEDICAL COLLECTION',
          accountNumber: 'MC12345',
          issueType: 'Collection Account',
          description: 'Medical collection for $750',
          recommendedAction: 'Dispute as "Not Mine" or "Already Paid"',
        },
      ];
    } else if (reportSource === 'transunion') {
      analysis.accounts = [
        {
          accountName: 'DISCOVER',
          accountNumber: 'XXXX-XXXX-XXXX-9012',
          accountType: 'Credit Card',
          balance: 950,
          creditLimit: 2000,
          paymentStatus: 'Current',
          paymentHistory: [
            { date: '2025-02', status: 'OK' },
            { date: '2025-01', status: 'OK' },
            { date: '2024-12', status: 'OK' },
          ],
          dateOpened: '2021-03-17',
          lastReported: '2025-03-01',
        },
        {
          accountName: 'WELLS FARGO',
          accountNumber: 'XXXXXXXXXXXX3456',
          accountType: 'Mortgage',
          balance: 180000,
          originalAmount: 200000,
          paymentStatus: 'Current',
          paymentHistory: [
            { date: '2025-02', status: 'OK' },
            { date: '2025-01', status: 'OK' },
            { date: '2024-12', status: 'OK' },
          ],
          dateOpened: '2020-11-01',
          lastReported: '2025-03-01',
        },
      ];
      
      analysis.inquiries = [
        {
          inquiryDate: '2025-01-15',
          inquiryName: 'CITI BANK',
          inquiryType: 'Hard Pull',
        },
        {
          inquiryDate: '2024-11-20',
          inquiryName: 'AMERICAN EXPRESS',
          inquiryType: 'Hard Pull',
        },
      ];
      
      analysis.potentialIssues = [
        {
          inquiryName: 'CITI BANK',
          inquiryDate: '2025-01-15',
          issueType: 'Hard Inquiry',
          description: 'Recent hard inquiry may be impacting score',
          recommendedAction: 'Dispute as "Not Authorized" if not recognized',
        },
      ];
    }
    
    res.json({
      success: true,
      analysis,
    });
  } catch (error) {
    console.error('Analysis Error:', error);
    res.status(500);
    throw new Error('Error analyzing credit report text');
  }
});

module.exports = {
  extractTextFromCreditReport,
  analyzeCreditReportText,
};

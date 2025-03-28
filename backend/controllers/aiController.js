const axios = require('axios');
const asyncHandler = require('express-async-handler');

// @desc    Generate dispute letter content using OpenAI
// @route   POST /api/ai/generate-letter
// @access  Private
const generateDisputeLetterWithAI = asyncHandler(async (req, res) => {
  const { 
    userInfo, 
    bureau, 
    accountName, 
    accountNumber, 
    disputeType, 
    disputeReason, 
    letterFormat,
    additionalDetails
  } = req.body;
  
  if (!bureau || !disputeType || !letterFormat) {
    res.status(400);
    throw new Error('Please provide all required fields');
  }
  
  try {
    // In a production environment, we would use the actual OpenAI API
    // For now, we'll simulate the response
    
    // Construct a prompt for the AI
    const prompt = constructAIPrompt(
      userInfo,
      bureau,
      accountName,
      accountNumber,
      disputeType,
      disputeReason,
      letterFormat,
      additionalDetails
    );
    
    // Mock OpenAI API response
    const letterContent = generateMockAIResponse(
      userInfo,
      bureau,
      accountName,
      accountNumber,
      disputeType,
      disputeReason,
      letterFormat
    );
    
    res.json({
      success: true,
      letterContent,
    });
  } catch (error) {
    console.error('AI Generation Error:', error);
    res.status(500);
    throw new Error('Error generating letter with AI');
  }
});

// @desc    Analyze credit report and suggest disputes using OpenAI
// @route   POST /api/ai/analyze-report
// @access  Private
const analyzeReportWithAI = asyncHandler(async (req, res) => {
  const { reportText, reportSource } = req.body;
  
  if (!reportText) {
    res.status(400);
    throw new Error('Please provide report text to analyze');
  }
  
  try {
    // In a production environment, we would use the actual OpenAI API
    // For now, we'll simulate the response
    
    // Mock AI analysis based on report source
    let analysis = {
      summary: 'Based on the analysis of your credit report, I have identified several potential issues that could be disputed.',
      potentialDisputes: [],
      recommendedActions: [],
      creditScoreImpact: {
        current: Math.floor(Math.random() * (850 - 300 + 1)) + 300,
        potential: 0,
        improvement: 0
      }
    };
    
    // Generate mock analysis based on report source
    if (reportSource === 'experian') {
      analysis.potentialDisputes = [
        {
          accountName: 'CHASE BANK',
          accountNumber: 'XXXX-XXXX-XXXX-1234',
          issueType: 'Late Payment',
          description: 'Payment reported 30 days late in December 2024',
          disputeReason: 'Never Late',
          likelihood: 'High',
          scoreImpact: '+20 points'
        },
        {
          accountName: 'VERIZON WIRELESS',
          accountNumber: 'XXXXXXXXXX5678',
          issueType: 'Collection Account',
          description: 'Collection account for $320',
          disputeReason: 'Paid in Full',
          likelihood: 'Medium',
          scoreImpact: '+15 points'
        }
      ];
      
      analysis.recommendedActions = [
        'Dispute the late payment on your Chase account using the "Never Late" reason',
        'Provide proof of payment for the Verizon collection account',
        'Consider requesting a goodwill adjustment from Chase if you have an otherwise good payment history'
      ];
    } else if (reportSource === 'equifax') {
      analysis.potentialDisputes = [
        {
          accountName: 'MEDICAL COLLECTION',
          accountNumber: 'MC12345',
          issueType: 'Collection Account',
          description: 'Medical collection for $750',
          disputeReason: 'Not Mine',
          likelihood: 'Medium',
          scoreImpact: '+30 points'
        },
        {
          accountName: 'CAPITAL ONE',
          accountNumber: 'XXXX-XXXX-XXXX-5678',
          issueType: 'High Balance',
          description: 'High utilization (60%) affecting score',
          disputeReason: 'Not Disputable',
          likelihood: 'N/A',
          scoreImpact: 'N/A'
        }
      ];
      
      analysis.recommendedActions = [
        'Dispute the medical collection account using the "Not Mine" reason',
        'Pay down the Capital One credit card balance to reduce utilization',
        'Request debt validation from the medical collection agency'
      ];
    } else if (reportSource === 'transunion') {
      analysis.potentialDisputes = [
        {
          accountName: 'CITI BANK',
          accountNumber: 'INQ-20250115',
          issueType: 'Hard Inquiry',
          description: 'Hard inquiry from January 15, 2025',
          disputeReason: 'Not Authorized',
          likelihood: 'Medium',
          scoreImpact: '+5 points'
        },
        {
          accountName: 'DISCOVER',
          accountNumber: 'XXXX-XXXX-XXXX-9012',
          issueType: 'Incorrect Balance',
          description: 'Balance reported as $950, actual balance is $650',
          disputeReason: 'Incorrect Information',
          likelihood: 'High',
          scoreImpact: '+10 points'
        }
      ];
      
      analysis.recommendedActions = [
        'Dispute the Citi Bank hard inquiry if you did not authorize it',
        'Provide a recent statement showing the correct balance for your Discover card',
        'Monitor your credit report for any new unauthorized inquiries'
      ];
    }
    
    // Calculate potential score improvement
    let totalImprovement = 0;
    analysis.potentialDisputes.forEach(dispute => {
      if (dispute.scoreImpact !== 'N/A') {
        totalImprovement += parseInt(dispute.scoreImpact.replace(/\+|\s|points/g, ''));
      }
    });
    
    analysis.creditScoreImpact.potential = Math.min(850, analysis.creditScoreImpact.current + totalImprovement);
    analysis.creditScoreImpact.improvement = totalImprovement;
    
    res.json({
      success: true,
      analysis,
    });
  } catch (error) {
    console.error('AI Analysis Error:', error);
    res.status(500);
    throw new Error('Error analyzing report with AI');
  }
});

// Helper function to construct AI prompt
const constructAIPrompt = (
  userInfo,
  bureau,
  accountName,
  accountNumber,
  disputeType,
  disputeReason,
  letterFormat,
  additionalDetails
) => {
  return `Generate a professional credit dispute letter with the following details:
  
  User Information:
  - Name: ${userInfo.name || 'John Doe'}
  - Address: ${userInfo.address || '123 Main St, Anytown, USA 12345'}
  
  Credit Bureau: ${bureau}
  
  Account Information:
  - Account Name: ${accountName || 'N/A'}
  - Account Number: ${accountNumber || 'N/A'}
  
  Dispute Type: ${disputeType}
  Dispute Reason: ${disputeReason || 'Information is inaccurate'}
  
  Letter Format: ${letterFormat}
  
  Additional Details: ${additionalDetails || 'N/A'}
  
  Please format the letter professionally with proper headers, date, and signature line.`;
};

// Helper function to generate mock AI response
const generateMockAIResponse = (
  userInfo,
  bureau,
  accountName,
  accountNumber,
  disputeType,
  disputeReason,
  letterFormat
) => {
  // Get user's full name and address
  const fullName = userInfo?.name || 'John Doe';
  const address = userInfo?.address || '123 Main St, Anytown, USA 12345';
  
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
    
    letterContent += `Please investigate this matter and correct the disputed information to ensure the accuracy of my credit report. According to the FCRA, you must complete your investigation within 30 days of receiving this dispute.\n\n`;
    
    letterContent += `I am exercising my right to dispute inaccurate information as provided by the Fair Credit Reporting Act. If you cannot verify this information, it must be deleted from my credit report as required by law.\n\n`;
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
    
    letterContent += `I request that you forward a copy of this dispute to the furnisher of this information. Additionally, please provide me with copies of any documentation used to verify the accuracy of this account.\n\n`;
    
    letterContent += `Be advised that I am keeping a copy of this dispute letter and maintaining records of all communications in this matter. Under the FCRA, you have 30 days to investigate and respond to this dispute.\n\n`;
    
    letterContent += `I am aware that it is a violation of federal law for credit reporting agencies to report information that is inaccurate or cannot be verified. If you fail to comply with federal law, I may seek damages through legal action.\n\n`;
  }
  
  // Common closing for all letter formats
  letterContent += `Please send me an updated copy of my credit report showing the deletion or correction of this disputed item. If you have any questions or need additional information, please contact me at the address listed above.\n\n`;
  
  letterContent += `Thank you for your prompt attention to this matter.\n\nSincerely,\n\n${fullName}`;
  
  return letterContent;
};

module.exports = {
  generateDisputeLetterWithAI,
  analyzeReportWithAI,
};

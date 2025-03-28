const axios = require('axios');
const asyncHandler = require('express-async-handler');

// @desc    Send physical mail using mailing API
// @route   POST /api/mail/send-letter
// @access  Private
const sendPhysicalMail = asyncHandler(async (req, res) => {
  const { 
    pdfPath, 
    recipientName,
    recipientAddress,
    senderName,
    senderAddress,
    trackingEnabled = true
  } = req.body;
  
  if (!pdfPath || !recipientName || !recipientAddress) {
    res.status(400);
    throw new Error('Please provide all required fields');
  }
  
  try {
    // In a production environment, we would use an actual mailing API like Lob.com
    // For now, we'll simulate the response
    
    // Mock mailing API response
    const mockResponse = {
      id: `mail_${Date.now()}`,
      description: 'Credit Dispute Letter',
      status: 'created',
      trackingNumber: trackingEnabled ? `TRK${Math.floor(Math.random() * 10000000000)}` : null,
      expectedDeliveryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      recipient: {
        name: recipientName,
        address: recipientAddress
      },
      sender: {
        name: senderName || 'CrediSure',
        address: senderAddress || '123 Business St, Suite 100, San Francisco, CA 94107'
      },
      dateCreated: new Date().toISOString(),
      price: 1.50
    };
    
    res.json({
      success: true,
      mailData: mockResponse
    });
  } catch (error) {
    console.error('Mailing API Error:', error);
    res.status(500);
    throw new Error('Error sending physical mail');
  }
});

// @desc    Get mail tracking information
// @route   GET /api/mail/tracking/:trackingNumber
// @access  Private
const getMailTracking = asyncHandler(async (req, res) => {
  const { trackingNumber } = req.params;
  
  if (!trackingNumber) {
    res.status(400);
    throw new Error('Please provide a tracking number');
  }
  
  try {
    // In a production environment, we would use an actual mailing API
    // For now, we'll simulate the response
    
    // Generate random status based on tracking number
    const statusOptions = ['created', 'processed', 'in_transit', 'delivered'];
    const randomStatus = statusOptions[Math.floor(Math.random() * statusOptions.length)];
    
    // Mock tracking response
    const mockTracking = {
      trackingNumber,
      status: randomStatus,
      events: []
    };
    
    // Generate mock tracking events based on status
    const today = new Date();
    
    mockTracking.events.push({
      date: new Date(today.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      description: 'Mail piece created',
      location: 'San Francisco, CA'
    });
    
    if (randomStatus !== 'created') {
      mockTracking.events.push({
        date: new Date(today.getTime() - 4 * 24 * 60 * 60 * 1000).toISOString(),
        description: 'Mail piece processed',
        location: 'San Francisco, CA'
      });
    }
    
    if (randomStatus === 'in_transit' || randomStatus === 'delivered') {
      mockTracking.events.push({
        date: new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        description: 'In transit to destination',
        location: 'Regional Distribution Center'
      });
    }
    
    if (randomStatus === 'delivered') {
      mockTracking.events.push({
        date: new Date().toISOString(),
        description: 'Delivered',
        location: 'Destination'
      });
    }
    
    res.json({
      success: true,
      tracking: mockTracking
    });
  } catch (error) {
    console.error('Tracking API Error:', error);
    res.status(500);
    throw new Error('Error getting mail tracking information');
  }
});

module.exports = {
  sendPhysicalMail,
  getMailTracking
};

const EducationalContent = require('../models/EducationalContent');
const asyncHandler = require('express-async-handler');

// @desc    Get all articles
// @route   GET /api/educational-content/articles
// @access  Private
const getArticles = asyncHandler(async (req, res) => {
  const { category, limit = 10, page = 1 } = req.query;
  
  // Build query
  const query = { contentType: 'article' };
  
  if (category) {
    query.category = category;
  }
  
  // Pagination
  const skip = (parseInt(page) - 1) * parseInt(limit);
  
  const articles = await EducationalContent.find(query)
    .sort({ createdAt: -1 })
    .limit(parseInt(limit))
    .skip(skip);
  
  const total = await EducationalContent.countDocuments(query);
  
  res.json({
    success: true,
    count: articles.length,
    total,
    pages: Math.ceil(total / parseInt(limit)),
    currentPage: parseInt(page),
    articles
  });
});

// @desc    Get article categories
// @route   GET /api/educational-content/articles/categories
// @access  Private
const getArticleCategories = asyncHandler(async (req, res) => {
  // Mock categories - in a real app, these would be dynamically generated from the database
  const categories = [
    {
      id: 'credit-basics',
      name: 'Credit Basics',
      description: 'Learn the fundamentals of credit scores, reports, and how the credit system works.',
      articleCount: 12
    },
    {
      id: 'dispute-strategies',
      name: 'Dispute Strategies',
      description: 'Discover effective strategies for disputing errors and inaccuracies on your credit report.',
      articleCount: 8
    },
    {
      id: 'legal-rights',
      name: 'Legal Rights',
      description: 'Understand your rights under FCRA, FDCPA, and other consumer protection laws.',
      articleCount: 6
    },
    {
      id: 'credit-building',
      name: 'Credit Building',
      description: 'Learn how to build and improve your credit score over time.',
      articleCount: 10
    },
    {
      id: 'debt-management',
      name: 'Debt Management',
      description: 'Strategies for managing and reducing debt effectively.',
      articleCount: 7
    }
  ];
  
  res.json({
    success: true,
    categories
  });
});

// @desc    Get article by ID
// @route   GET /api/educational-content/articles/:id
// @access  Private
const getArticleById = asyncHandler(async (req, res) => {
  const article = await EducationalContent.findOne({
    _id: req.params.id,
    contentType: 'article'
  });
  
  if (!article) {
    res.status(404);
    throw new Error('Article not found');
  }
  
  res.json({
    success: true,
    article
  });
});

// @desc    Get all videos
// @route   GET /api/educational-content/videos
// @access  Private
const getVideos = asyncHandler(async (req, res) => {
  const { category, limit = 10, page = 1 } = req.query;
  
  // Build query
  const query = { contentType: 'video' };
  
  if (category) {
    query.category = category;
  }
  
  // Pagination
  const skip = (parseInt(page) - 1) * parseInt(limit);
  
  const videos = await EducationalContent.find(query)
    .sort({ createdAt: -1 })
    .limit(parseInt(limit))
    .skip(skip);
  
  const total = await EducationalContent.countDocuments(query);
  
  res.json({
    success: true,
    count: videos.length,
    total,
    pages: Math.ceil(total / parseInt(limit)),
    currentPage: parseInt(page),
    videos
  });
});

// @desc    Get video by ID
// @route   GET /api/educational-content/videos/:id
// @access  Private
const getVideoById = asyncHandler(async (req, res) => {
  const video = await EducationalContent.findOne({
    _id: req.params.id,
    contentType: 'video'
  });
  
  if (!video) {
    res.status(404);
    throw new Error('Video not found');
  }
  
  res.json({
    success: true,
    video
  });
});

// @desc    Get all downloadable resources
// @route   GET /api/educational-content/resources
// @access  Private
const getResources = asyncHandler(async (req, res) => {
  const { category, limit = 10, page = 1 } = req.query;
  
  // Build query
  const query = { contentType: 'resource' };
  
  if (category) {
    query.category = category;
  }
  
  // Pagination
  const skip = (parseInt(page) - 1) * parseInt(limit);
  
  const resources = await EducationalContent.find(query)
    .sort({ createdAt: -1 })
    .limit(parseInt(limit))
    .skip(skip);
  
  const total = await EducationalContent.countDocuments(query);
  
  res.json({
    success: true,
    count: resources.length,
    total,
    pages: Math.ceil(total / parseInt(limit)),
    currentPage: parseInt(page),
    resources
  });
});

// @desc    Get resource by ID
// @route   GET /api/educational-content/resources/:id
// @access  Private
const getResourceById = asyncHandler(async (req, res) => {
  const resource = await EducationalContent.findOne({
    _id: req.params.id,
    contentType: 'resource'
  });
  
  if (!resource) {
    res.status(404);
    throw new Error('Resource not found');
  }
  
  res.json({
    success: true,
    resource
  });
});

module.exports = {
  getArticles,
  getArticleCategories,
  getArticleById,
  getVideos,
  getVideoById,
  getResources,
  getResourceById
};

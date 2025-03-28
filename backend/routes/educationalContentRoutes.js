const express = require('express');
const router = express.Router();
const { 
  getArticles,
  getArticleById,
  getArticleCategories,
  getVideos,
  getVideoById,
  getResources,
  getResourceById
} = require('../controllers/educationalContentController');
const { protect } = require('../middleware/authMiddleware');

// All routes are protected (require authentication)
router.use(protect);

// Articles
router.get('/articles', getArticles);
router.get('/articles/categories', getArticleCategories);
router.get('/articles/:id', getArticleById);

// Videos
router.get('/videos', getVideos);
router.get('/videos/:id', getVideoById);

// Downloadable resources
router.get('/resources', getResources);
router.get('/resources/:id', getResourceById);

module.exports = router;

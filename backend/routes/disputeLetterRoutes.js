const express = require('express');
const router = express.Router();
const { 
  createDisputeLetter,
  getDisputeLetters,
  getDisputeLetterById,
  updateDisputeLetterStatus,
  deleteDisputeLetter,
  generateBulkDisputeLetters,
  getLetterTemplates
} = require('../controllers/disputeLetterController');
const { protect } = require('../middleware/authMiddleware');

// All routes are protected (require authentication)
router.use(protect);

/**
 * @swagger
 * /api/dispute-letters:
 *   get:
 *     tags: [Dispute Letters]
 *     summary: Get all dispute letters
 *     security:
 *       - bearerAuth: []
 *     description: Retrieve all dispute letters for the authenticated user
 *     responses:
 *       200:
 *         description: List of dispute letters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: integer
 *                   description: Number of dispute letters
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/DisputeLetter'
 */
router.get('/', getDisputeLetters);

/**
 * @swagger
 * /api/dispute-letters/templates:
 *   get:
 *     tags: [Dispute Letters]
 *     summary: Get letter templates
 *     security:
 *       - bearerAuth: []
 *     description: Retrieve available dispute letter templates
 *     responses:
 *       200:
 *         description: List of letter templates
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       description:
 *                         type: string
 *                       category:
 *                         type: string
 *                       content:
 *                         type: string
 */
router.get('/templates', getLetterTemplates);

/**
 * @swagger
 * /api/dispute-letters:
 *   post:
 *     tags: [Dispute Letters]
 *     summary: Create dispute letter
 *     security:
 *       - bearerAuth: []
 *     description: Create a new dispute letter
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - templateId
 *               - creditReportId
 *               - items
 *             properties:
 *               templateId:
 *                 type: string
 *                 description: ID of the letter template to use
 *               creditReportId:
 *                 type: string
 *                 description: ID of the credit report being disputed
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     type:
 *                       type: string
 *                       description: Type of item being disputed
 *                     description:
 *                       type: string
 *                       description: Description of the item
 *                     date:
 *                       type: string
 *                       format: date
 *                       description: Date of the item
 *     responses:
 *       201:
 *         description: Dispute letter created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/DisputeLetter'
 */
router.post('/', createDisputeLetter);

/**
 * @swagger
 * /api/dispute-letters/bulk:
 *   post:
 *     tags: [Dispute Letters]
 *     summary: Generate bulk dispute letters
 *     security:
 *       - bearerAuth: []
 *     description: Generate multiple dispute letters at once
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - creditReportId
 *               - items
 *             properties:
 *               creditReportId:
 *                 type: string
 *                 description: ID of the credit report being disputed
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - templateId
 *                     - items
 *                   properties:
 *                     templateId:
 *                       type: string
 *                       description: ID of the letter template to use
 *                     items:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           type:
 *                             type: string
 *                           description:
 *                             type: string
 *                           date:
 *                             type: string
 *                             format: date
 *     responses:
 *       201:
 *         description: Bulk dispute letters created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: integer
 *                   description: Number of letters created
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/DisputeLetter'
 */
router.post('/bulk', generateBulkDisputeLetters);

/**
 * @swagger
 * /api/dispute-letters/{id}:
 *   get:
 *     tags: [Dispute Letters]
 *     summary: Get dispute letter by ID
 *     security:
 *       - bearerAuth: []
 *     description: Retrieve a specific dispute letter by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Dispute letter ID
 *     responses:
 *       200:
 *         description: Dispute letter details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/DisputeLetter'
 *       404:
 *         description: Dispute letter not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', getDisputeLetterById);

/**
 * @swagger
 * /api/dispute-letters/{id}/status:
 *   put:
 *     tags: [Dispute Letters]
 *     summary: Update dispute letter status
 *     security:
 *       - bearerAuth: []
 *     description: Update the status of a specific dispute letter
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Dispute letter ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [draft, sent, received, resolved, rejected]
 *                 description: New status of the dispute letter
 *     responses:
 *       200:
 *         description: Status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/DisputeLetter'
 *       404:
 *         description: Dispute letter not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put('/:id/status', updateDisputeLetterStatus);

/**
 * @swagger
 * /api/dispute-letters/{id}:
 *   delete:
 *     tags: [Dispute Letters]
 *     summary: Delete dispute letter
 *     security:
 *       - bearerAuth: []
 *     description: Delete a specific dispute letter
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Dispute letter ID
 *     responses:
 *       200:
 *         description: Dispute letter deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Dispute letter deleted successfully
 *       404:
 *         description: Dispute letter not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/:id', deleteDisputeLetter);

module.exports = router;

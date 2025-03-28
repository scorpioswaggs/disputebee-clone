const express = require('express');
const router = express.Router();
const { 
  uploadCreditReport,
  getCreditReports,
  getCreditReportById,
  analyzeCreditReport,
  deleteCreditReport
} = require('../controllers/creditReportController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// All routes are protected (require authentication)
router.use(protect);

/**
 * @swagger
 * /api/credit-reports/upload:
 *   post:
 *     tags: [Credit Reports]
 *     summary: Upload a new credit report
 *     security:
 *       - bearerAuth: []
 *     description: Upload a credit report file for analysis
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - reportFile
 *             properties:
 *               reportFile:
 *                 type: string
 *                 format: binary
 *                 description: The credit report file to upload (PDF format)
 *     responses:
 *       201:
 *         description: Credit report uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     filename:
 *                       type: string
 *                     uploadDate:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Invalid file format or upload error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/upload', upload.single('reportFile'), uploadCreditReport);

/**
 * @swagger
 * /api/credit-reports:
 *   get:
 *     tags: [Credit Reports]
 *     summary: Get all credit reports
 *     security:
 *       - bearerAuth: []
 *     description: Retrieve all credit reports for the authenticated user
 *     responses:
 *       200:
 *         description: List of credit reports
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
 *                   description: Number of credit reports
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       filename:
 *                         type: string
 *                       uploadDate:
 *                         type: string
 *                         format: date-time
 *                       status:
 *                         type: string
 *                         enum: [pending, analyzed, error]
 */
router.get('/', getCreditReports);

/**
 * @swagger
 * /api/credit-reports/{id}:
 *   get:
 *     tags: [Credit Reports]
 *     summary: Get credit report by ID
 *     security:
 *       - bearerAuth: []
 *     description: Retrieve a specific credit report by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Credit report ID
 *     responses:
 *       200:
 *         description: Credit report details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     filename:
 *                       type: string
 *                     uploadDate:
 *                       type: string
 *                       format: date-time
 *                     status:
 *                       type: string
 *                       enum: [pending, analyzed, error]
 *                     analysis:
 *                       type: object
 *                       description: Credit report analysis results
 *       404:
 *         description: Credit report not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', getCreditReportById);

/**
 * @swagger
 * /api/credit-reports/{id}/analyze:
 *   post:
 *     tags: [Credit Reports]
 *     summary: Analyze credit report
 *     security:
 *       - bearerAuth: []
 *     description: Trigger analysis of a specific credit report
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Credit report ID
 *     responses:
 *       200:
 *         description: Analysis started successfully
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
 *                   example: Analysis started successfully
 *       404:
 *         description: Credit report not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/:id/analyze', analyzeCreditReport);

/**
 * @swagger
 * /api/credit-reports/{id}:
 *   delete:
 *     tags: [Credit Reports]
 *     summary: Delete credit report
 *     security:
 *       - bearerAuth: []
 *     description: Delete a specific credit report
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Credit report ID
 *     responses:
 *       200:
 *         description: Credit report deleted successfully
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
 *                   example: Credit report deleted successfully
 *       404:
 *         description: Credit report not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/:id', deleteCreditReport);

module.exports = router;

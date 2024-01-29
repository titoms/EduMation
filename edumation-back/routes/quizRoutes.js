const express = require('express');
const { body, validationResult, param } = require('express-validator');
const router = express.Router();
const quizController = require('../controllers/quizController');
const validation = require('../middlewares/validationMiddleware');
const verifyToken = require('../middlewares/verifyToken');

// Get all quizzes
router.get('/', verifyToken, quizController.getAllQuizz);

// Create a new quiz
router.post(
  '/',
  verifyToken,
  validation.createQuizValidation,
  quizController.createQuizz
);

// Get a specific quiz
router.get('/:id', verifyToken, quizController.getOneQuizz);

// Update a quiz
router.put(
  '/:id',
  verifyToken,
  validation.updateQuizValidation,
  quizController.updateQuizz
);

// Delete a quiz
router.delete('/:id', verifyToken, verifyToken, quizController.updateQuizz);

module.exports = router;

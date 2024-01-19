const express = require('express');
const { body, validationResult, param } = require('express-validator');
const router = express.Router();
const Quiz = require('../models/quiz');
const verifyToken = require('../middlewares/verifyToken');

// Get all quizzes
router.get('/', async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new quiz
router.post(
  '/',
  [
    body('courseId').isMongoId().withMessage('Invalid course ID'),
    body('title').trim().not().isEmpty().withMessage('Title is required'),
    body('questions').isArray().withMessage('Questions must be an array'),
    body('timeLimit').isNumeric().withMessage('Time limit must be a number'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newQuiz = new Quiz({
        courseId: req.body.courseId,
        title: req.body.title,
        questions: req.body.questions,
        timeLimit: req.body.timeLimit,
      });
      const savedQuiz = await newQuiz.save();
      res.status(201).json(savedQuiz);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

// Get a specific quiz
router.get('/:id', async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).send('Quiz not found.');
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a quiz
router.put(
  '/:id',
  [
    param('id').isMongoId().withMessage('Invalid quiz ID'),
    body('title').optional().trim(),
    body('questions').optional().isArray(),
    body('timeLimit').optional().isNumeric(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const updatedQuiz = await Quiz.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedQuiz) return res.status(404).send('Quiz not found.');
      res.json(updatedQuiz);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// Delete a quiz
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndDelete(req.params.id);
    if (!quiz) return res.status(404).send('Quiz not found.');
    res.json({ message: 'Quiz successfully deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

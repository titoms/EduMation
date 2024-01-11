const express = require('express');
const { body, validationResult, param } = require('express-validator');
const router = express.Router();
const Course = require('../models/course');
const verifyToken = require('../middlewares/verifyToken');

// Get all courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new course
router.post(
  '/',
  verifyToken,
  [
    body('title').trim().not().isEmpty().withMessage('Title is required'),
    body('description').trim().optional(),
    body('schoolId').isMongoId().withMessage('Invalid school ID'),
    body('teacherId').isMongoId().withMessage('Invalid teacher ID'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newCourse = new Course({
        title: req.body.title,
        description: req.body.description,
        schoolId: req.body.schoolId,
        teacherId: req.body.teacherId,
      });
      const savedCourse = await newCourse.save();
      res.status(201).json(savedCourse);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

// Get a specific course
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).send('Course not found.');
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a course
router.put(
  '/:id',
  verifyToken,
  [
    param('id').isMongoId().withMessage('Invalid course ID'),
    body('title').optional().trim(),
    body('description').optional().trim(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const updatedCourse = await Course.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedCourse) return res.status(404).send('Course not found.');
      res.json(updatedCourse);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// Delete a course
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).send('Course not found.');
    res.json({ message: 'Course successfully deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

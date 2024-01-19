const express = require('express');
const { body, validationResult, param } = require('express-validator');
const router = express.Router();
const Schedule = require('../models/schedule');
const verifyToken = require('../middlewares/verifyToken');

// Get all schedules
router.get('/', verifyToken, async (req, res) => {
  try {
    const schedules = await Schedule.find();
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new schedule
router.post(
  '/',
  verifyToken,
  [
    body('courseId').isMongoId().withMessage('Invalid course ID'),
    body('classTimes').isArray().withMessage('Class times must be an array'),
    body('recurring').isBoolean().optional(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newSchedule = new Schedule({
        courseId: req.body.courseId,
        classTimes: req.body.classTimes,
        recurring: req.body.recurring,
      });
      const savedSchedule = await newSchedule.save();
      res.status(201).json(savedSchedule);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

// Get a specific schedule
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const schedule = await Schedule.findById(req.params.id);
    if (!schedule) return res.status(404).send('Schedule not found.');
    res.json(schedule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a schedule
router.put(
  '/:id',
  verifyToken,
  [
    param('id').isMongoId().withMessage('Invalid schedule ID'),
    body('classTimes').optional().isArray(),
    body('recurring').optional().isBoolean(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const updatedSchedule = await Schedule.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedSchedule) return res.status(404).send('Schedule not found.');
      res.json(updatedSchedule);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// Delete a schedule
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const schedule = await Schedule.findByIdAndDelete(req.params.id);
    if (!schedule) return res.status(404).send('Schedule not found.');
    res.json({ message: 'Schedule successfully deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

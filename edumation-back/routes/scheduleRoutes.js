const express = require('express');
const { body, validationResult, param } = require('express-validator');
const router = express.Router();
const Schedule = require('../models/schedule');
const scheduleController = require('../controllers/scheduleController');
const validation = require('../middlewares/validationMiddleware');
const verifyToken = require('../middlewares/verifyToken');

// Get all schedules
router.get('/', verifyToken, scheduleController.getAllSchedules);

// Create a new schedule
router.post(
  '/',
  verifyToken,
  validation.createScheduleValidation,
  scheduleController.createSchedule
);

// Get a specific schedule
router.get('/:id', verifyToken, scheduleController.getOneSchedule);

// Update a schedule
router.put(
  '/:id',
  verifyToken,
  validation.updateScheduleValidation,
  scheduleController.updateSchedule
);

// Delete a schedule
router.delete('/:id', verifyToken, scheduleController.deleteSchedule);

module.exports = router;

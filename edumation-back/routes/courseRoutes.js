const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const validation = require('../middlewares/validationMiddleware');
const courseController = require('../controllers/courseController');

// Get all courses
router.get('/', verifyToken, courseController.getAllCourses);

// Create a new course
router.post(
  '/',
  verifyToken,
  validation.createCourseValidation,
  courseController.createCourse
);

// Get a specific course
router.get(
  '/:id',
  verifyToken,
  validation.isMongoId('id'),
  courseController.getOneCourse
);

// Update a course
router.put(
  '/:id',
  verifyToken,
  validation.isMongoId('id'),
  validation.updateCourseValidation,
  courseController.updateCourse
);

// Delete a course
router.delete(
  '/:id',
  verifyToken,
  validation.isMongoId('id'),
  courseController.deleteCourse
);

module.exports = router;

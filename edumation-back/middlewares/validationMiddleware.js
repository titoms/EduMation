// validationMiddleware.js
const { body, validationResult, param } = require('express-validator');

const registerValidation = [
  body('name').trim().not().isEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Invalid email address'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('role').not().isEmpty().withMessage('Role is required'),
];

const loginValidation = [
  body('email').isEmail().withMessage('Invalid email address'),
  body('password').not().isEmpty().withMessage('Password is required'),
];

const updateUserValidation = [
  param('id').isMongoId().withMessage('Invalid user ID'),
  body('name')
    .optional()
    .trim()
    .not()
    .isEmpty()
    .withMessage('Name cannot be empty'),
  body('email').optional().isEmail().withMessage('Invalid email address'),
  body('password')
    .optional()
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('role').optional().not().isEmpty().withMessage('Role is required'),
];

const createCourseValidation = [
  body('title').trim().not().isEmpty().withMessage('Title is required'),
  body('description').trim().optional(),
];

const updateCourseValidation = [
  body('title').optional().trim(),
  body('description').optional().trim(),
];

const createGroupValidation = [
  body('name').trim().not().isEmpty().withMessage('Name is required'),
  body('studentsIds').isArray().withMessage('User IDs must be an array'),
];

const updateGroupValidation = [
  param('id').isMongoId().withMessage('Invalid group ID'),
  body('name').optional().trim(),
  body('studentsIds')
    .optional()
    .isArray()
    .withMessage('User IDs must be an array'),
];

const createQuizValidation = [
  body('title').trim().not().isEmpty().withMessage('Title is required'),
  body('description')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Description is required'),
  body('questions').isArray().withMessage('Questions must be an array'),
];

const updateQuizValidation = [
  param('id').isMongoId().withMessage('Invalid quiz ID'),
  body('title').optional().trim(),
  body('questions').optional().isArray(),
  body('timeLimit').optional().isNumeric(),
];

const createScheduleValidation = [
  body('events').optional().isArray().withMessage('Events must be an array'),
  body('recurring').isBoolean().optional(),
];

const updateScheduleValidation = [
  param('id').isMongoId().withMessage('Invalid schedule ID'),
  body('events').optional().isArray(),
  body('recurring').optional().isBoolean(),
];

const isMongoId = (paramName) => {
  return param(paramName).isMongoId().withMessage('Invalid ID format');
};

const checkValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  registerValidation,
  loginValidation,
  updateUserValidation,
  createCourseValidation,
  updateCourseValidation,
  createGroupValidation,
  updateGroupValidation,
  createQuizValidation,
  updateQuizValidation,
  createScheduleValidation,
  updateScheduleValidation,
  checkValidation,
  isMongoId,
};

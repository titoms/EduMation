const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const verifyToken = require('../middlewares/verifyToken');
const { body, validationResult, param } = require('express-validator');

const saltRounds = 10;

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    if (!res.headersSent) {
      res.status(500).json({ message: error.message });
    }
  }
});

// User registration
router.post(
  '/register',
  [
    body('name').trim().not().isEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
    body('role').not().isEmpty().withMessage('Role is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        passwordHash: hashedPassword,
        role: req.body.role,
        schoolId: req.body.schoolId,
      });
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (error) {
      if (!res.headersSent) {
        res.status(400).json({ message: error.message });
      }
    }
  }
);

// User login
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').not().isEmpty().withMessage('Password is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) return res.status(400).send('User not found.');

      const validPassword = await bcrypt.compare(
        req.body.password,
        user.passwordHash
      );
      if (!validPassword) return res.status(400).send('Invalid password.');

      const token = jwt.sign(
        { _id: user._id, role: user.role },
        process.env.JWT_SECRET
      );
      res.header('auth-token', token).send(token);
    } catch (error) {
      if (!res.headersSent) {
        res.status(500).json({ message: error.message });
      }
    }
  }
);

// Get ONE User
router.get(
  '/:id',
  [param('id').isMongoId().withMessage('Invalid user ID')],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).send('User not found.');
      res.json(user);
    } catch (error) {
      if (!res.headersSent) {
        res.status(500).json({ message: error.message });
      }
    }
  }
);

// Update User
router.put(
  '/:id',
  [
    param('id').isMongoId().withMessage('Invalid user ID'),
    body('name').optional().trim(),
    body('email').optional().isEmail().withMessage('Invalid email address'),
    body('password')
      .optional()
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
  ],
  verifyToken,
  async (req, res) => {
    return res.status(200).json('Update successful');
  }
);

// Delete User
router.delete(
  '/:id',
  verifyToken,
  [param('id').isMongoId().withMessage('Invalid user ID')],
  async (req, res) => {
    return res.status(200).json('Delete successful');
  }
);

module.exports = router;

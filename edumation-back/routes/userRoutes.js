const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const verifyToken = require('../middlewares/verifyToken');
const { body, validationResult, param } = require('express-validator');
const saltRounds = 10;

const s3Upload = require('../middlewares/s3UploadFile');
const upload = s3Upload.single('profileImage');

// Get all users
router.get('/', verifyToken, async (req, res) => {
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
  upload,
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
      const file = req.file;
      const imageUrl = file ? file.location : '';
      const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        profileImage: imageUrl,
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
  verifyToken,
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
  verifyToken,
  upload,
  [
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
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const updateData = req.body;
      if (req.file) {
        updateData.profileImage = req.file.location; // Update with new image URL
      }
      if (updateData.password) {
        updateData.passwordHash = await bcrypt.hash(
          updateData.password,
          saltRounds
        );
        delete updateData.password;
      }

      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(updatedUser);
    } catch (error) {
      if (!res.headersSent) {
        res.status(500).json({ message: error.message });
      }
    }
  }
);

// Delete User
router.delete(
  '/:id',
  verifyToken,
  [param('id').isMongoId().withMessage('Invalid user ID')],
  async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      if (!res.headersSent) {
        res.status(500).json({ message: error.message });
      }
    }
  }
);

module.exports = router;

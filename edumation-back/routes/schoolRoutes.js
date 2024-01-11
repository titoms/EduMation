const express = require('express');
const router = express.Router();
const School = require('../models/school');
const verifyToken = require('../middlewares/verifyToken');
const { body, validationResult, param } = require('express-validator');

// Get all schools
router.get('/', async (req, res) => {
  try {
    const schools = await School.find();
    res.json(schools);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new school
router.post(
  '/',
  verifyToken,
  [
    body('name').trim().not().isEmpty().withMessage('Name is required'),
    body('address').trim().not().isEmpty().withMessage('Address is required'),
    body('adminId').isMongoId().withMessage('Invalid admin ID'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    if (req.user.role !== 'admin') {
      return res
        .status(403)
        .send('Access Denied: Only admins can perform this action');
    }
    try {
      const newSchool = new School({
        name: req.body.name,
        address: req.body.address,
        contactInfo: req.body.contactInfo,
        adminId: req.body.adminId,
      });
      const savedSchool = await newSchool.save();
      res.status(201).json(savedSchool);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

// Get a specific school
router.get(
  '/:id',
  [param('id').isMongoId().withMessage('Invalid school ID')],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const school = await School.findById(req.params.id);
      if (!school) return res.status(404).send('School not found.');
      res.json(school);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// Update a school
router.put(
  '/:id',
  verifyToken,
  [
    param('id').isMongoId().withMessage('Invalid school ID'),
    body('name').optional().trim(),
    body('address').optional().trim(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const updatedSchool = await School.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedSchool) return res.status(404).send('School not found.');
      res.json(updatedSchool);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// Delete a school
router.delete(
  '/:id',
  verifyToken,
  [param('id').isMongoId().withMessage('Invalid school ID')],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const school = await School.findByIdAndDelete(req.params.id);
      if (!school) return res.status(404).send('School not found.');
      res.json({ message: 'School successfully deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

module.exports = router;

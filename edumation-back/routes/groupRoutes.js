const express = require('express');
const { body, validationResult, param } = require('express-validator');
const router = express.Router();
const group = require('../models/group');
const verifyToken = require('../middlewares/verifyToken');

// Get all groups
router.get('/', async (req, res) => {
  try {
    const groups = await group.find();
    res.json(groups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new group
router.post(
  '/',
  verifyToken,
  [
    body('name').trim().not().isEmpty().withMessage('Name is required'),
    body('schoolId').isMongoId().withMessage('Invalid school ID'),
    body('teacherId').isMongoId().withMessage('Invalid teacher ID'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const newgroup = new group({
        name: req.body.name,
        schoolId: req.body.schoolId,
        teacherId: req.body.teacherId,
      });
      const savedgroup = await newgroup.save();
      res.status(201).json(savedgroup);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

// Get a specific group
router.get('/:id', async (req, res) => {
  try {
    const group = await group.findById(req.params.id);
    if (!group) return res.status(404).send('Group not found.');
    res.json(group);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a group
router.put(
  '/:id',
  verifyToken,
  [
    param('id').isMongoId().withMessage('Invalid group ID'),
    body('name').optional().trim(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const updatedgroup = await group.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedgroup) return res.status(404).send('Group not found.');
      res.json(updatedgroup);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// Delete a group
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const group = await group.findByIdAndDelete(req.params.id);
    if (!group) return res.status(404).send('Group not found.');
    res.json({ message: 'Group successfully deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

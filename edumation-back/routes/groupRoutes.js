const express = require('express');
const { body, validationResult, param } = require('express-validator');
const Group = require('../models/group');
const verifyToken = require('../middlewares/verifyToken');
const router = express.Router();

// Get all groups
router.get('/', async (req, res) => {
  try {
    const groups = await Group.find().populate('studentsIds');
    res.json(groups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new group
router.post(
  '/',
  [
    body('name').trim().not().isEmpty().withMessage('Name is required'),
    body('schoolId').isMongoId().withMessage('Invalid school ID'),
    body('studentsIds').isArray().withMessage('User IDs must be an array'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      console.log(req.body.userIds);
      const newGroup = new Group({
        name: req.body.name,
        schoolId: req.body.schoolId,
        studentsIds: req.body.studentsIds,
      });
      const savedGroup = await newGroup.save();
      const populatedGroup = await Group.findById(savedGroup._id).populate(
        'studentsIds'
      );
      res.status(201).json(populatedGroup);
    } catch (error) {
      if (!res.headersSent) {
        res.status(500).json({ message: error.message });
      }
    }
  }
);

// Get a specific group
router.get('/:id', async (req, res) => {
  try {
    const group = await Group.findById(req.params.id).populate('studentsIds');
    if (!group) return res.status(404).send('Group not found.');
    res.json(group);
  } catch (error) {
    if (!res.headersSent) {
      res.status(500).json({ message: error.message });
    }
  }
});

// Update a group
router.put(
  '/:id',
  verifyToken,
  [
    param('id').isMongoId().withMessage('Invalid group ID'),
    body('name').optional().trim(),
    body('studentsIds')
      .optional()
      .isArray()
      .withMessage('User IDs must be an array'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const updateData = req.body;
      const updatedGroup = await Group.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
      );
      if (!updatedGroup) return res.status(404).send('Group not found.');
      res.json(updatedGroup);
    } catch (error) {
      if (!res.headersSent) {
        res.status(500).json({ message: error.message });
      }
    }
  }
);

// Delete a group
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const deletedGroup = await Group.findByIdAndDelete(req.params.id);
    if (!deletedGroup) return res.status(404).send('Group not found.');
    res.json({ message: 'Group successfully deleted' });
  } catch (error) {
    if (!res.headersSent) {
      res.status(500).json({ message: error.message });
    }
  }
});

module.exports = router;

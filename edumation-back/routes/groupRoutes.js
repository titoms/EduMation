const express = require('express');
const { body, validationResult, param } = require('express-validator');
const Group = require('../models/group');
const groupController = require('../controllers/groupController');
const verifyToken = require('../middlewares/verifyToken');
const validation = require('../middlewares/validationMiddleware');
const router = express.Router();

// Get all groups
router.get('/', verifyToken, groupController.getAllGroups);

// Get a specific group
router.get('/:id', verifyToken, groupController.getOneGroup);

// Create a new group
router.post(
  '/',
  verifyToken,
  validation.createGroupValidation,
  groupController.createGroup
);

// Update a group
router.put(
  '/:id',
  verifyToken,
  validation.updateGroupValidation,
  groupController.updateGroup
);

// Delete a group
router.delete('/:id', verifyToken, groupController.deleteGroup);

module.exports = router;

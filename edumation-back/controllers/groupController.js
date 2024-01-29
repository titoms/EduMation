// GroupController.js
const Group = require('../models/group');
const { validationResult } = require('express-validator');

exports.getAllGroups = async (req, res) => {
  try {
    const groups = await Group.find().populate('studentsIds');
    res.json(groups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOneGroup = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id).populate('studentsIds');
    if (!group) return res.status(404).send('Group not found.');
    res.json(group);
  } catch (error) {
    if (!res.headersSent) {
      res.status(500).json({ message: error.message });
    }
  }
};

exports.createGroup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const newGroup = new Group({
      name: req.body.name,
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
};

exports.updateGroup = async (req, res) => {
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
};

exports.deleteGroup = async (req, res) => {
  try {
    const deletedGroup = await Group.findByIdAndDelete(req.params.id);
    console.log(deletedGroup);

    if (!deletedGroup) return res.status(404).send('Group not found.');
    res.json({ message: 'Group successfully deleted' });
  } catch (error) {
    if (!res.headersSent) {
      res.status(500).json({ message: error.message });
    }
  }
};

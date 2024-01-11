const express = require('express');
const School = require('../models/School');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');

// Get all schools
router.get('/', async (req, res) => {
  try {
    const schools = await School.find();
    res.json(schools);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new school (restricted to certain user roles if needed)
router.post('/', verifyToken, async (req, res) => {
  const school = new School({
    name: req.body.name,
    address: req.body.address,
    contactInfo: req.body.contactInfo,
  });

  try {
    const newSchool = await school.save();
    res.status(201).json(newSchool);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get a single school by id
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const school = await School.findById(req.params.id);
    if (!school) return res.status(404).json({ message: 'School not found' });
    res.json(school);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a school by id
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const updatedSchool = await School.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedSchool)
      return res.status(404).json({ message: 'School not found' });
    res.json(updatedSchool);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a school by id
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const school = await School.findByIdAndDelete(req.params.id);
    if (!school) return res.status(404).json({ message: 'School not found' });
    res.json({ message: 'School deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

const express = require('express');
const School = require('../models/school');
const schoolController = require('../controllers/schoolController');
const verifyToken = require('../middlewares/verifyToken');
const router = express.Router();

// Get all schools
router.get('/', verifyToken, schoolController.getAllSchools);

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
router.get('/:id', verifyToken, schoolController.getOneSchool);

// Update a school by id
router.put('/:id', verifyToken, schoolController.updateSchool);

// Delete a school by id
router.delete('/:id', verifyToken, schoolController.deleteSchool);

module.exports = router;

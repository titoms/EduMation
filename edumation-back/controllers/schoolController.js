// SchoolController.js
const School = require('../models/school');

exports.getAllSchools = async (req, res) => {
  try {
    const schools = await School.find();
    res.json(schools);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createSchool = async (req, res) => {
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
};

exports.getOneSchool = async (req, res) => {
  try {
    const school = await School.findById(req.params.id);
    if (!school) return res.status(404).json({ message: 'School not found' });
    res.json(school);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateSchool = async (req, res) => {
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
};

exports.deleteSchool = async (req, res) => {
  try {
    const school = await School.findByIdAndDelete(req.params.id);
    if (!school) return res.status(404).json({ message: 'School not found' });
    res.json({ message: 'School deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

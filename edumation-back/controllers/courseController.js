// CourseController.js
const Course = require('../models/course');
const { validationResult } = require('express-validator');

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createCourse = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // A TESTER
  // if (req.user.role !== 'school' || req.user.role === 'admin') {
  //   return res
  //     .status(403)
  //     .send('Access Denied: Only school users can create courses');
  // }
  // if (req.user.schoolId !== req.body.schoolId) {
  //   return res
  //     .status(403)
  //     .send('Access Denied: You can only create courses for your own school');
  // }
  try {
    const newCourse = new Course({
      title: req.body.title,
      description: req.body.description,
      courseDuration: req.body.courseDuration,
      schoolId: req.body.schoolId,
      teacherId: req.body.teacherId,
    });
    const savedCourse = await newCourse.save();
    res.status(201).json(savedCourse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getOneCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).send('Course not found.');
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateCourse = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedCourse) return res.status(404).send('Course not found.');
    res.json(updatedCourse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).send('Course not found.');
    res.json({ message: 'Course successfully deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

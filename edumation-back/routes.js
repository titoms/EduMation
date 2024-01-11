const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('./models/user');
const saltRounds = 10;

// const getUsers = (req, res) => res.send('Get Users');
// const createUser = (req, res) => res.send('Create User');
router.get('/', (req, res) => res.send('Welcome to the API'));

router.get('/users/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/users/register', async (req, res) => {
  console.log(req.body);
  try {
    // const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      passwordHash: req.body.password,
      role: req.body.role,
      schoolId: req.body.schoolId,
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post('/users/login', (req, res) => res.send('User Login'));
router.get('/users/:id', (req, res) => res.send('Get User Details'));
router.put('/users/:id', (req, res) => res.send('Update User'));
router.delete('/users/:id', (req, res) => res.send('Delete User'));

// Schools API Routes
router.post('/schools', (req, res) => res.send('Create School'));
router.get('/schools/:id', (req, res) => res.send('Get School Details'));
router.put('/schools/:id', (req, res) => res.send('Update School'));
router.delete('/schools/:id', (req, res) => res.send('Delete School'));

// Courses API Routes
router.post('/courses', (req, res) => res.send('Create Course'));
router.get('/courses/:id', (req, res) => res.send('Get Course Details'));
router.put('/courses/:id', (req, res) => res.send('Update Course'));
router.delete('/courses/:id', (req, res) => res.send('Delete Course'));

// Quizzes API Routes
router.post('/quizzes', (req, res) => res.send('Create Quiz'));
router.get('/quizzes/:id', (req, res) => res.send('Get Quiz Details'));
router.put('/quizzes/:id', (req, res) => res.send('Update Quiz'));
router.delete('/quizzes/:id', (req, res) => res.send('Delete Quiz'));

// Schedules API Routes
router.post('/schedules', (req, res) => res.send('Create Schedule'));
router.get('/schedules/:id', (req, res) => res.send('Get Schedule Details'));
router.put('/schedules/:id', (req, res) => res.send('Update Schedule'));
router.delete('/schedules/:id', (req, res) => res.send('Delete Schedule'));

module.exports = router;

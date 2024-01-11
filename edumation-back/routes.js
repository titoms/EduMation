const express = require('express');
const userRoutes = require('./routes/userRoutes');
const schoolRoutes = require('./routes/schoolRoutes');
const router = express.Router();

// Welcome message
router.get('/', (req, res) => res.send('Welcome to the API'));

router.use('/users', userRoutes);
router.use('/schools', schoolRoutes);

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

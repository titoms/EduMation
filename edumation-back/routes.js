const express = require('express');
const userRoutes = require('./routes/userRoutes');
const schoolRoutes = require('./routes/schoolRoutes');
const courseRoutes = require('./routes/courseRoutes');
const quizRoutes = require('./routes/quizRoutes');
const scheduleRoutes = require('./routes/scheduleRoutes');
const groupRoutes = require('./routes/groupRoutes');

const router = express.Router();

// Welcome message
router.get('/', (req, res) => res.send('Welcome to the API'));

router.use('/users', userRoutes);
router.use('/schools', schoolRoutes);
router.use('/courses', courseRoutes);
router.use('/groups', groupRoutes);
router.use('/quizz', quizRoutes);
router.use('/schedules', scheduleRoutes);
router.use('/groups', groupRoutes);
module.exports = router;

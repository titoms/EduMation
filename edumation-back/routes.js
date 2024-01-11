const express = require('express');
const userRoutes = require('./routes/userRoutes');
const courseRoutes = require('./routes/courseRoutes');
const groupRoutes = require('./routes/groupRoutes');
const quizRoutes = require('./routes/quizRoutes');
const scheduleRoutes = require('./routes/scheduleRoutes');

const router = express.Router();

// Welcome message
router.get('/', (req, res) => res.send('Welcome to the API'));

router.use('/users', userRoutes);
router.use('/courses', courseRoutes);
router.use('/groups', groupRoutes);
router.use('/quizz', quizRoutes);
router.use('/schedules', scheduleRoutes);

module.exports = router;

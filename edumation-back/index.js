const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');
require('dotenv').config();

const app = express();

// Middlewares
app.use(express.json());
express.urlencoded({ extended: true });
app.use(cors());

// Test Route
app.get('/', (req, res) => {
  res.send('Welcome to EduMation API');
});
app.use('/api', routes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB', err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

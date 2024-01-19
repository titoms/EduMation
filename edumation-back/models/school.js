const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    address: String,
    contactInfo: {
      phone: String,
      email: {
        type: String,
        trim: true,
      },
      website: String,
    },
  },
  { timestamps: true }
);

const School = mongoose.model('School', schoolSchema);

module.exports = School;

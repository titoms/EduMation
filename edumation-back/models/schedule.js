const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema(
  {
    courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
      },
    ],
    linkedUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    classTime: [
      {
        type: Date,
      },
    ],
    scheduleType: {
      type: String,
    },
  },
  { timestamps: true }
);

const Schedule = mongoose.model('Schedule', scheduleSchema);
module.exports = Schedule;

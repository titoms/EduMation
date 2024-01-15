const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    classTimes: [
      {
        date: Date,
        startTime: String,
        endTime: String,
        location: String,
      },
    ],
    recurring: Boolean,
    creationDate: {
      type: Date,
      default: Date.now,
    },
    updateDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Schedule = mongoose.model('Schedule', scheduleSchema);
module.exports = Schedule;

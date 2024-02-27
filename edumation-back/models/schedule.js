const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema(
  {
    linkedUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    events: [
      {
        course: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Course',
        },
        start: { type: Date },
        end: { type: Date },
        title: { type: String },
        location: { type: String },
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

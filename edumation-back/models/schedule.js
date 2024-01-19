const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema(
  {
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Group',
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
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

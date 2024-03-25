const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    questions: [
      {
        questionText: String,
        options: [String],
        correctAnswer: Number,
      },
    ],
    finalScore: Number,
    timeLimit: Number,
  },
  { timestamps: true }
);

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;

const mongoose = require('mongoose');

// Comment schema
const commentSchema = new mongoose.Schema({
  solutionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Solution', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Comment = mongoose.model('Comment', commentSchema);

const solutionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  titleSlug: String,
  solution: String,
  language: String,
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment', default:[] }]
}, {
  timestamps: true
});


const Solution = mongoose.model('Solution', solutionSchema);

module.exports = { Solution, Comment };

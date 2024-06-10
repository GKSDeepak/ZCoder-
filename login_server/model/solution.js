const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  text: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const solutionSchema = new mongoose.Schema({
  username:String,
  titleSlug: String,
  solution: String,
  language: String,
  comments: [{ type: String }]
},{
  timestamps:true
},{
  comments: [commentSchema],
});

const Solution = mongoose.model('Solution', solutionSchema);

module.exports = Solution;

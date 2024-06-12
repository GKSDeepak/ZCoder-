const { Solution, Comment } = require('../model/solution');

const postSolution = async (req, res) => {
  const { titleSlug, solution, language, userId } = req.body;
  try {
    const newSolution = new Solution({ userId, titleSlug, solution, language });
    if (newSolution.solution) {
      await newSolution.save();
      res.status(201).json({ msg: 'Solution posted successfully' });
    } else {
      res.status(300).json({ msg: 'Nothing is posted' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getSolutionsByTitleSlug = async (req, res) => {
  const { titleSlug } = req.params;
  try {
    const solutions = await Solution.find({ titleSlug }).populate('userId').populate('comments');
    res.status(200).json(solutions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const addComment = async (req, res) => {
  try {
    const { solutionId } = req.params;
    const { content, userId } = req.body;
    const newComment = new Comment({
      solutionId,
      userId,
      content
    });
    const savedComment = await newComment.save();
    await Solution.findByIdAndUpdate(solutionId, { $push: { comments: savedComment._id } });
    res.status(201).json(savedComment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add comment' });
  }
};

const getComments = async (req, res) => {
  try {
    const { solutionId } = req.params;
    const comments = await Comment.find({ solutionId });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get comments' });
  }
};

module.exports = { postSolution, getSolutionsByTitleSlug, addComment, getComments };

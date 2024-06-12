const express = require('express');
const { postSolution, getSolutionsByTitleSlug, addComment, getComments } = require('../controllers/solutionController');

const router = express.Router();

router.post('/solutions', postSolution);
router.get('/solutions/:titleSlug', getSolutionsByTitleSlug);

// Add a comment to a solution
router.post('/comments/:solutionId', addComment);

// Get comments for a solution
router.get('/comments/:solutionId', getComments);

module.exports = router;

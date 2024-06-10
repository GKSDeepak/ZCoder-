const express = require('express');
const { postSolution, getSolutionsByTitleSlug } = require('../controllers/solutionController');

const router = express.Router();

router.post('/solutions', postSolution);
router.get('/solutions/:titleSlug',getSolutionsByTitleSlug);
module.exports = router;

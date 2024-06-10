// const Solution = require('../model/solution');

// const postSolution = async (req, res) => {
//   let { titleSlug, solution, language } = req.body;
//   try {
//     const newSolution = new Solution({ titleSlug, solution, language });
//     await newSolution.save();
//     //res.status(201).send('Solution posted successfully');
//     return res.json({
//       msg:'done'
//     })
//   } catch (error) {
//     return res.json({
//       error:error.message
//     })
//     //res.status(500).send('Error posting solution');
//   }
// };

// module.exports = postSolution









const Solution = require('../model/solution');

const postSolution = async (req, res) => {
  const { titleSlug, solution, language } = req.body;
  try {
    const newSolution = new Solution({ titleSlug, solution, language});
    if(newSolution.solution){
      await newSolution.save();
      res.status(201).json({ msg: 'Solution posted successfully' });
    }else{
      res.status(300).json({msg:'Nothing is posted'})
    }
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getSolutionsByTitleSlug = async (req, res) => {
  const { titleSlug } = req.params;
  try {
    const solutions = await Solution.find({ titleSlug });
    res.status(200).json(solutions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { postSolution,getSolutionsByTitleSlug };

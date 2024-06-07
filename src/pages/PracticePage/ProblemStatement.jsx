import React from 'react'
import { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './ProblemStatement.css'

const ProblemStatement = () => {
  const { titleSlug } = useParams();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProblemStatement = async () => {
      try {
        const response = await fetch(`https://alfa-leetcode-api.onrender.com/select?titleSlug=${titleSlug}`);
        const data = await response.json();
        console.log(data.solution);
        setProblem(data);
      } catch (error) {
        setError('Failed to fetch problem statement');
      } finally {
        setLoading(false);
      }
    };
    fetchProblemStatement();
  }, [titleSlug]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  return (
    <div className='problemStatement'>
      <div className="questionStatement" dangerouslySetInnerHTML={{ __html: problem.question }} />
    <div className="questionStatements"  dangerouslySetInnerHTML={{ __html: problem.hints }}/>

      {/* {problem.question} */}
    </div>
  )
}

export default ProblemStatement

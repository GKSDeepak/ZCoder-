import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism';
import styles from './ProblemStatement.module.css'
import { IoIosArrowDown,IoIosArrowUp } from "react-icons/io";

const ProblemStatement = () => {
  const { titleSlug } = useParams();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [solution, setSolution] = useState('');
  const [language, setLanguage] = useState('javascript'); // State to track selected language
  const [solutions, setSolutions] = useState([]);
  const [showSolutions, setShowSolutions] = useState(false);
  const [activeSolution, setActiveSolution] = useState(null);
  const [comments, setComments] = useState({});
  const [commentInput, setCommentInput] = useState('');

  useEffect(() => {
    const fetchProblemStatement = async () => {
      try {
        const response = await fetch(`https://alfa-leetcode-api.onrender.com/select?titleSlug=${titleSlug}`);
        const data = await response.json();
        setProblem(data);
      } catch (error) {
        setError('Failed to fetch problem statement');
      } finally {
        setLoading(false);
      }
    };
    fetchProblemStatement();
  }, [titleSlug]);

  const handleSolutionChange = (e) => {
    setSolution(e.target.value);
    // console.log(solution);
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };
  const handlePostSolution = async () => {
     try{
      const response = await fetch('/user/solutions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ titleSlug, solution, language}),
      });
      console.log(response);
      if (response.ok) {
        alert('Solution posted successfully');
        setSolution('');
      } 
      else {
        alert('Nothing is posted');
      }
    } 
    catch (error) {
      alert('Error posting solution');
    }
  };
  const fetchSolutions = async () => {
    if (showSolutions) {
      setShowSolutions(false);
      return;
    }
    try {
      const response = await fetch(`http://localhost:8008/user/solutions/${titleSlug}`);
      const data = await response.json();
      console.log(data);
      setSolutions(data);
      setShowSolutions(true);
    } catch (error) {
      alert('Failed to fetch solutions');
    }
  };
  const toggleSolution = (id) => {
    setActiveSolution(activeSolution === id ? null : id);
  };
  if (loading) {
    return <div className='loading'>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.problemStatementContainer}>
      <div className={styles.problemStatement}>
        <p className={styles.title}>{problem.questionTitle}</p>
        <div className={styles.questionStatement} dangerouslySetInnerHTML={{ __html: problem.question }} />
        <p>Hints</p>
        <div className={styles.questionHint} dangerouslySetInnerHTML={{ __html: problem.hints }} />
      </div>
      <div className={styles.solutionEditor}>
        <div className={styles.headers}>
          {/* select languages */}
          <select value={language} onChange={handleLanguageChange}>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
          </select>
          <button className={styles.button} onClick={handlePostSolution}>Post your solution</button>
          <button  className={`${styles.button} ${showSolutions ? styles.show : ''}`} onClick={fetchSolutions}>Solutions </button>
        </div>
        {showSolutions ? (
          <div className={styles.solutionsList}>
            {solutions.map((sol) => (
              <div key={sol._id} className={styles.solutionItem}>
                <div className={styles.solutionHeader} onClick={() => toggleSolution(sol._id)}>
                  <p><strong>Language used:</strong> {sol.language}</p>
                  <p>Posted by:Devabhi</p>
                  <p><strong>Posted at:</strong> {new Date(sol.createdAt).toLocaleString()}</p>
                  {activeSolution === sol._id ? <IoIosArrowDown className={styles.icon}/> : <IoIosArrowUp className={styles.icon} /> }
                </div>  
                <div className={`${styles.solutionContent} ${activeSolution === sol._id ? styles.show : ''}`}>
                  <SyntaxHighlighter language={sol.language} style={okaidia} >
                    {sol.solution}
                  </SyntaxHighlighter>
                </div>   
              </div>
            ))}
          </div>
        ) : (
          <textarea 
            className={styles.solutionInput} 
            value={solution} 
            onChange={handleSolutionChange} 
            placeholder="Write your solution here..."
            spellCheck={false}
          />
        )}
      </div>
    </div>
  );
}

export default ProblemStatement;

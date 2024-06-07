import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Questions.css'

const Questions = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 40; // Number of questions to display per page

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await fetch(`https://alfa-leetcode-api.onrender.com/problems?limit=${10}`);
        const data = await response.json();
        // console.log(data);
        // console.log(data.problemsetQuestionList);
        setProblems(data.problemsetQuestionList);
      } catch (error) {
        setError('Failed to fetch problems');
      } 
      finally {
        setLoading(false);
      }
    };
    fetchProblems();
  }, []);

  // Calculate index of the last question to display on the current page
  const indexOfLastQuestion = currentPage * questionsPerPage;
  // Calculate index of the first question to display on the current page
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  // Slice the problems array to get the questions for the current page
  const currentQuestions = problems.slice(indexOfFirstQuestion, indexOfLastQuestion);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Calculate the total number of pages
  const totalPages = Math.ceil(problems.length / questionsPerPage);

  // Determine the range of pagination buttons to display
  let startPage = 1;
  let endPage = totalPages;
  if (totalPages > 4) {
    if (currentPage <= 2) {
      endPage = 4;
    } else if (currentPage >= totalPages - 1) {
      startPage = totalPages - 3;
    } else {
      startPage = currentPage - 1;
      endPage = currentPage + 1;
    }
  }

  return (
    <div className="questions-list">
      {currentQuestions.map((problem, index) => (
        <div key={index} className="question-item">
          <Link to={`/practice/${problem.titleSlug}`} >
            {problem.title}
          </Link>
          <div className="tags">
            {problem.topicTags.map((tag, tagIndex) => (
              <span key={tagIndex} className="tag">{tag.name}</span>
            ))}
          </div>
        </div>
        
      ))}
      {/* Pagination Controls */}
      <div className="pagination">
        <button onClick={() => paginate(1)}>First</button>
        {startPage > 1 && <span>...</span>}
        {Array.from({ length: endPage - startPage + 1 }).map((_, index) => (
          <button 
            key={startPage + index} 
            onClick={() => paginate(startPage + index)}
            className={currentPage === startPage + index ? 'active' : ''}
          >
            {startPage + index}
          </button>
        ))}
        {endPage < totalPages && <span>...</span>}
        <button onClick={() => paginate(totalPages)}>Last</button>
      </div>
    </div>
  );
};

export default Questions;


// import React, { useEffect, useState } from 'react';
// import './Questions.css'

// const Questions = () => {
//     const [questions, setQuestions] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [currentPage, setCurrentPage] = useState(1);
//     const questionsPerPage = 100;

//     useEffect(() => {
//         const fetchQuestions = async () => {
//             setLoading(true);
//             try {
//                 const response = await fetch('https://alfa-leetcode-api.onrender.com/problems');
//                 const data = await response.json();
//                 setQuestions(data.prolemsetQuestionList);
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             }
//             setLoading(false);
//         };

//         fetchQuestions();
//     }, []);

//     // Get current questions
//     const indexOfLastQuestion = currentPage * questionsPerPage;
//     const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
//     const currentQuestions = questions.slice(indexOfFirstQuestion, indexOfLastQuestion);

//     // Change page
//     const paginate = (pageNumber) => setCurrentPage(pageNumber);

//     const pageNumbers = [];
//     for (let i = 1; i <= Math.ceil(questions.length / questionsPerPage); i++) {
//         pageNumbers.push(i);
//     }

//     return (
//         <div className="container">
//             <h1 className="text-primary mb-3">LeetCode Questions</h1>
//             {loading ? <p>Loading...</p> : (
//                 <ul className="list-group mb-4">
//                     {currentQuestions.map((question) => (
//                         <li key={question.id} className="list-group-item">
//                             {question.title}
//                         </li>
//                     ))}
//                 </ul>
//             )}
//             <nav>
//                 <ul className="pagination">
//                     {pageNumbers.map(number => (
//                         <li key={number} className="page-item">
//                             <a onClick={() => paginate(number)} href="!#" className="page-link">
//                                 {number}
//                             </a>
//                         </li>
//                     ))}
//                 </ul>
//             </nav>
//         </div>
//     );
// };

// export default Questions;


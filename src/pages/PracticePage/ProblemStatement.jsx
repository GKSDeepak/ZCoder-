// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';

// const Questions = () => {
//   const [problems, setProblems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const questionsPerPage = 100; // Number of questions to display per page

//   useEffect(() => {
//     const fetchProblems = async () => {
//       try {
//         const response = await fetch('https://codeforces.com/api/problemset.problems');
//         const data = await response.json();
//         if (data.status === 'OK') {
//           setProblems(data.result.problems);
//         } else {
//           setError('Failed to fetch problems');
//         }
//       } catch (error) {
//         setError('Failed to fetch problems');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProblems();
//   }, []);

//   // Calculate index of the last question to display on the current page
//   const indexOfLastQuestion = currentPage * questionsPerPage;
//   // Calculate index of the first question to display on the current page
//   const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
//   // Slice the problems array to get the questions for the current page
//   const currentQuestions = problems.slice(indexOfFirstQuestion, indexOfLastQuestion);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   // Calculate the total number of pages
//   const totalPages = Math.ceil(problems.length / questionsPerPage);

//   // Determine the range of pagination buttons to display
//   let startPage = 1;
//   let endPage = totalPages;
//   if (totalPages > 4) {
//     if (currentPage <= 2) {
//       endPage = 4;
//     } else if (currentPage >= totalPages - 1) {
//       startPage = totalPages - 3;
//     } else {
//       startPage = currentPage - 1;
//       endPage = currentPage + 1;
//     }
//   }

//   return (
//     <div className="questions-list">
//       {currentQuestions.map((problem, index) => (
//         <div key={index} className="question-item">
//           <div className="question-info">
//             <Link to={`/problem/${problem.contestId}/${problem.index}`}>
//               {problem.name}
//             </Link>
//             <span className="rating">Rating: {problem.rating}</span>
//           </div>
//           <div className="tags">
//             {problem.tags.map((tag, tagIndex) => (
//               <span key={tagIndex} className="tag">{tag}</span>
//             ))}
//           </div>
//         </div>
//       ))}
//       {/* Pagination Controls */}
//       <div className="pagination">
//         <button onClick={() => paginate(1)} disabled={currentPage === 1}>First</button>
//         <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
//         {Array.from({ length: endPage - startPage + 1 }).map((_, index) => (
//           <button 
//             key={startPage + index} 
//             onClick={() => paginate(startPage + index)}
//             className={currentPage === startPage + index ? 'active' : ''}
//           >
//             {startPage + index}
//           </button>
//         ))}
//         <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
//         <button onClick={() => paginate(totalPages)} disabled={currentPage === totalPages}>Last</button>
//       </div>
//     </div>
//   );
// };

// export default Questions;

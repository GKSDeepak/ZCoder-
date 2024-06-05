import React,{useState,useEffect} from 'react'
import './Contests.css'

const Contests = () => {
  const [contests, setContests] = useState([]);

    useEffect(() => {
        fetch('https://codeforces.com/api/contest.list?phase=BEFORE')
            .then(response => response.json())
            .then(data => {
                // Filter out contests that are in the "BEFORE" phase
                const beforeContests = data.result.filter(contest => contest.phase === 'BEFORE');
                setContests(beforeContests);
            })
            .catch(error => console.error('Error fetching contests:', error));
    }, []);

    return (
        <div>
            <h1 className='Heading'>Contests</h1>
            <div className='container-box'>
            <div className='list-container'>
            <ul >
                {contests.map(contest => (
                    <div key={contest.id} className='list'>
                    <li key={contest.id} >
                        <h2>{contest.name}</h2>
                        <p>Start Time: {new Date(contest.startTimeSeconds * 1000).toLocaleString()}</p>
                        <p>Duration: {contest.durationSeconds / 3600} hours</p>
                    </li>
                    </div>
                ))}
            </ul>
            </div>
            </div>
        </div>
    );
}

export default Contests

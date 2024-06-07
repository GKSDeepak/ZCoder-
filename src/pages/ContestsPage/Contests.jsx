import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Contests = () => {
    const [codeforcesContests, setCodeforcesContests] = useState([]);
    const [clistContests, setClistContests] = useState([]);

    useEffect(() => {
        const fetchCodeforcesContests = async () => {
            try {
                const response = await fetch('https://codeforces.com/api/contest.list?phase=BEFORE');
                const data = await response.json();
                // Filter out contests that are in the "BEFORE" phase
                const beforeContests = data.result.filter(contest => contest.phase === 'BEFORE');
                setCodeforcesContests(beforeContests);
            } catch (error) {
                console.error('Error fetching codeforces contests:', error);
            }
        };

        const fetchClistContests = async () => {
            try {
                // Get the current date and time
                const date = new Date();
                let today = date.getDate();
                if (today < 10) today = "0" + today;

                let month = date.getMonth() + 1;
                if (month < 10) month = "0" + month;

                const year = date.getFullYear();

                let hours = date.getHours();
                if (hours < 10) hours = "0" + hours;

                let minutes = date.getMinutes();
                if (minutes < 10) minutes = "0" + minutes;

                let seconds = date.getSeconds();
                if (seconds < 10) seconds = "0" + seconds;

                // Construct the final API URL
                const API = "https://clist.by:443/api/v4/contest/?host=leetcode.com";
                const finalApi = `${API}&start__gt=${year}-${month}-${today} ${hours}:${minutes}:${seconds}`;

                // Fetch the contests from the API
                const response = await axios.get(finalApi, {
                    headers: {
                        'Authorization': `ApiKey shraman1507:738ba004d8e3e434774b366ec26692422912b96f` // Replace <YOUR_API_KEY> with your actual API key
                    }
                });
                setClistContests(response.data.objects);
            } catch (error) {
                console.error('Error fetching clist contests:', error);
            }
        };

        fetchCodeforcesContests();
        fetchClistContests();
    }, []);

    return (
        <>
            <div>
                <h1 className='Heading'>Codeforces Contests</h1>
                <div className='container-box'>
                    <div className='list-container'>
                        <ul>
                            {codeforcesContests.map(contest => (
                                <div className='list' key={contest.id}>
                                    <h2>{contest.name}</h2>
                                    <div className='Time'>
                                        <p>Start Time: </p>
                                        <p>{new Date(contest.startTimeSeconds * 1000).toLocaleString()}</p>
                                    </div>
                                    <div className='duration'>
                                        <p>Duration: </p>
                                        <p>{contest.durationSeconds / 3600}</p>
                                        <p> hours</p>
                                    </div>
                                </div>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div>
                <h1 className='Heading'>Clist Contests</h1>
                <div className='container-box'>
                    <div className='list-container'>
                        <ul>
                            {clistContests.map(contest => (
                                <div className='list' key={contest.id}>
                                    <h2>{contest.event}</h2>
                                    <div className='Time'>
                                        <p>Start Time: </p>
                                        <p>{new Date(contest.start * 1000).toLocaleString()}</p>
                                    </div>
                                    <div className='duration'>
                                        <p>Duration: </p>
                                        <p>{contest.duration / 3600} hours</p>
                                    </div>
                                </div>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Contests;

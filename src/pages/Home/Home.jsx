import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import './Home.css';

const Home = () => {
  const [upcomingContests, setUpcomingContests] = useState([]);
  const [recentlyCompletedContests, setRecentlyCompletedContests] = useState([]);
  const [value, setValue] = useState(new Date());
  const [selectedContest, setSelectedContest] = useState(null);
  const [selectedDateContests, setSelectedDateContests] = useState([]);

  useEffect(() => {
    const fetchContests = async () => {
      const username = 'shraman1507';
      const apiKey = '738ba004d8e3e434774b366ec26692422912b96f';
      const currentDate = new Date().toISOString();
      const pastDate = new Date(new Date().setDate(new Date().getDate() - 30)).toISOString();

      const upcomingUrl = `https://clist.by/api/v1/contest/?username=${username}&api_key=${apiKey}&start__gt=${currentDate}&resource__id__in=1,2,102,93&limit=10`;
      const completedUrl = `https://clist.by/api/v1/contest/?username=${username}&api_key=${apiKey}&end__lt=${currentDate}&start__gt=${pastDate}&resource__id__in=1,2,102,93&limit=10`;

      try {
        const upcomingResponse = await axios.get(upcomingUrl);
        setUpcomingContests(upcomingResponse.data.objects);

        const completedResponse = await axios.get(completedUrl);
        setRecentlyCompletedContests(completedResponse.data.objects);
      } catch (error) {
        console.error('Error fetching contests:', error);
      }
    };

    fetchContests();
  }, []);

  const onDateClick = (date) => {
    const contestsOnDate = upcomingContests.filter(
      (contest) => new Date(contest.start).toDateString() === date.toDateString()
    );
    setSelectedDateContests(contestsOnDate);
  };

  return (
    <div className="homepage">
      <header className="hero-section">
        <h1 className="hero-title">Welcome to Contest Dashboard</h1>
        <p className="hero-tagline">Stay updated with the latest and upcoming programming contests</p>
      </header>
      
      <section className="contests-section">
        <div className="dropdown-container">
          <h2 className="subheading">Recently Completed Contests</h2>
          <select
            className="contest-dropdown"
            onChange={(e) => setSelectedContest(e.target.value)}
          >
            <option value="">Select a contest</option>
            {recentlyCompletedContests.map((contest) => (
              <option key={contest.id} value={contest.id}>
                {contest.event} - {new Date(contest.start).toLocaleString()}
              </option>
            ))}
          </select>
          {selectedContest && (
            <div className="contest-details">
              <h3>Contest Details</h3>
              <p>{recentlyCompletedContests.find(c => c.id === selectedContest).event}</p>
              <p>
                {new Date(
                  recentlyCompletedContests.find(c => c.id === selectedContest).start
                ).toLocaleString()}
              </p>
            </div>
          )}
        </div>

        <div className="calendar-container">
          <h2 className="subheading">Upcoming Contests</h2>
          <Calendar
            onChange={setValue}
            value={value}
            onClickDay={onDateClick}
            tileContent={({ date, view }) => {
              if (view === 'month') {
                const contest = upcomingContests.find(
                  (contest) => new Date(contest.start).toDateString() === date.toDateString()
                );
                return contest ? <div className="contest-dot"></div> : null;
              }
            }}
          />
          {selectedDateContests.length > 0 && (
            <div className="selected-date-contests">
              <h3>Contests on {value.toDateString()}</h3>
              <ul>
                {selectedDateContests.map((contest) => (
                  <li key={contest.id}>
                    <a href={contest.href} target="_blank" rel="noopener noreferrer">
                      {contest.event} - {new Date(contest.start).toLocaleString()} (Duration: {Math.floor(contest.duration / 3600)} hours)
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* <footer className="footer">
        <p>&copy; 2024 Contest Dashboard. All Rights Reserved.</p>
        <div className="social-links">
          <a href="#">Facebook</a>
          <a href="#">Twitter</a>
          <a href="#">LinkedIn</a>
        </div>
      </footer> */}
    </div>
  );
};

export default Home;
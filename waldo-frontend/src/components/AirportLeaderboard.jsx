import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css'; 

export default function AirportLeaderboard() {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    async function fetchLeaderboardData() {
      try {
        const response = await axios.get('http://localhost:3000/leaderboard/airport');
        setLeaderboardData(response.data);
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
      }
    }

    fetchLeaderboardData();
  }, []);

  return (
    <div className="leaderboard-container">
      <h2 className="leaderboard-title">Airport Leaderboard</h2>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody >
          {leaderboardData.map((entry, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{entry.username}</td>
              <td>{entry.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

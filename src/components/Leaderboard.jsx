import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Leaderboard = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This function only runs once when the component mounts
    const fetchPlayers = async () => {
      try {
        const res = await axios.get('https://induction-backend.onrender.com/api/v1');
        if (res.data.success) {
          const sorted = res.data.player.sort((a, b) => b.score - a.score);
          setPlayers(sorted);
        }
      } catch (err) {
        console.error("Failed to fetch leaderboard:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []); // ← Empty array means run only on first load

  return (
    <div style={{ padding: '2rem' }}>
      <h2>🏆 Leaderboard</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Req No</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player, index) => (
              <tr key={player._id}>
                <td>{index + 1}</td>
                <td>{player.name}</td>
                <td>{player.ReqNo}</td>
                <td>{player.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Leaderboard;

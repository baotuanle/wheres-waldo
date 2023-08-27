import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import BrowserRouter, Route, and Routes
import Menu from './components/menu';
import Game from './components/game';
import AirportLeaderboard from './components/AirportLeaderboard';
import MarioLeaderboard from './components/MarioLeaderboard';
import AquariumLeaderboard from './components/AquariumLeaderboard';
import './App.css';

function App() {

  return (
    <Router>
      <Routes> {/* Use Routes to define your routes */}
        <Route path="/:level" element={<Game/>} />
        <Route path="/" element={<Menu />} />
        <Route path="/airport-leaderboard" element={<AirportLeaderboard />} />
        <Route path="/mario-leaderboard" element={<MarioLeaderboard />} />
        <Route path="/aquarium-leaderboard" element={<AquariumLeaderboard />} />
      </Routes>
    </Router>
  );
}

export default App;

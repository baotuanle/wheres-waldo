import React from 'react';
import { Link } from 'react-router-dom';
import Airport from './imgs/airport-scene.png';
import Mario from './imgs/super-mario-bros.png';
import Aquarium from './imgs/aquatic-aquarium.png';
import '../App.css'; 

export default function Menu() {
  return (
    <div className='menu'>
      <header className='menu-header'>Where's Waldo-Type Games</header>
      <h2 className='level-select-header'>Select A Game</h2>
      <div className="level-select">
        <div className="level">
          <div className="level-content">
            <Link to={`/airport`}>
              <img src={Airport} alt="Airport" />
            </Link>
            <h4>Airport</h4>
          </div>
          <Link to={`/airport-leaderboard`} className="leaderboard-button">
            Airport Leaderboard
          </Link>
        </div>
        <div className="level">
          <div className="level-content">
            <Link to={`/mario`}>
              <img src={Mario} alt="Mario World" />
            </Link>
            <h4>Mario World</h4>
          </div>
          <Link to={`/mario-leaderboard`} className="leaderboard-button">
            Mario Leaderboard
          </Link>
        </div>
        <div className="level">
          <div className="level-content">
            <Link to={`/aquarium`}>
              <img src={Aquarium} alt="Aquarium" />
            </Link>
            <h4>Aquarium</h4>
          </div>
          <Link to={`/aquarium-leaderboard`} className="leaderboard-button">
            Aquarium Leaderboard
          </Link>
        </div>
      </div>
    </div>
  );
}

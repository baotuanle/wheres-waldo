import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DropdownMenu from './dropdown.jsx'
import Airport from './imgs/airport-scene.png';
import Mario from './imgs/super-mario-bros.png';
import Aquarium from './imgs/aquatic-aquarium.png';
import Header from './header';
import Modal from './modal.jsx'; 


const charactersByLevel = {
  airport: {
    characters: ['Waldo', 'Wenda', 'Odlaw'],
    characterPositions: {
      'Waldo': { x: 414.5, y: 331 },
      'Wenda': { x: 1316.5, y: 623 },
      'Odlaw': { x: 146.5, y: 618 },
    },
  },
  mario: {
    characters: ['Fire Mario', 'King Boo', 'Waluigi'],
    characterPositions: {
      'Fire Mario': { x: 1148, y: 422 },
      'King Boo': { x: 426, y: 517 },
      'Waluigi': { x: 972, y: 880 },
    },
  },
  aquarium: {
    characters: ['Feebas', 'Mantyke', 'Starmie'],
    characterPositions: {
      'Feebas': { x: 146.390625, y: 463 },
      'Mantyke': { x: 1375.390625, y: 296 },
      'Starmie': { x: 1254.390625, y: 583 },
    },
  },
};


function Game() {
  const { level } = useParams();
  const imgSrc = getImgSrcFromLevel(level);

  const [showDropdownMenu, setShowDropdownMenu] = useState(false);
  const [clickCoordinates, setClickCoordinates] = useState({ x: 0, y: 0 });
  const [foundCharacters, setFoundCharacters] = useState([]);
  const [gameTime, setGameTime] = useState({ minutes: 0, seconds: 0 });
  const [isGameRunning, setIsGameRunning] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({ time: 0 });
  
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const originalCharacters = charactersByLevel[level]?.characters || [];
  const [availableCharacters, setAvailableCharacters] = useState(originalCharacters);


  const displayCharacterFoundModal = (time) => {
    setModalData({ time });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    let interval;

    if (isGameRunning) {
      interval = setInterval(() => {
        setGameTime((prevGameTime) => {
          const newSeconds = prevGameTime.seconds + 1;
          const newMinutes = prevGameTime.minutes + Math.floor(newSeconds / 60);

          return {
            minutes: newMinutes,
            seconds: newSeconds % 60,
          };
        });
      }, 1000); 
    } else {
      clearInterval(interval); 
    }

    return () => {
      clearInterval(interval);
    };
  }, [isGameRunning]);

  
  useEffect(() => {
    const levelData = charactersByLevel[level];

    if (foundCharacters.length === levelData.characters.length) {
      
      setIsGameRunning(false); 
      const gameTimeStr = `${String(gameTime.minutes).padStart(2, '0')}:${String(gameTime.seconds).padStart(2, '0')}`;
      displayCharacterFoundModal(gameTimeStr);
    }
  }, [foundCharacters, gameTime, level]);

  
  const handleImageClick = (event) => {
    
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    setClickCoordinates({ x, y });

    const levelData = charactersByLevel[level];
    const characterPositions = levelData.characterPositions;

    let characterToSelect = null;

    levelData.characters.forEach((character) => {
      const charX = characterPositions[character].x;
      const charY = characterPositions[character].y;
      const proximity = 40;

      if (
        Math.abs(x - charX) <= proximity &&
        Math.abs(y - charY) <= proximity
      ) {
        characterToSelect = character;
      }
    });

    setSelectedCharacter(characterToSelect);
    
    setShowDropdownMenu(!showDropdownMenu);
  
  };
  

  const handleCharacterSelect = (character) => {
    if (selectedCharacter === character && !foundCharacters.includes(character)) {
      setFoundCharacters([...foundCharacters, character]);
  
      const updatedAvailableCharacters = availableCharacters.filter((char) => char !== character);
      setAvailableCharacters(updatedAvailableCharacters);

      setShowDropdownMenu(false);
    }
    else {
      setShowDropdownMenu(false);
    }
  };

  return (
    <div>
      <Header currLevel={level} foundCharacters={foundCharacters} setGameTime={setGameTime}/>
      <div className='game-img'>
        <img
          className='game-img'
          src={imgSrc}
          alt={level}
          onClick={handleImageClick} 
        />
        {showDropdownMenu && (
          <DropdownMenu
            characters={availableCharacters}
            coordinates={clickCoordinates}
            onCharacterSelect={handleCharacterSelect} 
          />
        )}
        {showModal && (
        <Modal
          time={modalData.time}
          onClose={closeModal}
          level={level}
        />
      )}
      </div>
    </div>
  );
}

export default Game;

function getImgSrcFromLevel(level) {
  if (level === 'airport') {
    return Airport;
  } else if (level === 'mario') {
    return Mario;
  } else if (level === 'aquarium') {
    return Aquarium;
  }
  return '';
}

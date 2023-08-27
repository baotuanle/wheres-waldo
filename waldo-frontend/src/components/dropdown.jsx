import React, { useState } from 'react';
import "../App.css"

function DropdownMenu({ characters, coordinates, onCharacterSelect }) {
  const { x, y } = coordinates;

  const xOffset = 100;
  const yOffset = -100;

  const [isOpen, setIsOpen] = useState(true);

  const handleCharacterClick = (character) => {
    onCharacterSelect(character);
    setIsOpen(false);
  };

  const style = {
    position: 'absolute',
    top: `${y + yOffset}px`,
    left: `${x + xOffset}px`,
    zIndex: 999,
    backgroundColor: 'white',
    border: '1px solid #ccc',
    padding: '10px',
  };

  return (
    <div style={style} className="dropdown-menu">
      <ul>
        {Array.isArray(characters) &&
          characters.map((character, index) => (
            <li className="charOption" key={index} onClick={() => handleCharacterClick(character)}>
              {character}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default DropdownMenu;

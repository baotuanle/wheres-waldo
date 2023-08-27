import Timer from './timer'
import FireMario from './imgs/FireMario.webp'
import KingBoo from './imgs/KingBoo.webp'
import Waluigi from './imgs/Waluigi.png'
import Waldo from './imgs/wally.jpg'
import Wenda from './imgs/wenda.png'
import Odlaw from './imgs/Odlaw.webp'
import Feebas from './imgs/Feebas.webp'
import Mantyke from './imgs/mantyke.png'
import Starmie from './imgs/Starmie.webp'

export default function Header(props) {
  const { currLevel, setGameTime, foundCharacters } = props;

  const charData = getCharFromLevel(currLevel);

  return (
    <div>
      <header className='game-header'>
        <Timer setGameTime={setGameTime} foundCharacters={foundCharacters} />
        {charData.map((character) => (
          <div className="charImg" key={character.name}>
            {character.image && !foundCharacters.includes(character.name) && (
              <img className="charImg" src={character.image} alt={character.name}/>
            )}
          </div>
        ))}
      </header>
    </div>
  );
}



function getCharFromLevel(level) {
  const characterData = {
    airport: [
      { name: 'Waldo', image: Waldo },
      { name: 'Wenda', image: Wenda },
      { name: 'Odlaw', image: Odlaw },
    ],
    mario: [
      { name: 'Fire Mario', image: FireMario },
      { name: 'King Boo', image: KingBoo },
      { name: 'Waluigi', image: Waluigi },
    ],
    aquarium: [
      { name: 'Feebas', image: Feebas },
      { name: 'Mantyke', image: Mantyke },
      { name: 'Starmie', image: Starmie },
    ],
  };
  return characterData[level] || [];
}

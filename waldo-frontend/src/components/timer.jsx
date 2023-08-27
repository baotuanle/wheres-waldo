import React, { useState, useEffect } from 'react';
import '../App.css';

export default function Timer({ setGameTime, foundCharacters }) {
  const [time, setTime] = useState({ minutes: 0, seconds: 0 });

  useEffect(() => {
    let interval;

    if (foundCharacters.length < 3) {
      interval = setInterval(() => {
        let newSeconds = time.seconds + 1;
        let newMinutes = time.minutes;

        if (newSeconds === 60) {
          newSeconds = 0;
          newMinutes += 1;
        }

        setTime({ minutes: newMinutes, seconds: newSeconds });
      }, 1000);
    } else {
      clearInterval(interval); 
    }

    if (foundCharacters.length === 3) {
      setGameTime({ minutes: time.minutes, seconds: time.seconds });
    }

    return () => clearInterval(interval);
  }, [time, setGameTime, foundCharacters]);

  return (
    <div>
      <p className='timer'>
        {String(time.minutes).padStart(2, '0')}:{String(time.seconds).padStart(2, '0')}
      </p>
    </div>
  );
}

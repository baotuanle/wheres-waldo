import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import "../App.css"


function Modal({ time, onClose, level }) {
  const [username, setUsername] = useState(''); // State to store the username
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const numTime = convertTimeStringToMinutes(time);
      const requestData = {
        username,
        numTime,
        time,
        level,
      };
      console.log('Request Data:', requestData);
  
      const response = await axios.post('http://localhost:3000/submit-record', requestData);
      console.log('Response:', response);
  
      if (response.status === 201) {
        // Handle success (e.g., close the modal)
        onClose();
        navigate('/'); // Navigate back to the menu (root route)
      }
    } catch (error) {
      console.error('Error submitting record:', error);
    }
  };
  
  return (
    <div className="modal">
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <input
            className="username-input"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <p className="timeTaken">Time Taken: {time} seconds</p>
          <button className="close-Button" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}


function convertTimeStringToMinutes(timeString) {
  const [hoursStr, minutesStr] = timeString.split(":");
  const hours = parseInt(hoursStr, 10);
  const minutes = parseInt(minutesStr, 10);
  
  const totalTimeInMinutes = hours * 60 + minutes;
  return totalTimeInMinutes;
}

const timeString = "00:04";
const totalTimeInMinutes = convertTimeStringToMinutes(timeString);
console.log(totalTimeInMinutes); // Output: 4

export default Modal;

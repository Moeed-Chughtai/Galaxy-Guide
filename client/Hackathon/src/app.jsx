import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Navbar from './components/navbar';
import MyThree from './components/Three';
import Quiz from './components/Quiz';
import './index.css';
import Home from './Home';

function App() {
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = (planetId) => {
    setSelectedPlanet(planetId); // Set the selected planet
    setShowPopup(!showPopup); // Toggle the popup
  };

  return (
    <React.StrictMode>
      <MyThree trigger={showPopup} setTrigger={setShowPopup} planet={selectedPlanet} />
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);

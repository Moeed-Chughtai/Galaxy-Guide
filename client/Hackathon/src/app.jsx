import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Navbar from './components/navbar';
import MyThree from './components/Three';
import Quiz from './components/Quiz';
import './index.css';
import Home from './Home';
import Astronaut from './components/Astronaut';

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
      <Astronaut text="Cllick on galaxy guide if you're ready to start your journey!"/>
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);

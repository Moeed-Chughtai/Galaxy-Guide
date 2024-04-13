import React, { useState } from 'react';
import Popup from './components/Popup';

function Home() {
    const [selectedPlanet, setSelectedPlanet] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    const togglePopup = (planetId) => {
        setSelectedPlanet(planetId); // Set the selected planet
        setShowPopup(!showPopup); // Toggle the popup
    };

    return (
        <div>
            <div className='title-and-button'>
                <h1>Planets</h1>
                <button onClick={() => togglePopup(1)}>Sun</button>
                <button onClick={() => togglePopup(2)}>Mercury</button>
                <button onClick={() => togglePopup(3)}>Venus</button>
            </div>
            <Popup trigger={showPopup} setTrigger={setShowPopup} planet={selectedPlanet} />
        </div>
    );
}

export default Home;

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
                <button onClick={() => togglePopup(4)}>Earth</button>
                <button onClick={() => togglePopup(5)}>Mars</button>
                <button onClick={() => togglePopup(6)}>Jupiter</button>
                <button onClick={() => togglePopup(7)}>Saturn</button>
                <button onClick={() => togglePopup(8)}>Uranus</button>
                <button onClick={() => togglePopup(9)}>Neptune</button>
            </div>
            <Popup trigger={showPopup} setTrigger={setShowPopup} planet={selectedPlanet} />
        </div>
    );
}

export default Home;

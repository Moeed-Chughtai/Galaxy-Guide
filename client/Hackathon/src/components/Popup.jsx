import React, { useState } from 'react';
import planetsData from './../data/planets_info.json';
import Defend from './Defend'; // Ensure this matches the filename and export
import './../css/popup_style.css';

function Popup({ trigger, setTrigger, planet }) {
    const [defendTrigger, setDefendTrigger] = useState(false); // New state for triggering defense
    const planetData = planetsData.find(item => item.id === planet);

    const handleClose = () => {
        setTrigger(false);
    };

    const handleDefend = () => {
        // Set the trigger for Defend component
        setTrigger(false);
        setDefendTrigger(!defendTrigger);
    };

    return trigger ? (
        <div className="popup-frame">
            <button className="close-button" onClick={handleClose}>
                <span className="X"></span>
                <span className="Y"></span>
                <div className="close">Close</div>
            </button>
            <div className="popup">
                <div className='left-container'>
                    <h1 className='planet-title'>{planetData.name}</h1>
                    <h1 className='planet-header'>Information on {planetData.name}</h1>
                    <p className='planet-body'>{planetData.body_paragraph}</p>
                    <button className='defend-button' onClick={handleDefend}>Defend</button>
                </div>
                <div className='right-container'>
                    <h1 className='planet-header'>{planetData.name} Facts</h1>
                    <ul className='planet-facts'>
                        {planetData.facts.map((fact, index) => (
                            <li key={index}>• {fact}</li>
                        ))}
                    </ul>
                </div>
            </div>
            {/* Conditional rendering of Defend component */}
            {defendTrigger && <Defend trigger={defendTrigger} setTrigger={setDefendTrigger} planet={planet} />}
        </div>
    ) : null;
}

export default Popup;

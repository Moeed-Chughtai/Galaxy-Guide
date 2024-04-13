import React, { useState } from 'react';
import planetsData from './../data/planets_info.json'; // Import planetsData
import './../css/defend_style.css'; // Import custom CSS for the defend component

function Defend({ trigger, setTrigger, planet }) {
    const planetData = planetsData.find(item => item.id === planet); // Fetch planetData based on the selected planet

    const handleClose = () => {
        setTrigger(false);
    };

    const handleDefend = () => {
        setTrigger(false);
    };

    const handleContinue = () => {
        console.log("Continuing...");
        setTrigger(false);
    };

    return trigger ? (
        <div className="defend-frame">
            <div className="defend-container">
                <h1 className='defend-title'>DEFEND {planetData.name.toUpperCase()}</h1>
            </div>
            <button className='continue-button' onClick={handleContinue}>Continue</button>
        </div>
    ) : null;
}

export default Defend;

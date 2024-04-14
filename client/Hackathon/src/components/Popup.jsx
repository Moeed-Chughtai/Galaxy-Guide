import React, { useState } from 'react';
import planetsData from './../data/planets_info.json';
import Defend from './Defend';
import './../css/popup_style.css';

function Popup({ trigger, setTrigger, planet }) {
    const planetData = planetsData.find(item => item.id === planet);
    const [showDefend, setShowDefend] = useState(false);

    const handleClose = () => {
        setTrigger(false);
    };

    const handleDefendClick = () => {
        setTrigger(false);
        setShowDefend(true);
    };

    const handleDefendClose = () => {
        setShowDefend(false);
    };

    return (
        <>
            {trigger && !showDefend && (
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
                            <button className='defend-button' onClick={handleDefendClick}>Defend</button>
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
                </div>
            )}
            {showDefend && (
                <Defend
                    trigger={showDefend}
                    setTrigger={handleDefendClose}
                    planet={planet}
                />
            )}
        </>
    );
}

export default Popup;

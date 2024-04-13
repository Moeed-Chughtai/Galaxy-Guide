import React from 'react';
import planetsData from './../planets_info.json';
import './../HomeStyle.css';

function Popup({ trigger, setTrigger, planet }) {
    // Find the planet data based on the planet id
    const planetData = planetsData.find(item => item.id === planet);

    return trigger ? (
        <div className="popup">
            <div className="popup-inner">
                <button className="close-btn" onClick={() => setTrigger(false)}>X</button>
                <h1 className='planet-title'>{planetData.name}</h1>
                <h1 className='planet-header'>{planetData.name} Facts</h1>
                <p className='planet-facts'>{planetData.facts}</p>
                <h1 className='planet-header'>Information on {planetData.name}</h1>
                <p className='planet-body'>{planetData.body_paragraph}</p>
            </div>
        </div>
    ) : null;
}

export default Popup;

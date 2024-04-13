import React from 'react';
import planetsData from './../planets_info.json';
import './../popup_style.css';

function Popup({ trigger, setTrigger, planet }) {
    const planetData = planetsData.find(item => item.id === planet);

    return trigger ? (
        <div className="popup-frame">
            <button className="button" onClick={() => setTrigger(false)}>
                <span className="X"></span>
                <span className="Y"></span>
                <div className="close">Close</div>
            </button>
            <div className="popup">
                <div className='left-container'>
                    <h1 className='planet-title'>{planetData.name}</h1>
                    <h1 className='planet-header'>Information on {planetData.name}</h1>
                    <p className='planet-body'>{planetData.body_paragraph}</p>
                </div>
                <div className='right-container'>
                    <h1 className='planet-header'>{planetData.name} Facts</h1>
                    <p className='planet-facts'>{planetData.facts}</p>
                </div>

            </div>
        </div>
    ) : null;
}

export default Popup;

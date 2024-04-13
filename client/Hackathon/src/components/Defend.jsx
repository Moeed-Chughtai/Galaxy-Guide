import React, { useState } from 'react';

function Defend({ trigger, setTrigger, planet }) {
    // const planetData = planetsData.find(item => item.id === planet);

    const handleClose = () => {
        setTrigger(false);
    };

    const handleDefend = () => {
        setTrigger(false);
    }

    return trigger ? (
        <div>
            <div className='defend-alert'>
                <h1>DEFEND</h1>
            </div>
            
        </div>
    ) : null;
}

export default Defend;

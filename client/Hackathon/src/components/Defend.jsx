import React, { useState } from 'react';
import planetsData from './../data/planets_info.json'; // Import planetsData
import Quiz from './Quiz'; // Import Quiz component
import './../css/defend_style.css'; // Import custom CSS for the defend component

function Defend({ trigger, setTrigger, planet }) {
    const planetData = planetsData.find(item => item.id === 4); // Fetch planetData based on the selected planet

    const [showQuiz, setShowQuiz] = useState(false); // Set showQuiz to false

    const handleContinue = () => {
        setTrigger(false);
        setShowQuiz(true);
    };

    return trigger ? (
        <>
            <div className="defend-frame">
                <div className="defend-container">
                    <h1 className='defend-title'>DEFEND {planetData.name.toUpperCase()}</h1> 
                    {/* was planet data */}
                </div>
                <button className='continue-button' onClick={handleContinue}>Continue</button>
            </div>
            {showQuiz && (
            <Quiz
                trigger={showQuiz}
                setTrigger={setTrigger}
                planet={planet}
            />
            )}
        </>
    ) : null;
}

export default Defend;

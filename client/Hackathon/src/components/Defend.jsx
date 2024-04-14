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
            <div id = 'defend' className="defend-frame">
            <div className="defend-container flex flex-col">
                    <h1 className='defend-title self-center font-extrabold size-82'>DEFEND {planetData.name.toUpperCase()}</h1>
                    <button className='continue-button border-2 rounded-2xl w-60 h-16 self-center font-semibold uppercase' onClick={handleContinue}>Continue</button>
                </div>
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

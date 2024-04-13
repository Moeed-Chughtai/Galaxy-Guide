import React from 'react';
import astronautImage from '../images/astronaut-picture.png';
import speechBubbleImage from '../images/speech-bubble.png';
import AstronautSpeech from './AstronautSpeech';

const Astronaut = ({ text }) => {
    return (
        <div className='astronaut-container'>
            <img src={astronautImage} className='astronaut-image' />
            <div className='speech-bubble-container'>
                <img src={speechBubbleImage} className='speech-bubble-image' />
                <AstronautSpeech text={text} />
            </div>
        </div>
    )
}

export default Astronaut;

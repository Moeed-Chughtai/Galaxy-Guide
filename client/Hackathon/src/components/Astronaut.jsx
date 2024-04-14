import React from 'react';
import astronautImage from '../images/astronaut-picture.png';
import speechBubbleImage from '../images/speech-bubble.png';
import AstronautSpeech from './AstronautSpeech';
import '../css/Astronaut.css';

const Astronaut = ({ text }) => {
    return (
        <div className='astronaut-container'>
            <img src={astronautImage} className='astronaut-image' />
            <img src={speechBubbleImage} className='speech-bubble-image' />
            <div className='text-container'>
                <AstronautSpeech text={text} className='text-speech2' />
            </div>
        </div>
    )
}

export default Astronaut;

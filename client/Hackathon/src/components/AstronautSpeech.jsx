import React, { useState, useEffect } from 'react';

const AstronautSpeech = ({ text }) => {
    const [visibleSpeech, setVisibleSpeech] = useState('');

    useEffect(() => {
        let currentIndex = 0;
        const interval = setInterval(() => {
            setVisibleSpeech((prevText) => {
                if (currentIndex < text.length) {
                    return prevText + text[currentIndex];
                } else {
                    clearInterval(interval);
                    setTimeout(() => {
                        setVisibleSpeech('');
                    }, 2000);
                }
                return prevText;
            });
            currentIndex++;
        }, 100);

        return () => clearInterval(interval);
    }, [text]);
    
    return <div>{visibleSpeech}</div>
};

export default AstronautSpeech;

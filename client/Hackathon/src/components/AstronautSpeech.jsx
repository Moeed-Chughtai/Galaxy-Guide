import React, { useState, useEffect } from 'react';

const AstronautSpeech = ({ text, onComplete }) => {
    const [visibleSpeech, setVisibleSpeech] = useState('');

    useEffect(() => {
        let currentIndex = 0;
        const interval = setInterval(() => {
            setVisibleSpeech((prevText) => {
                if (currentIndex < text.length)
                {
                    return prevText + text[currentIndex];
                }
                else
                {
                    setTimeout(() => {
                        setVisibleSpeech('');
                        onComplete();
                    }, 10000);
                }
                return prevText;
            });
            currentIndex++;
        }, 100);

        return () => clearInterval(interval);
    }, [text, onComplete]);
    return <div>{visibleSpeech}</div>
 };

export default AstronautSpeech;

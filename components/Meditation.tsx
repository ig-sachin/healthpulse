'use client';
import React, { useState, useEffect, useRef } from 'react';
import './Meditation.css';

const Meditation = () => {
    const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
    const [isMeditating, setIsMeditating] = useState(false);
    const [intervalId, setIntervalId] = useState(null);
    const audioRef = useRef(null);

    useEffect(() => {
        if (timeLeft === 0) {
            clearInterval(intervalId);
            setIsMeditating(false);
        }
    }, [timeLeft, intervalId]);

    useEffect(() => {
        if (isMeditating) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
            audioRef.current.currentTime = 0; // Optional: Reset playback position
        }
    }, [isMeditating]);

    const startMeditation = () => {
        setIsMeditating(true);
        setIntervalId(setInterval(() => setTimeLeft(prev => prev - 1), 1000));
    };

    const stopMeditation = () => {
        setIsMeditating(false);
        clearInterval(intervalId);
        setTimeLeft(300);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <div className="meditation-app">
            <h1>Meditation Zone</h1>
            <div className="glowing-sphere"></div>
            <p>{formatTime(timeLeft)}</p>
            <div className="controls">
                {isMeditating ? (
                    <button onClick={stopMeditation}>Stop</button>
                ) : (
                    <button onClick={startMeditation}>Start</button>
                )}
            </div>
            <audio ref={audioRef} src="/sound.mp3" loop />
        </div>
    );
};

export default Meditation;

'use client';
import React, { useState, useEffect, useRef } from 'react';
import './SpeedGame.css';

const directions = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];

const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];
const getRandomPosition = () => ({
    top: `${Math.floor(Math.random() * 80) + 10}%`,
    left: `${Math.floor(Math.random() * 80) + 10}%`
});

const SpeedGame = () => {
    const [currentDirection, setCurrentDirection] = useState(getRandomElement(directions));
    const [distractions, setDistractions] = useState([]);
    const [startTime, setStartTime] = useState(null);
    const [responseTimes, setResponseTimes] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const [timeLeft, setTimeLeft] = useState(60);
    const timerRef = useRef(null);

    const generateNewStimulus = () => {
        const newDirection = getRandomElement(directions);
        const newDistractions = [];
        for (let i = 0; i < 3; i++) {
            let distraction;
            do {
                distraction = getRandomElement(directions);
            } while (distraction === newDirection || newDistractions.some(d => d.direction === distraction));
            newDistractions.push({ direction: distraction, position: getRandomPosition() });
        }
        setCurrentDirection(newDirection);
        setDistractions(newDistractions);
        setStartTime(Date.now());
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (!startTime || gameOver) return;

            if (event.key === currentDirection) {
                const responseTime = Date.now() - startTime;
                setResponseTimes([...responseTimes, responseTime]);
                generateNewStimulus();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [currentDirection, startTime, responseTimes, gameOver]);

    useEffect(() => {
        generateNewStimulus();
        timerRef.current = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev === 1) {
                    clearInterval(timerRef.current);
                    setGameOver(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => {
            clearInterval(timerRef.current);
        };
    }, []);

    const handleRestart = () => {
        setCurrentDirection(getRandomElement(directions));
        setDistractions([]);
        setResponseTimes([]);
        setGameOver(false);
        setTimeLeft(60);
        setStartTime(Date.now());
        timerRef.current = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev === 1) {
                    clearInterval(timerRef.current);
                    setGameOver(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const averageResponseTime = responseTimes.length
        ? responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length
        : 0;

    return (
        <div className="speed-brain-training-game">
            <h1>Speed Brain Training Game</h1>
            {!gameOver ? (
                <>
                    <div className="stimulus">
                        <div className="direction">
                            {currentDirection === 'ArrowUp' && '↑'}
                            {currentDirection === 'ArrowDown' && '↓'}
                            {currentDirection === 'ArrowLeft' && '←'}
                            {currentDirection === 'ArrowRight' && '→'}
                        </div>
                        {distractions.map((distraction, index) => (
                            <div
                                key={index}
                                className="distraction"
                                style={{ top: distraction.position.top, left: distraction.position.left }}
                            >
                                {distraction.direction === 'ArrowUp' && '↑'}
                                {distraction.direction === 'ArrowDown' && '↓'}
                                {distraction.direction === 'ArrowLeft' && '←'}
                                {distraction.direction === 'ArrowRight' && '→'}
                            </div>
                        ))}
                    </div>
                    <p>Time Left: {timeLeft} seconds</p>
                    <p>Average Response Time: {averageResponseTime.toFixed(2)} ms</p>
                </>
            ) : (
                <>
                    <p>Game Over!</p>
                    <p>Average Response Time: {averageResponseTime.toFixed(2)} ms</p>
                    <button onClick={handleRestart}>Restart Game</button>
                </>
            )}
        </div>
    );
};

export default SpeedGame;

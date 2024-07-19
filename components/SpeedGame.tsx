'use client';
import React, { useState, useEffect, useRef } from 'react';
import './SpeedGame.css';
import { useRouter } from 'next/navigation';
import { getRandomName } from '@/lib/utils';
import { createReport } from '@/lib/actions/games.actions';

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
    const [timeLeft, setTimeLeft] = useState(10);
    const timerRef = useRef(null);
    const [username, setUsername] = useState("");
    const router = useRouter();
    const audioRef = useRef(null);

    useEffect(() => {
        if (gameOver === false) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
            audioRef.current.currentTime = 0; // Optional: Reset playback position
        }
    }, [gameOver]);

    useEffect(() => {
        const randomName = getRandomName();
        setUsername(randomName);
    }, [setUsername]);

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

    const handleRestart = async () => {
        console.log("Speed game ", username, averageResponseTime);

        const report = {
            patientName: username,
            gameName: "Speed Game",
            score: averageResponseTime.toString()
        };
        const newReport = await createReport(report);
        if (newReport) {
            console.log("Report is created!");
        }
        setCurrentDirection(getRandomElement(directions));
        setDistractions([]);
        setResponseTimes([]);
        setGameOver(false);
        setTimeLeft(10);
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
        <div className="flex flex-col justify-center items-center speed-brain-training-game h-screen">
            <div className="border-2 border-gray-300 p-20 rounded-lg shadow-lg bg-dark">
                <h1 className="text-2xl font-bold mb-4">Welcome, {username}</h1>
                <h1 className="text-4xl font-bold my-3">Speed Brain Training Game</h1>
                {!gameOver ? (
                    <>
                        <div className="stimulus mb-6">
                            <div className="direction text-6xl">
                                {currentDirection === 'ArrowUp' && '↑'}
                                {currentDirection === 'ArrowDown' && '↓'}
                                {currentDirection === 'ArrowLeft' && '←'}
                                {currentDirection === 'ArrowRight' && '→'}
                            </div>
                            {distractions.map((distraction, index) => (
                                <div
                                    key={index}
                                    className="distraction text-4xl absolute"
                                    style={{ top: distraction.position.top, left: distraction.position.left }}
                                >
                                    {distraction.direction === 'ArrowUp' && '↑'}
                                    {distraction.direction === 'ArrowDown' && '↓'}
                                    {distraction.direction === 'ArrowLeft' && '←'}
                                    {distraction.direction === 'ArrowRight' && '→'}
                                </div>
                            ))}
                        </div>
                        <p className="text-lg mb-2">Time Left: {timeLeft} seconds</p>
                        <p className="text-lg mb-4">Average Response Time: {averageResponseTime.toFixed(2)} ms</p>
                    </>
                ) : (
                    <>
                        <p className="text-xl font-bold mb-4">Game Over!</p>
                        <p className="text-lg mb-2">Average Response Time: {averageResponseTime.toFixed(2)} ms</p>
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-colors"
                            onClick={handleRestart}
                        >
                            Restart Game
                        </button>
                    </>
                )}
            </div>
            <audio ref={audioRef} src="/nature-171968.mp3" loop />
        </div>
    );
};

export default SpeedGame;

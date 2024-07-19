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
    const [showModal, setShowModal] = useState(true);
    const [showInstructions, setShowInstructions] = useState(false);
    const router = useRouter();

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

    const handleStartGame = () => {
        handleRestart();
        setShowModal(false);
        setShowInstructions(false);
    };

    const handleShowInstructions = () => {
        setShowModal(false);
        setShowInstructions(true);
    };

    const handleCloseInstructions = () => {
        handleRestart();
        setShowInstructions(false);
    };

    const averageResponseTime = responseTimes.length
        ? responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length
        : 0;

    return (
        <div className="flex flex-col justify-center items-center speed-brain-training-game h-screen">
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
                    <div className="border-2 bg-gray-100 border-gray-300 p-6 rounded-lg shadow-lg relative">
                        <button
                            className="absolute top-0 right-0 m-2 text-gray-700"
                            onClick={() => setShowModal(false)}
                        >
                            X
                        </button>
                        <h2 className="text-2xl font-bold mb-4 text-gray-950">Game Modal</h2>
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-colors mb-2 mr-5"
                            onClick={handleStartGame}
                        >
                            Start Game
                        </button>
                        <button
                            className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-700 transition-colors"
                            onClick={handleShowInstructions}
                        >
                            How to Play
                        </button>
                    </div>
                </div>
            )}
            {showInstructions ? (
                <>
                    <h2 className="text-xl mb-4">How to Play</h2>
                    <p className="mb-4">
                        The goal of the speed game is to improve your response time by pressing the correct arrow keys.
                        <br /><br />
                        Here's how to play:
                        <br /><br />
                        1. You will see an arrow displayed in white color on a white background.
                        <br />
                        2. Use the arrow keys on your keyboard to press the corresponding arrow.
                        <br />
                        3. Ignore the red arrows that appear as distractions.
                        <br />
                        4. Press as many correct arrows as you can within the given time limit of 30 seconds.
                        <br />
                        5. Your score will increase for each correct arrow pressed.
                        <br /><br />
                        Good luck and have fun!
                    </p>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-colors"
                        onClick={handleCloseInstructions}
                    >
                        Back to Game
                    </button>
                </>
            ) : (<div className="border-2 border-gray-300 p-20 rounded-lg shadow-lg bg-dark">
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
            </div>)}
        </div>
    );
};

export default SpeedGame;

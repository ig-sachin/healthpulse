'use client';

import React, { useState, useEffect } from 'react';
import './ColorGame.css';
import { useRouter } from 'next/navigation';
import { getRandomName } from '@/lib/utils';
import { createReport } from '@/lib/actions/games.actions';

const colors = ['Red', 'Blue', 'Green', 'Yellow', 'Orange', 'Purple'];
const getRandomElement = (arr: string | any[]) => arr[Math.floor(Math.random() * arr.length)];

const ColorGame = () => {
  const [colorName, setColorName] = useState('');
  const [fontColor, setFontColor] = useState('');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [gameOver, setGameOver] = useState(false);
  const [username, setUsername] = useState("");
  const [showModal, setShowModal] = useState(true);
  const [showInstructions, setShowInstructions] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const randomName = getRandomName();
    setUsername(randomName);
  }, [setUsername]);

  const generateNewColors = () => {
    const newColorName = getRandomElement(colors);
    let newFontColor = getRandomElement(colors);
    while (newColorName === newFontColor) {
      newFontColor = getRandomElement(colors);
    }
    setColorName(newColorName);
    setFontColor(newFontColor);
  };

  useEffect(() => {
    generateNewColors();
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && !gameOver) {
      const timer = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setGameOver(true);
    }
  }, [timeLeft, gameOver]);

  const handleNewColors = () => {
    generateNewColors();
  };

  const handleColorButtonClick = (color: string) => {
    if (color === fontColor) {
      setScore(score + 1);
    } else {
      setScore(score - 1);
    }
    generateNewColors();
  };

  const handleRestartGame = async () => {
    console.log("New game started ", username, score);
    if (score > 0 && username !== null) {
      // Submit Repport of user
      console.log("Submit Report Section");

      const report = {
        patientName: username,
        gameName: "Color Game",
        score: score.toString()
      };

      const newReport = await createReport(report);
      if (newReport) {
        setScore(0);
        setTimeLeft(10);
        setGameOver(false);
        generateNewColors();
        router.push("color-game");
      }
    }

    setScore(0);
    setTimeLeft(10);
    setGameOver(false);
    generateNewColors();
  };

  const handleStartGame = () => {
    handleRestartGame();
    setShowModal(false);
    setShowInstructions(false);
  };

  const handleShowInstructions = () => {
    setShowModal(false);
    setShowInstructions(true);
  };

  const handleCloseInstructions = () => {
    handleRestartGame();
    setShowInstructions(false);
  };

  return (
    <div className="color">
      <header className="App-header">
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
            <div className="border-2 bg-gray-100 border-gray-300 p-6 rounded-lg shadow-lg relative">
              <button
                className="absolute top-0 right-0 m-2 text-gray-700"
                onClick={() => setShowModal(false)}
              >
                X
              </button>
              <h2 className="font-bold mb-4 text-gray-950">Game Modal</h2>
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
            <h2 className="mb-4">How to Play</h2>
            <p className="mb-4">
              The goal of the color game is to correctly identify the color of the text shown on the screen.
              <br /><br />
              Here's how to play:
              <br /><br />
              1. A color name will be displayed on the screen, but the text will be in a different color.
              <br />
              2. Use the buttons provided to select the correct color of the text, not the name of the color.
              <br />
              3. Press as many correct colors as you can within the given time limit of 30 seconds.
              <br />
              4. Your score will increase for each correct color identified.
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
        ) : (<div className="color-game">
          <h3 className="font-bold mb-4">Welcome, {username}</h3>
          <h3 className="font-bold my-3">Speed Brain Training Game</h3>
          <div className="flex color-app-header">
            <p className="temp">Time:{timeLeft}</p>
            <p>Score:{score}</p>
          </div>
          <h1 style={{ color: fontColor }}>{colorName}</h1>
          <div className="buttons">
            {colors.map((color) => (
              <button
                key={color}
                style={{ backgroundColor: color.toLowerCase() }}
                onClick={() => handleColorButtonClick(color)}
                disabled={gameOver}
              >
                {color}
              </button>
            ))}
          </div>
          {timeLeft === 0 ? (
            <button className="new-color-button" onClick={handleRestartGame}>
              New Game
            </button>
          ) : (
            <button className="new-color-button" onClick={handleNewColors} disabled={gameOver}>
              New Colors
            </button>
          )}
        </div>)}
      </header>
    </div>
  );
};

export default ColorGame;

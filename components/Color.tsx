'use client';

import React, { useState, useEffect } from 'react';
import './ColorGame.css';

const colors = ['Red', 'Blue', 'Green', 'Yellow', 'Orange', 'Purple'];
const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

const ColorGame = () => {
  const [colorName, setColorName] = useState('');
  const [fontColor, setFontColor] = useState('');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameOver, setGameOver] = useState(false);

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

  const handleColorButtonClick = (color) => {
    if (color === fontColor) {
      setScore(score + 1);
    } else {
      setScore(score - 1);
    }
    generateNewColors();
  };

  const handleRestartGame = () => {
    setScore(0);
    setTimeLeft(60);
    setGameOver(false);
    generateNewColors();
  };

  return (
    <div className="color-game">
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
      <button className="new-color-button" onClick={handleNewColors} disabled={gameOver}>New Colors</button>
    </div >
  );
};

function Color() {
  return (
    <div className="color">
      <header className="App-header">
        <ColorGame />
      </header>
    </div>
  );
}

export default Color;

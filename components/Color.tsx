'use client';

import React, { useState, useEffect } from 'react';
import './ColorGame.css';

const colors = ['Red', 'Blue', 'Green', 'Yellow', 'Orange', 'Purple'];
const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

const ColorGame = () => {
  const [colorName, setColorName] = useState('');
  const [fontColor, setFontColor] = useState('');

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

  const handleNewColors = () => {
    generateNewColors();
  };

  return (
    <div className="color-game border-orange-600">
      <h1 style={{ color: fontColor }}>{colorName}</h1>
      <button onClick={handleNewColors}>New Colors</button>
    </div>
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

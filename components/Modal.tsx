'use client';

import React from 'react';

const Modal = ({ onClose, onStartGame, onShowInstructions }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
            <div className="border-2 border-gray-300 p-6 rounded-lg shadow-lg relative">
                <button
                    className="absolute top-0 right-0 m-2 text-gray-700"
                    onClick={onClose}
                >
                    X
                </button>
                <h2 className="text-2xl font-bold mb-4">Game Modal</h2>
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-colors mb-2 mr-5"
                    onClick={onStartGame}
                >
                    Start Game
                </button>
                <button
                    className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-700 transition-colors"
                    onClick={onShowInstructions}
                >
                    How to Play
                </button>
            </div>
        </div>
    );
};

export default Modal;

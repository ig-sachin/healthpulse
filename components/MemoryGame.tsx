'use client';

import { useEffect, useState } from "react";
import "./MemoryGame.css";
import SingleCard from "./SingleCard";
import { createReport } from "@/lib/actions/games.actions";
import { useRouter } from "next/navigation";
import { getRandomName } from "@/lib/utils";
import Modal from "./Modal";

const cardImages = [
    { "src": "/assets/images/man2.jpg", matched: false },
    { "src": "/assets/images/man.jpg", matched: false },
    { "src": "/assets/images/boy.jpg", matched: false },
    { "src": "/assets/images/girl2.jpg", matched: false },
    { "src": "/assets/images/download.jpeg", matched: false },
    { "src": "/assets/images/girl.jpg", matched: false }
]

function MemoryGame() {
    const [cards, setCards] = useState([]);
    const [turns, setTurns] = useState(0);
    const [choiceOne, setChoiceOne] = useState(null);
    const [choiceTwo, setChoiceTwo] = useState(null);
    const [disabled, setDisabled] = useState(false);
    const [username, setUsername] = useState("");
    const [showModal, setShowModal] = useState(true);
    const [showInstructions, setShowInstructions] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const randomName = getRandomName();
        setUsername(randomName);
    }, [setUsername]);

    const shuffleCards = async () => {
        if (turns > 4 && username !== null) {
            const report = {
                patientName: username,
                gameName: "Memory Game",
                score: turns.toString()
            };

            const newReport = await createReport(report);
            if (newReport) {
                const shuffledCards = [...cardImages, ...cardImages]
                    .sort(() => Math.random() - 0.5)
                    .map(card => ({ ...card, id: Math.random() }));

                setChoiceOne(null);
                setChoiceTwo(null);
                setCards(shuffledCards);
                setTurns(0);
                router.push("memory-game");
            }
        }

        const shuffledCards = [...cardImages, ...cardImages]
            .sort(() => Math.random() - 0.5)
            .map(card => ({ ...card, id: Math.random() }));

        setChoiceOne(null);
        setChoiceTwo(null);
        setCards(shuffledCards);
        setTurns(0);
    }

    const handleChoice = card => {
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    }

    useEffect(() => {
        if (choiceOne && choiceTwo) {
            setDisabled(true);
            if (choiceOne.src === choiceTwo.src) {
                setCards(prevCards => {
                    return prevCards.map(card => {
                        if (card.src === choiceOne.src) {
                            return { ...card, matched: true };
                        } else {
                            return card;
                        }
                    })
                });
                resetTurn();
            } else {
                setTimeout(() => resetTurn(), 1000);
            }
        }
    }, [choiceOne, choiceTwo]);

    const resetTurn = () => {
        setChoiceOne(null);
        setChoiceTwo(null);
        setTurns(prevTurns => prevTurns + 1);
        setDisabled(false);
    }

    useEffect(() => {
        shuffleCards();
    }, []);

    const handleStartGame = () => {
        setShowModal(false);
        setShowInstructions(false);
    };

    const handleShowInstructions = () => {
        setShowModal(false);
        setShowInstructions(true);
    };

    const handleCloseInstructions = () => {
        setShowInstructions(false);
    };

    return (
        <div className="flex justify-center">
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
            <div className="p-6 rounded-lg shadow-lg relative">
                {showInstructions ? (
                    <>
                        <h2 className="text-2xl font-bold mb-4">How to Play</h2>
                        <p className="mb-4">
                            The goal of the memory game is to match pairs of cards with the same image.
                            <br /><br />
                            Here's how to play:
                            <br /><br />
                            1. The game starts with all 12 cards face down.
                            <br />
                            2. Click on a card to flip it and reveal the image.
                            <br />
                            3. Then, click on a second card to flip it.
                            <br />
                            4. If the images on both cards match, they remain face up.
                            <br />
                            5. If the images do not match, both cards will flip back over after a short delay.
                            <br />
                            6. The objective is to match all pairs of cards in the fewest number of turns possible.
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
                ) : (
                    <div className="App">
                        <h1 className="text-2xl font-bold mb-4">Welcome, {username}</h1>
                        <h1 className="text-4xl font-bold my-3">Magic Match</h1>
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                            onClick={shuffleCards}
                        >
                            New Game
                        </button>

                        <div className="card-grid">
                            {cards.map(card => (
                                <SingleCard
                                    key={card.id}
                                    card={card}
                                    handleChoice={handleChoice}
                                    flipped={
                                        card === choiceOne ||
                                        card === choiceTwo ||
                                        card.matched
                                    }
                                    disabled={disabled}
                                />
                            ))}
                        </div>
                        <p className="text-4xl font-bold turns">Turns: {turns}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MemoryGame;

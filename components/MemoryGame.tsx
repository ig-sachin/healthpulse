'use client';

import { useEffect, useState } from "react";
import "./MemoryGame.css";
import SingleCard from "./SingleCard";
import { createReport } from "@/lib/actions/games.actions";
import { useRouter } from "next/navigation";
import { getRandomName } from "@/lib/utils";

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
    const router = useRouter();

      useEffect(() => {
        const randomName = getRandomName();
        setUsername(randomName);
      }, [setUsername]);

    // shuffle cards
    const shuffleCards = async () => {
        if(turns > 4 && username !== null){
            // Submit Repport of user
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

    // handle a choice
    const handleChoice = card => {
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    }

    // compare 2 selected cards
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

    // reset choices & increase turn  
    const resetTurn = () => {
        setChoiceOne(null);
        setChoiceTwo(null);
        setTurns(prevTurns => prevTurns + 1);
        setDisabled(false);
    }

    // start a new game automatically
    useEffect(() => {
        shuffleCards();
    }, []);

    return (
        <div className="flex justify-center">
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
                <p>Turns: {turns}</p>
            </div>
        </div>
    );
}

export default MemoryGame;

'use client';

import "./SingleCard.css";

function SingleCard({ card, handleChoice, flipped, disabled }) {
    const handleClick = () => {
        !disabled && handleChoice(card);
    }

    return (
        <div className="card">
            <div className={flipped ? "flipped" : ""}>
                <img className="front h-48 w-96 object-cover" src={card.src} alt="card front" />
                <img
                    className="back h-48 w-96 object-cover"
                    src="/assets/images/games.png"
                    onClick={handleClick}
                    alt="cover" />
            </div>
        </div>
    );
}

export default SingleCard;

'use client';

import "./SingleCard.css";

function SingleCard({ card, handleChoice, flipped, disabled }) {
    const handleClick = () => {
        !disabled && handleChoice(card);
    }

    return (
        <div className="card">
            <div className={flipped ? "flipped" : ""}>
                <img className="front" src={card.src} alt="card front" />
                <img
                    className="back"
                    src="/img/cover.png"
                    onClick={handleClick}
                    alt="cover" />
            </div>
        </div>
    );
}

export default SingleCard;
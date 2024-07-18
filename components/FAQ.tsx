import React, { useState } from 'react';

const FAQ = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAnswer = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="mb-4" style={{ width: '60%' }}>
            <div className="flex justify-between cursor-pointer" onClick={toggleAnswer}>
                <h3 className="text-lg font-semibold">{question}</h3>
                <svg className={`w-6 h-6 ${isOpen ? 'transform rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                </svg>
            </div>
            {isOpen && (
                <p className="text-neutral-400 mt-2">{answer}</p>
            )}
        </div>
    );
};

export default FAQ;

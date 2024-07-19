"use client";

import Navbar from '@/components/Navbar';
import React, { useState } from 'react';
import Image from "next/image";
import FAQ from '@/components/FAQ';
import BlogSlider from '@/components/BlogSlider';

const Page = () => {
    const teamMembers = [
        { name: 'Sachin Vishwakarma', role: 'Lead Developer', photo: '/assets/images/sachin.jpeg' },
        { name: 'Rucha Vaikar', role: 'Backend Dev', photo: '/assets/images/rucha.png' },
        { name: 'Anjali Dofe', role: 'Frontend Dev', photo: '/assets/images/anjali.png' },
        { name: 'Sakshi Kumari', role: 'Support', photo: '/assets/images/sakshi.png' },
        { name: 'Manansh Arora', role: 'Lead Developer', photo: '/assets/images/manansh.png' },
        { name: 'Vidisha Pandey', role: 'Backend Dev', photo: '/assets/images/vidisha.png' },
        { name: 'Prajjwal Singh', role: 'Game Developer', photo: '/assets/images/prajjwal.png' },
    ];

    const faqs = [
        {
            question: "What types of games are available for dementia patients?",
            answer: "Our website features a variety of games designed to stimulate the mind and keep dementia patients engaged. These games are carefully curated to help improve cognitive function and provide entertainment."
        },
        {
            question: "How does the facial recognition feature work?",
            answer: "With our facial recognition feature, users can take a photo of a person and the website will help remind them who they are. This can be incredibly useful for patients who have difficulty remembering faces."
        },
        {
            question: "What can the virtual nurse chatbot assist with?",
            answer: "Our virtual nurse chatbot is available to assist users with various tasks and provide support. The chatbot can answer questions, give reminders about medications, and much more."
        },
        {
            question: "Can I customize the features for my needs?",
            answer: "Yes, our website allows users to customize certain features to better suit their needs. You can personalize settings for games, reminders, and more."
        }
    ];

    return (
        <>
            <Navbar />
            <div className="flex flex-col h-screen max-h-screen pt-16">
                <section className="p-4">
                    <h1 className="flex justify-center text-2xl font-bold mb-4">Our Team</h1>
                    <div className="flex flex-wrap justify-center gap-8">
                        {teamMembers.map((member, index) => (
                            <div key={index} className="text-center">
                                <img
                                    src={member.photo}
                                    alt={member.name}
                                    width={50}
                                    height={25}
                                    className="w-18 h-18 rounded-full mx-auto mb-2"
                                />
                                <h2 className="text-xl font-semibold">{member.name}</h2>
                                <p className="text-gray-300">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </section>
                <section className="flex flex-col p-4 space-y-8 items-center">
                    {/* First Card: Games */}
                    <div className="flex flex-col md:flex-row items-center bg-gradient-to-r from-blue-200 to-blue-400 p-4 rounded-lg shadow-lg" style={{ maxWidth: '60%' }}>
                        <div className="w-full  md:w-1/2 p-4 flex justify-center md:justify-start">
                            <Image
                                src="/assets/images/games.png"
                                alt="Games for Dementia Patients"
                                width={200}
                                height={200}
                                className="w-fit h-auto"
                            />
                        </div>
                        <div className="w-full md:w-1/2 p-4">
                            <h2 className="text-2xl font-bold mb-2">Engaging Games</h2>
                            <p className="text-lg">
                                Our website features a variety of games designed to stimulate the mind and keep dementia patients engaged. These games are carefully curated to help improve cognitive function and provide entertainment.
                            </p>
                        </div>
                    </div>

                    {/* Second Card: Facial Recognition */}
                    <div className="flex flex-col md:flex-row items-center bg-gradient-to-r from-green-200 to-green-400 p-4 rounded-lg shadow-lg" style={{ maxWidth: '60%' }}>
                        <div className="w-full md:w-1/2 p-4">
                            <h2 className="text-2xl font-bold mb-2 text-neutral-500">Facial Recognition</h2>
                            <p className="text-lg text-neutral-500">
                                With our facial recognition feature, users can take a photo of a person and the website will help remind them who they are. This can be incredibly useful for patients who have difficulty remembering faces.
                            </p>
                        </div>
                        <div className="w-full md:w-1/2 p-4 flex justify-center md:justify-end">
                            <Image
                                src="/assets/images/facial.png"
                                alt="Facial Recognition Feature"
                                width={200}
                                height={200}
                                className="w-fit h-auto"
                            />
                        </div>
                    </div>

                    {/* Third Card: Virtual Nurse Chatbot */}
                    <div className="flex flex-col md:flex-row items-center bg-gradient-to-r from-purple-200 to-purple-400 p-4 rounded-lg shadow-lg" style={{ maxWidth: '60%' }}>
                        <div className="w-full md:w-1/2 p-4 flex justify-center md:justify-start">
                            <Image
                                src="/assets/images/nurse.png"
                                alt="Virtual Nurse Chatbot"
                                width={200}
                                height={200}
                                className="w-fit h-auto"
                            />
                        </div>
                        <div className="w-full md:w-1/2 p-4">
                            <h2 className="text-2xl font-bold mb-2">Virtual Nurse Chatbot</h2>
                            <p className="text-lg">
                                Our virtual nurse chatbot is available to assist users with various tasks and provide support. The chatbot can answer questions, give reminders about medications, and much more.
                            </p>
                        </div>
                    </div>
                </section>
                <section className="flex-col items-center flex-grow p-4 w-full">
                    <h1 className="flex justify-center text-2xl font-bold my-4">FAQ'S</h1>
                    <div className='flex flex-col justify-center items-center'>
                        {faqs.map((faq, index) => (
                            <FAQ key={index} question={faq.question} answer={faq.answer} />
                        ))}
                    </div>
                </section>
            </div>
        </>
    )
}

export default Page;

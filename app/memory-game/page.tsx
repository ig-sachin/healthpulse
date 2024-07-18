import MemoryGame from '@/components/MemoryGame'
import Navbar from '@/components/Navbar'
import React from 'react'

const page = () => {
    return (
        <div className="flex h-screen max-h-screen">
            <Navbar />
            <div className="flex flex-col h-screen max-h-screen pt-16">
                <MemoryGame />
            </div>
        </div>
    )
}

export default page
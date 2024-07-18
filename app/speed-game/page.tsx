import Navbar from '@/components/Navbar'
import SpeedGame from '@/components/SpeedGame'
import React from 'react'

const page = () => {
    return (
        <div className="flex h-screen max-h-screen">
            <Navbar />
            <div className="flex flex-col h-screen max-h-screen pt-16">
                <SpeedGame />
            </div>
        </div >
    )
}

export default page
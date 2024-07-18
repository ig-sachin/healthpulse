"use client";

// components/Box.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface BoxProps {
  imageUrl: string;
  altText: string;
  description: string;
  linkTo: string;
}

const Box: React.FC<BoxProps> = ({ imageUrl, altText, description, linkTo }) => {
  const router = useRouter();
  return (
    // <Link href={linkTo} className="flex flex-col items-center p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300">
    <div className="flex flex-col items-center p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300">
      <Image 
        src={imageUrl} 
        alt={altText} 
        width={200} 
        height={150} 
        className="rounded-md" 
      />
      <p className="mt-2 text-center text-white font-bold text-xl">{description}</p>
      <button onClick={() => router.push(linkTo)} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Go To Game
      </button>
    </div>

  );
};

export default Box;

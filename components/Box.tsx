"use client";

// components/Box.tsx
import React from 'react';
import Image from 'next/image';
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
    <div className="flex flex-col items-center p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300">
      <div className="image-container">
        <Image
          src={imageUrl}
          alt={altText}
          width={200}
          height={200}
          // style={{ maxHeight: 140 }}
          className="object-cover rounded-md"
        />
      </div>
      <div className='flex flex-col justify-between'>
        <p className="mt-2 text-center text-white font-bold text-xl">{description}</p>
        <button onClick={() => router.push(linkTo)} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Go To Game
        </button>
      </div>
    </div>
  );
};

export default Box;

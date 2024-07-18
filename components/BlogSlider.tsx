import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const BlogSlider = ({ blogs }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % blogs.length);
        }, 3000); // Change slide every 3 seconds

        return () => clearInterval(interval);
    }, [blogs.length]);

    return (
        <div className="relative w-full max-w-4xl mx-auto">
            {blogs.map((blog, index) => (
                <div
                    key={index}
                    className={`absolute transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'
                        }`}
                    style={{ transform: `translateX(${index === currentIndex ? 0 : 100}%)` }}
                >
                    <div className="flex flex-col md:flex-row items-center bg-white p-4 rounded-lg shadow-lg space-y-4 md:space-y-0 md:space-x-4">
                        <Image src={blog.image} alt={blog.title} width={150} height={150} className="rounded-lg" />
                        <div>
                            <h2 className="text-xl font-bold">{blog.title}</h2>
                            <p className="text-gray-700">{blog.content}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BlogSlider;

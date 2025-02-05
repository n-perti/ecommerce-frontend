'use client'
import { Link } from 'lucide-react';
import { useEffect } from 'react';

const NotFound = () => {
    useEffect(() => {
        setTimeout(() => {
            window.location.href = '/';
        }, 3000);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-6xl font-bold text-gray-800">404</h1>
            <p className="mt-4 text-xl text-gray-600">Page Not Found</p>
            <p className="mt-4 text-xl text-gray-600">You will be redirected to the homepage in 3 seconds...</p>
        </div>
    );
};

export default NotFound;
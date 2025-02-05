'use client';
import { useAuth } from "@/context/authContext";
import Link from "next/link";

const HomePage = () => {
    const { isAuthenticated, userDetails } = useAuth();
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100 font-sans">
            <div className="text-center">
                <h1 className="text-3xl m-0">Welcome to the Homepage</h1>
                <p className="text-lg text-gray-700">This is the homepage of your Next.js application.</p>
                <p className="text-lg text-gray-700">You are {isAuthenticated ? "logged in" : "not logged in"}</p>
                <p className="text-lg text-gray-700">Your role is {userDetails.role || 'Guest'} </p>

                <div className="mt-8">
                    <Link href="/webcommerces">
                        Explore websites
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
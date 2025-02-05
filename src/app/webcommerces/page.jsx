"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Filters from "@/lib/Filters";
import { getWebCommerces } from "@/lib/webCommerce";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@/components/ui/button";
import { ChevronRight, Star } from "lucide-react";
import Link from 'next/link';
require('dotenv').config();

const WebCommerces = () => {
  const [webCommerces, setWebCommerces] = useState([]);
  const [filteredCommerce, setFilteredCommerce] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getWebCommerces();
        console.log(data);
        setWebCommerces(data);
        setFilteredCommerce(data);
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-1/4 p-4 border-r border-gray-300">
        <div className="bg-white p-4 rounded-lg shadow-sm sticky top-4">
          <h2 className="text-xl font-semibold mb-4">Filters</h2>
          <Filters
            commerce={webCommerces}
            setFilteredCommerce={setFilteredCommerce}
          />
        </div>
      </div>
      <div className="w-full md:w-3/4 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCommerce.map((commerce, index) => (
            <div
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={
                    commerce.images && commerce.images[0]
                      ? `${process.env.API_IMAGE_URL}${commerce.images[0]}`
                      : "/missing-image.jpg"
                  }
                  alt={commerce.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-3 text-gray-900">
                  {commerce.title},
                </h2>
                <div className="space-y-2">
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {commerce.summary ||
                      `Located in ${commerce.city}, specializing in ${commerce.activity}`}
                  </p>
                  <div className="flex items-center justify-between gap-2 text-sm text-gray-500">
                    <div>
                      <span>{commerce.city}</span>
                      <span> • </span>
                      <span>{commerce.activity}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="text-yellow-400" fill="currentColor" />
                      <span className="font-semibold">{commerce.usersReview.scoring.toFixed(1)}</span>
                      <span className="text-sm text-gray-500">({commerce.usersReview.totalReviews} reviews)</span>
                    </div>
                    <Link href={`/webcommerces/${commerce.commerceCIF}`}>
                      <Button variant="outline" size="icon">
                        <ChevronRight size={24} />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default WebCommerces;

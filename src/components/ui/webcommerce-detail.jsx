"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Star, ChevronLeft, MapPin, Briefcase, Clock } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ReviewDialog from "@/components/ui/review-dialog";
import { toast } from "react-toastify";
import { createReview } from "@/lib/review";
import Cookies from "js-cookie";

const CommerceCard = ({ commerce }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleReviewCreated = async (review) => {
    try {
      await createReview(review, Cookies.get("token"), commerce.commerceCIF);
      toast.success("Review created successfully");
    } catch (error) {
      console.error("Error creating review:", error);
      toast.error("Failed to create review. Please try again.");
    }
  };

  const images = commerce.images && commerce.images.length > 0
    ? commerce.images
    : ["/missing-image.jpg"];

  return (
    <Card className="w-full max-w-7xl mx-auto rounded-xl shadow-lg overflow-hidden">
      <CardHeader className="relative p-0">
        <Carousel className="w-full">
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index}>
                <div className="relative h-96 w-full overflow-hidden">
                  <Image
                    src={image === "/missing-image.jpg" ? image : `${process.env.API_IMAGE_URL}${image}`}
                    alt={`${commerce.title} - Image ${index + 1}`}
                    fill
                    className="object-center object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {images.length > 1 && (
            <>
              <CarouselPrevious className="left-4" />
              <CarouselNext className="right-4" />
            </>
          )}
        </Carousel>
        <div className="absolute bottom-0 left-0 p-8 w-full">
          <CardTitle className="text-4xl font-bold mb-2 text-white">
            {commerce.title}
          </CardTitle>
          <CardDescription className="text-gray-200 text-xl leading-relaxed max-w-3xl">
            {commerce.summary ||
              `Located in ${commerce.city}, specializing in ${commerce.activity}`}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                About {commerce.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                {commerce.description || "No description available."}
              </p>
            </section>
            <section>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Location & Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-base text-gray-600">
                <div className="flex items-center gap-2">
                  <MapPin size={20} className="text-primary" />
                  <span>{commerce.city}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase size={20} className="text-primary" />
                  <span>{commerce.activity}</span>
                </div>
              </div>
            </section>
          </div>
          <div className="lg:col-span-1">
            <section className="bg-gray-50 p-6 rounded-lg shadow-inner">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-semibold text-gray-800">
                  Reviews
                </h3>
                <div className="flex items-center gap-2">
                  <Star
                    className="text-yellow-400"
                    fill="currentColor"
                    size={28}
                  />
                  <span className="font-semibold text-3xl">
                    {commerce.usersReview.scoring.toFixed(1)}
                  </span>
                </div>
              </div>
              <Badge variant="secondary" className="text-sm mb-4">
                {getReviewLabel(commerce.usersReview.scoring)}
              </Badge>
              <p className="text-gray-600 mb-6">
                Based on {commerce.usersReview.totalReviews} reviews
              </p>
              <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                {commerce.usersReview.review.map((review, index) => (
                  <div
                    key={index}
                    className="bg-white border border-gray-200 p-4 rounded-lg hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <Clock size={14} className="text-gray-400" />
                        <span className="text-sm text-gray-500">
                          {review.date}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Star
                          className="text-yellow-400"
                          fill="currentColor"
                          size={16}
                        />
                        <span className="ml-1 font-semibold">
                          {review.rating}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-700">{review.review}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row justify-between items-center p-8 bg-gray-100 rounded-b-xl">
        <Link href={`/webcommerces`} className="w-full sm:w-auto mb-4 sm:mb-0">
          <Button variant="outline" size="lg" className="w-full sm:w-auto">
            <ChevronLeft size={16} className="mr-2" />
            Back to Webpages
          </Button>
        </Link>
        <Button
          variant="default"
          size="lg"
          onClick={() => setIsDialogOpen(true)}
          className="w-full sm:w-auto"
        >
          Add Review
        </Button>
        <ReviewDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onReviewCreated={handleReviewCreated}
        />
      </CardFooter>
    </Card>
  );
};

function getReviewLabel(score) {
  if (score >= 4.5) return "Excellent";
  if (score >= 4) return "Very Good";
  if (score >= 3.5) return "Good";
  if (score >= 3) return "Average";
  return "Fair";
}

export default CommerceCard;


"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

const banners = [
  {
    image: "/images/banner-1.jpg",
    title: "Exclusive Collection",
    subtitle: "Discover the latest trends",
  },
  {
    image: "/images/banner-2.jpg",
    title: "Premium Quality",
    subtitle: "Unmatched comfort and style",
  },
];

export default function HeroCarousel() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full h-96 overflow-hidden rounded-lg shadow-lg mb-5">
      {banners.map((banner, index) => (
        <div
          key={index}
          className={`inset-0 transition-opacity duration-700 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={banner.image}
            alt={banner.title}
            layout="fill"
            objectFit="contain"
            className="brightness-75"
          />
          {/* <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
            <h1 className="text-4xl font-bold drop-shadow-lg">
              {banner.title}
            </h1>
            <p className="text-lg mt-2 drop-shadow-md">{banner.subtitle}</p>
            <Button className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-3 rounded-lg shadow-md">
              Shop Now
            </Button>
          </div> */}
        </div>
      ))}
      <div className="absolute inset-0 flex items-center justify-between px-4">
        <Button
          onClick={prevSlide}
          variant="ghost"
          size="icon"
          className="bg-black/30 text-white hover:bg-black/50"
        >
          &#8592;
        </Button>
        <Button
          onClick={nextSlide}
          variant="ghost"
          size="icon"
          className="bg-black/30 text-white hover:bg-black/50"
        >
          &#8594;
        </Button>
      </div>
    </div>
  );
}

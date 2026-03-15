'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const photos = [
  '/images/personal/AJ-Headshot-Copy.png',
  '/images/personal/ISEvent.jpeg',
  '/images/personal/ReaganandAndrew.jpg',
  '/images/personal/Kauai.jpeg',
];

export function AboutGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % photos.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % photos.length);
  };

  const goToPrevious = () => {
    setActiveIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const minSwipeDistance = 50;

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchEndX(null);
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX === null || touchEndX === null) return;

    const distance = touchStartX - touchEndX;

    if (distance > minSwipeDistance) {
      goToNext();
    } else if (distance < -minSwipeDistance) {
      goToPrevious();
    }
  };

  return (
    <div className="glass relative h-90 overflow-hidden rounded-4xl p-3 shadow-2xl sm:h-112.5">
      <div
        className="relative h-full w-full overflow-hidden rounded-3xl"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {photos.map((photo, index) => (
          <div
            key={photo}
            className={`absolute inset-0 transition-all duration-700 ${
              index === activeIndex
                ? 'opacity-100 scale-100'
                : 'pointer-events-none opacity-0 scale-105'
            }`}
          >
            <Image
              src={photo}
              alt={`About photo ${index + 1}`}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        ))}

        <button
          type="button"
          onClick={goToPrevious}
          aria-label="Previous photo"
          className="absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <button
          type="button"
          onClick={goToNext}
          aria-label="Next photo"
          className="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {photos.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            aria-label={`Show photo ${index + 1}`}
            className={`h-3 w-3 rounded-full transition ${
              index === activeIndex ? 'bg-white' : 'bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
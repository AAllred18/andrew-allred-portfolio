'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type ProjectGalleryProps = {
  photos?: string[];
  altPrefix?: string;
};

export function ProjectGallery({
  photos = [],
  altPrefix = 'Project image'
}: ProjectGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % photos.length);
  };

  const goToPrevious = () => {
    setActiveIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setLightboxOpen(false);
      }
      if (event.key === 'ArrowRight') {
        goToNext();
      }
      if (event.key === 'ArrowLeft') {
        goToPrevious();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, photos.length]);

  if (!photos.length) return null;

  return (
    <>
      <div className="glass relative overflow-hidden rounded-4xl p-4 shadow-2xl">
        <div className="relative h-105 w-full overflow-hidden rounded-3xl bg-slate-40 dark:bg-slate-900">
          {photos.map((photo, index) => (
            <button
              key={photo}
              type="button"
              onClick={() => {
                setActiveIndex(index);
                setLightboxOpen(true);
              }}
              className={`absolute inset-0 transition-all duration-700 ${
                index === activeIndex
                  ? 'z-10 scale-100 opacity-100'
                  : 'pointer-events-none z-0 scale-[1.02] opacity-0'
              }`}
              aria-label={`Open ${altPrefix} ${index + 1}`}
            >
              <Image
                src={photo}
                alt={`${altPrefix} ${index + 1}`}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-contain p-4"
              />
            </button>
          ))}

          {photos.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevious();
                }}
                aria-label="Previous image"
                className="absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/80 text-slate-900 shadow backdrop-blur-md transition hover:bg-white"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext();
                }}
                aria-label="Next image"
                className="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/80 text-slate-900 shadow backdrop-blur-md transition hover:bg-white"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}
        </div>

        {photos.length > 1 && (
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {photos.map((photo, index) => (
              <button
                key={`${photo}-${index}`}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Show image ${index + 1}`}
                className={`relative h-14 w-14 overflow-hidden rounded-xl border transition ${
                  index === activeIndex
                    ? 'border-blue-500 ring-2 ring-blue-200 dark:ring-blue-900'
                    : 'border-slate-200 hover:border-slate-400 dark:border-slate-700 dark:hover:border-slate-500'
                }`}
              >
                <Image
                  src={photo}
                  alt={`${altPrefix} thumbnail ${index + 1}`}
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {lightboxOpen && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setLightboxOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative flex h-full max-h-[90vh] w-full max-w-6xl items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              className="absolute right-0 top-0 z-20 rounded-full bg-white/90 px-3 py-2 text-sm font-medium text-slate-900 shadow hover:bg-white"
            >
              Close
            </button>

            {photos.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={goToPrevious}
                  className="absolute left-2 z-20 rounded-full bg-white/90 p-3 text-slate-900 shadow hover:bg-white"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                <button
                  type="button"
                  onClick={goToNext}
                  className="absolute right-2 z-20 rounded-full bg-white/90 p-3 text-slate-900 shadow hover:bg-white"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}

            <div className="relative h-full w-full">
              <Image
                src={photos[activeIndex]}
                alt={`${altPrefix} ${activeIndex + 1}`}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
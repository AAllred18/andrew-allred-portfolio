'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

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

  useEffect(() => {
    if (photos.length <= 1 || lightboxOpen) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % photos.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [photos.length, lightboxOpen]);

  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setLightboxOpen(false);
      }
      if (event.key === 'ArrowRight') {
        setActiveIndex((prev) => (prev + 1) % photos.length);
      }
      if (event.key === 'ArrowLeft') {
        setActiveIndex((prev) => (prev - 1 + photos.length) % photos.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, photos.length]);

  return (
    <>
      <div className="glass relative overflow-hidden rounded-[2rem] p-4 shadow-2xl">
        <div className="relative h-[420px] w-full overflow-hidden rounded-[1.5rem] bg-slate-40 dark:bg-slate-900">
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
                  ? 'z-10 opacity-100 scale-100'
                  : 'pointer-events-none z-0 opacity-0 scale-[1.02]'
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
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4"
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
                  onClick={() =>
                    setActiveIndex((prev) => (prev - 1 + photos.length) % photos.length)
                  }
                  className="absolute left-2 z-20 rounded-full bg-white/90 px-4 py-3 text-lg font-semibold text-slate-900 shadow hover:bg-white"
                  aria-label="Previous image"
                >
                  ‹
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setActiveIndex((prev) => (prev + 1) % photos.length)
                  }
                  className="absolute right-2 z-20 rounded-full bg-white/90 px-4 py-3 text-lg font-semibold text-slate-900 shadow hover:bg-white"
                  aria-label="Next image"
                >
                  ›
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
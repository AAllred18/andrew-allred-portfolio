'use client';

import Tilt from 'react-parallax-tilt';
import Image from 'next/image';
import { motion } from 'framer-motion';

export function HeroArtTilt() {
  return (
    <Tilt
      tiltMaxAngleX={10}
      tiltMaxAngleY={10}
      scale={1.01}
      glareEnable={false}
      className="relative mx-auto flex h-64 w-64 items-center justify-center sm:h-80 sm:w-80 md:h-104 md:w-104 lg:h-124 lg:w-124"
    >
      <div className="absolute h-40 w-40 rounded-full bg-blue-500/20 blur-3xl sm:h-56 sm:w-56 md:h-72 md:w-72" />
      <div className="absolute h-52 w-52 rounded-full bg-cyan-400/10 blur-3xl sm:h-72 sm:w-72 md:h-96 md:w-96" />

      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="relative h-44 w-44 sm:h-56 sm:w-56 md:h-72 md:w-72 lg:h-80 lg:w-80"
      >
        <div
          className="absolute inset-0 -translate-x-2 translate-y-2 opacity-15 blur-sm sm:-translate-x-3 sm:translate-y-3"
          aria-hidden="true"
        >
          <Image
            src="/images/ar-logo.svg"
            alt=""
            fill
            sizes="(max-width: 640px) 176px, (max-width: 768px) 224px, (max-width: 1024px) 288px, 320px"
            className="object-contain"
          />
        </div>

        <div
          className="absolute inset-0 translate-x-2 -translate-y-2 opacity-35 sm:translate-x-3 sm:-translate-y-3"
          aria-hidden="true"
        >
          <Image
            src="/images/ar-logo.svg"
            alt=""
            fill
            sizes="(max-width: 640px) 176px, (max-width: 768px) 224px, (max-width: 1024px) 288px, 320px"
            className="object-contain"
          />
        </div>

        <div className="absolute inset-0">
          <Image
            src="/images/ar-logo.svg"
            alt="AR monogram"
            fill
            priority
            sizes="(max-width: 640px) 176px, (max-width: 768px) 224px, (max-width: 1024px) 288px, 320px"
            className="object-contain drop-shadow-[0_18px_45px_rgba(37,99,235,0.28)]"
          />
        </div>
      </motion.div>
    </Tilt>
  );
}
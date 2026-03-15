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
      className="relative flex h-65 w-65 items-center justify-center sm:h-85 sm:w-85 md:h-105 md:w-105 lg:h-125 lg:w-125"
    >
      <div className="absolute h-40 w-40 rounded-full bg-blue-500/20 blur-3xl sm:h-56 sm:w-56 md:h-72 md:w-72" />
      <div className="absolute h-52 w-52 rounded-full bg-cyan-400/10 blur-3xl sm:h-72 sm:w-72 md:h-96 md:w-[24rem]" />

      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="relative h-42.5 w-42.5 sm:h-55 sm:w-55 md:h-75 md:w-75 lg:h-90 lg:w-90"
      >
        <div className="absolute inset-0 translate-x-3 translate-y-3 opacity-15 blur-sm sm:translate-x-4 sm:translate-y-4" aria-hidden="true">
          <Image
            src="/images/ar-logo.svg"
            alt=""
            fill
            sizes="(max-width: 640px) 170px, (max-width: 768px) 220px, (max-width: 1024px) 300px, 360px"
            className="object-contain"
          />
        </div>

        <div className="absolute inset-0 translate-x-1.5 translate-y-1.5 opacity-35 sm:translate-x-2 sm:translate-y-2" aria-hidden="true">
          <Image
            src="/images/ar-logo.svg"
            alt=""
            fill
            sizes="(max-width: 640px) 170px, (max-width: 768px) 220px, (max-width: 1024px) 300px, 360px"
            className="object-contain"
          />
        </div>

        <div className="absolute inset-0">
          <Image
            src="/images/ar-logo.svg"
            alt="AR monogram"
            fill
            priority
            sizes="(max-width: 640px) 170px, (max-width: 768px) 220px, (max-width: 1024px) 300px, 360px"
            className="object-contain drop-shadow-[0_18px_45px_rgba(37,99,235,0.28)]"
          />
        </div>
      </motion.div>
    </Tilt>
  );
}
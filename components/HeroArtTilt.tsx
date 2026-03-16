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
      className="relative mx-auto flex h-56 w-56 items-center justify-center sm:h-72 sm:w-72 md:h-[22rem] md:w-[22rem] lg:h-[26rem] lg:w-[26rem]"
    >
      <div className="absolute h-36 w-36 rounded-full bg-blue-500/25 blur-3xl sm:h-48 sm:w-48 md:h-64 md:w-64" />
      <div className="absolute h-44 w-44 rounded-full bg-cyan-400/15 blur-3xl sm:h-60 sm:w-60 md:h-80 md:w-80" />

      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="relative h-48 w-48 sm:h-60 sm:w-60 md:h-80 md:w-80 lg:h-88 lg:w-88"
      >
        <div
          className="absolute inset-0 translate-x-3 translate-y-3 opacity-28"
          aria-hidden="true"
        >
          <Image
            src="/images/ar-logo.svg"
            alt=""
            fill
            sizes="(max-width: 640px) 192px, (max-width: 768px) 240px, (max-width: 1024px) 320px, 352px"
            className="object-contain"
          />
        </div>

        <div
          className="absolute inset-0 translate-x-1.5 translate-y-1.5 opacity-18 blur-[2px]"
          aria-hidden="true"
        >
          <Image
            src="/images/ar-logo.svg"
            alt=""
            fill
            sizes="(max-width: 640px) 192px, (max-width: 768px) 240px, (max-width: 1024px) 320px, 352px"
            className="object-contain"
          />
        </div>

        <div className="absolute inset-0">
          <Image
            src="/images/ar-logo.svg"
            alt="AR monogram"
            fill
            priority
            sizes="(max-width: 640px) 192px, (max-width: 768px) 240px, (max-width: 1024px) 320px, 352px"
            className="object-contain"
          />
        </div>
      </motion.div>
    </Tilt>
  );
}
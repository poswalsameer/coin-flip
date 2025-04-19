import React from 'react';
import { motion } from 'framer-motion';
import { HeadsComponent, TailsComponent } from '../index';

export default function CoinAnimationComponent() {
  return (
    <div 
      className="
      relative w-48 h-48
      sm:relative sm:w-72 sm:h-72
      md:relative md:w-72 md:h-72
      lg:relative lg:w-72 lg:h-72
      xl:relative xl:w-72 xl:h-72
      2xl:relative 2xl:w-80 2xl:h-80" 
      style={{ perspective: '1000px' }}>
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear'
        }}
      >
        <div style={{
          backfaceVisibility: 'hidden',
          position: 'absolute',
          width: '100%',
          height: '100%'
        }}>
          <HeadsComponent />
        </div>
        <div style={{
          backfaceVisibility: 'hidden',
          position: 'absolute',
          width: '100%',
          height: '100%',
          transform: 'rotateY(180deg)'
        }}>
          <TailsComponent />
        </div>
      </motion.div>
    </div>
  );
}


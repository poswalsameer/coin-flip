import React from 'react';
import { motion } from 'framer-motion';
import { HeadsComponent, TailsComponent } from '../index';

export default function CoinAnimationComponent() {
  return (
    <div className="relative w-80 h-80" style={{ perspective: '1000px' }}>
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


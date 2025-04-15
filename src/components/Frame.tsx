"use client";

import { useEffect, useRef } from "react";
import { GRID_CELLS, NEON_PURPLE, NEON_PINK } from "~/lib/constants";
import anime from 'animejs';
import { useFrameSDK } from "~/hooks/useFrameSDK";

function CyberpunkGrid() {
  const gridRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    // Create grid cells
    const cellCount = GRID_CELLS; // 6x6 grid defined in constants
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div');
      cell.className = 'grid-cell';
      grid.appendChild(cell);
    }

    // Animate grid cells with flow effect
    anime({
      targets: '.grid-cell',
      translateZ: [
        {value: [-50, 50], duration: GRID_ANIMATION_DURATION, easing: 'easeInOutSine'},
      ],
      scale: [
        {value: [0.8, 1.2], duration: GRID_ANIMATION_DURATION, easing: 'easeInOutQuad'}
      ],
      opacity: [
        {value: [0.5, 1], duration: GRID_ANIMATION_DURATION, easing: 'easeInOutSine'}
      ],
      delay: anime.stagger(100, {grid: [6, 6], from: 'center'}),
      loop: true,
      direction: 'alternate',
      autoplay: true
    });

    // Glow animation
    anime({
      targets: '.grid-cell',
      boxShadow: [
        {value: '0 0 2px rgba(255, 0, 255, 0.2), 0 0 4px rgba(255, 0, 255, 0.2), 0 0 6px rgba(255, 0, 255, 0.2)', duration: 1000},
        {value: '0 0 4px rgba(255, 0, 255, 0.4), 0 0 8px rgba(255, 0, 255, 0.4), 0 0 12px rgba(255, 0, 255, 0.4)', duration: 1000}
      ],
      delay: anime.stagger(100, {grid: [6, 6], from: 'center'}),
      loop: true,
      direction: 'alternate',
      easing: 'easeInOutSine'
    });
  }, []);

  return (
    <div className="perspective-container">
      <div 
        ref={gridRef} 
        className="grid grid-cols-6 gap-2 w-full h-full bg-black/80 p-4 grid-3d"
        style={{
          minHeight: '300px',
          transform: 'rotateX(45deg)',
          transformStyle: 'preserve-3d'
        }}
      />
      <style jsx>{`
        .perspective-container {
          perspective: ${PERSPECTIVE};
          perspective-origin: center center;
        }
        .grid-3d {
          transform-style: preserve-3d;
          animation: float 3s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: rotateX(45deg) translateZ(0px); }
          50% { transform: rotateX(45deg) translateZ(20px); }
        }
      `}</style>
    </div>
  );
}

export default function Frame() {
  const { isSDKLoaded } = useFrameSDK();

  if (!isSDKLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full mx-auto">
      <CyberpunkGrid />
      <style jsx global>{`
        .grid-cell {
          background: linear-gradient(45deg, ${NEON_PURPLE}20, ${NEON_PINK}20);
          border: 1px solid ${NEON_PURPLE}40;
          border-radius: 4px;
          aspect-ratio: 1;
          transform-style: preserve-3d;
          transition: all 0.3s ease;
        }
        
        .grid-cell:hover {
          background: linear-gradient(45deg, #ff00ff40, #8a2be240);
          box-shadow: 0 0 10px #ff00ff, 0 0 20px #8a2be2;
          transform: scale(1.1);
        }
      `}</style>
    </div>
  );
}

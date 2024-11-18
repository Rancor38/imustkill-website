// Sparks.js

import React from 'react';
import './Sparks.css';

const Sparks = () => {
  return (
    <>
      {Array.from({ length: 60 }).map((_, index) => {
        // Randomize starting position near the bottom right
        const startX = `${Math.random() * 10}vw`; // 0 to 10vw offset from the right
        const startY = `${Math.random() * 10}vh`; // 0 to 10vh offset from the bottom

        // Randomize extended drift to the left and upward beyond the viewport
        const driftX = `${-Math.random() * 150}vw`; // -0 to -150vw to the left
        const driftY = `${-Math.random() * 150}vh`; // -0 to -150vh upward

        // Random rotation between 0 and 360 degrees
        const rotation = `${Math.random() * 360}deg`;

        // Random size between 0.5 and 1.5 times the base size
        const size = 0.5 + Math.random() * 1;

        // Random animation duration between 5s and 15s (twice the speed)
        const duration = `${5 + Math.random() * 10}s`;

        // Random animation delay between 0s and 20s to stagger the animations
        const delay = `${Math.random() * 20}s`;

        return (
          <div
            key={index}
            className="spark"
            style={{
              '--start-x': `${startX}`,
              '--start-y': `${startY}`,
              '--end-x': `${driftX}`,
              '--end-y': `${driftY}`,
              '--rotation': rotation,
              '--size': size,
              '--duration': duration,
              '--delay': delay,
            }}
          ></div>
        );
      })}
    </>
  );
};

export default Sparks;
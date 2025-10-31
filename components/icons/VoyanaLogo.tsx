
import React from 'react';

export const VoyanaLogo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 185 42" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g transform="translate(0, 9) scale(1.2)" fill="currentColor">
      <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
    </g>
    <text x="34" y="28" fontFamily="Montserrat, sans-serif" fontSize="30" fontWeight="800" fill="currentColor" letterSpacing="0.02em">VOYANA</text>
    <text x="36" y="40" fontFamily="Poppins, sans-serif" fontSize="9" fontWeight="500" fill="currentColor" letterSpacing="0.2em">TRAVEL</text>
  </svg>
);

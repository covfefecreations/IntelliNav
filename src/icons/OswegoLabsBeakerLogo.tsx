import React from 'react';

export const OswegoLabsBeakerLogo: React.FC<{ size?: number; className?: string; title?: string }> = ({ size = 76, className, title }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 120 120" role="img" aria-label={title || 'OswegoPark Labs'}>
    <defs>
      <linearGradient id="labGrad" x1="0" x2="1">
        <stop offset="0" stopColor="var(--tf-colors-glow-matteBlue, #9BBFF7)"/>
        <stop offset="1" stopColor="var(--tf-colors-glow-periwinkle, #A6B5FF)"/>
      </linearGradient>
      <filter id="labGlow">
        <feGaussianBlur stdDeviation="3"/>
      </filter>
    </defs>

    <g filter="url(#labGlow)">
      <path d="M30 20 H90 L78 60 A26 26 0 0 1 42 60 L30 20 Z" fill="url(#labGrad)" opacity="0.95" stroke="var(--tf-colors-brand-labInk, #3B6EA3)" strokeWidth="1.8" />
      <path d="M40 66 H80" stroke="var(--tf-colors-glow-apricot, #FFB78A)" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="58" cy="84" r="6" fill="var(--tf-colors-glow-sunflower, #F6D87A)"/>
      <circle cx="72" cy="92" r="4" fill="var(--tf-colors-glow-periwinkle, #A6B5FF)"/>
    </g>
  </svg>
);
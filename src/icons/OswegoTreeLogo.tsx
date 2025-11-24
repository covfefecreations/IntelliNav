import React from 'react';

export const OswegoTreeLogo: React.FC<{ size?: number; className?: string; title?: string }> = ({ size = 96, className, title }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 120 120" role="img" aria-label={title || 'OswegoPark Tree'}>
    <defs>
      <linearGradient id="leafGrad" x1="0" x2="1">
        <stop offset="0" stopColor="var(--tf-colors-glow-periwinkle, #A6B5FF)" />
        <stop offset="1" stopColor="var(--tf-colors-glow-matteBlue, #9BBFF7)" />
      </linearGradient>
      <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur"/>
        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>

    <g filter="url(#softGlow)">
      <circle cx="60" cy="22" r="16" fill="url(#leafGrad)" opacity="0.95" />
      <circle cx="38" cy="50" r="12" fill="var(--tf-colors-glow-periwinkle, #A6B5FF)" />
      <circle cx="82" cy="50" r="12" fill="var(--tf-colors-glow-sunflower, #F6D87A)" />
      <circle cx="60" cy="82" r="12" fill="var(--tf-colors-brand-treeLeaf, #6CCF9A)" />

      <path d="M60 40 L40 55" stroke="var(--tf-colors-accent-periwinkleDeep, #8DA0FF)" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M60 40 L80 55" stroke="var(--tf-colors-accent-periwinkleDeep, #8DA0FF)" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M40 60 L60 80" stroke="var(--tf-colors-accent-periwinkleDeep, #8DA0FF)" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M80 60 L60 80" stroke="var(--tf-colors-accent-periwinkleDeep, #8DA0FF)" strokeWidth="2.5" strokeLinecap="round"/>

      <rect x="56" y="90" width="8" height="20" rx="2" fill="var(--tf-colors-brand-treeLeaf, #6CCF9A)" />
    </g>
  </svg>
);
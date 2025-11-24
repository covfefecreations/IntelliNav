import React from "react";

export interface IconProps {
  size?: number;
  className?: string;
  "aria-label"?: string;
}

export const OswegoTree: React.FC<IconProps> = ({
  size = 72,
  className,
  ...rest
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 200 200"
    fill="none"
    stroke="currentColor"
    strokeWidth="8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...rest}
  >
    <circle cx="100" cy="20" r="10" fill="#6CE8FF" stroke="none" />
    <circle cx="50" cy="70" r="10" fill="#FF72D0" stroke="none" />
    <circle cx="150" cy="70" r="10" fill="#FFD86B" stroke="none" />
    <circle cx="100" cy="120" r="10" fill="#2BCF81" stroke="none" />

    <line x1="100" y1="30" x2="50" y2="70" stroke="#6CE8FF" />
    <line x1="100" y1="30" x2="150" y2="70" stroke="#6CE8FF" />

    <line x1="50" y1="80" x2="100" y2="120" stroke="#FF72D0" />
    <line x1="150" y1="80" x2="100" y2="120" stroke="#FFD86B" />

    <path
      d="M100 120 L100 180"
      stroke="#2BCF81"
    />
  </svg>
);
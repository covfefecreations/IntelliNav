import * as React from "react";
import { IconProps } from "./IconProps";

export const MonitorIcon: React.FC<IconProps> = ({
  size = 26,
  title = "Monitor",
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    role="img"
    aria-label={title}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {title && <title>{title}</title>}
    <rect x="2" y="4" width="20" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.4" fill="none"/>
    <path d="M4 12h3l2-4 3 8 3-6 3 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <path d="M8 20h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);
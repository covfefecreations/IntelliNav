import * as React from "react";
import { IconProps } from "./IconProps";

export const TreeMotif: React.FC<IconProps> = ({
  size = 96,
  title = "OswegoPark TechTree",
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 120 120"
    role="img"
    aria-label={title}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {title && <title>{title}</title>}
    <rect x="56" y="64" width="8" height="28" rx="2" fill="var(--trunk,#7a5a3b)"/>
    <circle cx="60" cy="40" r="24" fill="var(--leaf-1,#60a5fa)" opacity="0.95"/>
    <circle cx="42" cy="52" r="18" fill="var(--leaf-2,#7dd3fc)" opacity="0.95"/>
    <circle cx="78" cy="52" r="18" fill="var(--leaf-3,#38bdf8)" opacity="0.95"/>
    <circle cx="60" cy="28" r="3.4" fill="white" opacity="0.9"/>
    <circle cx="48" cy="54" r="2.6" fill="white" opacity="0.85"/>
    <circle cx="72" cy="54" r="2.6" fill="white" opacity="0.85"/>
  </svg>
);
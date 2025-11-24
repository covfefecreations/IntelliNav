import * as React from "react";
import { IconProps } from "./IconProps";

export const OPLogo: React.FC<IconProps> = ({
  size = 48,
  title = "OswegoPark Labs",
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    role="img"
    aria-label={title}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {title && <title>{title}</title>}
    <rect width="64" height="64" rx="12" fill="var(--logo-bg,#06202a)"/>
    <path d="M18 42c0-8 6-14 14-14 6 0 12 4 12 10 0 10-10 16-22 16 0 0-4 0-4-12z"
          fill="var(--logo-accent,#7dd3fc)"/>
    <circle cx="22" cy="28" r="3.2" fill="white" opacity="0.92"/>
  </svg>
);
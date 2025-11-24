import * as React from "react";
import { IconProps } from "./IconProps";

export const DeployIcon: React.FC<IconProps> = ({
  size = 26,
  title = "Deploy",
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
    <path d="M12 2s4 1 6 3 3 6 3 6-3 1-6 4-6 6-6 6-1-3 2-6 4-6 4-6-3-2-3-7z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <path d="M8 13l-2 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <circle cx="9.5" cy="9" r="0.9" fill="currentColor"/>
  </svg>
);
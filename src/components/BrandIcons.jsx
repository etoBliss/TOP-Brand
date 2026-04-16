import React from 'react';

/**
 * Brand-specific icons to complement Lucide's general-purpose library.
 * These are implemented as lightweight functional components using official SVG paths.
 */

export const Instagram = ({ className = "w-6 h-6", ...props }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export const XIcon = ({ className = "w-6 h-6", ...props }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    {...props}
  >
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.294 19.497h2.039L6.482 3.239H4.293L17.607 20.65z" />
  </svg>
);

export const TikTok = ({ className = "w-6 h-6", ...props }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    {...props}
  >
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.86-.6-4.12-1.31a8.13 8.13 0 0 1-1.89-1.42c-.01 1.05.01 2.1-.01 3.15 0 2.1-.2 4.23-.96 6.18a7.86 7.86 0 0 1-5.11 4.96c-2.34.78-4.94.63-7.14-.49A7.74 7.74 0 0 1 .42 16.14a8.16 8.16 0 0 1-.41-5.15 7.83 7.83 0 0 1 3.51-5.45c1.19-.77 2.53-1.26 3.94-1.44v4.03c-.56.09-1.12.26-1.63.51a3.84 3.84 0 0 0-2.3 3.42c-.05.9.22 1.83.74 2.56a3.81 3.81 0 0 0 4.07 1.48 4.1 4.1 0 0 0 2.25-1.57c.56-.73.83-1.65.81-2.58l.12-14.05h-.33z" />
  </svg>
);

export const Linkedin = ({ className = "w-6 h-6", ...props }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export const Youtube = ({ className = "w-6 h-6", ...props }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
    {...props}
  >
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 2-2h15a2 2 0 0 1 2 2 24.12 24.12 0 0 1 0 10 2 2 0 0 1-2 2h-15a2 2 0 0 1-2-2z" />
    <path d="m10 15 5-3-5-3z" />
  </svg>
);

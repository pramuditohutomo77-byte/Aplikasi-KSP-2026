import React from 'react';

interface MinistryLogoProps {
  className?: string;
}

/**
 * Authentic vector emblem of Tut Wuri Handayani (Kementerian Pendidikan Dasar dan Menengah)
 * Self-contained SVG without external HTTP requests to prevent CORS canvas tainting during PDF export.
 */
export const MinistryLogo: React.FC<MinistryLogoProps> = ({ className = 'w-12 h-12' }) => {
  return (
    <svg 
      className={className} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer Golden/Yellow Ring & Flame Petals */}
      <circle cx="50" cy="50" r="46" fill="#1D4ED8" stroke="#F59E0B" strokeWidth="4" />
      <circle cx="50" cy="50" r="42" fill="#0284C7" />
      
      {/* Pentagonal shield / Teratai Segi Lima */}
      <polygon 
        points="50,14 84,38 71,78 29,78 16,38" 
        fill="#FFFFFF" 
        stroke="#F59E0B" 
        strokeWidth="2.5"
      />

      {/* Garuda Wings / Sayap Tut Wuri Handayani */}
      <path 
        d="M26 44 C34 40 44 48 50 56 C56 48 66 40 74 44 C72 52 64 62 50 68 C36 62 28 52 26 44 Z" 
        fill="#F59E0B"
      />

      {/* Belanga & Api Obor (Flame & Torch of Knowledge) */}
      <path 
        d="M50 24 C53 30 55 34 53 38 C51 42 47 42 47 46 C47 50 53 54 50 58 C47 54 44 50 44 46 C44 42 49 38 47 34 C45 30 47 26 50 24 Z" 
        fill="#EF4444"
      />
      <circle cx="50" cy="38" r="3.5" fill="#FBBF24" />

      {/* Buku Terbuka (Open Book of Knowledge) */}
      <path 
        d="M34 68 C42 65 48 68 50 71 C52 68 58 65 66 68 L64 74 C58 71 52 73 50 75 C48 73 42 71 36 74 Z" 
        fill="#1E293B"
      />

      {/* Text Ring Arc simulation */}
      <circle cx="50" cy="50" r="44" stroke="#FBBF24" strokeWidth="1" strokeDasharray="3 3" fill="none" />
    </svg>
  );
};

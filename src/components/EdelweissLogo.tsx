import React from 'react';

interface EdelweissLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showText?: boolean;
  title?: string;
  subtitle?: string;
}

export const EdelweissLogo: React.FC<EdelweissLogoProps> = ({
  size = 'md',
  className = '',
  showText = false,
  title = 'Edelveiss',
  subtitle = 'Бутикова къща за гости • Габрово'
}) => {
  const sizeMap = {
    sm: { box: 'w-8 h-8', svg: 'w-8 h-8', text: 'text-lg', sub: 'text-[9px]' },
    md: { box: 'w-11 h-11', svg: 'w-11 h-11', text: 'text-2xl', sub: 'text-[10px]' },
    lg: { box: 'w-16 h-16', svg: 'w-16 h-16', text: 'text-3xl', sub: 'text-xs' },
    xl: { box: 'w-24 h-24', svg: 'w-24 h-24', text: 'text-4xl', sub: 'text-sm' },
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Circular Edelweiss Flower Emblem */}
      <div 
        id="edelweiss-circular-emblem"
        className={`relative ${currentSize.box} rounded-full flex items-center justify-center shrink-0 shadow-lg shadow-[#000000]/60 p-0.5 bg-gradient-to-br from-[#d4af37] via-[#856b23] to-[#d4af37] ring-1 ring-[#f5d77f]/40 transition-transform duration-300 group-hover:scale-105`}
      >
        <div className="w-full h-full rounded-full bg-[#0b1215] flex items-center justify-center overflow-hidden relative">
          {/* Subtle radial glow inside badge */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.25)_0%,transparent_70%)]" />
          
          {/* Botanical Edelweiss Flower Vector */}
          <svg
            viewBox="0 0 100 100"
            className="w-[84%] h-[84%] relative z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Outer Circular Ring Ornament */}
            <circle cx="50" cy="50" r="47" stroke="#d4af37" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
            <circle cx="50" cy="50" r="43" stroke="#f5d77f" strokeWidth="0.75" opacity="0.4" />

            {/* Edelweiss Woolly Petals (Alpine Star Formation) */}
            {/* Layer 1: Background Petals */}
            <g opacity="0.95">
              {/* Petal 0° */}
              <path d="M50 50 C46 32 43 14 50 6 C57 14 54 32 50 50Z" fill="#e2edf0" stroke="#bccad0" strokeWidth="0.8" />
              {/* Petal 40° */}
              <path d="M50 50 C62 38 76 27 82 23 C80 32 68 44 50 50Z" fill="#e8f3f6" stroke="#bccad0" strokeWidth="0.8" />
              {/* Petal 80° */}
              <path d="M50 50 C68 46 86 48 94 51 C86 58 68 56 50 50Z" fill="#dce9ec" stroke="#bccad0" strokeWidth="0.8" />
              {/* Petal 120° */}
              <path d="M50 50 C65 60 78 74 80 81 C72 79 58 66 50 50Z" fill="#edf6f8" stroke="#bccad0" strokeWidth="0.8" />
              {/* Petal 160° */}
              <path d="M50 50 C54 68 56 86 52 94 C47 86 45 68 50 50Z" fill="#e2edf0" stroke="#bccad0" strokeWidth="0.8" />
              {/* Petal 200° */}
              <path d="M50 50 C38 65 24 78 18 80 C20 72 34 58 50 50Z" fill="#dbe7eb" stroke="#bccad0" strokeWidth="0.8" />
              {/* Petal 240° */}
              <path d="M50 50 C32 54 14 52 6 49 C14 42 32 44 50 50Z" fill="#ecf5f7" stroke="#bccad0" strokeWidth="0.8" />
              {/* Petal 280° */}
              <path d="M50 50 C35 40 22 26 19 19 C28 21 42 34 50 50Z" fill="#e1ecef" stroke="#bccad0" strokeWidth="0.8" />
            </g>

            {/* Layer 2: Inner Secondary Woolly Petals (Offset) */}
            <g opacity="0.98">
              {/* Inner Petal 20° */}
              <path d="M50 50 C54 36 62 22 66 16 C63 26 57 38 50 50Z" fill="#ffffff" stroke="#c4d3d9" strokeWidth="0.6" />
              {/* Inner Petal 60° */}
              <path d="M50 50 C64 42 78 38 86 38 C78 46 64 48 50 50Z" fill="#f8fcfe" stroke="#c4d3d9" strokeWidth="0.6" />
              {/* Inner Petal 100° */}
              <path d="M50 50 C62 56 74 66 79 72 C71 68 58 58 50 50Z" fill="#ffffff" stroke="#c4d3d9" strokeWidth="0.6" />
              {/* Inner Petal 140° */}
              <path d="M50 50 C48 64 44 78 39 85 C41 75 46 62 50 50Z" fill="#f4fafc" stroke="#c4d3d9" strokeWidth="0.6" />
              {/* Inner Petal 180° */}
              <path d="M50 50 C36 58 22 62 14 62 C22 54 36 52 50 50Z" fill="#ffffff" stroke="#c4d3d9" strokeWidth="0.6" />
              {/* Inner Petal 220° */}
              <path d="M50 50 C38 44 26 34 21 28 C29 32 42 42 50 50Z" fill="#f6fbfe" stroke="#c4d3d9" strokeWidth="0.6" />
              {/* Inner Petal 300° */}
              <path d="M50 50 C46 36 38 22 34 15 C37 25 43 38 50 50Z" fill="#ffffff" stroke="#c4d3d9" strokeWidth="0.6" />
            </g>

            {/* Central Golden Pollen Clusters (Edelweiss Flower Disc) */}
            <circle cx="50" cy="50" r="8" fill="#c99718" stroke="#87620a" strokeWidth="0.6" />
            
            {/* Pollen Florets */}
            <circle cx="50" cy="46" r="2.4" fill="#ffd700" />
            <circle cx="54" cy="48" r="2.2" fill="#ffd700" />
            <circle cx="53" cy="53" r="2.3" fill="#f5c21b" />
            <circle cx="48" cy="54" r="2.2" fill="#ffd700" />
            <circle cx="46" cy="49" r="2.1" fill="#f5c21b" />
            <circle cx="50" cy="50" r="2.6" fill="#ffe066" />
            <circle cx="50" cy="50" r="1.2" fill="#ffffff" opacity="0.8" />
          </svg>
        </div>
      </div>

      {/* Brand Text (Optional) */}
      {showText && (
        <div className="flex flex-col text-left">
          <span className={`font-serif ${currentSize.text} font-bold tracking-wider text-[#f5f6f2] group-hover:text-[#d4af37] transition-colors leading-tight`}>
            {title}
          </span>
          <span className={`block ${currentSize.sub} tracking-widest text-[#9cb0b8] uppercase font-medium mt-0.5`}>
            {subtitle}
          </span>
        </div>
      )}
    </div>
  );
};

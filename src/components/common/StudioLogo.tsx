import React from 'react';

interface StudioLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'hero';
  inverted?: boolean;
  showSlogan?: boolean;
  markOnly?: boolean;
  className?: string;
}

export const StudioLogo: React.FC<StudioLogoProps> = ({
  size = 'md',
  inverted = false,
  showSlogan = true,
  markOnly = false,
  className = '',
}) => {
  const primaryColor = inverted ? '#FFF3DD' : '#4D0202';
  const secondaryColor = inverted ? '#F3E4C7' : '#6A1414';

  // Sizing variants
  const monogramScale = {
    sm: 'w-8 h-8',
    md: 'w-11 h-11',
    lg: 'w-16 h-16',
    hero: 'w-24 h-24 md:w-28 md:h-28',
  }[size];

  const titleSize = {
    sm: 'text-sm tracking-[0.25em]',
    md: 'text-base tracking-[0.3em]',
    lg: 'text-xl tracking-[0.35em]',
    hero: 'text-2xl md:text-3xl tracking-[0.38em]',
  }[size];

  const subSize = {
    sm: 'text-[10px] tracking-[0.22em]',
    md: 'text-[11px] tracking-[0.25em]',
    lg: 'text-xs tracking-[0.32em]',
    hero: 'text-xs md:text-sm tracking-[0.35em]',
  }[size];

  return (
    <div className={`inline-flex flex-col items-center select-none text-center ${className}`}>
      {/* Monogram HN with Sunbeam & Sparkle Star */}
      <div className={`relative ${monogramScale} flex items-center justify-center`}>
        <svg
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full overflow-visible"
        >
          {/* Half sun arc and sun rays above letter N */}
          <g transform="translate(68, 20)">
            {/* Sun arc */}
            <path
              d="M 2 28 A 20 20 0 0 1 38 28"
              stroke={primaryColor}
              strokeWidth="2.2"
              strokeLinecap="round"
              fill="none"
            />
            {/* Center 4-pointed sparkle star */}
            <path
              d="M 20 18 C 20 23, 20 23, 24 23 C 20 23, 20 23, 20 28 C 20 23, 20 23, 16 23 C 20 23, 20 23, 20 18 Z"
              fill={primaryColor}
            />
            {/* Sun rays radiating outwards */}
            <line x1="3" y1="18" x2="-2" y2="13" stroke={primaryColor} strokeWidth="2" strokeLinecap="round" />
            <line x1="10" y1="11" x2="7" y2="4" stroke={primaryColor} strokeWidth="2" strokeLinecap="round" />
            <line x1="20" y1="8" x2="20" y2="1" stroke={primaryColor} strokeWidth="2" strokeLinecap="round" />
            <line x1="30" y1="11" x2="33" y2="4" stroke={primaryColor} strokeWidth="2" strokeLinecap="round" />
            <line x1="37" y1="18" x2="42" y2="13" stroke={primaryColor} strokeWidth="2" strokeLinecap="round" />
            <line x1="41" y1="26" x2="47" y2="25" stroke={primaryColor} strokeWidth="2" strokeLinecap="round" />
          </g>

          {/* Letter H (Serif Left Stem & Crossbar) */}
          {/* Left vertical serif stem */}
          <path
            d="M 22 28 L 38 28 M 30 28 L 30 92 M 22 92 L 38 92"
            stroke={primaryColor}
            strokeWidth="5"
            strokeLinecap="square"
          />
          {/* Right vertical serif stem of H */}
          <path
            d="M 46 28 L 62 28 M 54 28 L 54 92 M 46 92 L 62 92"
            stroke={primaryColor}
            strokeWidth="5"
            strokeLinecap="square"
          />
          {/* Crossbar curving gracefully between H stems */}
          <path
            d="M 30 58 Q 42 53 54 58"
            stroke={primaryColor}
            strokeWidth="4"
            fill="none"
          />

          {/* Flowing cursive flourish 'n' sprouting from H stem */}
          <path
            d="M 54 62 C 60 52, 68 50, 72 64 C 74 72, 70 88, 78 88 C 84 88, 92 78, 98 72"
            stroke={primaryColor}
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          {/* Downward cursive loop leg of n */}
          <path
            d="M 68 62 C 66 74, 62 88, 64 92 C 65 94, 69 94, 73 90 C 78 85, 83 76, 88 74"
            stroke={primaryColor}
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </div>

      {!markOnly && (
        <div className="mt-1 flex flex-col items-center">
          <span
            className={`font-serif font-bold uppercase ${titleSize}`}
            style={{ color: primaryColor }}
          >
            HẠT NẮNG
          </span>

          <div className="flex items-center justify-center gap-2 mt-0.5 w-full">
            <span
              className="h-[1px] w-4 opacity-70"
              style={{ backgroundColor: primaryColor }}
            />
            <span
              className={`font-serif uppercase font-medium ${subSize}`}
              style={{ color: primaryColor }}
            >
              STUDIO
            </span>
            <span
              className="h-[1px] w-4 opacity-70"
              style={{ backgroundColor: primaryColor }}
            />
          </div>

          {showSlogan && (
            <span
              className={`mt-1 font-serif italic tracking-[0.08em] opacity-85 ${
                size === 'sm' ? 'hidden' : size === 'md' ? 'text-[10px]' : 'text-xs'
              }`}
              style={{ color: secondaryColor }}
            >
              Gom nắng, giữ khoảnh khắc.
            </span>
          )}
        </div>
      )}
    </div>
  );
};

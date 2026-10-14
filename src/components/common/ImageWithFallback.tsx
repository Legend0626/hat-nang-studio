import React, { useState } from 'react';
import { Camera, Sparkles } from 'lucide-react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatioClass?: string;
  titleFallback?: string;
  subtitleFallback?: string;
  hoverZoom?: boolean;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  className = '',
  aspectRatioClass = 'aspect-[4/3]',
  titleFallback,
  subtitleFallback = 'Hạt Nắng Studio',
  hoverZoom = false,
}) => {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={`relative overflow-hidden bg-[#FAF1DF] border border-[#ECDBC0] ${aspectRatioClass} ${className}`}
    >
      {!loaded && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#F7E7CD] animate-pulse">
          <Sparkles className="w-6 h-6 text-[#4D0202]/30" />
        </div>
      )}

      {error ? (
        // Styled graceful fallback container per frontend design constitution
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#FFF3DD] via-[#FAF1DF] to-[#F3E0BE] text-[#4D0202]">
          <div className="w-12 h-12 rounded-full border border-[#4D0202]/20 flex items-center justify-center mb-3 bg-[#FFF9EE]/70">
            <Camera className="w-6 h-6 text-[#4D0202]" />
          </div>
          <span className="font-serif font-bold text-sm tracking-wider uppercase mb-1 line-clamp-1">
            {titleFallback || alt}
          </span>
          <span className="font-serif italic text-xs text-[#4D0202]/70">
            {subtitleFallback}
          </span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className={`w-full h-full object-cover transition-all duration-700 ${
            loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          } ${hoverZoom ? 'hover:scale-105' : ''}`}
        />
      )}
    </div>
  );
};

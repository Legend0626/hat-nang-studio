import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Download, Camera } from 'lucide-react';

interface LightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  currentIndex: number;
  onNavigate: (newIndex: number) => void;
  title?: string;
  subtitle?: string;
  onActionClick?: () => void;
  actionText?: string;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  isOpen,
  onClose,
  images,
  currentIndex,
  onNavigate,
  title,
  subtitle,
  onActionClick,
  actionText,
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') {
        onNavigate((currentIndex + 1) % images.length);
      }
      if (e.key === 'ArrowLeft') {
        onNavigate((currentIndex - 1 + images.length) % images.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, images.length, onClose, onNavigate]);

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#1C0505]/95 backdrop-blur-md text-[#FFF3DD] animate-fade-in">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-[#4D0202]/50 shrink-0">
        <div>
          <h4 className="font-serif text-lg font-semibold text-[#FFF3DD] line-clamp-1">
            {title || 'Thư viện tác phẩm Hạt Nắng'}
          </h4>
          <p className="text-xs text-[#FFF3DD]/70">
            {subtitle ? `${subtitle} · ` : ''}
            Ảnh {currentIndex + 1} / {images.length}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {actionText && onActionClick && (
            <button
              onClick={onActionClick}
              className="px-4 py-2 text-xs font-semibold uppercase tracking-wider bg-[#FFF3DD] text-[#4D0202] rounded-md hover:bg-white transition-colors"
            >
              {actionText}
            </button>
          )}

          <a
            href={currentImage}
            download={`hat-nang-studio-${currentIndex + 1}.jpg`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full hover:bg-white/10 text-[#FFF3DD] transition-colors"
            title="Tải ảnh mẫu"
          >
            <Download className="w-5 h-5" />
          </a>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-[#FFF3DD] transition-colors"
            title="Đóng (Esc)"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Main Viewport */}
      <div className="relative flex-1 flex items-center justify-center p-4 md:p-8 overflow-hidden select-none">
        {/* Prev Button */}
        {images.length > 1 && (
          <button
            onClick={() => onNavigate((currentIndex - 1 + images.length) % images.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-black/40 text-white hover:bg-black/70 hover:scale-105 transition-all"
            aria-label="Ảnh trước"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Active Image */}
        <div className="relative max-w-5xl max-h-full flex items-center justify-center">
          <img
            src={currentImage}
            alt={title || 'Tác phẩm studio'}
            referrerPolicy="no-referrer"
            className="max-h-[75vh] w-auto max-w-full object-contain rounded-lg shadow-2xl ring-1 ring-[#FFF3DD]/20"
          />
        </div>

        {/* Next Button */}
        {images.length > 1 && (
          <button
            onClick={() => onNavigate((currentIndex + 1) % images.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-black/40 text-white hover:bg-black/70 hover:scale-105 transition-all"
            aria-label="Ảnh sau"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Bottom Thumbnails Strip */}
      {images.length > 1 && (
        <div className="px-6 py-3 border-t border-[#4D0202]/50 bg-[#2D0303]/60 shrink-0 overflow-x-auto">
          <div className="flex items-center justify-center gap-2 max-w-4xl mx-auto">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => onNavigate(idx)}
                className={`relative w-14 h-14 md:w-16 md:h-16 rounded-md overflow-hidden shrink-0 border-2 transition-all ${
                  idx === currentIndex
                    ? 'border-[#FFF3DD] scale-105 shadow-md'
                    : 'border-transparent opacity-50 hover:opacity-100'
                }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

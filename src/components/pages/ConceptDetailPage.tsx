import React, { useState } from 'react';
import { useStudio } from '../../context/StudioContext';
import { CONCEPTS, PRICING_PACKAGES } from '../../data/studioData';
import { ImageWithFallback } from '../common/ImageWithFallback';
import {
  Calendar,
  Sparkles,
  ArrowLeft,
  Heart,
  Clock,
  Shirt,
  Palette,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ChevronRight,
  Maximize2,
} from 'lucide-react';

export const ConceptDetailPage: React.FC = () => {
  const { selectedConcept, navigateTo, toggleWishlist, wishlist, openLightbox } = useStudio();

  // If no concept selected, fallback to first
  const concept = selectedConcept || CONCEPTS[0];
  const isWishlisted = wishlist.includes(concept.id);
  const isDiscontinued = concept.status === 'discontinued';

  // Similar concepts
  const similarConcepts = CONCEPTS.filter(
    (c) => c.id !== concept.id && c.status !== 'discontinued'
  ).slice(0, 3);

  // Applicable packages
  const applicablePackages = PRICING_PACKAGES.filter((p) =>
    concept.recommendedPackages.includes(p.id)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Back Button & Category Trail */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigateTo('concepts')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#4D0202] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" /> Quay lại danh sách Concept
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={() => toggleWishlist(concept.id)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#ECDBC0] bg-[#FFF9EE] text-xs font-semibold text-[#4D0202] hover:bg-white"
          >
            <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-[#4D0202]' : ''}`} />
            <span>{isWishlisted ? 'Đã lưu yêu thích' : 'Lưu concept này'}</span>
          </button>
        </div>
      </div>

      {/* Main Concept Header & Gallery Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Gallery Images with Lightbox Zoom Trigger */}
        <div className="lg:col-span-7 space-y-3">
          {/* Main Cover Image */}
          <div
            onClick={() =>
              openLightbox(
                concept.galleryImages,
                0,
                concept.title,
                `${concept.category} · ${concept.style}`,
                'Đặt Lịch Concept Này',
                () => navigateTo('booking', { conceptId: concept.id })
              )
            }
            className="group relative rounded-2xl overflow-hidden border-2 border-[#ECDBC0] shadow-lg cursor-pointer"
          >
            <ImageWithFallback
              src={concept.coverImage}
              alt={concept.title}
              aspectRatioClass="aspect-[4/3] sm:aspect-[16/11]"
              titleFallback={concept.title}
              subtitleFallback={concept.style}
              hoverZoom={true}
            />
            <div className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity">
              <Maximize2 className="w-5 h-5" />
            </div>
            <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-[#FFF3DD] text-[11px] px-3 py-1 rounded-md">
              Nhấn để phóng to & xem {concept.galleryImages.length} ảnh mẫu
            </div>
          </div>

          {/* Sub Thumbnails */}
          {concept.galleryImages.length > 1 && (
            <div className="grid grid-cols-3 gap-3">
              {concept.galleryImages.slice(1, 4).map((img, idx) => (
                <div
                  key={idx}
                  onClick={() =>
                    openLightbox(
                      concept.galleryImages,
                      idx + 1,
                      concept.title,
                      concept.style,
                      'Đặt Lịch Concept Này',
                      () => navigateTo('booking', { conceptId: concept.id })
                    )
                  }
                  className="rounded-xl overflow-hidden border border-[#ECDBC0] cursor-pointer hover:opacity-90 transition-opacity"
                >
                  <ImageWithFallback
                    src={img}
                    alt={`${concept.title} mẫu ${idx + 2}`}
                    aspectRatioClass="aspect-square"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Concept Specs & Booking CTA */}
        <div className="lg:col-span-5 bg-[#FFF9EE] rounded-2xl border border-[#ECDBC0] p-6 sm:p-8 space-y-6 shadow-sm">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] uppercase tracking-wider font-bold px-2 py-0.5 bg-[#4D0202] text-[#FFF3DD] rounded-md">
                {concept.category}
              </span>
              {concept.status === 'new' && (
                <span className="text-[11px] uppercase tracking-wider font-bold px-2 py-0.5 bg-[#D97706] text-white rounded-md">
                  Mới ra mắt
                </span>
              )}
              {isDiscontinued && (
                <span className="text-[11px] uppercase tracking-wider font-bold px-2 py-0.5 bg-zinc-500 text-white rounded-md">
                  Tạm ngừng nhận lịch
                </span>
              )}
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#4D0202]">
              {concept.title}
            </h1>
            <p className="text-xs sm:text-sm text-[#4D0202]/70 font-serif italic mt-1">
              &ldquo;{concept.subtitle}&rdquo;
            </p>
          </div>

          {/* Price & Summary */}
          <div className="p-4 bg-[#FAF1DF] rounded-xl border border-[#ECDBC0] space-y-2">
            <div className="flex items-baseline justify-between">
              <span className="text-xs font-semibold text-[#4D0202]/70">Giá tham khảo từ:</span>
              <span className="font-serif text-2xl font-bold text-[#4D0202] tabular-nums">
                {concept.startingPrice.toLocaleString('vi-VN')} VNĐ
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px] text-[#4D0202]/80 pt-2 border-t border-[#ECDBC0]">
              <div>Thời lượng: <strong>{concept.duration}</strong></div>
              <div>Trả ảnh: <strong>{concept.returnDays} ngày</strong></div>
              <div>Retouch: <strong>{concept.editedPhotosCount} ảnh</strong></div>
              <div>File gốc: <strong>100% bàn giao</strong></div>
            </div>
          </div>

          {/* Color Palette Display */}
          <div className="space-y-1.5">
            <span className="text-xs font-semibold uppercase text-[#4D0202] tracking-wider flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-[#D97706]" />
              Bảng màu chủ đạo của Concept
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {concept.colorPalette.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-1.5 px-2.5 py-1 bg-white border border-[#ECDBC0] rounded-lg text-xs"
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                    style={{ backgroundColor: item.hex }}
                  />
                  <span className="text-[11px] font-medium text-[#4D0202]">{item.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Backdrop & Setting */}
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase text-[#4D0202] tracking-wider">
              Bối cảnh & Không gian:
            </span>
            <p className="text-xs text-[#4D0202]/85 leading-relaxed bg-white/70 p-3 rounded-lg border border-[#ECDBC0]">
              {concept.backdrop}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-2">
            {isDiscontinued ? (
              <div className="p-3 bg-zinc-100 border border-zinc-300 rounded-xl text-center text-xs text-zinc-700">
                Concept này hiện đang tạm ngừng nhận lịch theo mùa. Quý khách vui lòng chọn concept khác.
              </div>
            ) : (
              <button
                onClick={() => navigateTo('booking', { conceptId: concept.id })}
                className="w-full py-3 px-4 bg-[#4D0202] hover:bg-[#380101] text-[#FFF3DD] text-xs font-bold uppercase tracking-wider rounded-xl transition-colors shadow-md flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Đặt lịch concept này</span>
              </button>
            )}

            <button
              onClick={() => navigateTo('contact')}
              className="w-full py-2.5 px-4 bg-white hover:bg-[#FFF9EE] text-[#4D0202] border border-[#ECDBC0] text-xs font-semibold rounded-xl transition-colors text-center"
            >
              Gửi yêu cầu tư vấn cá nhân hóa concept
            </button>
          </div>
        </div>
      </div>

      {/* Concept Deep Dive: Styling, Makeup, Outfits, Notes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Outfits suggestion */}
        <div className="bg-[#FFF9EE] rounded-2xl border border-[#ECDBC0] p-6 space-y-3">
          <div className="w-9 h-9 rounded-xl bg-[#4D0202] text-[#FFF3DD] flex items-center justify-center">
            <Shirt className="w-4 h-4" />
          </div>
          <h3 className="font-serif text-base font-bold text-[#4D0202]">Gợi Ý Trang Phục</h3>
          <ul className="space-y-1.5 text-xs text-[#4D0202]/85">
            {concept.outfits.map((outfit, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-[#D97706] font-bold">·</span>
                <span>{outfit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Makeup guide */}
        <div className="bg-[#FFF9EE] rounded-2xl border border-[#ECDBC0] p-6 space-y-3">
          <div className="w-9 h-9 rounded-xl bg-[#4D0202] text-[#FFF3DD] flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <h3 className="font-serif text-base font-bold text-[#4D0202]">Layout Makeup & Tóc</h3>
          <p className="text-xs text-[#4D0202]/85 leading-relaxed">
            {concept.makeupGuide}
          </p>
          <div className="pt-2 border-t border-[#ECDBC0]">
            <span className="text-[11px] font-semibold text-[#4D0202]">Phụ kiện đi kèm: </span>
            <span className="text-[11px] text-[#4D0202]/80">{concept.accessories.join(', ')}</span>
          </div>
        </div>

        {/* Notes & Surcharges */}
        <div className="bg-[#FFF9EE] rounded-2xl border border-[#ECDBC0] p-6 space-y-3">
          <div className="w-9 h-9 rounded-xl bg-[#4D0202] text-[#FFF3DD] flex items-center justify-center">
            <AlertCircle className="w-4 h-4" />
          </div>
          <h3 className="font-serif text-base font-bold text-[#4D0202]">Lưu Ý & Phụ Thu</h3>
          <ul className="space-y-1.5 text-xs text-[#4D0202]/85">
            {concept.surchargesAndNotes.map((note, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#D97706] shrink-0 mt-0.5" />
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Story / Concept Inspiration */}
      <div className="bg-[#FAF1DF] rounded-2xl border border-[#ECDBC0] p-8 text-center max-w-4xl mx-auto space-y-3">
        <span className="font-serif italic text-xs uppercase tracking-widest text-[#4D0202]/70">
          Cảm Hứng Sáng Tạo
        </span>
        <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#4D0202]">
          Câu Chuyện Đằng Sau Khung Hình
        </h3>
        <p className="text-xs sm:text-sm text-[#4D0202]/80 leading-relaxed font-normal">
          {concept.fullStory}
        </p>
      </div>

      {/* Recommended Packages for this Concept */}
      <div className="space-y-6">
        <div className="flex items-end justify-between border-b border-[#ECDBC0] pb-3">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#4D0202]/60">
              Lựa Chọn Gói Chụp
            </span>
            <h2 className="font-serif text-2xl font-bold text-[#4D0202]">
              Các Gói Dịch Vụ Áp Dụng Cho Concept Này
            </h2>
          </div>
          <button
            onClick={() => navigateTo('pricing')}
            className="text-xs font-bold text-[#4D0202] hover:underline"
          >
            So sánh chi tiết tất cả các gói →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {applicablePackages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-[#FFF9EE] rounded-2xl border border-[#ECDBC0] p-6 flex flex-col justify-between space-y-4 shadow-sm"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif text-lg font-bold text-[#4D0202]">{pkg.name}</h4>
                  <span className="font-serif text-lg font-bold text-[#4D0202] tabular-nums">
                    {pkg.price.toLocaleString('vi-VN')} đ
                  </span>
                </div>
                <p className="text-xs text-[#4D0202]/70">{pkg.description}</p>
                <div className="pt-2 text-xs text-[#4D0202]/90 space-y-1">
                  <div>· Thời lượng: {pkg.duration}</div>
                  <div>· {pkg.makeupIncluded}</div>
                  <div>· Số ảnh retouch: {pkg.editedPhotos} ảnh Photoshop</div>
                </div>
              </div>

              {!isDiscontinued && (
                <button
                  onClick={() =>
                    navigateTo('booking', { conceptId: concept.id, packageId: pkg.id })
                  }
                  className="w-full py-2 px-4 bg-[#4D0202] hover:bg-[#380101] text-[#FFF3DD] text-xs font-bold uppercase rounded-xl transition-colors"
                >
                  Chọn gói {pkg.name} cho concept này
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Similar Concepts Carousel */}
      <div className="space-y-6 pt-6 border-t border-[#ECDBC0]">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-xl font-bold text-[#4D0202]">
            Các Concept Tương Tự Có Thể Bạn Sẽ Thích
          </h3>
          <button
            onClick={() => navigateTo('concepts')}
            className="text-xs font-semibold text-[#4D0202] hover:underline"
          >
            Xem tất cả concept →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {similarConcepts.map((sim) => (
            <div
              key={sim.id}
              onClick={() => navigateTo('concept-detail', { conceptId: sim.id })}
              className="bg-[#FFF9EE] rounded-xl border border-[#ECDBC0] overflow-hidden cursor-pointer hover:shadow-md transition-all group"
            >
              <ImageWithFallback
                src={sim.coverImage}
                alt={sim.title}
                aspectRatioClass="aspect-[4/3]"
                titleFallback={sim.title}
                hoverZoom={true}
              />
              <div className="p-4 space-y-1">
                <span className="text-[10px] text-[#4D0202]/70 font-semibold uppercase">
                  {sim.category}
                </span>
                <h4 className="font-serif text-sm font-bold text-[#4D0202] group-hover:text-[#6A1414]">
                  {sim.title}
                </h4>
                <p className="text-xs text-[#4D0202]/70 tabular-nums">
                  Từ {sim.startingPrice.toLocaleString('vi-VN')} đ
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

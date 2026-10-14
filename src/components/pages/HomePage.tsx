import React from 'react';
import { useStudio } from '../../context/StudioContext';
import { StudioLogo } from '../common/StudioLogo';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { CONCEPTS, PRICING_PACKAGES, PROMOTIONS, REVIEWS, GALLERY_ITEMS, STUDIO_INFO } from '../../data/studioData';
import {
  Calendar,
  Sparkles,
  ArrowRight,
  Clock,
  CheckCircle2,
  Heart,
  Star,
  Camera,
  Layers,
  ChevronRight,
  PhoneCall,
  MapPin,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { navigateTo, toggleWishlist, wishlist, openLightbox } = useStudio();

  // Featured concepts (excluding discontinued ones)
  const featuredConcepts = CONCEPTS.filter(
    (c) => c.status !== 'discontinued' && (c.status === 'featured' || c.status === 'new')
  ).slice(0, 3);

  // Featured promo
  const featuredPromo = PROMOTIONS.find((p) => p.isFeatured) || PROMOTIONS[0];

  return (
    <div className="space-y-20 md:space-y-28 pb-20">
      {/* 1. HERO SECTION: Split-Screen Hero with Typographic Impact & Visual Warmth */}
      <section className="relative pt-6 md:pt-12 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Typographic Hierarchy & CTA */}
            <div className="lg:col-span-6 space-y-6">
              {/* Refined Brand Crest */}
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFF9EE] border border-[#ECDBC0] rounded-full text-xs font-medium text-[#4D0202]">
                <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
                <span className="font-serif italic">Hạt Nắng Studio · Nhiếp ảnh nghệ thuật cá nhân</span>
              </div>

              {/* Display Headline */}
              <div className="space-y-2">
                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#4D0202] leading-[1.2] text-balance">
                  Gom nắng ấm áp, <br />
                  <span className="italic font-normal font-serif text-[#6A1414]">giữ trọn khoảnh khắc</span> thanh xuân.
                </h1>
                <p className="text-sm sm:text-base text-[#4D0202]/80 leading-relaxed font-normal max-w-xl">
                  Mỗi người đều mang một nét thơ rất riêng. Tại Hạt Nắng Studio, chúng mình kể câu chuyện của bạn
                  bằng những gam màu ấm áp, ánh sáng tự nhiên và cảm xúc chân thật nhất.
                </p>
              </div>

              {/* Primary Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => navigateTo('booking')}
                  className="px-6 py-3.5 bg-[#4D0202] hover:bg-[#380101] text-[#FFF3DD] font-semibold text-xs uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 group"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Đặt lịch ngay</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => navigateTo('concepts')}
                  className="px-6 py-3.5 bg-[#FFF9EE] hover:bg-white text-[#4D0202] font-semibold text-xs uppercase tracking-wider rounded-xl border border-[#ECDBC0] transition-colors flex items-center gap-2"
                >
                  <Camera className="w-4 h-4" />
                  <span>Khám phá Concept</span>
                </button>
              </div>

              {/* Trust Indicators Bar */}
              <div className="pt-6 border-t border-[#ECDBC0]/80 grid grid-cols-3 gap-4 text-left">
                <div>
                  <p className="font-serif font-bold text-xl sm:text-2xl text-[#4D0202]">100%</p>
                  <p className="text-xs text-[#4D0202]/70">Giao toàn bộ file gốc</p>
                </div>
                <div>
                  <p className="font-serif font-bold text-xl sm:text-2xl text-[#4D0202]">4.9★</p>
                  <p className="text-xs text-[#4D0202]/70">Hơn 1.200 đánh giá</p>
                </div>
                <div>
                  <p className="font-serif font-bold text-xl sm:text-2xl text-[#4D0202]">3 Ngày</p>
                  <p className="text-xs text-[#4D0202]/70">Trả ảnh chỉnh sửa nhanh</p>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Showcase */}
            <div className="lg:col-span-6 relative">
              <div className="relative mx-auto max-w-lg lg:max-w-none">
                {/* Decorative border frame */}
                <div className="absolute -inset-3 rounded-2xl border border-[#4D0202]/20 transform rotate-1 pointer-events-none" />

                {/* Primary Hero Image */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-[#ECDBC0]">
                  <ImageWithFallback
                    src={CONCEPTS[0].coverImage}
                    alt="Hạt Nắng Studio Hero Banner"
                    aspectRatioClass="aspect-[4/3] sm:aspect-[16/11]"
                    titleFallback="Hạt Nắng Studio"
                    subtitleFallback="Gom nắng, giữ khoảnh khắc."
                    hoverZoom={true}
                  />

                  {/* Floating Badge on Hero */}
                  <div className="absolute bottom-4 left-4 right-4 bg-[#FFF9EE]/95 backdrop-blur-md p-3.5 rounded-xl border border-[#ECDBC0] shadow-lg flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#4D0202] text-[#FFF3DD] flex items-center justify-center shrink-0">
                        <Camera className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-serif font-bold text-xs sm:text-sm text-[#4D0202]">
                          Concept Nàng Thơ Vườn Cổ Điển
                        </h4>
                        <p className="text-[11px] text-[#4D0202]/70">
                          Bộ ảnh được yêu thích nhất mùa thu 2026
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => navigateTo('concept-detail', { conceptId: 'c1' })}
                      className="px-3 py-1.5 bg-[#4D0202] text-[#FFF3DD] text-[11px] font-semibold rounded-lg hover:bg-[#380101] transition-colors shrink-0"
                    >
                      Chi tiết
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SHORT INTRODUCTION & STUDIO PHILOSOPHY */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-4">
        <span className="font-serif italic text-xs uppercase tracking-[0.25em] text-[#4D0202]/70 block">
          Triết Lý Nghệ Thuật
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#4D0202] text-balance">
          Không cần biết tạo dáng cầu kỳ, <br />
          chỉ cần bạn là chính bạn dưới ánh nắng rạng rỡ.
        </h2>
        <p className="text-sm sm:text-base text-[#4D0202]/80 leading-relaxed max-w-3xl mx-auto font-normal">
          Tên gọi <strong>Hạt Nắng</strong> bắt nguồn từ mong ước nhỏ bé: gom từng vạt nắng sớm dịu dàng nhất
          để chiếu sáng vẻ đẹp chân phương của mỗi vị khách. Chúng mình định hướng phong cách nhiếp ảnh ấm áp,
          tinh tế, giàu cảm xúc với gam màu đỏ rượu vang sang trọng và nền kem ngọt ngào.
        </p>
        <div className="pt-2">
          <button
            onClick={() => navigateTo('about')}
            className="text-xs font-bold uppercase tracking-wider text-[#4D0202] underline hover:text-[#6A1414] inline-flex items-center gap-1"
          >
            Đọc câu chuyện thương hiệu Hạt Nắng Studio →
          </button>
        </div>
      </section>

      {/* 3. FEATURED CONCEPTS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#ECDBC0] pb-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#4D0202]/60">
              Bộ Sưu Tập Tiêu Biểu
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#4D0202]">
              Concept Chụp Ảnh Nổi Bật
            </h2>
          </div>
          <button
            onClick={() => navigateTo('concepts')}
            className="text-xs font-bold text-[#4D0202] hover:underline inline-flex items-center gap-1 shrink-0"
          >
            Xem tất cả {CONCEPTS.length} concept <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 3-Column Concept Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredConcepts.map((concept) => {
            const isWishlisted = wishlist.includes(concept.id);
            return (
              <div
                key={concept.id}
                className="group bg-[#FFF9EE] rounded-2xl border border-[#ECDBC0] overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col"
              >
                {/* Image Frame */}
                <div className="relative overflow-hidden">
                  <ImageWithFallback
                    src={concept.coverImage}
                    alt={concept.title}
                    aspectRatioClass="aspect-[4/3]"
                    titleFallback={concept.title}
                    subtitleFallback={concept.style}
                    hoverZoom={true}
                  />

                  {/* Status Ribbon (Unboxed clean text / minimal badge) */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    {concept.status === 'new' && (
                      <span className="px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase bg-[#4D0202] text-[#FFF3DD] rounded-md shadow-sm">
                        Mới
                      </span>
                    )}
                    {concept.status === 'featured' && (
                      <span className="px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase bg-[#D97706] text-white rounded-md shadow-sm">
                        Nổi bật
                      </span>
                    )}
                  </div>

                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(concept.id);
                    }}
                    className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full text-[#4D0202] hover:bg-white shadow-sm transition-transform active:scale-90"
                    title={isWishlisted ? 'Bỏ yêu thích' : 'Lưu vào yêu thích'}
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#4D0202]' : ''}`} />
                  </button>

                  {/* Price Tag Overlay */}
                  <div className="absolute bottom-3 right-3 px-3 py-1 bg-[#4D0202]/90 backdrop-blur-sm text-[#FFF3DD] rounded-lg text-xs font-semibold tabular-nums">
                    Từ {concept.startingPrice.toLocaleString('vi-VN')} đ
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="text-[11px] font-medium text-[#4D0202]/70 uppercase tracking-wider mb-1">
                      {concept.category} · {concept.duration}
                    </div>
                    <h3 className="font-serif text-lg font-bold text-[#4D0202] group-hover:text-[#6A1414] transition-colors">
                      {concept.title}
                    </h3>
                    <p className="text-xs text-[#4D0202]/80 mt-1 line-clamp-2 leading-relaxed">
                      {concept.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#ECDBC0]/60 flex items-center justify-between gap-3">
                    <button
                      onClick={() => navigateTo('concept-detail', { conceptId: concept.id })}
                      className="text-xs font-semibold text-[#4D0202] hover:underline inline-flex items-center gap-1"
                    >
                      Xem chi tiết <ChevronRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => navigateTo('booking', { conceptId: concept.id })}
                      className="px-3.5 py-1.5 bg-[#4D0202] hover:bg-[#380101] text-[#FFF3DD] text-xs font-bold uppercase rounded-lg transition-colors"
                    >
                      Đặt lịch concept này
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. ACTIVE PROMOTION BANNER (3.1 & 3.10) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#4D0202] via-[#5D0B0B] to-[#380101] text-[#FFF3DD] rounded-3xl p-8 sm:p-12 shadow-xl border border-[#7A1E1E] relative overflow-hidden">
          {/* Subtle decorative background watermark motif */}
          <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
            <StudioLogo size="hero" inverted={true} showSlogan={false} />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <span className="px-3 py-1 bg-[#FFF3DD]/20 text-[#FFF3DD] text-[11px] font-bold uppercase tracking-wider rounded-full inline-block">
                Ưu Đãi Đặc Biệt Mùa Thu 2026
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white text-balance">
                {featuredPromo.title}
              </h2>
              <p className="text-xs sm:text-sm text-[#FFF3DD]/90 leading-relaxed max-w-xl">
                {featuredPromo.description} Mã áp dụng trực tiếp khi đặt lịch hoặc thanh toán trên website.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <div className="px-4 py-2 bg-[#FFF3DD] text-[#4D0202] font-mono font-bold text-sm tracking-wider rounded-lg border-2 border-dashed border-[#4D0202]">
                  {featuredPromo.code}
                </div>
                <span className="text-xs text-[#FFF3DD]/80">Hạn áp dụng: {featuredPromo.validUntil}</span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <button
                onClick={() => navigateTo('booking', { promoCode: featuredPromo.code })}
                className="w-full py-3 px-6 bg-[#FFF3DD] hover:bg-white text-[#4D0202] font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all text-center"
              >
                Sử dụng mã & Đặt lịch
              </button>
              <button
                onClick={() => navigateTo('promotions')}
                className="w-full py-3 px-6 bg-transparent hover:bg-white/10 text-[#FFF3DD] border border-[#FFF3DD]/40 font-medium text-xs uppercase tracking-wider rounded-xl transition-all text-center"
              >
                Xem toàn bộ {PROMOTIONS.length} mã ưu đãi
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PACKAGES & PRICING TEASER (3.5) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#4D0202]/60">
            Minh Bạch & Tận Tâm
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#4D0202]">
            Gói Dịch Vụ & Bảng Giá Chi Tiết
          </h2>
          <p className="text-xs sm:text-sm text-[#4D0202]/80">
            Không phát sinh chi phí ẩn. Đã bao gồm trang điểm, làm tóc, trang phục và trả toàn bộ file gốc.
          </p>
        </div>

        {/* 3 Packages Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {PRICING_PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative rounded-2xl p-7 flex flex-col justify-between transition-all ${
                pkg.isPopular
                  ? 'bg-[#FFF9EE] border-2 border-[#4D0202] shadow-xl md:-translate-y-2'
                  : 'bg-[#FFF9EE] border border-[#ECDBC0] shadow-sm hover:shadow-md'
              }`}
            >
              {pkg.isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#4D0202] text-[#FFF3DD] text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm">
                  Lựa chọn phổ biến nhất (85%)
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#4D0202]">{pkg.name}</h3>
                  <p className="text-xs text-[#4D0202]/70 mt-0.5">{pkg.tagline}</p>
                </div>

                <div className="pt-2 pb-4 border-b border-[#ECDBC0]">
                  <span className="font-serif text-3xl font-bold text-[#4D0202] tabular-nums">
                    {pkg.price.toLocaleString('vi-VN')}
                  </span>
                  <span className="text-xs font-semibold text-[#4D0202]/70 ml-1">VNĐ / buổi</span>
                  <p className="text-[11px] text-[#4D0202]/60 mt-1">
                    Cọc trước 30% ({((pkg.price * 0.3)).toLocaleString('vi-VN')} đ)
                  </p>
                </div>

                {/* Features List */}
                <ul className="space-y-2.5 text-xs text-[#4D0202]/90">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                    <span>Thời lượng: <strong>{pkg.duration}</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                    <span>Trang phục: <strong>{pkg.outfitCount} bộ</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                    <span>{pkg.makeupIncluded}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                    <span>Chỉnh sửa: <strong>{pkg.editedPhotos} ảnh Photoshop</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                    <span>{pkg.rawPhotos}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                    <span>{pkg.printGifts}</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-[#ECDBC0] space-y-2">
                <button
                  onClick={() => navigateTo('booking', { packageId: pkg.id })}
                  className={`w-full py-2.5 px-4 text-xs font-bold uppercase tracking-wider rounded-xl transition-colors ${
                    pkg.isPopular
                      ? 'bg-[#4D0202] hover:bg-[#380101] text-[#FFF3DD]'
                      : 'bg-[#ECDBC0]/60 hover:bg-[#ECDBC0] text-[#4D0202]'
                  }`}
                >
                  Chọn gói này để đặt lịch
                </button>
                <button
                  onClick={() => navigateTo('pricing')}
                  className="w-full text-center text-[11px] text-[#4D0202]/70 hover:underline"
                >
                  Xem bảng so sánh chi tiết →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. PORTFOLIO SHOWCASE GALLERY (3.11 & Lightbox) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#ECDBC0] pb-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#4D0202]/60">
              Chất Lượng Tác Phẩm
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#4D0202]">
              Thư Viện Tác Phẩm Tiêu Biểu
            </h2>
          </div>
          <button
            onClick={() => navigateTo('gallery')}
            className="text-xs font-bold text-[#4D0202] hover:underline inline-flex items-center gap-1 shrink-0"
          >
            Mở toàn bộ thư viện ảnh <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Gallery Bento Grid with Lightbox viewer */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {GALLERY_ITEMS.slice(0, 4).map((item, idx) => (
            <div
              key={item.id}
              onClick={() =>
                openLightbox(
                  GALLERY_ITEMS.map((g) => g.imageUrl),
                  idx,
                  item.title,
                  `${item.category} · Nhiếp ảnh: ${item.photographer}`,
                  'Xem Concept',
                  () => navigateTo('concept-detail', { conceptId: item.conceptId })
                )
              }
              className="group relative rounded-xl overflow-hidden cursor-pointer border border-[#ECDBC0] shadow-sm hover:shadow-lg transition-all"
            >
              <ImageWithFallback
                src={item.imageUrl}
                alt={item.title}
                aspectRatioClass="aspect-[3/4]"
                titleFallback={item.title}
                subtitleFallback={item.category}
                hoverZoom={true}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end text-white">
                <span className="text-[10px] uppercase font-semibold text-[#FBBF24]">
                  {item.category}
                </span>
                <h4 className="font-serif text-sm font-bold line-clamp-1">{item.title}</h4>
                <p className="text-[10px] text-white/80 line-clamp-1">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. CUSTOMER REVIEWS (3.12) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#ECDBC0] pb-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#4D0202]/60">
              Trải Nghiệm Khách Hàng
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#4D0202]">
              Cảm Nhận Từ Những Người Từng Ghé Hạt Nắng
            </h2>
          </div>
          <button
            onClick={() => navigateTo('reviews')}
            className="text-xs font-bold text-[#4D0202] hover:underline inline-flex items-center gap-1 shrink-0"
          >
            Xem tất cả đánh giá <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Reviews Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {REVIEWS.slice(0, 2).map((rev) => (
            <div
              key={rev.id}
              className="bg-[#FFF9EE] rounded-2xl border border-[#ECDBC0] p-6 shadow-sm flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-full bg-[#4D0202] text-[#FFF3DD] font-serif font-bold flex items-center justify-center text-sm">
                      {rev.authorName.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-[#4D0202]">{rev.authorName}</h4>
                      <p className="text-[10px] text-[#4D0202]/60">
                        {rev.conceptTitle} · {rev.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-[#F59E0B]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#F59E0B]" />
                    ))}
                  </div>
                </div>

                <p className="text-xs text-[#4D0202]/85 leading-relaxed italic">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              {rev.studioReply && (
                <div className="p-3 bg-[#FAF1DF] rounded-xl text-[11px] text-[#4D0202] border-l-2 border-[#4D0202]">
                  <span className="font-bold">Phản hồi từ Hạt Nắng Studio: </span>
                  <span className="italic">{rev.studioReply}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 8. QUICK CONTACT & STUDIO ADDRESS (3.13) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FFF9EE] rounded-3xl border border-[#ECDBC0] p-8 sm:p-10 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="md:col-span-2 space-y-3">
            <h3 className="font-serif text-2xl font-bold text-[#4D0202]">
              Bạn Muốn Thiết Kế Riêng Một Concept Độc Bản?
            </h3>
            <p className="text-xs sm:text-sm text-[#4D0202]/80 leading-relaxed">
              Ekip luôn sẵn sàng lắng nghe mọi ý tưởng độc đáo của bạn để biến những ý niệm thành khung hình nghệ thuật.
              Liên hệ ngay để nhận tư vấn bảng màu, phục trang và khung giờ chụp đẹp nhất!
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-[#4D0202]">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#D97706]" />
                <span>{STUDIO_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-[#D97706]" />
                <a href={`tel:${STUDIO_INFO.hotline}`} className="font-bold underline">
                  {STUDIO_INFO.hotline}
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 justify-center">
            <button
              onClick={() => navigateTo('contact')}
              className="py-3 px-6 bg-[#4D0202] hover:bg-[#380101] text-[#FFF3DD] text-xs font-bold uppercase tracking-wider rounded-xl transition-colors shadow-sm text-center"
            >
              Gửi yêu cầu tư vấn
            </button>
            <button
              onClick={() => navigateTo('booking')}
              className="py-3 px-6 bg-white hover:bg-[#FFF9EE] text-[#4D0202] border border-[#ECDBC0] text-xs font-bold uppercase tracking-wider rounded-xl transition-colors text-center"
            >
              Đặt lịch trực tuyến
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

import React, { useState, useMemo } from 'react';
import { useStudio } from '../../context/StudioContext';
import { CONCEPTS } from '../../data/studioData';
import { ConceptCategory, Concept } from '../../types';
import { ImageWithFallback } from '../common/ImageWithFallback';
import {
  Search,
  SlidersHorizontal,
  Heart,
  ChevronRight,
  Sparkles,
  Info,
  Calendar,
  X,
} from 'lucide-react';

export const ConceptsPage: React.FC = () => {
  const { navigateTo, toggleWishlist, wishlist } = useStudio();

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ConceptCategory>('Tất cả');
  const [priceRange, setPriceRange] = useState<'all' | 'under13' | '13to15' | 'above15'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'new' | 'featured'>('all');

  const categories: ConceptCategory[] = [
    'Tất cả',
    'Chân dung cá nhân',
    'Nàng thơ',
    'Thời trang',
    'Sinh nhật',
    'Tốt nghiệp',
    'Theo mùa/Lễ hội',
    'Xu hướng Gen Z',
  ];

  // Filtered concepts
  const filteredConcepts = useMemo(() => {
    return CONCEPTS.filter((c) => {
      // Search match
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        c.title.toLowerCase().includes(query) ||
        c.description.toLowerCase().includes(query) ||
        c.tags.some((t) => t.toLowerCase().includes(query)) ||
        c.style.toLowerCase().includes(query);

      // Category match
      const matchesCategory = selectedCategory === 'Tất cả' || c.category === selectedCategory;

      // Price match
      let matchesPrice = true;
      if (priceRange === 'under13') matchesPrice = c.startingPrice <= 1300000;
      else if (priceRange === '13to15') matchesPrice = c.startingPrice > 1300000 && c.startingPrice <= 1500000;
      else if (priceRange === 'above15') matchesPrice = c.startingPrice > 1500000;

      // Status match
      let matchesStatus = true;
      if (statusFilter === 'active') matchesStatus = c.status !== 'discontinued';
      else if (statusFilter === 'new') matchesStatus = c.status === 'new';
      else if (statusFilter === 'featured') matchesStatus = c.status === 'featured';

      return matchesSearch && matchesCategory && matchesPrice && matchesStatus;
    });
  }, [searchQuery, selectedCategory, priceRange, statusFilter]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#4D0202]/60">
          Bộ Sưu Tập Nghệ Thuật
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#4D0202]">
          Khám Phá Các Concept Chụp Ảnh
        </h1>
        <p className="text-xs sm:text-sm text-[#4D0202]/80 leading-relaxed">
          Từ phong cách nàng thơ vintage mộng mơ, chân dung nghệ thuật sâu lắng đến phong cách thời trang hiện đại.
          Mỗi concept đều được thiết kế ánh sáng và phục trang đồng bộ.
        </p>
      </div>

      {/* Search & Filter Controls */}
      <div className="bg-[#FFF9EE] rounded-2xl border border-[#ECDBC0] p-5 shadow-sm space-y-4">
        {/* Row 1: Search bar + Status pills + Reset */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4D0202]/50" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo tên concept, phong cách, từ khóa (hoa tươi, vintage, bánh kem...)"
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-white border border-[#ECDBC0] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#4D0202] text-[#4D0202] placeholder:text-[#4D0202]/40"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4D0202]/50 hover:text-[#4D0202]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick status & price filters */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto text-xs">
            {/* Price filter segmented button */}
            <div className="flex items-center bg-white border border-[#ECDBC0] rounded-lg p-1 text-[11px]">
              <span className="px-2 text-[#4D0202]/60 font-medium">Giá:</span>
              <button
                onClick={() => setPriceRange('all')}
                className={`px-2 py-1 rounded transition-colors ${
                  priceRange === 'all' ? 'bg-[#4D0202] text-[#FFF3DD] font-semibold' : 'text-[#4D0202]/80'
                }`}
              >
                Tất cả
              </button>
              <button
                onClick={() => setPriceRange('under13')}
                className={`px-2 py-1 rounded transition-colors ${
                  priceRange === 'under13' ? 'bg-[#4D0202] text-[#FFF3DD] font-semibold' : 'text-[#4D0202]/80'
                }`}
              >
                ≤ 1.3tr
              </button>
              <button
                onClick={() => setPriceRange('13to15')}
                className={`px-2 py-1 rounded transition-colors ${
                  priceRange === '13to15' ? 'bg-[#4D0202] text-[#FFF3DD] font-semibold' : 'text-[#4D0202]/80'
                }`}
              >
                1.3 - 1.5tr
              </button>
              <button
                onClick={() => setPriceRange('above15')}
                className={`px-2 py-1 rounded transition-colors ${
                  priceRange === 'above15' ? 'bg-[#4D0202] text-[#FFF3DD] font-semibold' : 'text-[#4D0202]/80'
                }`}
              >
                &gt; 1.5tr
              </button>
            </div>

            {/* Quick Status Pill */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="bg-white border border-[#ECDBC0] text-[#4D0202] text-xs rounded-lg px-2.5 py-1.5 focus:outline-none"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="active">Đang hoạt động</option>
              <option value="new">Concept Mới</option>
              <option value="featured">Concept Nổi bật</option>
            </select>
          </div>
        </div>

        {/* Row 2: Category Filter Tabs */}
        <div className="pt-2 border-t border-[#ECDBC0]/60 flex items-center gap-1.5 overflow-x-auto pb-1">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors shrink-0 ${
                  isSelected
                    ? 'bg-[#4D0202] text-[#FFF3DD] font-bold shadow-sm'
                    : 'bg-white/80 hover:bg-white text-[#4D0202]/80 border border-[#ECDBC0]/80'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Notice regarding discontinued concepts */}
      <div className="flex items-center justify-between text-xs text-[#4D0202]/70 px-1">
        <span>Hiển thị <strong>{filteredConcepts.length}</strong> concept</span>
        <span className="flex items-center gap-1 italic">
          <Info className="w-3.5 h-3.5 text-[#D97706]" />
          Concept có nhãn &ldquo;Tạm ngừng&rdquo; sẽ tự động ẩn khỏi trang đặt lịch theo mùa.
        </span>
      </div>

      {/* Concept Grid */}
      {filteredConcepts.length === 0 ? (
        <div className="text-center py-16 bg-[#FFF9EE] rounded-2xl border border-[#ECDBC0] space-y-3">
          <p className="font-serif font-bold text-lg text-[#4D0202]">
            Không tìm thấy concept phù hợp với tiêu chí của bạn
          </p>
          <p className="text-xs text-[#4D0202]/70">
            Hãy thử tìm kiếm với từ khóa khác hoặc xóa bộ lọc để xem toàn bộ danh mục.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('Tất cả');
              setPriceRange('all');
              setStatusFilter('all');
            }}
            className="px-4 py-2 bg-[#4D0202] text-[#FFF3DD] text-xs font-semibold rounded-lg"
          >
            Đặt lại bộ lọc
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredConcepts.map((concept) => {
            const isWishlisted = wishlist.includes(concept.id);
            const isDiscontinued = concept.status === 'discontinued';

            return (
              <div
                key={concept.id}
                className={`group bg-[#FFF9EE] rounded-2xl border border-[#ECDBC0] overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col ${
                  isDiscontinued ? 'opacity-80 grayscale-[20%]' : ''
                }`}
              >
                {/* Image Showcase */}
                <div className="relative overflow-hidden">
                  <ImageWithFallback
                    src={concept.coverImage}
                    alt={concept.title}
                    aspectRatioClass="aspect-[4/3]"
                    titleFallback={concept.title}
                    subtitleFallback={concept.category}
                    hoverZoom={!isDiscontinued}
                  />

                  {/* Status Badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
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
                    {isDiscontinued && (
                      <span className="px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase bg-[#71717A] text-white rounded-md shadow-sm">
                        Tạm ngừng cung cấp
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

                  {/* Starting Price Pill */}
                  <div className="absolute bottom-3 right-3 px-3 py-1 bg-[#4D0202]/90 backdrop-blur-sm text-[#FFF3DD] rounded-lg text-xs font-semibold tabular-nums">
                    Từ {concept.startingPrice.toLocaleString('vi-VN')} đ
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[11px] text-[#4D0202]/70 font-medium">
                      <span>{concept.category}</span>
                      <span>·</span>
                      <span>{concept.duration}</span>
                      <span>·</span>
                      <span>{concept.editedPhotosCount} ảnh retouch</span>
                    </div>

                    <h3 className="font-serif text-lg font-bold text-[#4D0202] group-hover:text-[#6A1414] transition-colors">
                      {concept.title}
                    </h3>

                    <p className="text-xs text-[#4D0202]/80 line-clamp-2 leading-relaxed">
                      {concept.description}
                    </p>

                    {/* Color palette dots */}
                    <div className="pt-1 flex items-center gap-1.5">
                      <span className="text-[10px] text-[#4D0202]/60">Bảng màu:</span>
                      {concept.colorPalette.map((cp, idx) => (
                        <span
                          key={idx}
                          className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                          style={{ backgroundColor: cp.hex }}
                          title={cp.name}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Bottom Action Strip */}
                  <div className="pt-3 border-t border-[#ECDBC0]/60 flex items-center justify-between gap-3">
                    <button
                      onClick={() => navigateTo('concept-detail', { conceptId: concept.id })}
                      className="text-xs font-semibold text-[#4D0202] hover:underline inline-flex items-center gap-1"
                    >
                      Xem chi tiết <ChevronRight className="w-3.5 h-3.5" />
                    </button>

                    {isDiscontinued ? (
                      <span className="text-[11px] font-semibold text-[#71717A] italic">
                        Tạm ngừng nhận lịch
                      </span>
                    ) : (
                      <button
                        onClick={() => navigateTo('booking', { conceptId: concept.id })}
                        className="px-3.5 py-1.5 bg-[#4D0202] hover:bg-[#380101] text-[#FFF3DD] text-xs font-bold uppercase rounded-lg transition-colors"
                      >
                        Đặt lịch concept này
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

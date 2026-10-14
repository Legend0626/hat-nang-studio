import React, { useState, useMemo } from 'react';
import { useStudio } from '../../context/StudioContext';
import { GALLERY_ITEMS, CONCEPTS } from '../../data/studioData';
import { ImageWithFallback } from '../common/ImageWithFallback';
import {
  Camera,
  Maximize2,
  Share2,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Check,
} from 'lucide-react';

export const GalleryPage: React.FC = () => {
  const { navigateTo, openLightbox, showToast } = useStudio();
  const [selectedCategory, setSelectedCategory] = useState<string>('Tất cả');
  const [copiedShare, setCopiedShare] = useState(false);

  const categories = [
    'Tất cả',
    'Nàng thơ',
    'Chân dung cá nhân',
    'Sinh nhật',
    'Thời trang',
    'Tốt nghiệp',
    'Xu hướng Gen Z',
  ];

  const filteredItems = useMemo(() => {
    if (selectedCategory === 'Tất cả') return GALLERY_ITEMS;
    return GALLERY_ITEMS.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  const handleShareGallery = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedShare(true);
    showToast('Đã sao chép liên kết thư viện ảnh vào khay nhớ tạm!', 'info');
    setTimeout(() => setCopiedShare(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* 1. Header & Privacy Statement (Spec 3.11) */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#ECDBC0]">
        <div className="space-y-2 max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#4D0202]/60">
            Portfolio Nghệ Thuật
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#4D0202]">
            Thư Viện Tác Phẩm Hạt Nắng
          </h1>
          <p className="text-xs sm:text-sm text-[#4D0202]/80 leading-relaxed">
            Mỗi khung hình là một câu chuyện cảm xúc được ghi lại dưới ánh sáng ấm áp tự nhiên.
            Nhấn vào bất kỳ ảnh nào để xem toàn màn hình độ phân giải cao.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleShareGallery}
            className="px-4 py-2 bg-[#FFF9EE] hover:bg-white text-[#4D0202] border border-[#ECDBC0] rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors shadow-sm"
          >
            {copiedShare ? <Check className="w-4 h-4 text-emerald-700" /> : <Share2 className="w-4 h-4" />}
            <span>{copiedShare ? 'Đã sao chép' : 'Chia sẻ thư viện'}</span>
          </button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-colors shrink-0 ${
                isSelected
                  ? 'bg-[#4D0202] text-[#FFF3DD] font-bold shadow-sm'
                  : 'bg-white hover:bg-[#FAF1DF] text-[#4D0202]/80 border border-[#ECDBC0]'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Gallery Masonry / Dynamic Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredItems.map((item, idx) => (
          <div
            key={item.id}
            onClick={() =>
              openLightbox(
                filteredItems.map((g) => g.imageUrl),
                idx,
                item.title,
                `${item.category} · Nhiếp ảnh: ${item.photographer}`,
                'Xem Concept Này',
                () => navigateTo('concept-detail', { conceptId: item.conceptId })
              )
            }
            className="group bg-[#FFF9EE] rounded-2xl border border-[#ECDBC0] overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="relative overflow-hidden">
              <ImageWithFallback
                src={item.imageUrl}
                alt={item.title}
                aspectRatioClass="aspect-[3/4]"
                titleFallback={item.title}
                subtitleFallback={item.category}
                hoverZoom={true}
              />
              <div className="absolute top-3 right-3 p-2 bg-black/40 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4" />
              </div>
              <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/60 backdrop-blur-sm text-[#FFF3DD] text-[10px] rounded">
                {item.category}
              </div>
            </div>

            <div className="p-4 space-y-1">
              <h3 className="font-serif font-bold text-sm text-[#4D0202] group-hover:text-[#6A1414] line-clamp-1">
                {item.title}
              </h3>
              <p className="text-[11px] text-[#4D0202]/70 line-clamp-1">
                {item.description}
              </p>
              <div className="pt-2 border-t border-[#ECDBC0]/60 flex items-center justify-between text-[10px] text-[#4D0202]/60">
                <span>Ekip: {item.photographer}</span>
                <span className="font-semibold text-[#4D0202] group-hover:underline inline-flex items-center gap-0.5">
                  Xem concept →
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Privacy Guarantee Note (Spec 3.11: Chỉ công khai ảnh khách hàng khi đã có sự đồng ý) */}
      <div className="p-4 bg-[#FAF1DF] rounded-2xl border border-[#ECDBC0] text-xs text-[#4D0202]/80 flex items-center gap-3">
        <ShieldCheck className="w-5 h-5 text-[#D97706] shrink-0" />
        <p className="leading-relaxed">
          <strong>Cam kết bảo mật hình ảnh cá nhân:</strong> Toàn bộ hình ảnh trưng bày trên thư viện website
          đều đã nhận được sự đồng ý bằng văn bản của khách hàng. Hạt Nắng Studio cam kết tôn trọng tuyệt đối
          quyền riêng tư và không bao giờ công khai ảnh nếu chưa được phép.
        </p>
      </div>
    </div>
  );
};

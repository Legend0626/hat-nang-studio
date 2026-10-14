import React, { useState } from 'react';
import { useStudio } from '../../context/StudioContext';
import { PROMOTIONS } from '../../data/studioData';
import {
  Sparkles,
  Copy,
  Check,
  Calendar,
  ArrowRight,
  Gift,
  Tag,
  ShieldCheck,
} from 'lucide-react';

export const PromotionsPage: React.FC = () => {
  const { navigateTo, showToast } = useStudio();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    showToast(`Đã sao chép mã ưu đãi ${code}! Bạn có thể dán vào bước đặt lịch.`, 'success');
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FFF9EE] border border-[#ECDBC0] rounded-full text-xs font-medium text-[#4D0202]">
          <Gift className="w-3.5 h-3.5 text-[#D97706]" />
          <span>Ưu Đãi & Quà Tặng · Hạt Nắng Studio</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#4D0202]">
          Chương Trình Khuyến Mãi Mới Nhất
        </h1>
        <p className="text-xs sm:text-sm text-[#4D0202]/80 leading-relaxed">
          Gom trọn những khoảnh khắc thanh xuân với mức giá ngọt ngào nhất. Sao chép mã ưu đãi và áp dụng trực tiếp khi đặt lịch hẹn.
        </p>
      </div>

      {/* Promotions Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {PROMOTIONS.map((promo) => (
          <div
            key={promo.code}
            className="bg-[#FFF9EE] rounded-3xl border border-[#ECDBC0] p-7 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-6 relative overflow-hidden"
          >
            {promo.isFeatured && (
              <div className="absolute top-0 right-0 bg-[#4D0202] text-[#FFF3DD] text-[10px] font-bold uppercase tracking-wider px-4 py-1 rounded-bl-xl shadow-sm">
                Ưu Đãi Nổi Bật
              </div>
            )}

            <div className="space-y-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#D97706] flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5" />
                  {promo.applicableConcepts}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#4D0202] mt-1">
                  {promo.title}
                </h3>
                <p className="text-xs text-[#4D0202]/80 mt-1 leading-relaxed">
                  {promo.description}
                </p>
              </div>

              {/* Conditions List */}
              <div className="p-4 bg-[#FAF1DF] rounded-xl border border-[#ECDBC0] space-y-1.5 text-xs text-[#4D0202]">
                <span className="font-bold uppercase text-[10px] text-[#4D0202]/70 block">
                  Điều kiện & Thời hạn áp dụng:
                </span>
                <ul className="space-y-1">
                  {promo.conditions.map((cond, idx) => (
                    <li key={idx} className="flex items-start gap-1.5 text-[11px] text-[#4D0202]/85">
                      <span className="text-[#D97706] font-bold">·</span>
                      <span>{cond}</span>
                    </li>
                  ))}
                  <li className="text-[11px] text-[#4D0202]/70 pt-1 border-t border-[#ECDBC0]/60">
                    Thời hạn áp dụng đến hết: <strong>{promo.validUntil}</strong>
                  </li>
                </ul>
              </div>
            </div>

            {/* Voucher Coupon Box & Action Buttons */}
            <div className="pt-4 border-t border-[#ECDBC0] flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Coupon Ticket */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="px-4 py-2 bg-white border-2 border-dashed border-[#4D0202] rounded-xl font-mono font-bold text-sm text-[#4D0202] tracking-wider">
                  {promo.code}
                </div>
                <button
                  onClick={() => handleCopyCode(promo.code)}
                  className="p-2.5 bg-white border border-[#ECDBC0] hover:bg-[#FAF1DF] text-[#4D0202] rounded-xl transition-colors shrink-0"
                  title="Sao chép mã"
                >
                  {copiedCode === promo.code ? (
                    <Check className="w-4 h-4 text-emerald-700" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Apply Direct Button */}
              <button
                onClick={() => navigateTo('booking', { promoCode: promo.code })}
                className="w-full sm:w-auto px-5 py-2.5 bg-[#4D0202] hover:bg-[#380101] text-[#FFF3DD] text-xs font-bold uppercase tracking-wider rounded-xl transition-colors shadow-sm flex items-center justify-center gap-1.5"
              >
                <span>Dùng mã để đặt lịch</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Terms footnote */}
      <div className="p-6 bg-[#FAF1DF] rounded-2xl border border-[#ECDBC0] text-xs text-[#4D0202]/80 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-[#D97706] shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          Mỗi mã ưu đãi có điều kiện áp dụng riêng theo từng concept hoặc gói chụp. Quý khách chỉ cần nhập mã tại trang
          Đặt lịch hoặc trang Thanh toán, hệ thống sẽ tự động đối soát và trừ trực tiếp chi phí vào hóa đơn tạm tính của bạn.
        </p>
      </div>
    </div>
  );
};

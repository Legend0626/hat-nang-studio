import React, { useState } from 'react';
import { useStudio } from '../../context/StudioContext';
import { PRICING_PACKAGES, ADD_ON_SERVICES } from '../../data/studioData';
import {
  CheckCircle2,
  XCircle,
  Calculator,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Layers,
  HelpCircle,
  FileCheck,
} from 'lucide-react';

export const PricingPage: React.FC = () => {
  const { navigateTo } = useStudio();

  // Add-on calculator state
  const [selectedBasePackageId, setSelectedBasePackageId] = useState<string>('pkg-std');
  const [selectedAddOnIds, setSelectedAddOnIds] = useState<string[]>([]);

  const basePackage =
    PRICING_PACKAGES.find((p) => p.id === selectedBasePackageId) || PRICING_PACKAGES[1];

  const handleToggleAddOn = (id: string) => {
    setSelectedAddOnIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Calculate estimated total and deposit
  const addOnsTotal = selectedAddOnIds.reduce((sum, id) => {
    const addon = ADD_ON_SERVICES.find((a) => a.id === id);
    return sum + (addon ? addon.price : 0);
  }, 0);

  const estimatedTotal = basePackage.price + addOnsTotal;
  const estimatedDeposit = Math.round(estimatedTotal * 0.3);

  // Criteria for interactive package comparison matrix
  const comparisonCriteria = [
    { label: 'Thời lượng chụp', basic: '60 phút', std: '90 - 120 phút', pre: '150 - 180 phút' },
    { label: 'Số lượng trang phục', basic: '01 bộ', std: '02 bộ', pre: '03 bộ' },
    { label: 'Layout Makeup & Làm tóc', basic: '01 layout tự nhiên', std: '02 kiểu tóc chuyên nghiệp', pre: '02 layout VIP khác biệt' },
    { label: 'Số ảnh chỉnh sửa Photoshop', basic: '12 ảnh', std: '25 ảnh', pre: '40 ảnh cao cấp' },
    { label: 'Bàn giao toàn bộ File gốc', basic: true, std: true, pre: true },
    { label: 'Thời gian trả ảnh chỉnh sửa', basic: '3 ngày', std: '3 ngày', pre: '2 ngày (Ưu tiên)' },
    { label: 'Quà tặng in ấn', basic: '3 ảnh lụa 13x18cm', std: '5 ảnh ép gỗ + Khung', pre: 'Photobook mini + Tranh lớn 30x45' },
    { label: 'Video Behind The Scenes', basic: false, std: 'Clip ngắn 15-30s', pre: 'Reels/TikTok 4K nghệ thuật' },
    { label: 'Hỗ trợ Stylist & Posing riêng', basic: 'Posing coach cơ bản', std: 'Stylist chuyên nghiệp', pre: 'Ekip trưởng trực tiếp' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* 1. Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#4D0202]/60">
          Minh Bạch & Tận Tâm
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#4D0202]">
          Bảng Giá Dịch Vụ & So Sánh Gói Chụp
        </h1>
        <p className="text-xs sm:text-sm text-[#4D0202]/80 leading-relaxed">
          Tất cả các gói chụp tại Hạt Nắng đều đã bao gồm chuyên viên trang điểm, làm tóc tại chỗ,
          trang phục thiết kế và bàn giao 100% file gốc chất lượng cao.
        </p>
      </div>

      {/* 2. Main 3 Packages Display */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {PRICING_PACKAGES.map((pkg) => (
          <div
            key={pkg.id}
            className={`relative rounded-2xl p-7 bg-[#FFF9EE] flex flex-col justify-between transition-all ${
              pkg.isPopular
                ? 'border-2 border-[#4D0202] shadow-xl md:-translate-y-2'
                : 'border border-[#ECDBC0] shadow-sm hover:shadow-md'
            }`}
          >
            {pkg.isPopular && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#4D0202] text-[#FFF3DD] text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm">
                Được Lựa Chọn Nhiều Nhất
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
                  Tiền cọc 30%: {Math.round(pkg.price * 0.3).toLocaleString('vi-VN')} đ
                </p>
              </div>

              <div className="text-xs text-[#4D0202]/80 italic">
                Phù hợp cho: {pkg.bestFor}
              </div>

              <ul className="space-y-2.5 text-xs text-[#4D0202]/90 pt-2 border-t border-[#ECDBC0]/60">
                {pkg.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6 mt-6 border-t border-[#ECDBC0]">
              <button
                onClick={() => navigateTo('booking', { packageId: pkg.id })}
                className={`w-full py-2.5 px-4 text-xs font-bold uppercase tracking-wider rounded-xl transition-colors ${
                  pkg.isPopular
                    ? 'bg-[#4D0202] hover:bg-[#380101] text-[#FFF3DD]'
                    : 'bg-[#ECDBC0]/60 hover:bg-[#ECDBC0] text-[#4D0202]'
                }`}
              >
                Chọn {pkg.name} để đặt lịch
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Interactive Package Comparison Matrix (3.5 Spec) */}
      <div className="bg-[#FFF9EE] rounded-3xl border border-[#ECDBC0] p-6 sm:p-10 shadow-sm space-y-6">
        <div className="text-center space-y-1">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#4D0202]/60">
            Bảng Đối Chiếu Quyền Lợi
          </span>
          <h2 className="font-serif text-2xl font-bold text-[#4D0202]">
            So Sánh Chi Tiết Quyền Lợi Từng Gói
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left text-[#4D0202]">
            <thead>
              <tr className="border-b-2 border-[#ECDBC0] text-sm">
                <th className="py-3 px-4 font-serif font-bold text-base">Hạng mục so sánh</th>
                <th className="py-3 px-4 font-serif font-bold text-[#4D0202] text-center">Gói Ban Mai</th>
                <th className="py-3 px-4 font-serif font-bold text-[#4D0202] text-center bg-[#FAF1DF] rounded-t-lg">
                  Gói Hoàng Hôn (Phổ biến)
                </th>
                <th className="py-3 px-4 font-serif font-bold text-[#4D0202] text-center">Gói Độc Bản (VIP)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#ECDBC0]">
              {comparisonCriteria.map((row, idx) => (
                <tr key={idx} className="hover:bg-white/40 transition-colors">
                  <td className="py-3 px-4 font-medium">{row.label}</td>
                  <td className="py-3 px-4 text-center">
                    {typeof row.basic === 'boolean' ? (
                      row.basic ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-700 mx-auto" />
                      ) : (
                        <XCircle className="w-4 h-4 text-zinc-400 mx-auto" />
                      )
                    ) : (
                      row.basic
                    )}
                  </td>
                  <td className="py-3 px-4 text-center font-semibold bg-[#FAF1DF]/70">
                    {typeof row.std === 'boolean' ? (
                      row.std ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-700 mx-auto" />
                      ) : (
                        <XCircle className="w-4 h-4 text-zinc-400 mx-auto" />
                      )
                    ) : (
                      row.std
                    )}
                  </td>
                  <td className="py-3 px-4 text-center font-bold">
                    {typeof row.pre === 'boolean' ? (
                      row.pre ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-700 mx-auto" />
                      ) : (
                        <XCircle className="w-4 h-4 text-zinc-400 mx-auto" />
                      )
                    ) : (
                      row.pre
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Interactive Add-On Services & Cost Calculator (3.5 Spec) */}
      <div className="bg-[#FAF1DF] rounded-3xl border border-[#ECDBC0] p-6 sm:p-10 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-[#D97706]" />
              <h2 className="font-serif text-2xl font-bold text-[#4D0202]">
                Dịch Vụ Bổ Sung & Dự Tính Chi Phí
              </h2>
            </div>
            <p className="text-xs text-[#4D0202]/80 mt-1">
              Chọn gói cơ bản và các dịch vụ cộng thêm bạn cần để tính ngay tổng chi phí và số tiền cọc dự kiến.
            </p>
          </div>

          {/* Package Selector */}
          <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-[#ECDBC0] text-xs">
            {PRICING_PACKAGES.map((pkg) => (
              <button
                key={pkg.id}
                onClick={() => setSelectedBasePackageId(pkg.id)}
                className={`px-3 py-1.5 rounded-lg transition-colors font-semibold ${
                  selectedBasePackageId === pkg.id
                    ? 'bg-[#4D0202] text-[#FFF3DD]'
                    : 'text-[#4D0202]/80 hover:bg-[#FAF1DF]'
                }`}
              >
                {pkg.name}
              </button>
            ))}
          </div>
        </div>

        {/* Add-ons checkboxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ADD_ON_SERVICES.map((addon) => {
            const isChecked = selectedAddOnIds.includes(addon.id);
            return (
              <label
                key={addon.id}
                onClick={() => handleToggleAddOn(addon.id)}
                className={`flex items-start justify-between p-4 rounded-xl border cursor-pointer transition-all select-none ${
                  isChecked
                    ? 'bg-[#FFF9EE] border-[#4D0202] shadow-sm'
                    : 'bg-white/80 border-[#ECDBC0] hover:bg-white'
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => {}}
                    className="mt-1 accent-[#4D0202] w-4 h-4 rounded"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-[#4D0202]">{addon.name}</h4>
                    <p className="text-[11px] text-[#4D0202]/70 mt-0.5">{addon.description}</p>
                  </div>
                </div>
                <span className="font-serif font-bold text-xs text-[#4D0202] shrink-0 tabular-nums ml-2">
                  +{addon.price.toLocaleString('vi-VN')} đ
                </span>
              </label>
            );
          })}
        </div>

        {/* Calculator Result Box */}
        <div className="p-5 bg-[#FFF9EE] rounded-2xl border-2 border-dashed border-[#4D0202]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-[#4D0202]/70">
              Tạm tính chi phí buổi chụp:
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-3xl font-bold text-[#4D0202] tabular-nums">
                {estimatedTotal.toLocaleString('vi-VN')} VNĐ
              </span>
              <span className="text-xs text-[#4D0202]/70">
                (Đã gồm {selectedAddOnIds.length} dịch vụ bổ sung)
              </span>
            </div>
            <p className="text-xs text-[#D97706] font-semibold">
              Tiền cọc giữ lịch 30%: {estimatedDeposit.toLocaleString('vi-VN')} VNĐ (Thanh toán số còn lại sau buổi chụp)
            </p>
          </div>

          <button
            onClick={() => navigateTo('booking', { packageId: basePackage.id })}
            className="px-6 py-3 bg-[#4D0202] hover:bg-[#380101] text-[#FFF3DD] text-xs font-bold uppercase tracking-wider rounded-xl transition-colors shadow-md shrink-0 flex items-center gap-2"
          >
            <span>Đặt lịch với cấu hình này</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 5. Policy summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#4D0202]">
        <div className="p-5 bg-[#FFF9EE] rounded-xl border border-[#ECDBC0] space-y-1.5">
          <h4 className="font-bold flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#D97706]" />
            Chính Sách Đặt Cọc
          </h4>
          <p className="text-[#4D0202]/80 leading-relaxed">
            Đặt cọc 30% giá trị gói khi gửi lịch hẹn để studio giữ khung giờ và chuẩn bị stylist, thợ trang điểm.
          </p>
        </div>

        <div className="p-5 bg-[#FFF9EE] rounded-xl border border-[#ECDBC0] space-y-1.5">
          <h4 className="font-bold flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#D97706]" />
            Chính Sách Đổi & Hủy Lịch
          </h4>
          <p className="text-[#4D0202]/80 leading-relaxed">
            Hỗ trợ dời ngày miễn phí trước 48h. Tiền cọc được bảo lưu trong vòng 60 ngày cho lịch chụp tiếp theo.
          </p>
        </div>

        <div className="p-5 bg-[#FFF9EE] rounded-xl border border-[#ECDBC0] space-y-1.5">
          <h4 className="font-bold flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#D97706]" />
            Cam Kết Trả Ảnh & File Gốc
          </h4>
          <p className="text-[#4D0202]/80 leading-relaxed">
            Nhận 100% file gốc trong ngày. Ảnh chỉnh sửa hoàn thiện bàn giao trong 2 - 3 ngày và lưu trữ bảo mật 6 tháng.
          </p>
        </div>
      </div>
    </div>
  );
};

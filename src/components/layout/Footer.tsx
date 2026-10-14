import React from 'react';
import { useStudio } from '../../context/StudioContext';
import { StudioLogo } from '../common/StudioLogo';
import { STUDIO_INFO } from '../../data/studioData';
import {
  MapPin,
  Phone,
  Clock,
  Mail,
  Instagram,
  Facebook,
  Share2,
  ShieldCheck,
  FileText,
  CalendarCheck,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo } = useStudio();

  return (
    <footer className="bg-[#4D0202] text-[#FFF3DD] border-t border-[#370101] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 4-column footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-14 border-b border-[#FFF3DD]/15">
          {/* Col 1: Studio Brand & Identity */}
          <div className="flex flex-col items-start space-y-4">
            <StudioLogo size="md" inverted={true} showSlogan={true} />
            <p className="font-serif italic text-xs leading-relaxed text-[#FFF3DD]/80 pt-2">
              &ldquo;{STUDIO_INFO.meaning}&rdquo;
            </p>
            {/* Color Palette Identification Chip Indicator */}
            <div className="pt-2 flex items-center gap-2 text-[11px] text-[#FFF3DD]/70">
              <span className="w-3 h-3 rounded-full bg-[#4D0202] border border-[#FFF3DD]/50 shrink-0" />
              <span>Đỏ rượu vang #4D0202</span>
              <span>·</span>
              <span className="w-3 h-3 rounded-full bg-[#FFF3DD] shrink-0" />
              <span>Kem ấm #FFF3DD</span>
            </div>
          </div>

          {/* Col 2: Navigation & Concepts */}
          <div>
            <h4 className="font-serif uppercase tracking-[0.2em] text-xs font-bold text-[#FFF3DD] mb-5 flex items-center gap-2">
              <CalendarCheck className="w-4 h-4 text-[#F59E0B]" />
              Khám Phá Dịch Vụ
            </h4>
            <ul className="space-y-2.5 text-xs text-[#FFF3DD]/80">
              <li>
                <button
                  onClick={() => navigateTo('concepts')}
                  className="hover:text-white transition-colors"
                >
                  Concept Chân Dung Cá Nhân
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('concepts')}
                  className="hover:text-white transition-colors"
                >
                  Concept Nàng Thơ Vườn Cổ Điển
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('concepts')}
                  className="hover:text-white transition-colors"
                >
                  Concept Sinh Nhật & Lookbook
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('pricing')}
                  className="hover:text-white transition-colors"
                >
                  Bảng Giá & So Sánh Gói Chụp
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('gallery')}
                  className="hover:text-white transition-colors"
                >
                  Thư Viện Bộ Ảnh Tiêu Biểu
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('promotions')}
                  className="hover:text-white transition-colors text-[#FBBF24] font-semibold"
                >
                  Ưu Đãi Đang Áp Dụng (Mã Giảm Giá)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Policies & Guarantees */}
          <div>
            <h4 className="font-serif uppercase tracking-[0.2em] text-xs font-bold text-[#FFF3DD] mb-5 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#F59E0B]" />
              Chính Sách Studio
            </h4>
            <ul className="space-y-2.5 text-xs text-[#FFF3DD]/80">
              <li>
                <button
                  onClick={() => navigateTo('policies')}
                  className="hover:text-white transition-colors"
                >
                  Chính sách đặt cọc & thanh toán
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('policies')}
                  className="hover:text-white transition-colors"
                >
                  Chính sách đổi lịch, hủy lịch & hoàn tiền
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('policies')}
                  className="hover:text-white transition-colors"
                >
                  Quy trình retouch & lưu trữ ảnh 6 tháng
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('policies')}
                  className="hover:text-white transition-colors"
                >
                  Bảo mật dữ liệu & quyền sử dụng ảnh
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('policies')}
                  className="hover:text-white transition-colors"
                >
                  Điều khoản website khách hàng
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Location */}
          <div>
            <h4 className="font-serif uppercase tracking-[0.2em] text-xs font-bold text-[#FFF3DD] mb-5 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#F59E0B]" />
              Địa Chỉ & Liên Hệ
            </h4>
            <div className="space-y-3 text-xs text-[#FFF3DD]/80">
              <p className="flex items-start gap-2.5 leading-relaxed">
                <MapPin className="w-4 h-4 shrink-0 text-[#F59E0B] mt-0.5" />
                <span>{STUDIO_INFO.address}</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 shrink-0 text-[#F59E0B]" />
                <a href={`tel:${STUDIO_INFO.hotline}`} className="hover:text-white underline">
                  Hotline: {STUDIO_INFO.hotline}
                </a>
              </p>
              <p className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 shrink-0 text-[#F59E0B]" />
                <span>{STUDIO_INFO.workingHours}</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 shrink-0 text-[#F59E0B]" />
                <span>{STUDIO_INFO.email}</span>
              </p>

              {/* Social Channels */}
              <div className="pt-3 flex items-center gap-3">
                <a
                  href={STUDIO_INFO.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-[#FFF3DD]/30 flex items-center justify-center text-[#FFF3DD] hover:bg-[#FFF3DD] hover:text-[#4D0202] transition-colors"
                  title="Facebook Hạt Nắng Studio"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href={STUDIO_INFO.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-[#FFF3DD]/30 flex items-center justify-center text-[#FFF3DD] hover:bg-[#FFF3DD] hover:text-[#4D0202] transition-colors"
                  title="Instagram Hạt Nắng Studio"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href={STUDIO_INFO.socialLinks.zalo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 text-[11px] font-bold rounded-full border border-[#FFF3DD]/30 hover:bg-[#FFF3DD] hover:text-[#4D0202] transition-colors"
                  title="Zalo Studio"
                >
                  Zalo
                </a>
                <a
                  href={STUDIO_INFO.socialLinks.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 text-[11px] font-bold rounded-full border border-[#FFF3DD]/30 hover:bg-[#FFF3DD] hover:text-[#4D0202] transition-colors"
                  title="TikTok Studio"
                >
                  TikTok
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Guarantee */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#FFF3DD]/60 gap-4">
          <p>© 2026 Hạt Nắng Studio. Gom nắng, giữ khoảnh khắc. Tất cả các quyền được bảo lưu.</p>
          <div className="flex items-center gap-6">
            <span>Thiết kế nhận diện: Đỏ rượu vang #4D0202 · Kem ấm #FFF3DD</span>
            <button
              onClick={() => navigateTo('policies')}
              className="hover:text-white underline"
            >
              Quy định bảo mật
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

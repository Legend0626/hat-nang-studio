import React, { useState } from 'react';
import { useStudio } from '../../context/StudioContext';
import { STUDIO_INFO, FAQS } from '../../data/studioData';
import {
  MapPin,
  Phone,
  Clock,
  Mail,
  Send,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Instagram,
  Facebook,
  ExternalLink,
  Navigation,
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { showToast } = useStudio();

  // Contact form state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // FAQ accordion state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) {
      showToast('Vui lòng điền đầy đủ các thông tin bắt buộc.', 'error');
      return;
    }
    setIsSubmitted(true);
    showToast('Cảm ơn bạn! Hạt Nắng Studio sẽ liên hệ lại với bạn trong 30 phút.', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* 1. Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#4D0202]/60">
          Kết Nối Với Chúng Mình
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#4D0202]">
          Liên Hệ & Tư Vấn Concept
        </h1>
        <p className="text-xs sm:text-sm text-[#4D0202]/80 leading-relaxed">
          Đừng ngần ngại nhắn tin hoặc ghé thăm studio để cùng thưởng trà, thử váy và lên ý tưởng cho bộ ảnh của bạn nhé.
        </p>
      </div>

      {/* 2. Contact Info & Interactive Form Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 5 Cols: Contact Details */}
        <div className="lg:col-span-5 bg-[#FFF9EE] rounded-3xl border border-[#ECDBC0] p-8 space-y-6 shadow-sm text-xs text-[#4D0202]">
          <h2 className="font-serif text-xl font-bold text-[#4D0202]">
            Thông Tin Hạt Nắng Studio
          </h2>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#FAF1DF] border border-[#ECDBC0] flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4 text-[#D97706]" />
              </div>
              <div>
                <strong className="block text-xs uppercase font-bold text-[#4D0202]">Địa chỉ Studio:</strong>
                <p className="text-[#4D0202]/80 mt-0.5 leading-relaxed">{STUDIO_INFO.address}</p>
                <a
                  href="https://maps.google.com/?q=142+Nguyen+Thi+Minh+Khai+District+1+Ho+Chi+Minh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#D97706] font-semibold hover:underline inline-flex items-center gap-1 mt-1"
                >
                  <Navigation className="w-3 h-3" /> Xem chỉ đường Google Maps
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#FAF1DF] border border-[#ECDBC0] flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4 text-[#D97706]" />
              </div>
              <div>
                <strong className="block text-xs uppercase font-bold text-[#4D0202]">Hotline tư vấn & đặt lịch:</strong>
                <p className="mt-0.5">
                  <a href={`tel:${STUDIO_INFO.hotline}`} className="font-bold underline text-sm text-[#4D0202]">
                    {STUDIO_INFO.hotline}
                  </a>{' '}
                  / {STUDIO_INFO.bookingHotline}
                </p>
                <p className="text-[11px] text-[#4D0202]/60 mt-0.5">Hỗ trợ Zalo 24/7</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#FAF1DF] border border-[#ECDBC0] flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4 text-[#D97706]" />
              </div>
              <div>
                <strong className="block text-xs uppercase font-bold text-[#4D0202]">Giờ mở cửa đón khách:</strong>
                <p className="text-[#4D0202]/80 mt-0.5">{STUDIO_INFO.workingHours}</p>
                <p className="text-[11px] text-[#4D0202]/60">Khung giờ chụp sớm 07:00 cần đặt trước 24h</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#FAF1DF] border border-[#ECDBC0] flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4 text-[#D97706]" />
              </div>
              <div>
                <strong className="block text-xs uppercase font-bold text-[#4D0202]">Hòm thư điện tử:</strong>
                <p className="text-[#4D0202]/80 mt-0.5">{STUDIO_INFO.email}</p>
              </div>
            </div>
          </div>

          {/* Social Channels */}
          <div className="pt-4 border-t border-[#ECDBC0] space-y-2">
            <span className="font-serif uppercase tracking-wider font-bold text-[11px] block">
              Mạng xã hội chính thức:
            </span>
            <div className="flex items-center gap-2">
              <a
                href={STUDIO_INFO.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg border border-[#ECDBC0] bg-white hover:bg-[#FAF1DF] flex items-center gap-1.5 font-semibold text-[11px]"
              >
                <Facebook className="w-3.5 h-3.5" /> Facebook
              </a>
              <a
                href={STUDIO_INFO.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg border border-[#ECDBC0] bg-white hover:bg-[#FAF1DF] flex items-center gap-1.5 font-semibold text-[11px]"
              >
                <Instagram className="w-3.5 h-3.5" /> Instagram
              </a>
              <a
                href={STUDIO_INFO.socialLinks.zalo}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg border border-[#ECDBC0] bg-white hover:bg-[#FAF1DF] font-semibold text-[11px]"
              >
                Zalo OA
              </a>
            </div>
          </div>
        </div>

        {/* Right 7 Cols: Contact Consultation Form */}
        <div className="lg:col-span-7 bg-[#FFF9EE] rounded-3xl border border-[#ECDBC0] p-8 shadow-sm space-y-4">
          <h2 className="font-serif text-xl font-bold text-[#4D0202]">
            Gửi Câu Hỏi Hoặc Yêu Cầu Tư Vấn Riêng
          </h2>
          <p className="text-xs text-[#4D0202]/70 leading-relaxed">
            Để lại thông tin và câu hỏi, chuyên viên tư vấn của Hạt Nắng Studio sẽ liên hệ hỗ trợ bạn nhanh nhất.
          </p>

          {isSubmitted ? (
            <div className="p-8 text-center bg-[#FAF1DF] rounded-2xl border border-[#ECDBC0] space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                ✓
              </div>
              <h3 className="font-serif font-bold text-lg text-[#4D0202]">
                Đã Tiếp Nhận Thông Tin Của Bạn!
              </h3>
              <p className="text-xs text-[#4D0202]/80 max-w-md mx-auto">
                Ekip Hạt Nắng đã nhận được yêu cầu tư vấn. Nhân viên phụ trách sẽ gọi điện hoặc nhắn tin Zalo
                đến số <strong>{phone}</strong> trong ít phút tới nhé!
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="text-xs text-[#4D0202] underline font-bold"
              >
                Gửi thêm câu hỏi khác
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmitContact} className="space-y-4 text-xs text-[#4D0202]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold uppercase mb-1">Họ và tên *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nguyễn Mai Phương"
                    className="w-full p-2.5 bg-white border border-[#ECDBC0] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#4D0202]"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase mb-1">Số điện thoại / Zalo *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0908 123 456"
                    className="w-full p-2.5 bg-white border border-[#ECDBC0] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#4D0202]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold uppercase mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@cuaban.com"
                  className="w-full p-2.5 bg-white border border-[#ECDBC0] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#4D0202]"
                />
              </div>

              <div>
                <label className="block font-bold uppercase mb-1">
                  Nội dung cần hỗ trợ tư vấn *
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Bạn muốn hỏi về gói chụp nào, ngày dự kiến chụp, hoặc có mong muốn cá nhân hóa riêng nào không?..."
                  className="w-full p-3 bg-white border border-[#ECDBC0] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#4D0202]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#4D0202] hover:bg-[#380101] text-[#FFF3DD] text-xs font-bold uppercase tracking-wider rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Gửi Yêu Cầu Tư Vấn</span>
              </button>
            </form>
          )}
        </div>
      </div>

      {/* 3. Interactive Map Representation (Spec 3.13) */}
      <div className="bg-[#FFF9EE] rounded-3xl border border-[#ECDBC0] p-6 sm:p-8 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#D97706]" />
            <h3 className="font-serif text-lg font-bold text-[#4D0202]">
              Vị Trí Hạt Nắng Studio Trên Bản Đồ
            </h3>
          </div>
          <a
            href="https://maps.google.com/?q=142+Nguyen+Thi+Minh+Khai+District+1+Ho+Chi+Minh"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-[#4D0202] hover:underline flex items-center gap-1"
          >
            <span>Mở ứng dụng bản đồ</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Visual Map Canvas Frame */}
        <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden border border-[#ECDBC0] bg-[#FAF1DF] flex items-center justify-center">
          {/* Aesthetic Map Tile Simulation */}
          <div className="absolute inset-0 bg-[#F5E8D0] opacity-70 bg-[radial-gradient(#4D0202_1px,transparent_1px)] [background-size:24px_24px]" />

          {/* Map Pin Marker Card */}
          <div className="relative z-10 bg-[#FFF9EE] p-5 rounded-2xl border-2 border-[#4D0202] shadow-2xl max-w-sm text-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-[#4D0202] text-[#FFF3DD] flex items-center justify-center mx-auto shadow-md">
              <MapPin className="w-5 h-5 text-[#F59E0B]" />
            </div>
            <h4 className="font-serif font-bold text-sm text-[#4D0202]">
              Hạt Nắng Studio TP. Hồ Chí Minh
            </h4>
            <p className="text-[11px] text-[#4D0202]/80 leading-relaxed">
              {STUDIO_INFO.address}
            </p>
            <p className="text-[10px] text-[#D97706] font-semibold">
              Gần ngã tư Nam Kỳ Khởi Nghĩa & Dinh Độc Lập · Có chỗ đậu ô tô & xe máy an toàn
            </p>
          </div>
        </div>
      </div>

      {/* 4. Frequently Asked Questions (FAQ Accordion - Spec 3.13) */}
      <div className="space-y-6">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#4D0202]/60">
            Giải Đáp Thắc Mắc
          </span>
          <h2 className="font-serif text-2xl font-bold text-[#4D0202]">
            Các Câu Hỏi Thường Gặp (FAQ)
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="bg-[#FFF9EE] rounded-2xl border border-[#ECDBC0] overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-serif font-bold text-sm text-[#4D0202]"
                >
                  <span>{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 shrink-0 text-[#D97706]" />
                  ) : (
                    <ChevronDown className="w-4 h-4 shrink-0 text-[#4D0202]/60" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-[#4D0202]/85 leading-relaxed border-t border-[#ECDBC0]/60">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { useStudio } from '../../context/StudioContext';
import { StudioLogo } from '../common/StudioLogo';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { STUDIO_INFO } from '../../data/studioData';
import {
  Sun,
  Camera,
  HeartHandshake,
  Sparkles,
  MapPin,
  Clock,
  PhoneCall,
  Mail,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { navigateTo } = useStudio();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 sm:space-y-24">
      {/* 1. Header Banner */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFF9EE] border border-[#ECDBC0] rounded-full text-xs text-[#4D0202]">
          <Sun className="w-3.5 h-3.5 text-[#D97706]" />
          <span>Về Chúng Mình · Hạt Nắng Studio</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#4D0202]">
          Gom Nắng, Giữ Khoảnh Khắc.
        </h1>
        <p className="text-sm sm:text-base text-[#4D0202]/80 leading-relaxed font-serif italic">
          &ldquo;{STUDIO_INFO.meaning}&rdquo;
        </p>
      </div>

      {/* 2. Câu chuyện hình thành & Ý nghĩa tên */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-6 space-y-5">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#4D0202]/60">
            Khởi Nguồn
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#4D0202]">
            Ý Nghĩa Tên Gọi & Hành Trình Ra Đời
          </h2>
          <div className="space-y-4 text-xs sm:text-sm text-[#4D0202]/85 leading-relaxed font-normal">
            <p>
              Hạt Nắng Studio được thành lập từ tình yêu vô tận dành cho thứ ánh sáng kỳ diệu nhất của tạo hóa:
              những hạt nắng sớm len lỏi qua ô cửa sổ mộc, đọng lại trên mái tóc, đuôi mắt và nụ cười của người thiếu nữ.
            </p>
            <p>
              Đối với chúng mình, chụp ảnh cá nhân không phải là biến bạn thành một người hoàn toàn xa lạ với lớp phấn dày
              cộp hay dáng đứng gượng gạo. Đó là hành trình cùng bạn khám phá nét duyên ngầm, sự tự tin và khí chất vốn có
              mà đôi khi nhịp sống hối hả ngoài kia khiến bạn vô tình lãng quên.
            </p>
            <p>
              Slogan <strong>&ldquo;Gom nắng, giữ khoảnh khắc&rdquo;</strong> chính là lời hứa của cả ekip:
              chúng mình gom lại những tia sáng dịu dàng nhất, để đóng băng những ngày tháng thanh xuân rạng rỡ nhất
              thành những tác phẩm vượt thời gian.
            </p>
          </div>

          <div className="pt-2 flex items-center gap-4">
            <div className="p-3 bg-[#FFF9EE] rounded-xl border border-[#ECDBC0] text-center">
              <span className="block font-serif font-bold text-lg text-[#4D0202]">#4D0202</span>
              <span className="text-[10px] text-[#4D0202]/70 uppercase">Đỏ Rượu Vang</span>
            </div>
            <div className="p-3 bg-[#FFF9EE] rounded-xl border border-[#ECDBC0] text-center">
              <span className="block font-serif font-bold text-lg text-[#4D0202]">#FFF3DD</span>
              <span className="text-[10px] text-[#4D0202]/70 uppercase">Kem Ấm Áp</span>
            </div>
            <div className="text-xs text-[#4D0202]/70 italic pl-2 border-l border-[#ECDBC0]">
              Tỷ lệ nhận diện vàng: Đỏ 1 : Kem 2
            </div>
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="relative rounded-2xl overflow-hidden border-2 border-[#ECDBC0] shadow-xl">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1000&q=80"
              alt="Hạt Nắng Studio Không Gian"
              aspectRatioClass="aspect-[4/3]"
              titleFallback="Hạt Nắng Studio"
              subtitleFallback="Không gian nghệ thuật ấm áp"
            />
          </div>
        </div>
      </div>

      {/* 3. Tầm nhìn, Sứ mệnh & Giá trị cốt lõi */}
      <div className="space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#4D0202]/60">
            Định Hướng Phát Triển
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#4D0202]">
            Tầm Nhìn & Giá Trị Cốt Lõi
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#FFF9EE] rounded-2xl border border-[#ECDBC0] p-6 space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-[#4D0202] text-[#FFF3DD] flex items-center justify-center">
              <Sun className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#4D0202]">Tầm Nhìn Nghệ Thuật</h3>
            <p className="text-xs text-[#4D0202]/80 leading-relaxed">
              Trở thành không gian nhiếp ảnh cá nhân ấm cúng và truyền cảm hứng hàng đầu dành cho giới trẻ,
              nơi mỗi khách hàng tìm thấy phiên bản rực rỡ và tự tin nhất của chính mình.
            </p>
          </div>

          <div className="bg-[#FFF9EE] rounded-2xl border border-[#ECDBC0] p-6 space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-[#4D0202] text-[#FFF3DD] flex items-center justify-center">
              <Camera className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#4D0202]">Sứ Mệnh Phục Vụ</h3>
            <p className="text-xs text-[#4D0202]/80 leading-relaxed">
              Cung cấp dịch vụ chụp ảnh trọn gói chuyên nghiệp, minh bạch giá cả, hỗ trợ tạo dáng tận tâm,
              và mang đến trải nghiệm buổi chụp thư thái tựa như một buổi dạo chơi dưới ánh nắng.
            </p>
          </div>

          <div className="bg-[#FFF9EE] rounded-2xl border border-[#ECDBC0] p-6 space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-[#4D0202] text-[#FFF3DD] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#4D0202]">Giá Trị Cốt Lõi</h3>
            <p className="text-xs text-[#4D0202]/80 leading-relaxed">
              <strong>Tử tế — Chân thực — Nghệ thuật — Trách nhiệm.</strong> Cam kết giao toàn bộ file gốc,
              bảo lưu quyền riêng tư hình ảnh và luôn tôn trọng nét tự nhiên của từng khuôn mặt.
            </p>
          </div>
        </div>
      </div>

      {/* 4. Điểm khác biệt tại Hạt Nắng Studio */}
      <div className="bg-[#FFF9EE] rounded-3xl border border-[#ECDBC0] p-8 sm:p-12 space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#4D0202]/60">
            Trải Nghiệm Khác Biệt
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#4D0202]">
            Tại Sao Khách Hàng Chọn Hạt Nắng Studio?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-xs text-[#4D0202]">
          <div className="space-y-2">
            <span className="font-serif font-bold text-2xl text-[#4D0202] block">01.</span>
            <h4 className="font-bold text-sm">Posing Coach Tận Tâm</h4>
            <p className="text-[#4D0202]/80 leading-relaxed">
              Dù bạn chưa từng chụp ảnh, ekip sẽ hướng dẫn từng cử chỉ, ánh mắt và nhịp thở để bạn thoải mái nhất.
            </p>
          </div>

          <div className="space-y-2">
            <span className="font-serif font-bold text-2xl text-[#4D0202] block">02.</span>
            <h4 className="font-bold text-sm">Makeup Trong Trẻo Tự Nhiên</h4>
            <p className="text-[#4D0202]/80 leading-relaxed">
              Tone trang điểm trong veo nịnh da, tôn vinh nét riêng chứ không đắp dày cộm gây mất nét khuôn mặt.
            </p>
          </div>

          <div className="space-y-2">
            <span className="font-serif font-bold text-2xl text-[#4D0202] block">03.</span>
            <h4 className="font-bold text-sm">Giao File Gốc 100%</h4>
            <p className="text-[#4D0202]/80 leading-relaxed">
              Nhận toàn bộ file gốc độ phân giải cao ngay sau buổi chụp để thoải mái chọn lựa và lưu giữ.
            </p>
          </div>

          <div className="space-y-2">
            <span className="font-serif font-bold text-2xl text-[#4D0202] block">04.</span>
            <h4 className="font-bold text-sm">Minh Bạch & Tôn Trọng</h4>
            <p className="text-[#4D0202]/80 leading-relaxed">
              Bảng giá niêm yết rõ ràng, không phụ phí phát sinh ẩn, bảo mật hình ảnh cá nhân tuyệt đối.
            </p>
          </div>
        </div>
      </div>

      {/* 5. Không gian Studio & Hậu Trường */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#4D0202]/60">
            Hậu Trường Sáng Tạo
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#4D0202]">
            Không Gian Studio Đón Nắng Tự Nhiên
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="space-y-2">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80"
              alt="Phòng chụp đón nắng"
              aspectRatioClass="aspect-[4/3]"
              titleFallback="Góc Đón Nắng Tự Nhiên"
            />
            <p className="text-xs font-semibold text-[#4D0202]">Góc Đón Nắng Cửa Sổ Cổ Điển</p>
            <p className="text-[11px] text-[#4D0202]/70">Nơi cho ra đời những bộ ảnh Nàng thơ mộng mơ</p>
          </div>

          <div className="space-y-2">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=600&q=80"
              alt="Phông nền Cyclorama"
              aspectRatioClass="aspect-[4/3]"
              titleFallback="Phòng Studio Cyclorama"
            />
            <p className="text-xs font-semibold text-[#4D0202]">Phòng Chụp Editorial Sang Trọng</p>
            <p className="text-[11px] text-[#4D0202]/70">Hệ thống đèn studio chuẩn châu Âu cho ảnh chân dung sắc nét</p>
          </div>

          <div className="space-y-2">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=600&q=80"
              alt="Góc Sinh Nhật Ấm Cúng"
              aspectRatioClass="aspect-[4/3]"
              titleFallback="Góc Tiệc Sinh Nhật"
            />
            <p className="text-xs font-semibold text-[#4D0202]">Góc Decor Sinh Nhật & Lễ Hội</p>
            <p className="text-[11px] text-[#4D0202]/70">Ấm cúng cùng nến thơm, bánh kem và phụ kiện lung linh</p>
          </div>
        </div>
      </div>

      {/* 6. Action Bar */}
      <div className="pt-8 border-t border-[#ECDBC0] flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="font-serif font-bold text-lg text-[#4D0202]">
            Sẵn Sàng Lưu Giữ Khoảnh Khắc Cùng Hạt Nắng?
          </h4>
          <p className="text-xs text-[#4D0202]/70">
            Khám phá các concept mới hoặc đặt lịch khung giờ chụp phù hợp với bạn hôm nay.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo('concepts')}
            className="px-5 py-2.5 bg-white border border-[#ECDBC0] text-[#4D0202] text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-[#FFF9EE] transition-colors"
          >
            Xem Concept
          </button>
          <button
            onClick={() => navigateTo('booking')}
            className="px-5 py-2.5 bg-[#4D0202] hover:bg-[#380101] text-[#FFF3DD] text-xs font-bold uppercase tracking-wider rounded-xl transition-colors shadow-sm"
          >
            Đặt lịch ngay
          </button>
        </div>
      </div>
    </div>
  );
};

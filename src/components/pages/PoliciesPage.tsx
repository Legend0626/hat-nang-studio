import React, { useState } from 'react';
import { useStudio } from '../../context/StudioContext';
import {
  ShieldCheck,
  CreditCard,
  Calendar,
  Image as ImageIcon,
  Lock,
  FileText,
  Clock,
  ArrowRight,
} from 'lucide-react';

export const PoliciesPage: React.FC = () => {
  const { navigateTo } = useStudio();
  const [activeTab, setActiveTab] = useState<'deposit' | 'reschedule' | 'delivery' | 'privacy' | 'terms'>('deposit');

  const policyVersion = 'Phiên bản 2.4 — Áp dụng chính thức từ ngày 01/01/2026';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* 1. Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#4D0202]/60">
          Minh Bạch & Rõ Ràng
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#4D0202]">
          Chính Sách & Điều Khoản Dịch Vụ
        </h1>
        <p className="text-xs sm:text-sm text-[#4D0202]/80 leading-relaxed">
          Hạt Nắng Studio luôn công khai minh bạch mọi quy định nhằm bảo vệ quyền lợi tối đa của khách hàng
          và đảm bảo chất lượng phục vụ tốt nhất.
        </p>
        <span className="inline-block text-[11px] text-[#4D0202]/60 italic bg-[#FAF1DF] px-3 py-1 rounded-full border border-[#ECDBC0]">
          {policyVersion}
        </span>
      </div>

      {/* 2. Policy Tabs & Content Body */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 4 Cols: Vertical Tabs */}
        <div className="lg:col-span-4 bg-[#FFF9EE] rounded-2xl border border-[#ECDBC0] p-3 space-y-1.5 shadow-sm">
          <button
            onClick={() => setActiveTab('deposit')}
            className={`w-full p-3.5 rounded-xl text-left text-xs font-semibold transition-all flex items-center gap-2.5 ${
              activeTab === 'deposit'
                ? 'bg-[#4D0202] text-[#FFF3DD] shadow-sm'
                : 'text-[#4D0202]/80 hover:bg-[#FAF1DF]'
            }`}
          >
            <CreditCard className="w-4 h-4 shrink-0" />
            <span>1. Đặt Cọc & Thanh Toán</span>
          </button>

          <button
            onClick={() => setActiveTab('reschedule')}
            className={`w-full p-3.5 rounded-xl text-left text-xs font-semibold transition-all flex items-center gap-2.5 ${
              activeTab === 'reschedule'
                ? 'bg-[#4D0202] text-[#FFF3DD] shadow-sm'
                : 'text-[#4D0202]/80 hover:bg-[#FAF1DF]'
            }`}
          >
            <Calendar className="w-4 h-4 shrink-0" />
            <span>2. Đổi Lịch, Hủy Lịch & Hoàn Tiền</span>
          </button>

          <button
            onClick={() => setActiveTab('delivery')}
            className={`w-full p-3.5 rounded-xl text-left text-xs font-semibold transition-all flex items-center gap-2.5 ${
              activeTab === 'delivery'
                ? 'bg-[#4D0202] text-[#FFF3DD] shadow-sm'
                : 'text-[#4D0202]/80 hover:bg-[#FAF1DF]'
            }`}
          >
            <ImageIcon className="w-4 h-4 shrink-0" />
            <span>3. Chỉnh Sửa & Bàn Giao Ảnh (Lưu 6 Tháng)</span>
          </button>

          <button
            onClick={() => setActiveTab('privacy')}
            className={`w-full p-3.5 rounded-xl text-left text-xs font-semibold transition-all flex items-center gap-2.5 ${
              activeTab === 'privacy'
                ? 'bg-[#4D0202] text-[#FFF3DD] shadow-sm'
                : 'text-[#4D0202]/80 hover:bg-[#FAF1DF]'
            }`}
          >
            <Lock className="w-4 h-4 shrink-0" />
            <span>4. Quyền Sử Dụng Hình Ảnh & Bảo Mật</span>
          </button>

          <button
            onClick={() => setActiveTab('terms')}
            className={`w-full p-3.5 rounded-xl text-left text-xs font-semibold transition-all flex items-center gap-2.5 ${
              activeTab === 'terms'
                ? 'bg-[#4D0202] text-[#FFF3DD] shadow-sm'
                : 'text-[#4D0202]/80 hover:bg-[#FAF1DF]'
            }`}
          >
            <FileText className="w-4 h-4 shrink-0" />
            <span>5. Điều Khoản Sử Dụng Website</span>
          </button>
        </div>

        {/* Right 8 Cols: Detailed Policy Text */}
        <div className="lg:col-span-8 bg-[#FFF9EE] rounded-3xl border border-[#ECDBC0] p-8 sm:p-10 shadow-sm space-y-6 text-xs text-[#4D0202]">
          {/* TAB 1: Đặt Cọc & Thanh Toán */}
          {activeTab === 'deposit' && (
            <div className="space-y-4">
              <h2 className="font-serif text-2xl font-bold text-[#4D0202]">
                1. Chính Sách Đặt Cọc & Thanh Toán
              </h2>
              <div className="space-y-3 leading-relaxed text-[#4D0202]/85">
                <p>
                  <strong>1.1. Mức tiền đặt cọc:</strong> Để giữ khung giờ chụp và đảm bảo ekip (Photographer, Makeup Artist, Stylist)
                  chuẩn bị trang phục, bối cảnh chu đáo nhất, quý khách vui lòng đặt cọc <strong>30%</strong> tổng giá trị gói dịch vụ
                  khi gửi yêu cầu đặt lịch.
                </p>
                <p>
                  <strong>1.2. Phương thức thanh toán cọc:</strong> Khách hàng có thể chuyển khoản trực tiếp qua mã VietQR tự động,
                  Internet Banking, hoặc thanh toán tiền mặt trực tiếp tại quầy lễ tân của Studio.
                </p>
                <p>
                  <strong>1.3. Thanh toán phần còn lại:</strong> <strong>70%</strong> chi phí còn lại cùng các dịch vụ phát sinh thêm (nếu có)
                  sẽ được thanh toán vào ngày diễn ra buổi chụp tại studio, ngay sau khi hoàn thành buổi chụp.
                </p>
                <p>
                  <strong>1.4. Hóa đơn & biên nhận:</strong> Studio cung cấp biên nhận điện tử gửi qua Email và hiển thị ngay trên tài khoản
                  cá nhân của khách hàng trên website.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: Đổi Lịch & Hủy Lịch */}
          {activeTab === 'reschedule' && (
            <div className="space-y-4">
              <h2 className="font-serif text-2xl font-bold text-[#4D0202]">
                2. Chính Sách Đổi Lịch, Hủy Lịch & Hoàn Tiền
              </h2>
              <div className="space-y-3 leading-relaxed text-[#4D0202]/85">
                <p>
                  <strong>2.1. Đổi ngày chụp miễn phí:</strong> Quý khách được hỗ trợ dời ngày chụp miễn phí <strong>01 lần</strong>
                  nếu thông báo cho studio trước ít nhất <strong>48 giờ</strong> so với khung giờ chụp đã hẹn.
                </p>
                <p>
                  <strong>2.2. Bảo lưu tiền cọc:</strong> Toàn bộ số tiền cọc đã chuyển sẽ được tự động bảo lưu trong vòng <strong>60 ngày</strong>
                  để bạn chủ động sắp xếp ngày chụp mới thuận tiện.
                </p>
                <p>
                  <strong>2.3. Hủy lịch sát giờ:</strong> Trường hợp báo hủy hoặc dời lịch dưới 24 giờ, studio xin phép thu phụ phí 150.000 VNĐ
                  chi phí chuẩn bị hoa tươi đạo cụ và giữ ca làm việc của chuyên viên trang điểm.
                </p>
                <p>
                  <strong>2.4. Hoàn tiền cọc:</strong> Hạt Nắng Studio hoàn trả 100% tiền cọc trong các trường hợp bất khả kháng do thiên tai,
                  dịch bệnh hoặc sự cố kỹ thuật đột xuất từ phía studio khiến buổi chụp không thể diễn ra.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: Bàn Giao & Lưu Trữ Ảnh */}
          {activeTab === 'delivery' && (
            <div className="space-y-4">
              <h2 className="font-serif text-2xl font-bold text-[#4D0202]">
                3. Quy Trình Chỉnh Sửa, Bàn Giao & Lưu Trữ Ảnh
              </h2>
              <div className="space-y-3 leading-relaxed text-[#4D0202]/85">
                <p>
                  <strong>3.1. Bàn giao file gốc:</strong> Studio bàn giao <strong>100% file gốc chất lượng cao (JPEG nguyên bản)</strong>
                  qua link Google Drive/Cloud riêng trong vòng <strong>24 giờ</strong> sau khi kết thúc buổi chụp.
                </p>
                <p>
                  <strong>3.2. Chọn ảnh chỉnh sửa:</strong> Khách hàng chọn các bức ảnh yêu thích theo số lượng quy định của gói (hoặc mua thêm
                  với giá 35.000đ/ảnh retouch thêm) và gửi lại danh sách cho studio.
                </p>
                <p>
                  <strong>3.3. Thời gian trả ảnh retouch:</strong> Từ <strong>2 đến 4 ngày làm việc</strong> kể từ khi studio nhận được danh sách
                  ảnh chọn từ khách. Có hỗ trợ dịch vụ lấy gấp trong 24 giờ.
                </p>
                <p>
                  <strong>3.4. Cam kết lưu trữ dữ liệu 6 tháng:</strong> Hạt Nắng Studio cam kết lưu trữ toàn bộ file gốc và file hoàn thiện
                  của bạn trên hệ thống lưu trữ đám mây an toàn trong vòng <strong>06 tháng</strong>. Quý khách có thể tải lại bất kỳ lúc nào.
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: Quyền Sử Dụng Hình Ảnh & Bảo Mật */}
          {activeTab === 'privacy' && (
            <div className="space-y-4">
              <h2 className="font-serif text-2xl font-bold text-[#4D0202]">
                4. Quyền Sử Dụng Hình Ảnh & Bảo Mật Dữ Liệu
              </h2>
              <div className="space-y-3 leading-relaxed text-[#4D0202]/85">
                <p>
                  <strong>4.1. Cam kết quyền riêng tư tuyệt đối:</strong> Hạt Nắng Studio hiểu rằng những bức ảnh cá nhân là kỷ niệm riêng tư
                  quý giá của mỗi người. <strong>Chúng mình cam kết không bao giờ tự ý đăng tải ảnh của bạn lên Facebook, Instagram, TikTok hay
                  thư viện website khi chưa có sự đồng ý bằng văn bản của bạn.</strong>
                </p>
                <p>
                  <strong>4.2. Trưng bày tác phẩm (Portfolio):</strong> Nếu studio mong muốn dùng một số tác phẩm để làm tư liệu mẫu, ekip sẽ
                  chủ động xin phép khách hàng và gửi tặng ưu đãi tri ân đặc biệt. Khách hàng có toàn quyền từ chối mà không ảnh hưởng đến bất kỳ
                  quyền lợi dịch vụ nào.
                </p>
                <p>
                  <strong>4.3. Bảo mật thông tin cá nhân:</strong> Họ tên, số điện thoại và email của khách hàng được mã hóa an toàn, không
                  bao giờ chia sẻ cho bất kỳ bên thứ ba nào vì mục đích quảng cáo rác.
                </p>
              </div>
            </div>
          )}

          {/* TAB 5: Điều Khoản Website */}
          {activeTab === 'terms' && (
            <div className="space-y-4">
              <h2 className="font-serif text-2xl font-bold text-[#4D0202]">
                5. Điều Khoản Sử Dụng Website Khách Hàng
              </h2>
              <div className="space-y-3 leading-relaxed text-[#4D0202]/85">
                <p>
                  <strong>5.1. Tài khoản khách hàng:</strong> Khách hàng tự chịu trách nhiệm bảo mật mật khẩu tài khoản cá nhân. Studio hỗ trợ
                  khôi phục mật khẩu qua email đã đăng ký.
                </p>
                <p>
                  <strong>5.2. Sở hữu trí tuệ:</strong> Logo Hạt Nắng Studio, slogan &ldquo;Gom nắng, giữ khoảnh khắc&rdquo;, thiết kế concept và hình ảnh
                  trưng bày thuộc quyền sở hữu trí tuệ của Hạt Nắng Studio. Nghiêm cấm sao chép cho mục đích thương mại trái phép.
                </p>
                <p>
                  <strong>5.3. Hỗ trợ khách hàng:</strong> Mọi thắc mắc hoặc khiếu nại xin vui lòng liên hệ hotline <strong>0908 678 922</strong>
                  hoặc email <strong>contact@hatnangstudio.vn</strong> để được ban quản lý giải quyết trong vòng 24 giờ làm việc.
                </p>
              </div>
            </div>
          )}

          <div className="pt-6 border-t border-[#ECDBC0] flex items-center justify-between">
            <span className="text-[11px] text-[#4D0202]/70">
              Có câu hỏi về chính sách? Hãy liên hệ chúng mình bất cứ lúc nào.
            </span>
            <button
              onClick={() => navigateTo('contact')}
              className="text-xs font-bold text-[#4D0202] hover:underline flex items-center gap-1"
            >
              Liên hệ tư vấn <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useStudio } from '../../context/StudioContext';
import { STUDIO_INFO } from '../../data/studioData';
import {
  QrCode,
  CreditCard,
  Building,
  CheckCircle2,
  Copy,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Send,
  Calendar,
  Clock,
} from 'lucide-react';

export const PaymentPage: React.FC = () => {
  const {
    activeBookingForPayment,
    updateBookingPayment,
    navigateTo,
    showToast,
  } = useStudio();

  // If no booking selected, fallback
  const booking = activeBookingForPayment;

  // Selected method
  const [selectedMethod, setSelectedMethod] = useState<'vietqr' | 'atm' | 'studio'>('vietqr');
  const [isCopied, setIsCopied] = useState<string | null>(null);
  const [hasConfirmedTransfer, setHasConfirmedTransfer] = useState(
    booking?.paymentStatus === 'deposit_paid' || booking?.paymentStatus === 'fully_paid'
  );
  const [reportIssueSent, setReportIssueSent] = useState(false);

  if (!booking) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold text-[#4D0202]">
          Không Tìm Thấy Lịch Hẹn Cần Thanh Toán
        </h2>
        <p className="text-xs text-[#4D0202]/70">
          Vui lòng chọn hoặc đặt lịch hẹn mới để tiến hành thanh toán tiền cọc.
        </p>
        <button
          onClick={() => navigateTo('booking')}
          className="px-6 py-2.5 bg-[#4D0202] text-[#FFF3DD] text-xs font-bold uppercase rounded-xl"
        >
          Tạo Lịch Đặt Mới
        </button>
      </div>
    );
  }

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(field);
    showToast(`Đã sao chép ${field}!`, 'info');
    setTimeout(() => setIsCopied(null), 2000);
  };

  const handleConfirmPaid = () => {
    updateBookingPayment(booking.id, selectedMethod);
    setHasConfirmedTransfer(true);
    showToast('Xác nhận đã chuyển khoản cọc thành công! Studio đang kiểm tra giao dịch.', 'success');
  };

  // VietQR QuickLink generation URL for standard Vietnamese banking QR
  // Format: https://img.vietqr.io/image/MB-888844329999-compact2.png?amount=...&addInfo=...&accountName=...
  const transferContent = `COC ${booking.id} ${booking.phone.slice(-4)}`;
  const vietQrUrl = `https://img.vietqr.io/image/MB-888844329999-compact2.png?amount=${booking.depositAmount}&addInfo=${encodeURIComponent(
    transferContent
  )}&accountName=${encodeURIComponent(STUDIO_INFO.bankInfo.accountHolder)}`;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* 1. Header */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#4D0202]/60">
          Cổng Thanh Toán & Đặt Cọc Giữ Lịch
        </span>
        <h1 className="font-serif text-3xl font-bold text-[#4D0202]">
          Thanh Toán Tiền Cọc Buổi Chụp
        </h1>
        <p className="text-xs sm:text-sm text-[#4D0202]/80 leading-relaxed">
          Mã đặt lịch: <strong className="font-mono text-[#4D0202] text-sm font-bold bg-[#FAF1DF] px-2 py-0.5 rounded border border-[#ECDBC0]">{booking.id}</strong>
        </p>
      </div>

      {/* 2. Status Badge */}
      <div className="bg-[#FFF9EE] rounded-2xl border border-[#ECDBC0] p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <span className="text-xs font-bold text-[#4D0202] uppercase tracking-wider">
              Trạng thái tiếp nhận:
            </span>
            <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-amber-100 text-amber-900 border border-amber-300">
              Đang chờ xác nhận
            </span>
          </div>
          <p className="text-xs text-[#4D0202]/70">
            {booking.conceptTitle} ({booking.packageName}) · Ngày {booking.date} · {booking.timeSlot}
          </p>
        </div>

        <div className="text-center sm:text-right">
          <span className="text-xs text-[#4D0202]/70 block">Số tiền cọc cần chuyển (30%):</span>
          <span className="font-serif text-2xl font-bold text-[#4D0202] tabular-nums">
            {booking.depositAmount.toLocaleString('vi-VN')} VNĐ
          </span>
          <span className="text-[11px] text-[#4D0202]/60 block">
            (Tổng giá trị: {booking.totalPrice.toLocaleString('vi-VN')} đ)
          </span>
        </div>
      </div>

      {/* 3. Payment Methods Selector */}
      <div className="space-y-6">
        <h3 className="font-serif text-lg font-bold text-[#4D0202]">
          Chọn Phương Thức Thanh Toán
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Method 1: VietQR */}
          <button
            type="button"
            onClick={() => setSelectedMethod('vietqr')}
            className={`p-4 rounded-xl border text-left transition-all ${
              selectedMethod === 'vietqr'
                ? 'bg-[#FFF9EE] border-2 border-[#4D0202] shadow-sm'
                : 'bg-white border-[#ECDBC0] hover:bg-[#FFF9EE]/50'
            }`}
          >
            <div className="flex items-center gap-2 mb-1.5 font-bold text-xs text-[#4D0202]">
              <QrCode className="w-4 h-4 text-[#D97706]" />
              <span>Chuyển Khoản VietQR</span>
            </div>
            <p className="text-[11px] text-[#4D0202]/70 leading-relaxed">
              Quét mã QR tự động điền STK, số tiền và nội dung chuyển khoản
            </p>
          </button>

          {/* Method 2: ATM / Internet Banking */}
          <button
            type="button"
            onClick={() => setSelectedMethod('atm')}
            className={`p-4 rounded-xl border text-left transition-all ${
              selectedMethod === 'atm'
                ? 'bg-[#FFF9EE] border-2 border-[#4D0202] shadow-sm'
                : 'bg-white border-[#ECDBC0] hover:bg-[#FFF9EE]/50'
            }`}
          >
            <div className="flex items-center gap-2 mb-1.5 font-bold text-xs text-[#4D0202]">
              <CreditCard className="w-4 h-4 text-[#D97706]" />
              <span>Chuyển Khoản Thủ Công</span>
            </div>
            <p className="text-[11px] text-[#4D0202]/70 leading-relaxed">
              Chuyển tới STK ngân hàng MB Bank của Hạt Nắng Studio
            </p>
          </button>

          {/* Method 3: Studio Direct */}
          <button
            type="button"
            onClick={() => setSelectedMethod('studio')}
            className={`p-4 rounded-xl border text-left transition-all ${
              selectedMethod === 'studio'
                ? 'bg-[#FFF9EE] border-2 border-[#4D0202] shadow-sm'
                : 'bg-white border-[#ECDBC0] hover:bg-[#FFF9EE]/50'
            }`}
          >
            <div className="flex items-center gap-2 mb-1.5 font-bold text-xs text-[#4D0202]">
              <Building className="w-4 h-4 text-[#D97706]" />
              <span>Đặt Cọc Tại Studio</span>
            </div>
            <p className="text-[11px] text-[#4D0202]/70 leading-relaxed">
              Ghé trực tiếp studio số 142/8 Nguyễn Thị Minh Khai để cọc tiền mặt
            </p>
          </button>
        </div>

        {/* 4. Payment Method Details Box */}
        {selectedMethod === 'vietqr' && (
          <div className="bg-[#FFF9EE] rounded-2xl border border-[#ECDBC0] p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left: VietQR Code display */}
            <div className="md:col-span-5 flex flex-col items-center space-y-3">
              <div className="p-3 bg-white rounded-2xl border-2 border-[#ECDBC0] shadow-md max-w-[220px]">
                <img
                  src={vietQrUrl}
                  alt="Mã QR Chuyển khoản Hạt Nắng Studio"
                  className="w-full h-auto rounded-lg"
                  onError={(e) => {
                    // Fallback to stylized SVG QR representation if image generator network fails
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="text-center pt-2 border-t border-zinc-100">
                  <p className="text-[10px] font-bold text-[#4D0202]">Quét mã bằng app ngân hàng</p>
                </div>
              </div>
              <span className="text-[11px] text-[#4D0202]/70 italic">
                Hỗ trợ 40+ app ngân hàng & ví điện tử tại Việt Nam
              </span>
            </div>

            {/* Right: Transfer details and copy buttons */}
            <div className="md:col-span-7 space-y-4 text-xs text-[#4D0202]">
              <h4 className="font-serif text-base font-bold text-[#4D0202]">
                Thông Tin Chuyển Khoản Ngân Hàng
              </h4>

              <div className="space-y-2.5">
                <div className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-[#ECDBC0]">
                  <div>
                    <span className="text-[10px] text-[#4D0202]/60 uppercase block">Ngân hàng:</span>
                    <span className="font-bold">{STUDIO_INFO.bankInfo.bankName}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-[#ECDBC0]">
                  <div>
                    <span className="text-[10px] text-[#4D0202]/60 uppercase block">Số tài khoản:</span>
                    <span className="font-mono font-bold text-sm tracking-wider">
                      {STUDIO_INFO.bankInfo.accountNumber}
                    </span>
                  </div>
                  <button
                    onClick={() => handleCopy(STUDIO_INFO.bankInfo.accountNumber.replace(/\s+/g, ''), 'Số tài khoản')}
                    className="p-1.5 text-xs text-[#4D0202] hover:bg-[#FAF1DF] rounded-lg border border-[#ECDBC0]"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-[#ECDBC0]">
                  <div>
                    <span className="text-[10px] text-[#4D0202]/60 uppercase block">Chủ tài khoản:</span>
                    <span className="font-bold uppercase">{STUDIO_INFO.bankInfo.accountHolder}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-[#ECDBC0]">
                  <div>
                    <span className="text-[10px] text-[#4D0202]/60 uppercase block">Số tiền cọc chính xác:</span>
                    <span className="font-bold text-sm text-[#D97706] tabular-nums">
                      {booking.depositAmount.toLocaleString('vi-VN')} VNĐ
                    </span>
                  </div>
                  <button
                    onClick={() => handleCopy(String(booking.depositAmount), 'Số tiền')}
                    className="p-1.5 text-xs text-[#4D0202] hover:bg-[#FAF1DF] rounded-lg border border-[#ECDBC0]"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex items-center justify-between p-2.5 bg-amber-50 rounded-xl border border-amber-200">
                  <div>
                    <span className="text-[10px] text-amber-900 uppercase block font-bold">
                      Nội dung chuyển khoản (bắt buộc):
                    </span>
                    <span className="font-mono font-bold text-xs text-[#4D0202]">
                      {transferContent}
                    </span>
                  </div>
                  <button
                    onClick={() => handleCopy(transferContent, 'Nội dung chuyển khoản')}
                    className="p-1.5 text-xs text-[#4D0202] hover:bg-amber-100 rounded-lg border border-amber-300"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedMethod === 'atm' && (
          <div className="bg-[#FFF9EE] rounded-2xl border border-[#ECDBC0] p-6 space-y-4 text-xs text-[#4D0202]">
            <h4 className="font-serif text-base font-bold text-[#4D0202]">
              Hướng Dẫn Chuyển Tiền Qua Internet Banking
            </h4>
            <p className="leading-relaxed">
              Bạn vui lòng mở ứng dụng ngân hàng của bạn, chọn chuyển nhanh 24/7 đến ngân hàng{' '}
              <strong>{STUDIO_INFO.bankInfo.bankName}</strong>, số tài khoản{' '}
              <strong>{STUDIO_INFO.bankInfo.accountNumber}</strong> với số tiền cọc{' '}
              <strong>{booking.depositAmount.toLocaleString('vi-VN')} VNĐ</strong>.
            </p>
            <p className="p-3 bg-amber-50 rounded-xl border border-amber-200 font-medium">
              Vui lòng ghi đúng nội dung chuyển khoản: <strong className="font-mono">{transferContent}</strong> để hệ thống tự động đối soát nhanh nhất.
            </p>
          </div>
        )}

        {selectedMethod === 'studio' && (
          <div className="bg-[#FFF9EE] rounded-2xl border border-[#ECDBC0] p-6 space-y-3 text-xs text-[#4D0202]">
            <h4 className="font-serif text-base font-bold text-[#4D0202]">
              Đặt Cọc Trực Tiếp Tại Địa Chỉ Studio
            </h4>
            <p className="leading-relaxed">
              Quý khách có thể ghé trực tiếp studio trong giờ làm việc (08:30 - 20:30) tại địa chỉ:{' '}
              <strong>{STUDIO_INFO.address}</strong> để tham quan không gian, thử váy và thanh toán cọc trực tiếp bằng tiền mặt hoặc quẹt thẻ POS.
            </p>
            <p className="text-[#4D0202]/70 italic">
              Lưu ý: Lịch hẹn của bạn sẽ được giữ tạm thời trong vòng 24 giờ kể từ lúc gửi yêu cầu.
            </p>
          </div>
        )}

        {/* 5. Confirmation & Next Step Actions */}
        <div className="p-6 bg-[#FAF1DF] rounded-2xl border border-[#ECDBC0] space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="font-serif font-bold text-sm text-[#4D0202]">
                {hasConfirmedTransfer
                  ? 'Đã ghi nhận giao dịch chuyển cọc của bạn!'
                  : 'Sau khi hoàn tất thao tác chuyển khoản:'}
              </h4>
              <p className="text-xs text-[#4D0202]/70">
                Nhấn nút bên dưới để thông báo cho studio tiến hành đối soát và xuất biên nhận.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {!hasConfirmedTransfer ? (
                <button
                  onClick={handleConfirmPaid}
                  className="px-6 py-3 bg-[#4D0202] hover:bg-[#380101] text-[#FFF3DD] text-xs font-bold uppercase rounded-xl transition-colors shadow-md flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Tôi Đã Chuyển Khoản Đặt Cọc</span>
                </button>
              ) : (
                <span className="px-4 py-2 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-xl border border-emerald-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  Đã ghi nhận yêu cầu thanh toán
                </span>
              )}

              <button
                onClick={() => navigateTo('account')}
                className="px-5 py-3 bg-white hover:bg-[#FFF9EE] text-[#4D0202] border border-[#ECDBC0] text-xs font-bold uppercase rounded-xl transition-colors"
              >
                Vào Quản Lý Lịch Hẹn →
              </button>
            </div>
          </div>

          {/* Report Issue Action (Spec 3.9: Gửi yêu cầu kiểm tra giao dịch khi có lỗi) */}
          <div className="pt-3 border-t border-[#ECDBC0] flex flex-col sm:flex-row items-center justify-between text-xs text-[#4D0202]/80 gap-3">
            <span>Gặp trục trặc hoặc chuyển sai nội dung?</span>
            {reportIssueSent ? (
              <span className="text-emerald-800 font-semibold">
                ✓ Đã gửi yêu cầu hỗ trợ! Nhân viên sẽ kiểm tra lại tài khoản và liên hệ bạn ngay.
              </span>
            ) : (
              <button
                onClick={() => {
                  setReportIssueSent(true);
                  showToast('Đã gửi yêu cầu kiểm tra giao dịch tới bộ phận kế toán!', 'info');
                }}
                className="text-xs font-semibold text-[#4D0202] underline hover:text-[#D97706] flex items-center gap-1"
              >
                <Send className="w-3.5 h-3.5" /> Gửi yêu cầu kiểm tra giao dịch với nhân viên
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

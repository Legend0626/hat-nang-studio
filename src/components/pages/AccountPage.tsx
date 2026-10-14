import React, { useState } from 'react';
import { useStudio } from '../../context/StudioContext';
import { CONCEPTS, PRICING_PACKAGES } from '../../data/studioData';
import { BookingRequest } from '../../types';
import {
  User,
  Calendar,
  Heart,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  Download,
  Share2,
  XCircle,
  ChevronRight,
  ShieldCheck,
  Star,
  Edit2,
  Check,
} from 'lucide-react';

export const AccountPage: React.FC = () => {
  const {
    user,
    bookings,
    wishlist,
    toggleWishlist,
    navigateTo,
    requestCancelBooking,
    showToast,
    loginUser,
    setIsAuthModalOpen,
    setAuthModalMode,
  } = useStudio();

  // Tab state
  const [activeTab, setActiveTab] = useState<'bookings' | 'wishlist' | 'profile'>('bookings');

  // Cancel booking modal state
  const [cancelModalBookingId, setCancelModalBookingId] = useState<string | null>(null);
  const [cancelReason, setCancelReason] = useState('');

  // Profile edit state
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editName, setEditName] = useState(user?.name || '');
  const [editPhone, setEditPhone] = useState(user?.phone || '');
  const [editEmail, setEditEmail] = useState(user?.email || '');

  // If user is not logged in, prompt login
  if (!user) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-5">
        <div className="w-16 h-16 rounded-full bg-[#FAF1DF] border border-[#ECDBC0] flex items-center justify-center mx-auto text-[#4D0202]">
          <User className="w-8 h-8" />
        </div>
        <h2 className="font-serif text-2xl font-bold text-[#4D0202]">
          Vui Lòng Đăng Nhập Tài Khoản
        </h2>
        <p className="text-xs sm:text-sm text-[#4D0202]/80 leading-relaxed">
          Đăng nhập hoặc đăng ký tài khoản Hạt Nắng Studio để theo dõi lịch chụp sắp tới,
          tiến độ chỉnh sửa ảnh và tải về bộ ảnh hoàn thiện của bạn.
        </p>
        <div className="flex justify-center gap-3 pt-2">
          <button
            onClick={() => {
              setAuthModalMode('login');
              setIsAuthModalOpen(true);
            }}
            className="px-6 py-2.5 bg-[#4D0202] text-[#FFF3DD] text-xs font-bold uppercase rounded-xl shadow-sm"
          >
            Đăng Nhập Ngay
          </button>
          <button
            onClick={() => {
              setAuthModalMode('register');
              setIsAuthModalOpen(true);
            }}
            className="px-6 py-2.5 bg-white border border-[#ECDBC0] text-[#4D0202] text-xs font-semibold uppercase rounded-xl hover:bg-[#FAF1DF]"
          >
            Tạo Tài Khoản Mới
          </button>
        </div>
      </div>
    );
  }

  // Handle Save Profile
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    loginUser({ name: editName, phone: editPhone, email: editEmail });
    setIsEditingProfile(false);
    showToast('Đã cập nhật thông tin cá nhân!', 'success');
  };

  // Handle submit cancellation
  const handleConfirmCancel = () => {
    if (!cancelModalBookingId) return;
    if (!cancelReason.trim()) {
      showToast('Vui lòng chọn hoặc nhập lý do đổi/hủy lịch.', 'error');
      return;
    }
    requestCancelBooking(cancelModalBookingId, cancelReason);
    setCancelModalBookingId(null);
    setCancelReason('');
  };

  // Helper for status badge
  const renderStatusBadge = (status: BookingRequest['status']) => {
    switch (status) {
      case 'pending':
        return (
          <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-amber-100 text-amber-900 border border-amber-300">
            Đang chờ xác nhận
          </span>
        );
      case 'confirmed':
        return (
          <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-blue-100 text-blue-900 border border-blue-300">
            Đã xác nhận lịch
          </span>
        );
      case 'photo_session':
        return (
          <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-purple-100 text-purple-900 border border-purple-300">
            Đang chụp tại studio
          </span>
        );
      case 'editing':
        return (
          <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-indigo-100 text-indigo-900 border border-indigo-300">
            Đang xử lý & retouch ảnh
          </span>
        );
      case 'completed':
        return (
          <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300">
            Hoàn thành & đã bàn giao
          </span>
        );
      case 'cancelled':
        return (
          <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-zinc-200 text-zinc-700 border border-zinc-300">
            Đã hủy (Bảo lưu cọc 60 ngày)
          </span>
        );
    }
  };

  // 5-step delivery pipeline
  const pipelineSteps = [
    { key: 'deposit', label: 'Đặt cọc giữ chỗ' },
    { key: 'session', label: 'Buổi chụp ảnh' },
    { key: 'raw', label: 'Chọn file gốc' },
    { key: 'retouch', label: 'Photoshop da & dáng' },
    { key: 'delivery', label: 'Bàn giao hoàn thiện' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* 1. Header Profile Banner */}
      <div className="bg-[#FFF9EE] rounded-3xl border border-[#ECDBC0] p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 text-center md:text-left">
          <div className="w-16 h-16 rounded-full bg-[#4D0202] text-[#FFF3DD] font-serif font-bold text-2xl flex items-center justify-center shrink-0 shadow-md">
            {user.name.charAt(0)}
          </div>
          <div className="space-y-1">
            <h1 className="font-serif text-2xl font-bold text-[#4D0202]">{user.name}</h1>
            <p className="text-xs text-[#4D0202]/70">
              {user.email} · SĐT: {user.phone}
            </p>
            <p className="text-[11px] text-[#D97706] font-semibold">
              Khách hàng thân thiết của Hạt Nắng Studio
            </p>
          </div>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center bg-white p-1 rounded-xl border border-[#ECDBC0] text-xs font-semibold">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'bookings'
                ? 'bg-[#4D0202] text-[#FFF3DD]'
                : 'text-[#4D0202]/80 hover:bg-[#FAF1DF]'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Lịch Chụp ({bookings.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('wishlist')}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'wishlist'
                ? 'bg-[#4D0202] text-[#FFF3DD]'
                : 'text-[#4D0202]/80 hover:bg-[#FAF1DF]'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>Yêu Thích ({wishlist.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'profile'
                ? 'bg-[#4D0202] text-[#FFF3DD]'
                : 'text-[#4D0202]/80 hover:bg-[#FAF1DF]'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Thông Tin Cá Nhân</span>
          </button>
        </div>
      </div>

      {/* 2. TAB: LỊCH CHỤP & TIẾN ĐỘ BÀN GIAO (3.8) */}
      {activeTab === 'bookings' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-xl font-bold text-[#4D0202]">
              Lịch Chụp Sắp Tới & Lịch Sử Đặt Hẹn
            </h2>
            <button
              onClick={() => navigateTo('booking')}
              className="text-xs font-bold text-[#4D0202] hover:underline"
            >
              + Đặt thêm lịch chụp mới
            </button>
          </div>

          {bookings.length === 0 ? (
            <div className="p-12 text-center bg-[#FFF9EE] rounded-2xl border border-[#ECDBC0] space-y-3">
              <Calendar className="w-8 h-8 text-[#4D0202]/40 mx-auto" />
              <p className="font-serif font-bold text-base text-[#4D0202]">
                Bạn chưa có lịch hẹn chụp ảnh nào
              </p>
              <button
                onClick={() => navigateTo('booking')}
                className="px-5 py-2 bg-[#4D0202] text-[#FFF3DD] text-xs font-bold uppercase rounded-lg"
              >
                Đặt Lịch Ngay
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {bookings.map((b) => {
                const isPaid = b.paymentStatus === 'deposit_paid' || b.paymentStatus === 'fully_paid';
                const isCompleted = b.status === 'completed';
                const isCancelled = b.status === 'cancelled';

                return (
                  <div
                    key={b.id}
                    className="bg-[#FFF9EE] rounded-2xl border border-[#ECDBC0] p-6 shadow-sm space-y-6"
                  >
                    {/* Top Row: Booking ID, Dates, Status */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#ECDBC0] gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-sm text-[#4D0202] bg-[#FAF1DF] px-2.5 py-0.5 rounded border border-[#ECDBC0]">
                            {b.id}
                          </span>
                          <span className="text-xs text-[#4D0202]/60">Tạo ngày {b.createdAt}</span>
                        </div>
                        <h3 className="font-serif text-lg font-bold text-[#4D0202] mt-1">
                          {b.conceptTitle} — {b.packageName}
                        </h3>
                      </div>

                      <div className="flex items-center gap-3">
                        {renderStatusBadge(b.status)}
                      </div>
                    </div>

                    {/* Middle Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs text-[#4D0202]">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-[#4D0202]/60 block">
                          Thời gian chụp:
                        </span>
                        <p className="font-bold mt-0.5">Ngày {b.date}</p>
                        <p className="text-[11px] text-[#4D0202]/70">{b.timeSlot}</p>
                      </div>

                      <div>
                        <span className="text-[10px] uppercase font-bold text-[#4D0202]/60 block">
                          Chi phí & Tiền cọc:
                        </span>
                        <p className="font-bold mt-0.5 tabular-nums">
                          Tổng: {b.totalPrice.toLocaleString('vi-VN')} đ
                        </p>
                        <p className="text-[11px] text-[#D97706] font-semibold tabular-nums">
                          Cọc: {b.depositAmount.toLocaleString('vi-VN')} đ ({isPaid ? 'Đã thanh toán' : 'Chưa cọc'})
                        </p>
                      </div>

                      <div>
                        <span className="text-[10px] uppercase font-bold text-[#4D0202]/60 block">
                          Hình thức thanh toán:
                        </span>
                        <p className="font-semibold mt-0.5 capitalize">
                          {b.paymentMethod === 'vietqr' ? 'Chuyển khoản VietQR' : b.paymentMethod === 'studio' ? 'Tại Studio' : 'Chưa chọn'}
                        </p>
                        <p className="text-[11px] text-[#4D0202]/70">
                          Còn lại: {(b.totalPrice - b.depositAmount).toLocaleString('vi-VN')} đ
                        </p>
                      </div>

                      <div>
                        <span className="text-[10px] uppercase font-bold text-[#4D0202]/60 block">
                          Ghi chú riêng:
                        </span>
                        <p className="text-[11px] text-[#4D0202]/80 italic mt-0.5 line-clamp-2">
                          {b.notes || 'Không có ghi chú thêm.'}
                        </p>
                      </div>
                    </div>

                    {/* 5-Step Progress Timeline (Spec 3.8: Tiến độ nhận ảnh) */}
                    {!isCancelled && (
                      <div className="pt-2 border-t border-[#ECDBC0]/60 space-y-2">
                        <span className="text-[11px] uppercase font-bold text-[#4D0202]/70 block">
                          Tiến Độ Thực Hiện Buổi Chụp & Bàn Giao Ảnh:
                        </span>
                        <div className="grid grid-cols-5 gap-2 text-center text-[10px]">
                          {pipelineSteps.map((step, idx) => {
                            // Determine step completion based on status
                            let isDone = false;
                            if (idx === 0 && isPaid) isDone = true;
                            if (idx <= 1 && (b.status === 'photo_session' || b.status === 'editing' || b.status === 'completed')) isDone = true;
                            if (idx <= 2 && (b.status === 'editing' || b.status === 'completed')) isDone = true;
                            if (idx <= 3 && b.status === 'completed') isDone = true;
                            if (idx <= 4 && b.status === 'completed') isDone = true;

                            return (
                              <div key={step.key} className="space-y-1">
                                <div
                                  className={`h-2 rounded-full transition-all ${
                                    isDone ? 'bg-[#4D0202]' : 'bg-[#ECDBC0]'
                                  }`}
                                />
                                <span className={isDone ? 'font-bold text-[#4D0202]' : 'text-[#4D0202]/50'}>
                                  {step.label}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Bottom Action Strip: Link tải ảnh bàn giao / Đổi lịch / Hủy lịch */}
                    <div className="pt-4 border-t border-[#ECDBC0] flex flex-wrap items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-3">
                        {isCompleted && b.deliveryGalleryUrl && (
                          <a
                            href={b.deliveryGalleryUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg flex items-center gap-1.5 shadow-sm"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Tải Trọn Bộ Ảnh Bàn Giao (Google Drive)</span>
                          </a>
                        )}

                        {!isPaid && !isCancelled && (
                          <button
                            onClick={() => navigateTo('payment', { bookingId: b.id })}
                            className="px-4 py-2 bg-[#4D0202] text-[#FFF3DD] font-bold rounded-lg hover:bg-[#380101] transition-colors"
                          >
                            Thanh Toán Tiền Cọc 30%
                          </button>
                        )}

                        {isCompleted && (
                          <button
                            onClick={() => navigateTo('reviews')}
                            className="px-3.5 py-1.5 border border-[#ECDBC0] bg-white text-[#4D0202] rounded-lg font-semibold hover:bg-[#FAF1DF]"
                          >
                            Đánh Giá Buổi Chụp ★
                          </button>
                        )}
                      </div>

                      {/* Cancel / Reschedule trigger */}
                      {!isCancelled && !isCompleted && (
                        <button
                          onClick={() => setCancelModalBookingId(b.id)}
                          className="text-xs text-red-800 hover:underline flex items-center gap-1"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Yêu cầu đổi lịch / Hủy lịch hẹn</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* 3. TAB: WISHLIST (Concept Yêu Thích) */}
      {activeTab === 'wishlist' && (
        <div className="space-y-6">
          <h2 className="font-serif text-xl font-bold text-[#4D0202]">
            Concept Bạn Đang Quan Tâm & Yêu Thích ({wishlist.length})
          </h2>

          {wishlist.length === 0 ? (
            <div className="p-12 text-center bg-[#FFF9EE] rounded-2xl border border-[#ECDBC0] space-y-3">
              <Heart className="w-8 h-8 text-[#4D0202]/40 mx-auto" />
              <p className="font-serif font-bold text-base text-[#4D0202]">
                Bạn chưa lưu concept nào vào danh sách yêu thích
              </p>
              <button
                onClick={() => navigateTo('concepts')}
                className="px-5 py-2 bg-[#4D0202] text-[#FFF3DD] text-xs font-bold uppercase rounded-lg"
              >
                Khám Phá Các Concept
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {wishlist.map((id) => {
                const c = CONCEPTS.find((item) => item.id === id);
                if (!c) return null;
                return (
                  <div
                    key={c.id}
                    className="bg-[#FFF9EE] rounded-2xl border border-[#ECDBC0] overflow-hidden p-4 space-y-3 shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <img
                        src={c.coverImage}
                        alt={c.title}
                        className="w-full aspect-[4/3] object-cover rounded-xl border border-[#ECDBC0]"
                      />
                      <span className="text-[10px] uppercase font-bold text-[#4D0202]/70 mt-2 block">
                        {c.category}
                      </span>
                      <h4 className="font-serif font-bold text-sm text-[#4D0202] mt-0.5">{c.title}</h4>
                      <p className="text-xs text-[#4D0202] font-semibold mt-1">
                        Từ {c.startingPrice.toLocaleString('vi-VN')} đ
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#ECDBC0] flex items-center justify-between gap-2">
                      <button
                        onClick={() => toggleWishlist(c.id)}
                        className="text-[11px] text-red-800 hover:underline"
                      >
                        Bỏ lưu
                      </button>
                      <button
                        onClick={() => navigateTo('booking', { conceptId: c.id })}
                        className="px-3 py-1.5 bg-[#4D0202] text-[#FFF3DD] text-[11px] font-bold rounded-lg uppercase"
                      >
                        Đặt lịch concept này
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* 4. TAB: THÔNG TIN HỒ SƠ & BẢO MẬT (3.8) */}
      {activeTab === 'profile' && (
        <div className="max-w-2xl bg-[#FFF9EE] rounded-2xl border border-[#ECDBC0] p-8 space-y-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-[#ECDBC0] pb-4">
            <div>
              <h2 className="font-serif text-xl font-bold text-[#4D0202]">
                Thông Tin Khách Hàng
              </h2>
              <p className="text-xs text-[#4D0202]/70">
                Thông tin được dùng để liên hệ xác nhận lịch chụp và gửi link bàn giao ảnh
              </p>
            </div>
            {!isEditingProfile && (
              <button
                onClick={() => setIsEditingProfile(true)}
                className="px-3.5 py-1.5 bg-white border border-[#ECDBC0] text-xs font-semibold rounded-lg text-[#4D0202] flex items-center gap-1.5 hover:bg-[#FAF1DF]"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Chỉnh sửa</span>
              </button>
            )}
          </div>

          {isEditingProfile ? (
            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs text-[#4D0202]">
              <div>
                <label className="block font-bold uppercase mb-1">Họ và tên *</label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full p-2.5 bg-white border border-[#ECDBC0] rounded-lg"
                />
              </div>

              <div>
                <label className="block font-bold uppercase mb-1">Số điện thoại *</label>
                <input
                  type="tel"
                  required
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  className="w-full p-2.5 bg-white border border-[#ECDBC0] rounded-lg"
                />
              </div>

              <div>
                <label className="block font-bold uppercase mb-1">Email *</label>
                <input
                  type="email"
                  required
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="w-full p-2.5 bg-white border border-[#ECDBC0] rounded-lg"
                />
              </div>

              <div className="flex items-center gap-3 pt-3">
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#4D0202] text-[#FFF3DD] font-bold rounded-lg text-xs"
                >
                  Lưu thay đổi
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditingProfile(false)}
                  className="px-4 py-2.5 bg-white border border-[#ECDBC0] rounded-lg text-xs"
                >
                  Hủy
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-3 text-xs text-[#4D0202]">
              <div className="flex justify-between py-2 border-b border-[#ECDBC0]/60">
                <span className="font-semibold text-[#4D0202]/70">Họ và tên:</span>
                <span className="font-bold">{user.name}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#ECDBC0]/60">
                <span className="font-semibold text-[#4D0202]/70">Số điện thoại:</span>
                <span className="font-bold">{user.phone}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#ECDBC0]/60">
                <span className="font-semibold text-[#4D0202]/70">Địa chỉ Email:</span>
                <span className="font-bold">{user.email}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="font-semibold text-[#4D0202]/70">Bảo mật tài khoản:</span>
                <span className="font-semibold text-emerald-800">Đã kích hoạt bảo mật</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Modal: Đổi / Hủy Lịch Hẹn */}
      {cancelModalBookingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#FFF9EE] max-w-md w-full rounded-2xl border border-[#ECDBC0] p-6 space-y-4 shadow-2xl">
            <h3 className="font-serif text-lg font-bold text-[#4D0202]">
              Yêu Cầu Đổi Hoặc Hủy Lịch Hẹn ({cancelModalBookingId})
            </h3>
            <p className="text-xs text-[#4D0202]/80 leading-relaxed">
              Theo chính sách của Hạt Nắng Studio, quý khách được dời ngày miễn phí 01 lần khi báo trước 48 giờ.
              Số tiền đặt cọc sẽ được bảo lưu trong vòng 60 ngày để bạn sắp xếp ngày chụp mới thuận tiện.
            </p>

            <div>
              <label className="block text-xs font-bold uppercase text-[#4D0202] mb-1">
                Lý do đổi/hủy lịch *
              </label>
              <textarea
                rows={3}
                required
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                placeholder="Ví dụ: Mình có lịch công tác đột xuất, muốn xin bảo lưu cọc sang tuần sau..."
                className="w-full p-2.5 text-xs bg-white border border-[#ECDBC0] rounded-xl focus:outline-none"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setCancelModalBookingId(null)}
                className="px-4 py-2 bg-white border border-[#ECDBC0] text-xs font-semibold rounded-lg"
              >
                Đóng
              </button>
              <button
                onClick={handleConfirmCancel}
                className="px-4 py-2 bg-red-800 text-white text-xs font-bold rounded-lg hover:bg-red-900"
              >
                Xác nhận gửi yêu cầu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

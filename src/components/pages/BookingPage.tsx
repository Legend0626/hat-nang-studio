import React, { useState, useMemo } from 'react';
import { useStudio } from '../../context/StudioContext';
import { CONCEPTS, PRICING_PACKAGES, ADD_ON_SERVICES, TIME_SLOTS, PROMOTIONS } from '../../data/studioData';
import { BookingRequest } from '../../types';
import {
  Calendar as CalendarIcon,
  Clock,
  Sparkles,
  User,
  Phone,
  Mail,
  FileText,
  Upload,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  ShieldAlert,
  Tag,
  CreditCard,
  Building,
} from 'lucide-react';

export const BookingPage: React.FC = () => {
  const {
    selectedConcept,
    setSelectedConcept,
    selectedPackage,
    setSelectedPackage,
    prefilledCoupon,
    user,
    createBooking,
    navigateTo,
    showToast,
  } = useStudio();

  // Active concepts only (discontinued concepts are hidden from booking list as required by spec)
  const activeConcepts = CONCEPTS.filter((c) => c.status !== 'discontinued');

  // Booking Flow Form State
  const [conceptId, setConceptId] = useState<string>(
    selectedConcept && selectedConcept.status !== 'discontinued'
      ? selectedConcept.id
      : activeConcepts[0].id
  );
  const [packageId, setPackageId] = useState<string>(
    selectedPackage ? selectedPackage.id : PRICING_PACKAGES[1].id
  );

  // Booking mode: 'online_slot' vs 'consultation_request'
  const [bookingType, setBookingType] = useState<'online_slot' | 'consultation_request'>('online_slot');

  // Date & Slot state (default to tomorrow)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  const [selectedDate, setSelectedDate] = useState<string>(tomorrowStr);
  const [selectedSlotId, setSelectedSlotId] = useState<string>(TIME_SLOTS[0].id);

  // Customer Contact Info (auto-filled if logged in)
  const [customerName, setCustomerName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [email, setEmail] = useState(user?.email || '');
  const [notes, setNotes] = useState('');
  const [referenceFileName, setReferenceFileName] = useState('');

  // Add-ons
  const [selectedAddOnIds, setSelectedAddOnIds] = useState<string[]>([]);

  // Promo code
  const [couponInput, setCouponInput] = useState(prefilledCoupon || '');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(prefilledCoupon || null);
  const [couponError, setCouponError] = useState<string | null>(null);

  // Error validation
  const [validationError, setValidationError] = useState<string | null>(null);

  // Active chosen objects
  const chosenConcept = CONCEPTS.find((c) => c.id === conceptId) || activeConcepts[0];
  const chosenPackage = PRICING_PACKAGES.find((p) => p.id === packageId) || PRICING_PACKAGES[1];
  const chosenSlot = TIME_SLOTS.find((s) => s.id === selectedSlotId) || TIME_SLOTS[0];

  // Pricing Calculation
  const addOnsTotal = selectedAddOnIds.reduce((sum, id) => {
    const item = ADD_ON_SERVICES.find((a) => a.id === id);
    return sum + (item ? item.price : 0);
  }, 0);

  const subTotal = chosenPackage.price + addOnsTotal;

  // Coupon discount calculation
  let discountAmount = 0;
  if (appliedPromo) {
    const promo = PROMOTIONS.find(
      (p) => p.code.toUpperCase() === appliedPromo.toUpperCase()
    );
    if (promo) {
      if (promo.discountPercent) {
        discountAmount = Math.round((subTotal * promo.discountPercent) / 100);
      } else if (promo.discountAmount) {
        discountAmount = promo.discountAmount;
      }
    }
  }

  const totalPrice = Math.max(0, subTotal - discountAmount);
  const depositAmount = Math.round(totalPrice * 0.3); // 30% deposit

  // Handle Apply Coupon
  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError(null);
    const code = couponInput.trim().toUpperCase();
    if (!code) {
      setCouponError('Vui lòng nhập mã ưu đãi.');
      return;
    }
    const found = PROMOTIONS.find((p) => p.code === code);
    if (!found) {
      setCouponError('Mã ưu đãi không hợp lệ hoặc đã hết hạn.');
      return;
    }
    setAppliedPromo(found.code);
    showToast(`Đã áp dụng mã ${found.code}: ${found.title}`, 'success');
  };

  // Handle Addon Toggle
  const handleToggleAddOn = (id: string) => {
    setSelectedAddOnIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // Submit Booking Form
  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    // Validation
    if (!customerName.trim()) {
      setValidationError('Vui lòng nhập họ và tên người đặt lịch.');
      return;
    }
    if (!phone.trim() || phone.length < 9) {
      setValidationError('Vui lòng nhập số điện thoại liên hệ hợp lệ.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setValidationError('Vui lòng nhập địa chỉ email để nhận thông tin xác nhận.');
      return;
    }
    if (bookingType === 'online_slot' && !chosenSlot.isAvailable) {
      setValidationError('Khung giờ đã chọn hiện đã kín chỗ. Vui lòng chọn khung giờ khác.');
      return;
    }

    // Create booking record
    const created = createBooking({
      customerName,
      phone,
      email,
      conceptId: chosenConcept.id,
      conceptTitle: chosenConcept.title,
      packageId: chosenPackage.id,
      packageName: chosenPackage.name,
      bookingType,
      date: selectedDate,
      timeSlot: bookingType === 'online_slot' ? chosenSlot.time : 'Nhân viên liên hệ sắp xếp giờ',
      notes,
      referenceImageName: referenceFileName || undefined,
      addOnIds: selectedAddOnIds,
      totalPrice,
      depositAmount,
      promoCode: appliedPromo || undefined,
      discountAmount,
    });

    // Navigate to payment page to complete deposit
    navigateTo('payment', { bookingId: created.id });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* 1. Header & Crucial Status Disclosure (per 3.6 & 4 Spec) */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#4D0202]/60">
          Quy Trình Tiếp Nhận Lịch Hẹn
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#4D0202]">
          Đặt Lịch Chụp Ảnh Tại Hạt Nắng
        </h1>
        <p className="text-xs sm:text-sm text-[#4D0202]/80 leading-relaxed">
          Quý khách có thể chọn khung giờ trực tuyến còn trống hoặc gửi yêu cầu để nhân viên studio gọi điện tư vấn.
        </p>

        {/* Mandatory Note per Spec: Clearly distinguishing request vs confirmed */}
        <div className="p-3.5 bg-[#FAF1DF] border border-[#ECDBC0] rounded-xl text-left text-xs text-[#4D0202] flex items-start gap-2.5">
          <ShieldAlert className="w-5 h-5 text-[#D97706] shrink-0 mt-0.5" />
          <div>
            <strong className="block text-xs uppercase font-bold text-[#4D0202]">
              Lưu ý quan trọng từ Hạt Nắng Studio:
            </strong>
            <span className="text-[11px] text-[#4D0202]/80 leading-relaxed">
              Hình thức gửi yêu cầu không đồng nghĩa lịch chụp đã được xác nhận tự động.
              Sau khi bạn gửi thông tin và đặt cọc, hệ thống sẽ cấp mã đặt lịch với trạng thái{' '}
              <strong className="text-[#4D0202] underline">&ldquo;Đang chờ xác nhận&rdquo;</strong>.
              Nhân viên studio sẽ liên hệ qua SĐT/Zalo trong vòng 30 phút để kiểm tra lịch trống và xác nhận chính thức.
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Form (Left 7 Cols) + Summary & Deposit Box (Right 5 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Booking Form */}
        <form onSubmit={handleSubmitBooking} className="lg:col-span-7 space-y-8">
          {/* Step 1: Chọn Concept & Gói Dịch Vụ */}
          <div className="bg-[#FFF9EE] rounded-2xl border border-[#ECDBC0] p-6 space-y-4 shadow-sm">
            <div className="flex items-center gap-2 border-b border-[#ECDBC0] pb-3">
              <span className="w-6 h-6 rounded-full bg-[#4D0202] text-[#FFF3DD] text-xs font-bold flex items-center justify-center">
                1
              </span>
              <h3 className="font-serif text-base font-bold text-[#4D0202]">
                Chọn Concept & Gói Dịch Vụ
              </h3>
            </div>

            {/* Concept dropdown */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#4D0202] mb-1.5">
                Concept chụp ảnh *
              </label>
              <select
                value={conceptId}
                onChange={(e) => {
                  setConceptId(e.target.value);
                  const found = CONCEPTS.find((c) => c.id === e.target.value);
                  if (found) setSelectedConcept(found);
                }}
                className="w-full p-2.5 bg-white border border-[#ECDBC0] rounded-xl text-xs font-medium text-[#4D0202] focus:outline-none focus:ring-1 focus:ring-[#4D0202]"
              >
                {activeConcepts.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title} ({c.category} - Từ {c.startingPrice.toLocaleString('vi-VN')} đ)
                  </option>
                ))}
              </select>
            </div>

            {/* Package selector cards */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#4D0202] mb-1.5">
                Gói dịch vụ *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {PRICING_PACKAGES.map((pkg) => {
                  const isSelected = packageId === pkg.id;
                  return (
                    <div
                      key={pkg.id}
                      onClick={() => {
                        setPackageId(pkg.id);
                        setSelectedPackage(pkg);
                      }}
                      className={`p-3 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-[#FAF1DF] border-[#4D0202] ring-1 ring-[#4D0202]'
                          : 'bg-white border-[#ECDBC0] hover:bg-[#FAF1DF]/50'
                      }`}
                    >
                      <h4 className="font-serif font-bold text-xs text-[#4D0202] line-clamp-1">
                        {pkg.name}
                      </h4>
                      <p className="text-xs font-bold text-[#4D0202] mt-1 tabular-nums">
                        {pkg.price.toLocaleString('vi-VN')} đ
                      </p>
                      <p className="text-[10px] text-[#4D0202]/70 mt-1">
                        {pkg.duration} · {pkg.editedPhotos} ảnh
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Step 2: Chọn Hình Thức Đặt & Khung Giờ Trực Tuyến */}
          <div className="bg-[#FFF9EE] rounded-2xl border border-[#ECDBC0] p-6 space-y-4 shadow-sm">
            <div className="flex items-center gap-2 border-b border-[#ECDBC0] pb-3">
              <span className="w-6 h-6 rounded-full bg-[#4D0202] text-[#FFF3DD] text-xs font-bold flex items-center justify-center">
                2
              </span>
              <h3 className="font-serif text-base font-bold text-[#4D0202]">
                Thời Gian & Hình Thức Đặt Lịch
              </h3>
            </div>

            {/* Mode Toggle Button Group */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setBookingType('online_slot')}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  bookingType === 'online_slot'
                    ? 'bg-[#FAF1DF] border-[#4D0202] ring-1 ring-[#4D0202]'
                    : 'bg-white border-[#ECDBC0] hover:bg-white/80'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-xs text-[#4D0202]">
                  <Clock className="w-4 h-4 text-[#D97706]" />
                  <span>Chọn Khung Giờ Trực Tuyến</span>
                </div>
                <p className="text-[11px] text-[#4D0202]/70 mt-1">
                  Chọn ngày và slot giờ còn trống để studio giữ lịch ngay
                </p>
              </button>

              <button
                type="button"
                onClick={() => setBookingType('consultation_request')}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  bookingType === 'consultation_request'
                    ? 'bg-[#FAF1DF] border-[#4D0202] ring-1 ring-[#4D0202]'
                    : 'bg-white border-[#ECDBC0] hover:bg-white/80'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-xs text-[#4D0202]">
                  <FileText className="w-4 h-4 text-[#D97706]" />
                  <span>Gửi Yêu Cầu Nhân Viên Liên Hệ</span>
                </div>
                <p className="text-[11px] text-[#4D0202]/70 mt-1">
                  Nhân viên sẽ gọi điện tư vấn concept & linh hoạt chọn giờ phù hợp
                </p>
              </button>
            </div>

            {/* If online slot chosen: Date and Time slots picker */}
            {bookingType === 'online_slot' && (
              <div className="space-y-4 pt-2">
                {/* Date Picker */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4D0202] mb-1.5">
                    Ngày chụp mong muốn *
                  </label>
                  <div className="relative">
                    <CalendarIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4D0202]/50" />
                    <input
                      type="date"
                      min={tomorrowStr}
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 text-xs bg-white border border-[#ECDBC0] rounded-xl text-[#4D0202] focus:outline-none focus:ring-1 focus:ring-[#4D0202]"
                    />
                  </div>
                </div>

                {/* Slot Picker with availability validation */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#4D0202]">
                      Khung giờ chụp tại Studio *
                    </label>
                    <span className="text-[11px] text-[#4D0202]/70">
                      (Cập nhật lịch trống thời gian thực)
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {TIME_SLOTS.map((slot) => {
                      const isSelected = selectedSlotId === slot.id;
                      return (
                        <button
                          key={slot.id}
                          type="button"
                          disabled={!slot.isAvailable}
                          onClick={() => setSelectedSlotId(slot.id)}
                          className={`p-2.5 rounded-xl border text-center transition-all ${
                            !slot.isAvailable
                              ? 'bg-zinc-100 border-zinc-200 text-zinc-400 cursor-not-allowed opacity-60'
                              : isSelected
                              ? 'bg-[#4D0202] text-[#FFF3DD] border-[#4D0202] font-bold shadow-sm'
                              : 'bg-white border-[#ECDBC0] text-[#4D0202] hover:bg-[#FAF1DF]'
                          }`}
                        >
                          <div className="text-xs font-medium">{slot.time}</div>
                          <div className="text-[10px] mt-0.5">
                            {slot.isAvailable ? (
                              <span className={isSelected ? 'text-[#FFF3DD]' : 'text-emerald-700'}>
                                ● Còn trống
                              </span>
                            ) : (
                              <span>Đã kín chỗ</span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Step 3: Thông Tin Liên Hệ & Ghi Chú Cá Nhân */}
          <div className="bg-[#FFF9EE] rounded-2xl border border-[#ECDBC0] p-6 space-y-4 shadow-sm">
            <div className="flex items-center gap-2 border-b border-[#ECDBC0] pb-3">
              <span className="w-6 h-6 rounded-full bg-[#4D0202] text-[#FFF3DD] text-xs font-bold flex items-center justify-center">
                3
              </span>
              <h3 className="font-serif text-base font-bold text-[#4D0202]">
                Thông Tin Liên Hệ & Yêu Cầu Riêng
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4D0202] mb-1">
                  Họ và tên *
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4D0202]/50" />
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Ví dụ: Nguyễn Mai Phương"
                    className="w-full pl-10 pr-3 py-2 text-xs bg-white border border-[#ECDBC0] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#4D0202]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4D0202] mb-1">
                  Số điện thoại liên hệ *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4D0202]/50" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Ví dụ: 0908 123 456"
                    className="w-full pl-10 pr-3 py-2 text-xs bg-white border border-[#ECDBC0] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#4D0202]"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#4D0202] mb-1">
                Địa chỉ Email *
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4D0202]/50" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@cuaban.com"
                  className="w-full pl-10 pr-3 py-2 text-xs bg-white border border-[#ECDBC0] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#4D0202]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#4D0202] mb-1">
                Ghi chú & Yêu cầu riêng (Tùy chọn)
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Ví dụ: Mình thích tone màu vintage ấm, muốn mang thêm bó hoa riêng, hoặc chụp nhân dịp kỷ niệm..."
                className="w-full p-3 text-xs bg-white border border-[#ECDBC0] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#4D0202]"
              />
            </div>

            {/* Upload Reference Image (Spec 3.6) */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#4D0202] mb-1">
                Tải ảnh mẫu tham khảo mong muốn (Tùy chọn)
              </label>
              <div className="border-2 border-dashed border-[#ECDBC0] rounded-xl p-4 text-center bg-white/50 hover:bg-white transition-colors">
                <input
                  type="file"
                  id="refImageUpload"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setReferenceFileName(file.name);
                      showToast(`Đã đính kèm ảnh mẫu: ${file.name}`, 'info');
                    }
                  }}
                  className="hidden"
                />
                <label
                  htmlFor="refImageUpload"
                  className="cursor-pointer flex flex-col items-center justify-center space-y-1"
                >
                  <Upload className="w-5 h-5 text-[#D97706]" />
                  <span className="text-xs text-[#4D0202] font-semibold">
                    {referenceFileName ? `Đã chọn: ${referenceFileName}` : 'Nhấn để tải lên ảnh gu bạn thích'}
                  </span>
                  <span className="text-[10px] text-[#4D0202]/60">
                    PNG, JPG tối đa 10MB
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Step 4: Dịch Vụ Bổ Sung Tùy Chọn */}
          <div className="bg-[#FFF9EE] rounded-2xl border border-[#ECDBC0] p-6 space-y-3 shadow-sm">
            <h4 className="font-serif text-sm font-bold text-[#4D0202]">
              Thêm Dịch Vụ Bổ Sung Cho Buổi Chụp
            </h4>
            <div className="space-y-2">
              {ADD_ON_SERVICES.map((addon) => {
                const isChecked = selectedAddOnIds.includes(addon.id);
                return (
                  <label
                    key={addon.id}
                    onClick={() => handleToggleAddOn(addon.id)}
                    className={`flex items-center justify-between p-3 rounded-xl border text-xs cursor-pointer transition-colors ${
                      isChecked
                        ? 'bg-[#FAF1DF] border-[#4D0202]'
                        : 'bg-white border-[#ECDBC0] hover:bg-[#FAF1DF]/40'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        className="accent-[#4D0202] w-4 h-4 rounded"
                      />
                      <div>
                        <span className="font-semibold text-[#4D0202]">{addon.name}</span>
                        <p className="text-[10px] text-[#4D0202]/70">{addon.description}</p>
                      </div>
                    </div>
                    <span className="font-bold text-[#4D0202] tabular-nums shrink-0 ml-2">
                      +{addon.price.toLocaleString('vi-VN')} đ
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Validation Error Banner */}
          {validationError && (
            <div className="flex items-center gap-2 p-3 text-xs text-red-800 bg-red-50 border border-red-200 rounded-xl">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{validationError}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-4 px-6 bg-[#4D0202] hover:bg-[#380101] text-[#FFF3DD] text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
          >
            <span>Tiếp Tục · Xác Nhận Đặt Lịch & Thanh Toán Cọc</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Right Column: Tóm Tắt Dịch Vụ & Thanh Toán Cọc (Sticky Summary) */}
        <div className="lg:col-span-5 sticky top-28 space-y-6">
          <div className="bg-[#FFF9EE] rounded-2xl border-2 border-[#ECDBC0] p-6 space-y-5 shadow-lg">
            <h3 className="font-serif text-lg font-bold text-[#4D0202] border-b border-[#ECDBC0] pb-3">
              Tóm Tắt Yêu Cầu Đặt Lịch
            </h3>

            {/* Concept & Package Brief */}
            <div className="space-y-3 text-xs text-[#4D0202]">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#4D0202]/60">Concept:</span>
                <p className="font-serif font-bold text-base text-[#4D0202]">{chosenConcept.title}</p>
                <p className="text-[11px] text-[#4D0202]/70">{chosenConcept.category} · {chosenConcept.style}</p>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-[#4D0202]/60">Gói chụp:</span>
                <div className="flex items-center justify-between font-bold">
                  <span>{chosenPackage.name}</span>
                  <span className="tabular-nums">{chosenPackage.price.toLocaleString('vi-VN')} đ</span>
                </div>
                <p className="text-[11px] text-[#4D0202]/70">
                  {chosenPackage.duration} · {chosenPackage.editedPhotos} ảnh retouch · Trả ảnh sau {chosenPackage.returnDays} ngày
                </p>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-[#4D0202]/60">Thời gian dự kiến:</span>
                <p className="font-semibold">
                  {bookingType === 'online_slot'
                    ? `Ngày ${selectedDate} (${chosenSlot.time})`
                    : 'Nhân viên sẽ gọi điện sắp xếp khung giờ'}
                </p>
              </div>

              {/* Add-ons list if selected */}
              {selectedAddOnIds.length > 0 && (
                <div className="pt-2 border-t border-[#ECDBC0]/60 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-[#4D0202]/60">
                    Dịch vụ bổ sung ({selectedAddOnIds.length}):
                  </span>
                  {selectedAddOnIds.map((id) => {
                    const addon = ADD_ON_SERVICES.find((a) => a.id === id);
                    if (!addon) return null;
                    return (
                      <div key={id} className="flex justify-between text-[11px]">
                        <span>{addon.name}</span>
                        <span className="tabular-nums">+{addon.price.toLocaleString('vi-VN')} đ</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Voucher Code Form */}
            <div className="pt-3 border-t border-[#ECDBC0] space-y-2">
              <label className="block text-[11px] uppercase font-bold text-[#4D0202]">
                Mã Giảm Giá / Khuyến Mãi
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  placeholder="VD: GOMNANG15"
                  className="flex-1 px-3 py-1.5 text-xs bg-white border border-[#ECDBC0] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4D0202] uppercase font-mono"
                />
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  className="px-3 py-1.5 bg-[#4D0202] text-[#FFF3DD] text-xs font-bold rounded-lg hover:bg-[#380101] transition-colors shrink-0"
                >
                  Áp dụng
                </button>
              </div>

              {couponError && (
                <p className="text-[11px] text-red-700">{couponError}</p>
              )}

              {appliedPromo && (
                <div className="flex items-center justify-between text-xs text-emerald-800 bg-emerald-50 p-2 rounded-lg">
                  <span className="flex items-center gap-1 font-semibold">
                    <Tag className="w-3.5 h-3.5" /> Mã {appliedPromo} đã áp dụng
                  </span>
                  <span className="font-bold tabular-nums">
                    -{discountAmount.toLocaleString('vi-VN')} đ
                  </span>
                </div>
              )}
            </div>

            {/* Financial Summary */}
            <div className="pt-3 border-t-2 border-[#ECDBC0] space-y-2 text-xs">
              <div className="flex justify-between text-[#4D0202]/80">
                <span>Tổng giá trị dịch vụ:</span>
                <span className="tabular-nums font-semibold">{subTotal.toLocaleString('vi-VN')} VNĐ</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Giảm giá ưu đãi:</span>
                  <span className="tabular-nums">-{discountAmount.toLocaleString('vi-VN')} VNĐ</span>
                </div>
              )}

              <div className="flex justify-between text-base font-bold text-[#4D0202] pt-1 border-t border-[#ECDBC0]">
                <span>Tổng chi phí:</span>
                <span className="font-serif text-lg tabular-nums">{totalPrice.toLocaleString('vi-VN')} VNĐ</span>
              </div>

              {/* Deposit Required */}
              <div className="p-3 bg-[#FAF1DF] rounded-xl border border-[#ECDBC0] space-y-1 mt-2">
                <div className="flex justify-between items-baseline font-bold text-[#4D0202]">
                  <span>Số tiền đặt cọc giữ lịch (30%):</span>
                  <span className="font-serif text-base text-[#D97706] tabular-nums">
                    {depositAmount.toLocaleString('vi-VN')} VNĐ
                  </span>
                </div>
                <div className="flex justify-between text-[11px] text-[#4D0202]/70">
                  <span>Số tiền còn lại sau buổi chụp:</span>
                  <span className="tabular-nums font-semibold">
                    {(totalPrice - depositAmount).toLocaleString('vi-VN')} VNĐ
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Guarantees */}
            <div className="text-[11px] text-[#4D0202]/70 space-y-1.5 pt-2">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span>Bảo lưu tiền cọc 60 ngày nếu có lịch bận đột xuất</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span>Nhận toàn bộ file gốc độ phân giải cao trong ngày</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

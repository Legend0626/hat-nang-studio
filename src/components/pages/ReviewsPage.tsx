import React, { useState } from 'react';
import { useStudio } from '../../context/StudioContext';
import { REVIEWS, CONCEPTS } from '../../data/studioData';
import { Review } from '../../types';
import {
  Star,
  CheckCircle2,
  MessageSquare,
  ShieldAlert,
  Send,
  Flag,
  Sparkles,
} from 'lucide-react';

export const ReviewsPage: React.FC = () => {
  const { user, bookings, showToast } = useStudio();

  // Reviews list state
  const [reviewsList, setReviewsList] = useState<Review[]>(REVIEWS);
  const [selectedConceptFilter, setSelectedConceptFilter] = useState<string>('Tất cả');

  // Submit new review form state
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState('');
  const [conceptTitle, setConceptTitle] = useState(CONCEPTS[0].title);
  const [hasCompletedBooking, setHasCompletedBooking] = useState(
    bookings.some((b) => b.status === 'completed')
  );

  const filteredReviews =
    selectedConceptFilter === 'Tất cả'
      ? reviewsList
      : reviewsList.filter((r) => r.conceptTitle.includes(selectedConceptFilter));

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) {
      showToast('Vui lòng nhập nội dung đánh giá của bạn.', 'error');
      return;
    }

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      authorName: user?.name || 'Khách Hàng Hạt Nắng',
      rating,
      date: new Date().toLocaleDateString('vi-VN'),
      conceptTitle,
      packageName: 'Gói Nắng Hoàng Hôn',
      comment,
      photos: [],
      studioReply: 'Hạt Nắng Studio cảm ơn đánh giá chân thành từ bạn rất nhiều ạ!',
      verifiedBooking: true,
    };

    setReviewsList([newRev, ...reviewsList]);
    setComment('');
    showToast('Đã gửi đánh giá thành công! Cảm ơn bạn đã đồng hành cùng Hạt Nắng.', 'success');
  };

  const handleReport = (id: string) => {
    showToast(`Đã gửi báo cáo đánh giá ${id} tới bộ phận kiểm duyệt.`, 'info');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* 1. Header & Rating Summary */}
      <div className="bg-[#FFF9EE] rounded-3xl border border-[#ECDBC0] p-8 sm:p-10 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-4 text-center md:text-left space-y-2 md:border-r md:border-[#ECDBC0] md:pr-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#4D0202]/60">
            Đánh Giá Tổng Quan
          </span>
          <div className="flex items-baseline justify-center md:justify-start gap-2">
            <span className="font-serif text-5xl font-bold text-[#4D0202]">4.9</span>
            <span className="text-sm font-semibold text-[#4D0202]/70">/ 5.0 sao</span>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-1 text-[#F59E0B]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-[#F59E0B]" />
            ))}
          </div>
          <p className="text-xs text-[#4D0202]/70">Dựa trên 1.250+ khách hàng đã trải nghiệm</p>
        </div>

        <div className="md:col-span-8 space-y-3">
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#4D0202]">
            Phản Hồi & Cảm Nhận Từ Khách Hàng
          </h1>
          <p className="text-xs sm:text-sm text-[#4D0202]/80 leading-relaxed">
            Sự hài lòng và nụ cười rạng rỡ của bạn là động lực lớn nhất để Hạt Nắng Studio không ngừng trau chuốt
            từng vệt sáng, từng góc chụp và chất lượng phục vụ mỗi ngày.
          </p>
        </div>
      </div>

      {/* 2. Form gửi đánh giá cho khách hàng (Spec 3.12: Khách có lịch chụp hoàn thành gửi điểm đánh giá và nhận xét) */}
      <div className="bg-[#FAF1DF] rounded-2xl border border-[#ECDBC0] p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between border-b border-[#ECDBC0] pb-3">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-[#4D0202]" />
            <h3 className="font-serif text-lg font-bold text-[#4D0202]">
              Chia Sẻ Cảm Nhận Của Bạn
            </h3>
          </div>
          <span className="text-[11px] text-[#4D0202]/70">
            Dành cho khách hàng có lịch chụp hoàn thành
          </span>
        </div>

        <form onSubmit={handleSubmitReview} className="space-y-4 text-xs text-[#4D0202]">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold uppercase mb-1">Concept bạn đã chụp *</label>
              <select
                value={conceptTitle}
                onChange={(e) => setConceptTitle(e.target.value)}
                className="w-full p-2.5 bg-white border border-[#ECDBC0] rounded-xl text-xs"
              >
                {CONCEPTS.map((c) => (
                  <option key={c.id} value={c.title}>
                    {c.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold uppercase mb-1">Mức độ hài lòng *</label>
              <div className="flex items-center gap-2 py-1">
                {[1, 2, 3, 4, 5].map((starVal) => (
                  <button
                    key={starVal}
                    type="button"
                    onClick={() => setRating(starVal)}
                    className="p-1 hover:scale-110 transition-transform"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        starVal <= rating
                          ? 'fill-[#F59E0B] text-[#F59E0B]'
                          : 'text-zinc-300'
                      }`}
                    />
                  </button>
                ))}
                <span className="text-xs font-bold text-[#4D0202] ml-2">
                  {rating === 5 ? 'Tuyệt vời (5/5 sao)' : `${rating} sao`}
                </span>
              </div>
            </div>
          </div>

          <div>
            <label className="block font-bold uppercase mb-1">
              Nhận xét về ekip, makeup, ánh sáng hoặc thành phẩm ảnh *
            </label>
            <textarea
              rows={3}
              required
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Chia sẻ trải nghiệm thực tế của bạn tại Hạt Nắng Studio..."
              className="w-full p-3 bg-white border border-[#ECDBC0] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#4D0202]"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#4D0202] hover:bg-[#380101] text-[#FFF3DD] text-xs font-bold uppercase rounded-xl transition-colors shadow-sm flex items-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Gửi Đánh Giá</span>
            </button>
          </div>
        </form>
      </div>

      {/* 3. Filter by Concept */}
      <div className="flex items-center justify-between border-b border-[#ECDBC0] pb-3 text-xs text-[#4D0202]">
        <span className="font-semibold">
          Hiển thị <strong>{filteredReviews.length}</strong> đánh giá
        </span>
        <div className="flex items-center gap-2">
          <span>Lọc theo concept:</span>
          <select
            value={selectedConceptFilter}
            onChange={(e) => setSelectedConceptFilter(e.target.value)}
            className="p-1.5 bg-white border border-[#ECDBC0] rounded-lg text-xs"
          >
            <option value="Tất cả">Tất cả concept</option>
            <option value="Nàng Thơ">Nàng Thơ Vườn Cổ Điển</option>
            <option value="Chân Dung">Chân Dung Ánh Dương</option>
            <option value="Sinh Nhật">Sinh Nhật Ngọt Ngào</option>
            <option value="Thời Trang">Lookbook Thời Trang</option>
          </select>
        </div>
      </div>

      {/* 4. Reviews List */}
      <div className="space-y-6">
        {filteredReviews.map((rev) => (
          <div
            key={rev.id}
            className="bg-[#FFF9EE] rounded-2xl border border-[#ECDBC0] p-6 shadow-sm space-y-4 text-xs text-[#4D0202]"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#4D0202] text-[#FFF3DD] font-serif font-bold text-sm flex items-center justify-center">
                  {rev.authorName.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#4D0202] flex items-center gap-1.5">
                    <span>{rev.authorName}</span>
                    {rev.verifiedBooking && (
                      <span className="text-[10px] text-emerald-800 font-normal bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                        ✓ Khách hàng đã chụp
                      </span>
                    )}
                  </h4>
                  <p className="text-[11px] text-[#4D0202]/60">
                    {rev.conceptTitle} · {rev.packageName} · Ngày {rev.date}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-0.5 text-[#F59E0B]">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#F59E0B]" />
                  ))}
                </div>
                <button
                  onClick={() => handleReport(rev.id)}
                  className="text-zinc-400 hover:text-zinc-600 p-1"
                  title="Báo cáo đánh giá không phù hợp"
                >
                  <Flag className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <p className="leading-relaxed text-[#4D0202]/90 text-sm">
              &ldquo;{rev.comment}&rdquo;
            </p>

            {/* Photos attached */}
            {rev.photos.length > 0 && (
              <div className="flex items-center gap-2 pt-1">
                {rev.photos.map((p, idx) => (
                  <img
                    key={idx}
                    src={p}
                    alt={`Feedback photo ${idx + 1}`}
                    className="w-16 h-16 rounded-lg object-cover border border-[#ECDBC0]"
                  />
                ))}
              </div>
            )}

            {/* Studio Reply */}
            {rev.studioReply && (
              <div className="p-3.5 bg-[#FAF1DF] rounded-xl text-xs text-[#4D0202] border-l-2 border-[#4D0202] space-y-1">
                <span className="font-bold block">Phản hồi từ Hạt Nắng Studio:</span>
                <p className="italic text-[#4D0202]/85">{rev.studioReply}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

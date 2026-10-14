export type PageType =
  | 'home'
  | 'about'
  | 'concepts'
  | 'concept-detail'
  | 'pricing'
  | 'booking'
  | 'payment'
  | 'account'
  | 'promotions'
  | 'gallery'
  | 'reviews'
  | 'contact'
  | 'policies';

export type ConceptCategory =
  | 'Tất cả'
  | 'Chân dung cá nhân'
  | 'Nàng thơ'
  | 'Thời trang'
  | 'Sinh nhật'
  | 'Tốt nghiệp'
  | 'Theo mùa/Lễ hội'
  | 'Xu hướng Gen Z';

export type ConceptStatus = 'active' | 'new' | 'featured' | 'discontinued';

export interface Concept {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: ConceptCategory;
  description: string;
  fullStory: string;
  style: string;
  colorPalette: { name: string; hex: string }[];
  backdrop: string;
  outfits: string[];
  makeupGuide: string;
  accessories: string[];
  startingPrice: number;
  duration: string;
  editedPhotosCount: number;
  rawPhotosCount: number;
  returnDays: number;
  status: ConceptStatus;
  coverImage: string;
  galleryImages: string[];
  recommendedPackages: string[];
  tags: string[];
  surchargesAndNotes: string[];
}

export interface PricingPackage {
  id: string;
  name: string;
  tagline: string;
  price: number;
  duration: string;
  rawPhotos: string;
  editedPhotos: number;
  returnDays: number;
  makeupIncluded: string;
  outfitCount: number;
  printGifts: string;
  description: string;
  features: string[];
  bestFor: string;
  isPopular?: boolean;
}

export interface AddOnService {
  id: string;
  name: string;
  price: number;
  unit: string;
  description: string;
}

export interface Promotion {
  code: string;
  title: string;
  discountPercent?: number;
  discountAmount?: number;
  minSpend?: number;
  validUntil: string;
  applicableConcepts: string;
  description: string;
  conditions: string[];
  isFeatured?: boolean;
}

export type BookingStatus =
  | 'pending' // Đang chờ xác nhận (bắt buộc theo file đặc tả)
  | 'confirmed' // Đã xác nhận lịch
  | 'photo_session' // Đã chụp / Đang chụp
  | 'editing' // Đang xử lý & chỉnh sửa ảnh
  | 'completed' // Đã hoàn thành bàn giao
  | 'cancelled'; // Đã hủy

export type PaymentStatus = 'unpaid' | 'deposit_paid' | 'fully_paid';

export interface BookingRequest {
  id: string; // Mã đặt lịch, ví dụ: HN-202610-8492
  customerName: string;
  phone: string;
  email: string;
  conceptId: string;
  conceptTitle: string;
  packageId: string;
  packageName: string;
  bookingType: 'online_slot' | 'consultation_request';
  date: string;
  timeSlot: string;
  notes?: string;
  referenceImageName?: string;
  addOnIds: string[];
  totalPrice: number;
  depositAmount: number;
  promoCode?: string;
  discountAmount: number;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  paymentMethod?: 'vietqr' | 'atm' | 'studio';
  createdAt: string;
  deliveryGalleryUrl?: string;
  cancellationReason?: string;
}

export interface Review {
  id: string;
  authorName: string;
  avatarUrl?: string;
  rating: number; // 1 to 5
  date: string;
  conceptTitle: string;
  packageName: string;
  comment: string;
  photos: string[];
  studioReply?: string;
  verifiedBooking?: boolean;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: string;
  conceptId: string;
  conceptTitle: string;
  imageUrl: string;
  aspectRatio?: 'square' | 'portrait' | 'landscape';
  photographer: string;
  stylist: string;
  description: string;
}

export interface UserAccount {
  id: string;
  name: string;
  phone: string;
  email: string;
  avatarUrl?: string;
  wishlistConceptIds: string[];
}

export interface TimeSlot {
  id: string;
  time: string;
  period: 'Sáng' | 'Chiều' | 'Tối';
  isAvailable: boolean;
}

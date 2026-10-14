import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  PageType,
  Concept,
  PricingPackage,
  BookingRequest,
  UserAccount,
} from '../types';
import { CONCEPTS, PRICING_PACKAGES } from '../data/studioData';

interface ToastState {
  message: string;
  type: 'success' | 'info' | 'error';
}

interface LightboxState {
  isOpen: boolean;
  images: string[];
  currentIndex: number;
  title: string;
  subtitle?: string;
  actionText?: string;
  onActionClick?: () => void;
}

interface StudioContextType {
  currentPage: PageType;
  navigateTo: (page: PageType, options?: { conceptId?: string; packageId?: string; promoCode?: string; bookingId?: string }) => void;
  selectedConcept: Concept | null;
  setSelectedConcept: (c: Concept | null) => void;
  selectedPackage: PricingPackage | null;
  setSelectedPackage: (p: PricingPackage | null) => void;
  prefilledCoupon: string;
  setPrefilledCoupon: (code: string) => void;
  user: UserAccount | null;
  loginUser: (data: { name: string; phone: string; email: string }) => void;
  logoutUser: () => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authModalMode: 'login' | 'register' | 'forgot';
  setAuthModalMode: (mode: 'login' | 'register' | 'forgot') => void;
  wishlist: string[];
  toggleWishlist: (conceptId: string) => void;
  bookings: BookingRequest[];
  createBooking: (request: Omit<BookingRequest, 'id' | 'createdAt' | 'status' | 'paymentStatus'>) => BookingRequest;
  updateBookingPayment: (bookingId: string, method: 'vietqr' | 'atm' | 'studio') => void;
  requestCancelBooking: (bookingId: string, reason: string) => void;
  activeBookingForPayment: BookingRequest | null;
  setActiveBookingForPayment: (b: BookingRequest | null) => void;
  lightbox: LightboxState;
  openLightbox: (images: string[], index?: number, title?: string, subtitle?: string, actionText?: string, onAction?: () => void) => void;
  closeLightbox: () => void;
  navigateLightbox: (newIndex: number) => void;
  toast: ToastState | null;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
}

const StudioContext = createContext<StudioContextType | undefined>(undefined);

const DEMO_ACCOUNT_EMAIL = 'phuong.nguyen@gmail.com';

const readStoredUser = (): UserAccount | null => {
  const saved = localStorage.getItem('hatnang_user');
  const hasCompletedAuthMigration = localStorage.getItem('hatnang_auth_migrated') === 'true';
  if (!hasCompletedAuthMigration) {
    if (saved) {
      try {
        const previousUser = JSON.parse(saved) as UserAccount;
        if (previousUser.id === 'usr-1' || previousUser.email?.toLowerCase() === DEMO_ACCOUNT_EMAIL) {
          localStorage.removeItem('hatnang_wishlist');
        }
      } catch {
        localStorage.removeItem('hatnang_user');
      }
    }
    localStorage.removeItem('hatnang_user');
    localStorage.setItem('hatnang_auth_migrated', 'true');
    return null;
  }

  if (!saved) return null;

  try {
    const storedUser = JSON.parse(saved) as UserAccount;
    if (storedUser.id === 'usr-1' || storedUser.email?.toLowerCase() === DEMO_ACCOUNT_EMAIL) {
      localStorage.removeItem('hatnang_user');
      localStorage.removeItem('hatnang_wishlist');
      return null;
    }
    return storedUser;
  } catch {
    localStorage.removeItem('hatnang_user');
    return null;
  }
};

export const StudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [selectedConcept, setSelectedConcept] = useState<Concept | null>(CONCEPTS[0]);
  const [selectedPackage, setSelectedPackage] = useState<PricingPackage | null>(PRICING_PACKAGES[1]);
  const [prefilledCoupon, setPrefilledCoupon] = useState<string>('');

  // User state
  const [user, setUser] = useState<UserAccount | null>(readStoredUser);

  // Wishlist state
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('hatnang_wishlist');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [];
  });

  // Bookings list state
  const [bookings, setBookings] = useState<BookingRequest[]>(() => {
    const saved = localStorage.getItem('hatnang_bookings');
    if (saved) {
      try {
        const storedBookings = JSON.parse(saved) as BookingRequest[];
        return storedBookings.filter((booking) => booking.email.toLowerCase() !== DEMO_ACCOUNT_EMAIL);
      } catch {
        return [];
      }
    }
    return [];
  });

  const [activeBookingForPayment, setActiveBookingForPayment] = useState<BookingRequest | null>(
    null
  );

  // Auth modal state
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register' | 'forgot'>('login');

  // Lightbox modal state
  const [lightbox, setLightbox] = useState<LightboxState>({
    isOpen: false,
    images: [],
    currentIndex: 0,
    title: '',
  });

  // Toast notifications state
  const [toast, setToast] = useState<ToastState | null>(null);

  // Persistence effects
  useEffect(() => {
    if (user) {
      localStorage.setItem('hatnang_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('hatnang_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('hatnang_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('hatnang_bookings', JSON.stringify(bookings));
  }, [bookings]);

  // Toast timer
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      setToast(null);
    }, 3500);
    return () => clearTimeout(timer);
  }, [toast]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type });
  };

  const navigateTo = (
    page: PageType,
    options?: { conceptId?: string; packageId?: string; promoCode?: string; bookingId?: string }
  ) => {
    if (options?.conceptId) {
      const found = CONCEPTS.find((c) => c.id === options.conceptId);
      if (found) setSelectedConcept(found);
    }
    if (options?.packageId) {
      const found = PRICING_PACKAGES.find((p) => p.id === options.packageId);
      if (found) setSelectedPackage(found);
    }
    if (options?.promoCode) {
      setPrefilledCoupon(options.promoCode);
    }
    if (options?.bookingId) {
      const found = bookings.find((b) => b.id === options.bookingId);
      if (found) setActiveBookingForPayment(found);
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const loginUser = (data: { name: string; phone: string; email: string }) => {
    const logged: UserAccount = {
      id: `usr-${Date.now()}`,
      name: data.name,
      phone: data.phone,
      email: data.email,
      wishlistConceptIds: wishlist,
    };
    setUser(logged);
    showToast(`Chào mừng ${data.name} đến với Hạt Nắng Studio!`, 'success');
  };

  const logoutUser = () => {
    setUser(null);
    showToast('Đã đăng xuất tài khoản.', 'info');
  };

  const toggleWishlist = (conceptId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(conceptId);
      const next = exists ? prev.filter((id) => id !== conceptId) : [...prev, conceptId];
      showToast(
        exists ? 'Đã xóa concept khỏi danh sách yêu thích' : 'Đã thêm concept vào danh sách yêu thích ♥',
        'info'
      );
      return next;
    });
  };

  const createBooking = (
    request: Omit<BookingRequest, 'id' | 'createdAt' | 'status' | 'paymentStatus'>
  ): BookingRequest => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newId = `HN-202610-${randomSuffix}`;

    const newBooking: BookingRequest = {
      ...request,
      id: newId,
      status: 'pending', // Luôn khởi tạo ở trạng thái "Đang chờ xác nhận"
      paymentStatus: 'unpaid',
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
    };

    setBookings((prev) => [newBooking, ...prev]);
    setActiveBookingForPayment(newBooking);
    showToast(`Đã tiếp nhận yêu cầu đặt lịch ${newId}! Trạng thái: Đang chờ xác nhận`, 'success');
    return newBooking;
  };

  const updateBookingPayment = (bookingId: string, method: 'vietqr' | 'atm' | 'studio') => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId
          ? {
              ...b,
              paymentStatus: 'deposit_paid',
              paymentMethod: method,
            }
          : b
      )
    );
    showToast('Đã ghi nhận giao dịch đặt cọc! Cảm ơn bạn.', 'success');
  };

  const requestCancelBooking = (bookingId: string, reason: string) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId
          ? {
              ...b,
              status: 'cancelled',
              cancellationReason: reason,
            }
          : b
      )
    );
    showToast(`Đã gửi yêu cầu hủy lịch ${bookingId}. Studio sẽ bảo lưu cọc theo chính sách.`, 'info');
  };

  const openLightbox = (
    images: string[],
    index = 0,
    title = 'Bộ sưu tập Hạt Nắng',
    subtitle?: string,
    actionText?: string,
    onAction?: () => void
  ) => {
    setLightbox({
      isOpen: true,
      images,
      currentIndex: index,
      title,
      subtitle,
      actionText,
      onActionClick: onAction,
    });
  };

  const closeLightbox = () => {
    setLightbox((prev) => ({ ...prev, isOpen: false }));
  };

  const navigateLightbox = (newIndex: number) => {
    setLightbox((prev) => ({ ...prev, currentIndex: newIndex }));
  };

  return (
    <StudioContext.Provider
      value={{
        currentPage,
        navigateTo,
        selectedConcept,
        setSelectedConcept,
        selectedPackage,
        setSelectedPackage,
        prefilledCoupon,
        setPrefilledCoupon,
        user,
        loginUser,
        logoutUser,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalMode,
        setAuthModalMode,
        wishlist,
        toggleWishlist,
        bookings,
        createBooking,
        updateBookingPayment,
        requestCancelBooking,
        activeBookingForPayment,
        setActiveBookingForPayment,
        lightbox,
        openLightbox,
        closeLightbox,
        navigateLightbox,
        toast,
        showToast,
      }}
    >
      {children}
    </StudioContext.Provider>
  );
};

export const useStudio = () => {
  const context = useContext(StudioContext);
  if (!context) {
    throw new Error('useStudio must be used within a StudioProvider');
  }
  return context;
};

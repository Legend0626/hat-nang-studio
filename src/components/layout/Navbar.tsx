import React, { useState } from 'react';
import { useStudio } from '../../context/StudioContext';
import { StudioLogo } from '../common/StudioLogo';
import {
  Calendar,
  User,
  Heart,
  Menu,
  X,
  Sparkles,
  PhoneCall,
  LogOut,
  ChevronDown,
} from 'lucide-react';
import { PageType } from '../../types';

export const Navbar: React.FC = () => {
  const {
    currentPage,
    navigateTo,
    user,
    setIsAuthModalOpen,
    setAuthModalMode,
    logoutUser,
    wishlist,
    bookings,
  } = useStudio();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navLinks: { label: string; page: PageType }[] = [
    { label: 'Trang chủ', page: 'home' },
    { label: 'Giới thiệu', page: 'about' },
    { label: 'Concept', page: 'concepts' },
    { label: 'Bảng giá', page: 'pricing' },
    { label: 'Thư viện ảnh', page: 'gallery' },
    { label: 'Ưu đãi', page: 'promotions' },
    { label: 'Đánh giá', page: 'reviews' },
    { label: 'Liên hệ', page: 'contact' },
  ];

  const pendingBookingsCount = bookings.filter((b) => b.status === 'pending').length;

  return (
    <header className="sticky top-0 z-40 bg-[#FFF3DD]/95 backdrop-blur-md border-b border-[#ECDBC0] transition-colors">
      {/* Top Bar Announcement / Notification Ribbon */}
      <div className="bg-[#4D0202] text-[#FFF3DD] text-[11px] py-1.5 px-4 text-center tracking-wider">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="hidden sm:inline font-serif italic">
            Hạt Nắng Studio — Gom nắng, giữ khoảnh khắc thanh xuân
          </span>
          <div className="flex items-center justify-center sm:justify-end gap-4 w-full sm:w-auto font-medium">
            <button
              onClick={() => navigateTo('promotions')}
              className="hover:underline flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3 text-[#F59E0B]" />
              Ưu đãi: Nhập mã <span className="font-bold underline">GOMNANG15</span> giảm 15%
            </button>
            <span className="text-[#ECDBC0]/40">|</span>
            <a href="tel:0908678922" className="flex items-center gap-1 hover:underline">
              <PhoneCall className="w-3 h-3" /> 0908 678 922
            </a>
          </div>
        </div>
      </div>

      {/* Main Top Bar Contract: 3 zones separated by gap-8 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Single element Brand Wordmark / Logo */}
        <button
          onClick={() => navigateTo('home')}
          aria-label="Hạt Nắng Studio - Trang chủ"
          className="flex items-center gap-3 text-left shrink-0 group focus:outline-none"
        >
          <StudioLogo size="sm" markOnly />
          <span className="h-9 w-px bg-[#ECDBC0]" aria-hidden="true" />
          <div className="flex flex-col gap-0.5">
            <span className="font-serif text-base sm:text-lg font-bold tracking-[0.16em] leading-tight text-[#4D0202] group-hover:text-[#6A1414] transition-colors">
              HẠT NẮNG
            </span>
            <span className="text-[10px] font-medium uppercase tracking-[0.28em] leading-tight text-[#6A1414]/80">
              Studio
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden xl:flex items-center gap-6 text-[13px] font-medium text-[#4D0202]/90">
          {navLinks.map((link) => {
            const isActive = currentPage === link.page;
            return (
              <button
                key={link.page}
                onClick={() => navigateTo(link.page)}
                className={`relative py-1 whitespace-nowrap shrink-0 transition-colors ${
                  isActive
                    ? 'text-[#4D0202] font-bold'
                    : 'text-[#4D0202]/80 hover:text-[#4D0202]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#4D0202] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Actions & CTA */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Wishlist Button */}
          <button
            onClick={() => navigateTo('account')}
            className="relative p-2 text-[#4D0202] hover:bg-[#ECDBC0]/50 rounded-full transition-colors"
            title="Concept yêu thích"
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#4D0202] text-[#FFF3DD] text-[10px] font-bold rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* User Account / Auth Dropdown */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#ECDBC0] bg-[#FFF9EE] text-[#4D0202] hover:bg-white transition-colors text-xs font-semibold"
              >
                <div className="w-6 h-6 rounded-full bg-[#4D0202] text-[#FFF3DD] flex items-center justify-center text-[10px] uppercase font-bold">
                  {user.name.charAt(0)}
                </div>
                <span className="hidden md:inline max-w-[110px] truncate">{user.name}</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              {userDropdownOpen && (
                <div
                  onMouseLeave={() => setUserDropdownOpen(false)}
                  className="absolute right-0 mt-2 w-56 bg-[#FFF9EE] rounded-xl border border-[#ECDBC0] shadow-xl py-2 text-xs text-[#4D0202] z-50 animate-fade-in"
                >
                  <div className="px-4 py-2 border-b border-[#ECDBC0]/60">
                    <p className="font-bold text-[#4D0202] truncate">{user.name}</p>
                    <p className="text-[11px] text-[#4D0202]/70 truncate">{user.email}</p>
                  </div>

                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      navigateTo('account');
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-[#ECDBC0]/40 flex items-center justify-between"
                  >
                    <span>Lịch chụp & Hồ sơ cá nhân</span>
                    {pendingBookingsCount > 0 && (
                      <span className="px-1.5 py-0.5 text-[9px] bg-[#4D0202] text-[#FFF3DD] rounded-full">
                        {pendingBookingsCount}
                      </span>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      navigateTo('account');
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-[#ECDBC0]/40 flex items-center justify-between"
                  >
                    <span>Concept yêu thích</span>
                    <span className="text-[#4D0202]/70">({wishlist.length})</span>
                  </button>

                  <div className="my-1 border-t border-[#ECDBC0]/60" />

                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      logoutUser();
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-red-50 text-red-800 flex items-center gap-2"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Đăng xuất</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => {
                setAuthModalMode('login');
                setIsAuthModalOpen(true);
              }}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#4D0202] hover:bg-[#ECDBC0]/50 rounded-lg transition-colors"
            >
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Đăng nhập</span>
            </button>
          )}

          {/* Primary Action Button: "Đặt lịch ngay" */}
          <button
            onClick={() => navigateTo('booking')}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#4D0202] hover:bg-[#380101] text-[#FFF3DD] rounded-lg text-xs font-bold uppercase tracking-wider transition-colors shadow-sm whitespace-nowrap shrink-0"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Đặt lịch ngay</span>
          </button>

          {/* Mobile Menu Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 text-[#4D0202] hover:bg-[#ECDBC0]/50 rounded-lg"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#FFF9EE] border-b border-[#ECDBC0] px-6 py-5 space-y-3 animate-fade-in">
          <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-[#4D0202]">
            {navLinks.map((link) => (
              <button
                key={link.page}
                onClick={() => {
                  navigateTo(link.page);
                  setMobileMenuOpen(false);
                }}
                className={`text-left p-2.5 rounded-lg transition-colors ${
                  currentPage === link.page
                    ? 'bg-[#4D0202] text-[#FFF3DD]'
                    : 'hover:bg-[#ECDBC0]/40'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-[#ECDBC0] flex items-center justify-between text-xs">
            <button
              onClick={() => {
                navigateTo('policies');
                setMobileMenuOpen(false);
              }}
              className="text-[#4D0202]/70 hover:underline"
            >
              Chính sách & Điều khoản
            </button>
            <button
              onClick={() => {
                navigateTo('account');
                setMobileMenuOpen(false);
              }}
              className="font-bold text-[#4D0202] hover:underline"
            >
              Tài khoản của tôi →
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

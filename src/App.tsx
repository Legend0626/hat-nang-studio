/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { StudioProvider, useStudio } from './context/StudioContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './components/pages/HomePage';
import { AboutPage } from './components/pages/AboutPage';
import { ConceptsPage } from './components/pages/ConceptsPage';
import { ConceptDetailPage } from './components/pages/ConceptDetailPage';
import { PricingPage } from './components/pages/PricingPage';
import { BookingPage } from './components/pages/BookingPage';
import { PaymentPage } from './components/pages/PaymentPage';
import { AccountPage } from './components/pages/AccountPage';
import { PromotionsPage } from './components/pages/PromotionsPage';
import { GalleryPage } from './components/pages/GalleryPage';
import { ReviewsPage } from './components/pages/ReviewsPage';
import { ContactPage } from './components/pages/ContactPage';
import { PoliciesPage } from './components/pages/PoliciesPage';
import { LightboxModal } from './components/common/LightboxModal';
import { AuthModal } from './components/common/AuthModal';
import { CheckCircle2, AlertCircle, Info, Calendar, PhoneCall, ArrowUp } from 'lucide-react';
import { STUDIO_INFO } from './data/studioData';

const MainAppContent: React.FC = () => {
  const {
    currentPage,
    lightbox,
    closeLightbox,
    navigateLightbox,
    isAuthModalOpen,
    setIsAuthModalOpen,
    authModalMode,
    loginUser,
    toast,
    navigateTo,
  } = useStudio();

  // Scroll to top button handler
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Page renderer
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'about':
        return <AboutPage />;
      case 'concepts':
        return <ConceptsPage />;
      case 'concept-detail':
        return <ConceptDetailPage />;
      case 'pricing':
        return <PricingPage />;
      case 'booking':
        return <BookingPage />;
      case 'payment':
        return <PaymentPage />;
      case 'account':
        return <AccountPage />;
      case 'promotions':
        return <PromotionsPage />;
      case 'gallery':
        return <GalleryPage />;
      case 'reviews':
        return <ReviewsPage />;
      case 'contact':
        return <ContactPage />;
      case 'policies':
        return <PoliciesPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF3DD] text-[#341111] antialiased selection:bg-[#4D0202] selection:text-[#FFF3DD]">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Page Area */}
      <main className="flex-1">
        {renderCurrentPage()}
      </main>

      {/* Footer */}
      <Footer />

      {/* Toast Notification Container */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 p-4 bg-[#FFF9EE] border-2 border-[#4D0202] rounded-2xl shadow-2xl text-xs text-[#4D0202] max-w-sm animate-fade-in">
          {toast.type === 'success' && (
            <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
          )}
          {toast.type === 'error' && (
            <AlertCircle className="w-5 h-5 text-red-700 shrink-0" />
          )}
          {toast.type === 'info' && (
            <Info className="w-5 h-5 text-[#D97706] shrink-0" />
          )}
          <span className="font-medium leading-relaxed">{toast.message}</span>
        </div>
      )}

      {/* Lightbox Modal */}
      <LightboxModal
        isOpen={lightbox.isOpen}
        onClose={closeLightbox}
        images={lightbox.images}
        currentIndex={lightbox.currentIndex}
        onNavigate={navigateLightbox}
        title={lightbox.title}
        subtitle={lightbox.subtitle}
        actionText={lightbox.actionText}
        onActionClick={lightbox.onActionClick}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authModalMode}
        onLoginSuccess={loginUser}
      />

      {/* Floating Quick Action Widget for Mobile / Fast Booking */}
      <div className="fixed bottom-5 left-5 z-30 flex items-center gap-2">
        <a
          href={`tel:${STUDIO_INFO.hotline}`}
          className="p-3 bg-[#FFF9EE] hover:bg-white text-[#4D0202] rounded-full border-2 border-[#ECDBC0] shadow-lg flex items-center justify-center transition-transform hover:scale-105"
          title="Gọi Hotline Studio"
        >
          <PhoneCall className="w-4 h-4 text-[#D97706]" />
        </a>
        <button
          onClick={handleScrollToTop}
          className="p-3 bg-[#FFF9EE] hover:bg-white text-[#4D0202] rounded-full border-2 border-[#ECDBC0] shadow-lg flex items-center justify-center transition-transform hover:scale-105"
          title="Lên đầu trang"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <StudioProvider>
      <MainAppContent />
    </StudioProvider>
  );
}

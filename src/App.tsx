import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { RoomsSection } from './components/RoomsSection';
import { BookingEngine } from './components/BookingEngine';
import { RestaurantSection } from './components/RestaurantSection';
import { PoolGardenSection } from './components/PoolGardenSection';
import { AttractionsSection } from './components/AttractionsSection';
import { ReviewsSection } from './components/ReviewsSection';
import { ContactFooter } from './components/ContactFooter';
import { MyReservationsModal } from './components/MyReservationsModal';
import { Language, Currency, Reservation } from './types';
import { Sparkles, CalendarCheck, Phone } from 'lucide-react';
import { translations } from './data/translations';

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>('bg');
  const [currency, setCurrency] = useState<Currency>('EUR');
  const [isMyBookingsOpen, setIsMyBookingsOpen] = useState<boolean>(false);

  // Booking engine sync states
  const [selectedRoomForBooking, setSelectedRoomForBooking] = useState<string>('room-1');
  const [searchCheckIn, setSearchCheckIn] = useState<string>('');
  const [searchCheckOut, setSearchCheckOut] = useState<string>('');
  const [searchAdults, setSearchAdults] = useState<number>(2);
  const [searchChildren, setSearchChildren] = useState<number>(0);
  const [showFloatingBookBtn, setShowFloatingBookBtn] = useState<boolean>(false);

  const t = translations[currentLang];

  // Scroll listener for floating CTA
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowFloatingBookBtn(true);
      } else {
        setShowFloatingBookBtn(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll helper
  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Quick search action from Hero
  const handleHeroSearch = (params: {
    checkIn: string;
    checkOut: string;
    adults: number;
    children: number;
    roomId?: string;
  }) => {
    setSearchCheckIn(params.checkIn);
    setSearchCheckOut(params.checkOut);
    setSearchAdults(params.adults);
    setSearchChildren(params.children);
    if (params.roomId) {
      setSelectedRoomForBooking(params.roomId);
    }
    scrollToSection('reservation');
  };

  // Room card "Book This Room" action
  const handleSelectRoomForBooking = (roomId: string) => {
    setSelectedRoomForBooking(roomId);
    scrollToSection('reservation');
  };

  return (
    <div className="min-h-screen bg-[#070b0d] text-[#e8f0f3] font-sans antialiased selection:bg-[#d4af37] selection:text-black">
      
      {/* Top Navigation Bar with Language Dropdown & Currency Toggle */}
      <Navbar
        currentLang={currentLang}
        onLanguageChange={(lang) => setCurrentLang(lang)}
        currency={currency}
        onCurrencyToggle={() => setCurrency(currency === 'BGN' ? 'EUR' : 'BGN')}
        onCurrencyChange={(curr) => setCurrency(curr)}
        onOpenMyReservations={() => setIsMyBookingsOpen(true)}
        onOpenMyBookings={() => setIsMyBookingsOpen(true)}
        onScrollToBooking={() => scrollToSection('reservation')}
      />

      {/* Main Content Flow */}
      <main>
        {/* 1. Hero Section with Quick Availability Search */}
        <Hero
          currentLang={currentLang}
          currency={currency}
          onSearch={handleHeroSearch}
          onExploreRooms={() => scrollToSection('rooms')}
          onViewMenu={() => scrollToSection('restaurant')}
        />

        {/* 2. About the Boutique Complex in Gabrovo */}
        <AboutSection
          currentLang={currentLang}
          onScrollToBooking={() => scrollToSection('reservation')}
        />

        {/* 3. Rooms & Accommodation Section */}
        <RoomsSection
          currentLang={currentLang}
          currency={currency}
          onSelectRoomForBooking={handleSelectRoomForBooking}
        />

        {/* 4. Real Interactive Reservation Engine */}
        <BookingEngine
          currentLang={currentLang}
          currency={currency}
          preselectedRoomId={selectedRoomForBooking}
          initialCheckIn={searchCheckIn}
          initialCheckOut={searchCheckOut}
          initialAdults={searchAdults}
          initialChildren={searchChildren}
        />

        {/* 5. Tavern & Restaurant with Fireplace & Specialties */}
        <RestaurantSection
          currentLang={currentLang}
          currency={currency}
        />

        {/* 6. Heated Pool, Garden & Panoramic Terrace */}
        <PoolGardenSection
          currentLang={currentLang}
          onScrollToBooking={() => scrollToSection('reservation')}
        />

        {/* 7. Nearby Attractions in Gabrovo, Etar & Shipka */}
        <AttractionsSection
          currentLang={currentLang}
        />

        {/* 8. Verified Guest Reviews & Overall 9.8 Score */}
        <ReviewsSection
          currentLang={currentLang}
        />

        {/* 9. Contact Info, Direct Inquiry & Map */}
        <ContactFooter
          currentLang={currentLang}
          onOpenMyBookings={() => setIsMyBookingsOpen(true)}
        />
      </main>

      {/* "My Bookings" Lookup & Cancellation Modal */}
      <MyReservationsModal
        isOpen={isMyBookingsOpen}
        onClose={() => setIsMyBookingsOpen(false)}
        currentLang={currentLang}
      />

      {/* Floating Fast Booking Pill for Mobile / Scroll */}
      {showFloatingBookBtn && (
        <div className="fixed bottom-6 right-6 z-40 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <button
            type="button"
            onClick={() => scrollToSection('reservation')}
            className="px-5 py-3 rounded-full bg-gradient-to-r from-[#d4af37] to-[#b38827] text-black font-bold text-xs sm:text-sm shadow-2xl shadow-[#d4af37]/30 hover:scale-105 transition-all flex items-center gap-2 border border-[#f5d77f]/40"
          >
            <CalendarCheck className="w-4 h-4 text-black" />
            <span>{t.bookNow}</span>
          </button>
        </div>
      )}

    </div>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, 
  X, 
  ChevronDown, 
  CalendarCheck, 
  Sparkles,
  Phone,
  BookmarkCheck,
  Flame,
  Home,
  Info,
  BedDouble,
  UtensilsCrossed,
  Waves,
  Compass,
  Star,
  MapPin,
  Clock,
  Check,
  Coins
} from 'lucide-react';
import { Language, Currency } from '../types';
import { LANGUAGES, translations } from '../data/translations';
import { EdelweissLogo } from './EdelweissLogo';

interface NavbarProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  currency: Currency;
  onCurrencyToggle?: () => void;
  onCurrencyChange?: (curr: Currency) => void;
  onOpenMyReservations?: () => void;
  onOpenMyBookings?: () => void;
  onScrollToBooking?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onLanguageChange,
  currency,
  onCurrencyToggle,
  onCurrencyChange,
  onOpenMyReservations,
  onOpenMyBookings,
  onScrollToBooking
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuDrawerOpen, setMenuDrawerOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);
  
  const t = translations[currentLang];
  const currentLangObj = LANGUAGES.find(l => l.code === currentLang) || LANGUAGES[0];

  const handleOpenReservations = () => {
    if (onOpenMyReservations) {
      onOpenMyReservations();
    } else if (onOpenMyBookings) {
      onOpenMyBookings();
    }
  };

  const handleScrollToBooking = () => {
    if (onScrollToBooking) {
      onScrollToBooking();
    } else {
      const element = document.getElementById('reservation');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleToggleCurrency = () => {
    if (onCurrencyToggle) {
      onCurrencyToggle();
    } else if (onCurrencyChange) {
      onCurrencyChange(currency === 'BGN' ? 'EUR' : 'BGN');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close language dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Prevent background scroll when mobile/desktop drawer is open
  useEffect(() => {
    if (menuDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuDrawerOpen]);

  const navMenuItems = [
    { 
      id: 'nav-home',
      name: t.navHome || 'Начало', 
      desc: currentLang === 'bg' ? 'Главно табло' : 'Main overview',
      href: '#home',
      icon: Home
    },
    { 
      id: 'nav-about',
      name: t.navAbout || 'За нас', 
      desc: currentLang === 'bg' ? 'История & Алпийски дух' : 'Our story & philosophy',
      href: '#about',
      icon: Info
    },
    { 
      id: 'nav-rooms',
      name: t.navRooms || 'Стаи & Апартаменти', 
      desc: currentLang === 'bg' ? 'Бутиково настаняване' : 'Boutique accommodation',
      href: '#rooms',
      icon: BedDouble
    },
    { 
      id: 'nav-restaurant',
      name: currentLang === 'bg' ? 'Ресторант & Храна' : t.navRestaurant, 
      desc: currentLang === 'bg' ? 'Балканска кухня & камина' : 'Traditional tavern & fireplace',
      href: '#restaurant',
      icon: UtensilsCrossed
    },
    { 
      id: 'nav-pool',
      name: t.navPool || 'Басейн & Градина', 
      desc: currentLang === 'bg' ? 'Отопляем басейн 28°C' : 'Heated outdoor pool',
      href: '#pool',
      icon: Waves
    },
    { 
      id: 'nav-attractions',
      name: t.navAttractions || 'Забележителности', 
      desc: currentLang === 'bg' ? 'Етъра, Шипка & Боженци' : 'Etar, Shipka & sights',
      href: '#attractions',
      icon: Compass
    },
    { 
      id: 'nav-reviews',
      name: t.navReviews || 'Отзиви', 
      desc: currentLang === 'bg' ? '9.8 в Booking.com' : '9.8 Verified score',
      href: '#reviews',
      icon: Star
    },
    { 
      id: 'nav-contact',
      name: t.navContact || 'Контакти', 
      desc: currentLang === 'bg' ? 'Габрово, България' : 'Location & inquiry',
      href: '#contact',
      icon: MapPin
    },
  ];

  const handleNavClick = (href: string) => {
    setMenuDrawerOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const topOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const menuLabelText = currentLang === 'bg' ? 'Меню' : (currentLang === 'de' ? 'Menü' : (currentLang === 'ru' ? 'Меню' : (currentLang === 'ro' ? 'Meniu' : 'Menu')));
  const currencyLabelText = currentLang === 'bg' ? 'Валута' : (currentLang === 'de' ? 'Währung' : (currentLang === 'ru' ? 'Валюта' : 'Currency'));
  const headerSubtitleText = currentLang === 'bg' ? 'Бутикова къща за гости • Габрово' : t.brandSubtitle;
  const brandNameText = currentLang === 'bg' ? 'Еделвайс' : (t.brandName || 'Edelveiss');

  const langShortCodes: Record<Language, string> = {
    bg: 'БГ',
    en: 'EN',
    de: 'DE',
    ru: 'RU',
    ro: 'RO',
    fr: 'FR',
    it: 'IT',
  };

  return (
    <>
      <header 
        id="main-navbar"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#0a0f12]/95 backdrop-blur-md shadow-2xl py-2.5 sm:py-3 border-b border-[#223136]' 
            : 'bg-gradient-to-b from-[#090d0f]/95 via-[#090d0f]/75 to-transparent py-3.5 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Logo with Circular Edelweiss Emblem */}
            <a 
              id="brand-logo"
              href="#home" 
              onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }}
              className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none"
            >
              <EdelweissLogo size="md" title={brandNameText} subtitle={headerSubtitleText} />
              <div className="flex flex-col text-left">
                <span className="font-serif text-xl sm:text-2xl md:text-3xl font-bold tracking-wider text-[#f5f6f2] group-hover:text-[#d4af37] transition-colors leading-tight">
                  {brandNameText}
                </span>
                <span className="text-[10px] sm:text-[11px] tracking-wider text-[#9cb0b8] font-medium leading-none mt-0.5">
                  {headerSubtitleText}
                </span>
              </div>
            </a>

            {/* Top Bar Streamlined Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              
              {/* Compact Language Selector Dropdown (single short code like БГ / EN) */}
              <div className="relative" ref={langDropdownRef}>
                <button
                  id="language-dropdown-btn"
                  type="button"
                  onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#121c20]/90 hover:bg-[#18262b] border border-[#2b3e46] hover:border-[#d4af37]/50 text-[#e0e8eb] text-xs font-bold transition-all shadow-sm focus:outline-none"
                  aria-expanded={langDropdownOpen}
                  aria-label="Change language"
                >
                  <span className="font-bold text-xs text-[#f5d77f] tracking-wide">
                    {langShortCodes[currentLang] || currentLang.toUpperCase()}
                  </span>
                  <ChevronDown className={`w-3 h-3 text-[#9ab0b8] transition-transform duration-200 ${langDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {langDropdownOpen && (
                  <div 
                    id="language-dropdown-menu"
                    className="absolute right-0 mt-2 w-44 rounded-2xl bg-[#0d1518] border border-[#2c3f47] shadow-2xl py-2 z-50 backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-150"
                  >
                    <div className="px-3 py-1.5 text-[10px] font-bold text-[#8fa7b0] uppercase tracking-wider border-b border-[#1b272c] mb-1">
                      {currentLang === 'bg' ? 'Избор на език' : 'Select Language'}
                    </div>
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        id={`lang-select-${lang.code}`}
                        type="button"
                        onClick={() => {
                          onLanguageChange(lang.code);
                          setLangDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 text-xs sm:text-sm transition-colors text-left ${
                          currentLang === lang.code 
                            ? 'bg-[#d4af37]/20 text-[#f5d77f] font-bold' 
                            : 'text-[#c6d4d9] hover:bg-[#172328] hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-sm leading-none">{lang.flag}</span>
                          <span>{lang.nativeName}</span>
                        </div>
                        {currentLang === lang.code && <Check className="w-3.5 h-3.5 text-[#d4af37]" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Primary Book Now CTA Button (Hidden on Mobile Phones, Visible on Tablet/Desktop) */}
              <button
                id="nav-book-now-btn"
                type="button"
                onClick={handleScrollToBooking}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b38827] hover:from-[#e5c14f] hover:to-[#c49a35] text-[#0a0f11] font-bold text-xs sm:text-sm shadow-md shadow-[#d4af37]/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <CalendarCheck className="w-4 h-4 shrink-0" />
                <span>{t.bookNow}</span>
              </button>

              {/* Streamlined Dropdown Hamburger Menu Button */}
              <button
                id="main-menu-hamburger-btn"
                type="button"
                onClick={() => setMenuDrawerOpen(true)}
                className="flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-[#142025] hover:bg-[#1b2b32] border border-[#2e424b] hover:border-[#d4af37]/60 text-[#f2f6f7] transition-all shadow-sm focus:outline-none"
                aria-label="Open Navigation Menu"
              >
                <Menu className="w-4 h-4 sm:w-5 sm:h-5 text-[#d4af37]" />
                <span className="text-xs sm:text-sm font-semibold tracking-wide">
                  {menuLabelText}
                </span>
              </button>

            </div>
          </div>
        </div>
      </header>

      {/* Full-Featured Dropdown / Slide-out Drawer Hamburger Menu */}
      {menuDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          
          {/* Backdrop Blur Overlay */}
          <div 
            id="menu-backdrop-overlay"
            onClick={() => setMenuDrawerOpen(false)}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in"
          />

          {/* Drawer Menu Container */}
          <aside 
            id="hamburger-dropdown-panel"
            className="relative w-full max-w-md h-full bg-[#0b1215] border-l border-[#24353d] shadow-2xl z-10 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300"
          >
            {/* Top Header of Menu */}
            <div className="p-5 sm:p-6 border-b border-[#1c2a30] flex items-center justify-between bg-[#0e171b]">
              <div className="flex items-center gap-3">
                <EdelweissLogo size="sm" title={brandNameText} subtitle={headerSubtitleText} />
                <div>
                  <div className="font-serif text-lg font-bold text-white leading-none">{brandNameText}</div>
                  <div className="text-[10px] text-[#8fa5ad] uppercase tracking-wider mt-0.5">
                    {headerSubtitleText}
                  </div>
                </div>
              </div>

              {/* Close Button */}
              <button
                id="close-menu-drawer-btn"
                type="button"
                onClick={() => setMenuDrawerOpen(false)}
                className="w-9 h-9 rounded-full bg-[#152126] hover:bg-[#1f3139] border border-[#2b3f47] text-[#c4d4da] hover:text-white flex items-center justify-center transition-colors focus:outline-none"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Navigation Links List */}
            <div className="p-5 sm:p-6 space-y-1.5 flex-1">
              
              <div className="text-[11px] font-bold text-[#8fa7b0] uppercase tracking-wider mb-2 px-2">
                {currentLang === 'bg' ? 'Раздели & Навигация' : 'Navigation'}
              </div>

              {navMenuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    id={item.id}
                    type="button"
                    onClick={() => handleNavClick(item.href)}
                    className="w-full flex items-center justify-between p-3 rounded-2xl bg-[#10191d] hover:bg-[#162329] border border-transparent hover:border-[#d4af37]/30 text-left transition-all group"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-9 h-9 rounded-xl bg-[#162328] group-hover:bg-[#d4af37]/20 border border-[#26373f] group-hover:border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-[#f0f5f7] group-hover:text-[#d4af37] transition-colors">
                          {item.name}
                        </div>
                        <div className="text-[11px] text-[#7d939c]">
                          {item.desc}
                        </div>
                      </div>
                    </div>
                    <ChevronDown className="w-4 h-4 text-[#4e646d] -rotate-90 group-hover:text-[#d4af37] transition-transform group-hover:translate-x-0.5" />
                  </button>
                );
              })}

              {/* Utility Section inside Hamburger Menu: My Reservations & Currency */}
              <div className="pt-5 mt-4 border-t border-[#1c2a30] space-y-3">
                <div className="text-[11px] font-bold text-[#8fa7b0] uppercase tracking-wider px-2">
                  {currentLang === 'bg' ? 'Управление & Настройки' : 'Preferences & Status'}
                </div>

                {/* My Reservations Button */}
                <button
                  id="drawer-my-bookings-btn"
                  type="button"
                  onClick={() => {
                    setMenuDrawerOpen(false);
                    handleOpenReservations();
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-2xl bg-gradient-to-r from-[#142228] to-[#111c20] border border-[#2b3f47] hover:border-[#d4af37] text-left transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#d4af37]/15 border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37]">
                      <BookmarkCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">{t.myReservations}</div>
                      <div className="text-[11px] text-[#9cb0b8]">
                        {currentLang === 'bg' ? 'Проверка с номер или имейл' : 'Check status or cancel'}
                      </div>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-[#d4af37]/20 text-[#f5d77f] font-bold text-[10px]">
                    {currentLang === 'bg' ? 'Провери' : 'View'}
                  </span>
                </button>

                {/* Currency Selector Pill Group */}
                <div className="p-3 rounded-2xl bg-[#10191d] border border-[#24353d] flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Coins className="w-4 h-4 text-[#d4af37]" />
                    <span className="text-xs font-semibold text-[#c7d7dc]">{currencyLabelText}</span>
                  </div>
                  <div className="flex items-center gap-1 bg-[#091013] p-1 rounded-xl border border-[#223136]">
                    <button
                      type="button"
                      onClick={currency === 'EUR' ? undefined : handleToggleCurrency}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        currency === 'EUR'
                          ? 'bg-[#d4af37] text-[#090f11] shadow-sm'
                          : 'text-[#8da2aa] hover:text-white'
                      }`}
                    >
                      EUR (€)
                    </button>
                    <button
                      type="button"
                      onClick={currency === 'BGN' ? undefined : handleToggleCurrency}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        currency === 'BGN'
                          ? 'bg-[#d4af37] text-[#090f11] shadow-sm'
                          : 'text-[#8da2aa] hover:text-white'
                      }`}
                    >
                      BGN (лв)
                    </button>
                  </div>
                </div>

              </div>

            </div>

            {/* Footer of Menu with Direct Phone & Booking Action */}
            <div className="p-5 sm:p-6 border-t border-[#1c2a30] bg-[#0c1417] space-y-3">
              <button
                id="drawer-book-now-btn"
                type="button"
                onClick={() => {
                  setMenuDrawerOpen(false);
                  handleScrollToBooking();
                }}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b38827] hover:from-[#e5c14f] hover:to-[#c49a35] text-[#0a0f11] font-bold text-sm shadow-xl shadow-[#d4af37]/20 flex items-center justify-center gap-2 transition-transform active:scale-[0.98]"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>{t.bookNow}</span>
              </button>

              <div className="flex items-center justify-between text-xs text-[#8fa4ad] pt-1">
                <a 
                  href="tel:+359888882345" 
                  className="flex items-center gap-1.5 text-[#d4af37] hover:underline font-semibold"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>+359 88 888 2345</span>
                </a>
                <span>Габрово 5300</span>
              </div>
            </div>

          </aside>
        </div>
      )}
    </>
  );
};

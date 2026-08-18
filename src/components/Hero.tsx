import React, { useState } from 'react';
import { 
  Sparkles, 
  Calendar, 
  Users, 
  Star, 
  ChevronRight, 
  Compass, 
  Flame, 
  Waves,
  Award
} from 'lucide-react';
import { Language, Currency } from '../types';
import { translations } from '../data/translations';

interface HeroProps {
  currentLang: Language;
  currency: Currency;
  onSearch: (params: { checkIn: string; checkOut: string; adults: number; children: number; roomId?: string }) => void;
  onExploreRooms: () => void;
  onViewMenu: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  currentLang,
  currency,
  onSearch,
  onExploreRooms,
  onViewMenu,
}) => {
  const t = translations[currentLang];

  // Quick bar state defaults
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 2);

  const formatDate = (d: Date) => d.toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState<string>(formatDate(today));
  const [checkOut, setCheckOut] = useState<string>(formatDate(tomorrow));
  const [adults, setAdults] = useState<number>(2);
  const [children, setChildren] = useState<number>(0);
  const [selectedRoomType, setSelectedRoomType] = useState<string>('all');

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      checkIn,
      checkOut,
      adults,
      children,
      roomId: selectedRoomType !== 'all' ? selectedRoomType : undefined
    });
  };

  return (
    <section id="home" className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
      
      {/* Background Image with Dark Vignette & Alpine Gradient */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/src/assets/images/edelveiss_hero_1787050830631.jpg" 
          alt="Edelveiss Mountain Guest House in Gabrovo" 
          className="w-full h-full object-cover object-center scale-105 transform duration-1000 ease-out"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090e10] via-[#090e10]/65 to-[#090e10]/75" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#090e10]/40 to-[#090e10]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center text-center">
        
        {/* Rating Badge */}
        <div 
          id="hero-badge"
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#121c20]/90 border border-[#d4af37]/40 shadow-xl backdrop-blur-md mb-6"
        >
          <div className="flex items-center gap-1 text-[#d4af37]">
            <Award className="w-4 h-4 fill-[#d4af37]" />
            <div className="flex text-[#d4af37]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-[#d4af37]" />
              ))}
            </div>
          </div>
          <span className="text-xs sm:text-sm font-semibold tracking-wide text-[#e8f0f2]">
            {t.heroBadge}
          </span>
        </div>

        {/* Title */}
        <h1 
          id="hero-title"
          className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#f4f7f5] max-w-4xl leading-[1.1] mb-6 drop-shadow-md"
        >
          {t.heroTitle}
        </h1>

        {/* Subtitle */}
        <p 
          id="hero-description"
          className="text-base sm:text-lg md:text-xl text-[#c1cfd4] max-w-2xl font-light mb-10 leading-relaxed drop-shadow"
        >
          {t.heroDesc}
        </p>

        {/* Fast Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
          <button
            id="hero-explore-rooms-btn"
            type="button"
            onClick={onExploreRooms}
            className="px-6 py-3 rounded-xl bg-[#142024] hover:bg-[#1c2d33] text-[#e8f1f5] font-semibold text-sm sm:text-base border border-[#2b3e46] hover:border-[#d4af37] shadow-lg transition-all flex items-center gap-2"
          >
            <span>{t.exploreRooms}</span>
            <ChevronRight className="w-4 h-4 text-[#d4af37]" />
          </button>
          <button
            id="hero-view-menu-btn"
            type="button"
            onClick={onViewMenu}
            className="px-6 py-3 rounded-xl bg-[#142024]/80 hover:bg-[#1c2d33] text-[#e8f1f5] font-semibold text-sm sm:text-base border border-[#2b3e46] hover:border-[#d4af37] shadow-lg transition-all flex items-center gap-2"
          >
            <Flame className="w-4 h-4 text-[#e67e22]" />
            <span>{t.viewMenu}</span>
          </button>
        </div>

        {/* Quick Search & Availability Bar */}
        <div 
          id="quick-search-card"
          className="w-full max-w-5xl bg-[#0c1417]/95 border border-[#26373e] rounded-2xl p-4 sm:p-5 shadow-2xl backdrop-blur-xl ring-1 ring-white/5"
        >
          <form onSubmit={handleQuickSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 items-end">
            
            {/* Check-In */}
            <div className="text-left">
              <label className="block text-[11px] font-bold text-[#8fa7b0] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>{t.checkIn}</span>
              </label>
              <input 
                id="quick-check-in-input"
                type="date" 
                value={checkIn}
                min={formatDate(new Date())}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full bg-[#152126] border border-[#2a3c43] rounded-xl px-3 py-2.5 text-xs sm:text-sm text-white focus:ring-2 focus:ring-[#d4af37] focus:border-transparent outline-none font-medium"
                required
              />
            </div>

            {/* Check-Out */}
            <div className="text-left">
              <label className="block text-[11px] font-bold text-[#8fa7b0] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>{t.checkOut}</span>
              </label>
              <input 
                id="quick-check-out-input"
                type="date" 
                value={checkOut}
                min={checkIn || formatDate(new Date())}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full bg-[#152126] border border-[#2a3c43] rounded-xl px-3 py-2.5 text-xs sm:text-sm text-white focus:ring-2 focus:ring-[#d4af37] focus:border-transparent outline-none font-medium"
                required
              />
            </div>

            {/* Guests */}
            <div className="text-left">
              <label className="block text-[11px] font-bold text-[#8fa7b0] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>{t.guests}</span>
              </label>
              <div className="flex items-center gap-2 bg-[#152126] border border-[#2a3c43] rounded-xl px-3 py-2 text-xs sm:text-sm text-white">
                <div className="flex items-center gap-1">
                  <span className="text-[11px] text-[#93a7af]">{t.adults}:</span>
                  <select
                    id="quick-adults-select"
                    value={adults}
                    onChange={(e) => setAdults(Number(e.target.value))}
                    className="bg-transparent text-white font-bold outline-none cursor-pointer"
                  >
                    {[1, 2, 3, 4, 6, 8, 10, 12, 14].map(n => (
                      <option key={n} value={n} className="bg-[#121c20]">{n}</option>
                    ))}
                  </select>
                </div>
                <span className="text-[#3c525a]">|</span>
                <div className="flex items-center gap-1">
                  <span className="text-[11px] text-[#93a7af]">{t.children}:</span>
                  <select
                    id="quick-children-select"
                    value={children}
                    onChange={(e) => setChildren(Number(e.target.value))}
                    className="bg-transparent text-white font-bold outline-none cursor-pointer"
                  >
                    {[0, 1, 2, 3, 4].map(n => (
                      <option key={n} value={n} className="bg-[#121c20]">{n}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Room Type Preference */}
            <div className="text-left">
              <label className="block text-[11px] font-bold text-[#8fa7b0] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>{t.roomsLabel}</span>
              </label>
              <select
                id="quick-room-select"
                value={selectedRoomType}
                onChange={(e) => setSelectedRoomType(e.target.value)}
                className="w-full bg-[#152126] border border-[#2a3c43] rounded-xl px-3 py-2.5 text-xs sm:text-sm text-white focus:ring-2 focus:ring-[#d4af37] outline-none font-medium cursor-pointer"
              >
                <option value="all" className="bg-[#121c20]">{t.allAccommodations}</option>
                <option value="room-1" className="bg-[#121c20]">{t.room1Name}</option>
                <option value="room-2" className="bg-[#121c20]">{t.room2Name}</option>
                <option value="suite-1" className="bg-[#121c20]">{t.suiteName}</option>
                <option value="villa-full" className="bg-[#121c20]">{t.villaName}</option>
              </select>
            </div>

            {/* Submit Button */}
            <div>
              <button
                id="quick-search-submit-btn"
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b38827] hover:from-[#e5c14f] hover:to-[#c49a35] text-[#0a0f11] font-bold text-xs sm:text-sm shadow-xl shadow-[#d4af37]/25 transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Sparkles className="w-4 h-4 text-black" />
                <span>{t.searchAvailability}</span>
              </button>
            </div>

          </form>
        </div>

        {/* Feature Highlights Pills */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 mt-10 w-full max-w-4xl text-left">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#10181b]/70 border border-[#203037] backdrop-blur-md">
            <div className="p-2 rounded-lg bg-[#d4af37]/15 text-[#d4af37]">
              <Waves className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#e6eff2]">{t.poolFeature1}</div>
              <div className="text-[10px] text-[#8ea4ad]">{t.poolLabel}</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#10181b]/70 border border-[#203037] backdrop-blur-md">
            <div className="p-2 rounded-lg bg-[#e67e22]/15 text-[#e67e22]">
              <Flame className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#e6eff2]">{t.restaurantTitle}</div>
              <div className="text-[10px] text-[#8ea4ad]">{t.aboutFeature3Title}</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#10181b]/70 border border-[#203037] backdrop-blur-md">
            <div className="p-2 rounded-lg bg-[#27ae60]/15 text-[#27ae60]">
              <Star className="w-4 h-4 fill-[#27ae60]" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#e6eff2]">{t.cleanliness}</div>
              <div className="text-[10px] text-[#8ea4ad]">Booking.com 9.8</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#10181b]/70 border border-[#203037] backdrop-blur-md">
            <div className="p-2 rounded-lg bg-[#3498db]/15 text-[#3498db]">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#e6eff2]">Габрово • Етъра • Шипка</div>
              <div className="text-[10px] text-[#8ea4ad]">{t.aboutFeature4Title}</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

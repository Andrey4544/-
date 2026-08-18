import React, { useState } from 'react';
import { 
  Flame, 
  UtensilsCrossed, 
  Wine, 
  Sparkles, 
  Clock, 
  Users, 
  Calendar, 
  CheckCircle2, 
  X,
  Award,
  Coffee,
  Heart
} from 'lucide-react';
import { Language, Currency, TableReservation } from '../types';
import { DISHES_DATA } from '../data/dishes';
import { translations } from '../data/translations';

interface RestaurantSectionProps {
  currentLang: Language;
  currency: Currency;
}

export const RestaurantSection: React.FC<RestaurantSectionProps> = ({ currentLang, currency }) => {
  const t = translations[currentLang];
  const [activeCategory, setActiveCategory] = useState<'all' | 'breakfast' | 'salads' | 'mains' | 'specialties' | 'wines'>('specialties');
  const [isTableModalOpen, setIsTableModalOpen] = useState(false);
  const [tableSubmitted, setTableSubmitted] = useState(false);

  // Table form state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState('19:30');
  const [guests, setGuests] = useState(4);
  const [occasion, setOccasion] = useState('Семейна вечеря');
  const [specialRequests, setSpecialRequests] = useState('');

  const filteredDishes = DISHES_DATA.filter((dish) => {
    if (activeCategory === 'all') return true;
    return dish.category === activeCategory;
  });

  const handleTableSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTableSubmitted(true);
    setTimeout(() => {
      // Save table reservation locally
      try {
        const stored = localStorage.getItem('edelveiss_tables');
        const existing: TableReservation[] = stored ? JSON.parse(stored) : [];
        const newTable: TableReservation = {
          id: 'tbl-' + Date.now(),
          name,
          phone,
          email,
          date,
          time,
          guests,
          occasion,
          specialRequests,
          createdAt: new Date().toISOString()
        };
        existing.push(newTable);
        localStorage.setItem('edelveiss_tables', JSON.stringify(existing));
      } catch (err) {}
    }, 400);
  };

  return (
    <section id="restaurant" className="py-20 bg-[#0a0f12] relative overflow-hidden border-t border-[#1a272e]">
      
      {/* Warm Ambient Glow */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-[#e67e22]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#162228] border border-[#2b3d45] text-[#e67e22] text-xs font-bold uppercase tracking-widest mb-3">
            <Flame className="w-3.5 h-3.5" />
            <span>{t.restaurantLabel}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#f2f6f7] mb-4">
            {t.restaurantTitle}
          </h2>
          <p className="text-sm sm:text-base text-[#9db2ba] font-light max-w-2xl mx-auto">
            {t.restaurantSubtitle}
          </p>
        </div>

        {/* Narrative & Visual Feature Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          
          {/* Left: Atmospheric Image */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-[#2c3d44] shadow-2xl group">
              <img 
                src="/images/edelveiss_restaurant_1787050874317.jpg"
                alt="Edelveiss Tavern with Fireplace" 
                className="w-full h-[380px] sm:h-[440px] object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f12] via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#0c1417]/90 border border-[#2d4048] backdrop-blur-md flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-[#e67e22] uppercase tracking-wider">Жив огън & Балканджийски гозби</div>
                  <div className="text-sm font-semibold text-white">Местни еко продукти & Био мед</div>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#e67e22]/20 border border-[#e67e22]/40 text-[#f39c12] text-xs font-bold">
                  <Flame className="w-3.5 h-3.5" />
                  <span>Камина</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Story & Table Reservation CTA */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
              Топлината на живия огън и тайните на габровската кухня
            </h3>
            <p className="text-sm sm:text-base text-[#c2d2d8] leading-relaxed">
              {t.restP1}
            </p>
            <p className="text-xs sm:text-sm text-[#8ea4ad] leading-relaxed">
              {t.restP2}
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-[#111a1d] border border-[#22333a] flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#e67e22]/15 text-[#e67e22]">
                  <UtensilsCrossed className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Авторски сачове</div>
                  <div className="text-[10px] text-[#8fa7b0]">На дървени въглища</div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#111a1d] border border-[#22333a] flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#d4af37]/15 text-[#d4af37]">
                  <Wine className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Селекция вина</div>
                  <div className="text-[10px] text-[#8fa7b0]">Български изби</div>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setTableSubmitted(false);
                  setIsTableModalOpen(true);
                }}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#e67e22] to-[#d35400] hover:from-[#f39c12] hover:to-[#e67e22] text-white font-bold text-sm shadow-xl shadow-[#e67e22]/20 transition-all flex items-center gap-2"
              >
                <Flame className="w-4 h-4" />
                <span>{t.reserveTableBtn}</span>
              </button>
            </div>
          </div>

        </div>

        {/* Menu Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { id: 'specialties', label: t.menuSpecialtiesTab },
            { id: 'breakfast', label: t.menuBreakfastTab },
            { id: 'salads', label: t.menuSaladsTab },
            { id: 'mains', label: t.menuMainsTab },
            { id: 'wines', label: t.menuWinesTab },
            { id: 'all', label: 'Всички предложения' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveCategory(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeCategory === tab.id
                  ? 'bg-[#e67e22] text-white shadow-lg shadow-[#e67e22]/25 font-bold'
                  : 'bg-[#131c20] text-[#9db2ba] hover:bg-[#1a272d] hover:text-white border border-[#25353c]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dishes Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDishes.map((dish) => {
            const priceStr = currency === 'BGN' ? `${dish.priceBgn} лв` : `€${dish.priceEur}`;

            return (
              <div
                key={dish.id}
                className="p-6 rounded-2xl bg-[#0f171a] border border-[#23333a] hover:border-[#e67e22]/50 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="font-serif text-lg font-bold text-white group-hover:text-[#f39c12] transition-colors leading-snug">
                      {dish.nameKey}
                    </h4>
                    <span className="text-base font-bold text-[#e67e22] shrink-0">
                      {priceStr}
                    </span>
                  </div>

                  <p className="text-xs text-[#95abb4] leading-relaxed mb-4">
                    {dish.descKey}
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-[#1c292f]">
                  {dish.isBalkanSpecialty && (
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#e67e22]/15 text-[#f39c12] font-semibold border border-[#e67e22]/30 flex items-center gap-1">
                      <Flame className="w-3 h-3" />
                      <span>Балкански специалитет</span>
                    </span>
                  )}
                  {dish.isChefRecommendation && (
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#d4af37]/15 text-[#f5d77f] font-semibold border border-[#d4af37]/30 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      <span>Препоръка от главния готвач</span>
                    </span>
                  )}
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Table Reservation Modal */}
      {isTableModalOpen && (
        <div 
          id="table-reservation-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setIsTableModalOpen(false)}
        >
          <div 
            className="relative w-full max-w-lg bg-[#0d1417] border border-[#e67e22]/50 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsTableModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-[#182328] text-[#9db2ba] hover:text-white border border-[#2e424a] z-10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {tableSubmitted ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#27ae60]/20 border border-[#27ae60] text-[#27ae60] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-white">
                  Заявката е приета успешно!
                </h3>
                <p className="text-xs sm:text-sm text-[#9eb2ba]">
                  {t.tableSuccess} Запазихме заявка за {guests} гости за дата {date} в {time} ч.
                </p>
                <button
                  type="button"
                  onClick={() => setIsTableModalOpen(false)}
                  className="px-6 py-2.5 rounded-xl bg-[#e67e22] text-white font-bold text-xs"
                >
                  Затвори
                </button>
              </div>
            ) : (
              <form onSubmit={handleTableSubmit} className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-[#e67e22]/20 text-[#e67e22]">
                    <Flame className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-white">{t.tableReservationTitle}</h3>
                    <p className="text-xs text-[#8ea4ad]">Ресторант & Механа Edelveiss</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#8fa7b0] uppercase mb-1">{t.fullName} *</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Име и фамилия"
                      className="w-full bg-[#152126] border border-[#2b3d45] rounded-xl px-3 py-2 text-xs text-white outline-none focus:ring-1 focus:ring-[#e67e22]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#8fa7b0] uppercase mb-1">{t.phone} *</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+359 88 123 4567"
                      className="w-full bg-[#152126] border border-[#2b3d45] rounded-xl px-3 py-2 text-xs text-white outline-none focus:ring-1 focus:ring-[#e67e22]"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-[11px] font-bold text-[#8fa7b0] uppercase mb-1">{t.tableDate}</label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-[#152126] border border-[#2b3d45] rounded-xl px-2 py-2 text-xs text-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#8fa7b0] uppercase mb-1">{t.tableTime}</label>
                    <select
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full bg-[#152126] border border-[#2b3d45] rounded-xl px-2 py-2 text-xs text-white outline-none cursor-pointer"
                    >
                      {['12:30', '13:30', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00'].map(t => (
                        <option key={t} value={t} className="bg-[#121c20]">{t} ч.</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#8fa7b0] uppercase mb-1">{t.tableGuests}</label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="w-full bg-[#152126] border border-[#2b3d45] rounded-xl px-2 py-2 text-xs text-white outline-none cursor-pointer"
                    >
                      {[1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20].map(n => (
                        <option key={n} value={n} className="bg-[#121c20]">{n} души</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#8fa7b0] uppercase mb-1">{t.tableOccasion}</label>
                  <input
                    type="text"
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    placeholder="Напр. Рожден ден, юбилей, романтична вечеря..."
                    className="w-full bg-[#152126] border border-[#2b3d45] rounded-xl px-3 py-2 text-xs text-white outline-none focus:ring-1 focus:ring-[#e67e22]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#8fa7b0] uppercase mb-1">{t.specialRequests}</label>
                  <textarea
                    rows={2}
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    placeholder="Маса до камината, детско столче, музикални предпочитания..."
                    className="w-full bg-[#152126] border border-[#2b3d45] rounded-xl px-3 py-2 text-xs text-white outline-none resize-none"
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#e67e22] to-[#d35400] text-white font-bold text-xs sm:text-sm shadow-lg"
                  >
                    {t.tableSubmit}
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </section>
  );
};

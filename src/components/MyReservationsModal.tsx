import React, { useState, useEffect } from 'react';
import { 
  X, 
  Search, 
  Calendar, 
  User, 
  MapPin, 
  Check, 
  Printer, 
  Trash2, 
  AlertCircle, 
  BookmarkCheck,
  Phone,
  Mail,
  Clock,
  Sparkles
} from 'lucide-react';
import { Reservation, Language } from '../types';
import { translations } from '../data/translations';
import { EdelweissLogo } from './EdelweissLogo';

interface MyReservationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
}

export const MyReservationsModal: React.FC<MyReservationsModalProps> = ({
  isOpen,
  onClose,
  currentLang
}) => {
  const t = translations[currentLang];
  const [searchTerm, setSearchTerm] = useState('');
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [searchResult, setSearchResult] = useState<Reservation[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Load reservations from localStorage on mount & open
  useEffect(() => {
    if (isOpen) {
      try {
        const stored = localStorage.getItem('edelveiss_reservations');
        if (stored) {
          const parsed = JSON.parse(stored);
          setReservations(parsed);
          setSearchResult(parsed); // show all initially if any
        } else {
          setReservations([]);
          setSearchResult([]);
        }
      } catch (e) {
        console.error('Error loading reservations:', e);
      }
      setHasSearched(false);
      setNotification(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    const term = searchTerm.trim().toLowerCase();
    if (!term) {
      setSearchResult(reservations);
      return;
    }
    const filtered = reservations.filter(
      r => r.referenceCode.toLowerCase().includes(term) ||
           r.guestEmail.toLowerCase().includes(term) ||
           r.guestPhone.includes(term) ||
           r.guestName.toLowerCase().includes(term)
    );
    setSearchResult(filtered);
  };

  const handleCancelReservation = (refCode: string) => {
    if (window.confirm(t.cancelConfirmPrompt)) {
      const updated = reservations.map(r => {
        if (r.referenceCode === refCode) {
          return { ...r, status: 'cancelled' as const };
        }
        return r;
      });
      setReservations(updated);
      setSearchResult(updated.filter(r => searchResult.some(sr => sr.referenceCode === r.referenceCode)));
      localStorage.setItem('edelveiss_reservations', JSON.stringify(updated));
      setNotification(t.bookingCancelledSuccess);
      setTimeout(() => setNotification(null), 4000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div 
      id="my-reservations-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#0c1316] border border-[#2c3f47] rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header & Close */}
        <div className="flex items-center justify-between border-b border-[#1d2a30] pb-4">
          <div className="flex items-center gap-3">
            <EdelweissLogo size="sm" title={currentLang === 'bg' ? 'Еделвайс' : 'Edelveiss'} />
            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white leading-tight">
                {t.myBookingsTitle}
              </h3>
              <p className="text-[11px] text-[#8ea4ad]">
                {currentLang === 'bg' ? 'Бутиков комплекс "Еделвайс" • Габрово' : t.brandSubtitle}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full bg-[#162227] text-[#9db2ba] hover:text-white border border-[#2b3c43] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#738a94] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t.enterRefCode}
              className="w-full bg-[#131d21] border border-[#283b42] rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white focus:ring-2 focus:ring-[#d4af37] outline-none"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b38827] text-black font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-[1.02]"
          >
            {t.searchBtn}
          </button>
        </form>

        {/* Notifications */}
        {notification && (
          <div className="p-3.5 rounded-xl bg-[#27ae60]/20 border border-[#27ae60]/50 text-[#2ecc71] text-xs font-semibold flex items-center gap-2">
            <Check className="w-4 h-4" />
            <span>{notification}</span>
          </div>
        )}

        {/* Results List */}
        <div className="space-y-4">
          {searchResult.length > 0 ? (
            searchResult.map((res) => {
              const isConfirmed = res.status === 'confirmed';
              return (
                <div
                  key={res.id}
                  className={`p-5 rounded-2xl border transition-all ${
                    isConfirmed 
                      ? 'bg-[#111a1e] border-[#293d46]' 
                      : 'bg-[#141212] border-[#4a2222] opacity-75'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1d2b31] pb-3 mb-3">
                    <div>
                      <span className="text-[10px] text-[#8fa7b0] uppercase font-bold">{t.bookingRefLabel}</span>
                      <div className="text-lg font-mono font-bold text-[#d4af37]">{res.referenceCode}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        isConfirmed 
                          ? 'bg-[#27ae60]/20 text-[#2ecc71] border border-[#27ae60]/40' 
                          : 'bg-[#e74c3c]/20 text-[#e74c3c] border border-[#e74c3c]/40'
                      }`}>
                        {isConfirmed ? t.statusConfirmed : t.statusCancelled}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs mb-3">
                    <div>
                      <div className="text-[10px] text-[#768d96]">{t.fullName}</div>
                      <div className="font-bold text-white">{res.guestName}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-[#768d96]">{t.selectedRoom}</div>
                      <div className="font-bold text-white truncate">{res.roomName}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-[#768d96]">{t.checkIn} / {t.checkOut}</div>
                      <div className="font-bold text-white">{res.checkIn} — {res.checkOut} ({res.nights} n.)</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-[#768d96]">{t.totalPrice}</div>
                      <div className="font-bold text-[#d4af37]">
                        {res.currency === 'BGN' ? `${res.finalTotalBgn} лв` : `€${res.finalTotalEur}`}
                      </div>
                    </div>
                  </div>

                  {/* Actions for this reservation */}
                  <div className="flex items-center justify-between pt-2 border-t border-[#1b272d] text-xs">
                    <button
                      type="button"
                      onClick={handlePrint}
                      className="text-[#9ab0b8] hover:text-white flex items-center gap-1.5 transition-colors"
                    >
                      <Printer className="w-3.5 h-3.5 text-[#d4af37]" />
                      <span>{t.printVoucher}</span>
                    </button>

                    {isConfirmed && (
                      <button
                        type="button"
                        onClick={() => handleCancelReservation(res.referenceCode)}
                        className="text-[#e74c3c] hover:text-[#ff6b6b] flex items-center gap-1 font-semibold transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>{t.cancelBooking}</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-8 text-center rounded-2xl bg-[#111a1e] border border-[#203036] space-y-2">
              <AlertCircle className="w-8 h-8 text-[#7a8f96] mx-auto" />
              <div className="text-sm font-semibold text-white">
                {hasSearched ? t.noBookingFound : 'Няма намерени активни резервации на това устройство.'}
              </div>
              <p className="text-xs text-[#8fa7b0]">
                Въведете Вашия референтен номер (напр. EDV-2026-...) за да намерите резервацията си.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

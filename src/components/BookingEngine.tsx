import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Calendar, 
  Users, 
  Bed, 
  CheckCircle2, 
  Sparkles, 
  UtensilsCrossed, 
  Wine, 
  Flame, 
  Bike, 
  Car, 
  ShieldCheck, 
  CreditCard, 
  Building2, 
  Check, 
  Printer, 
  X, 
  ArrowRight, 
  ArrowLeft,
  Clock,
  MapPin,
  Phone,
  Mail,
  Tag,
  AlertCircle
} from 'lucide-react';
import { Language, Currency, Room, ExtraService, Reservation } from '../types';
import { ROOMS_DATA } from '../data/rooms';
import { EXTRA_SERVICES_DATA } from '../data/extras';
import { translations } from '../data/translations';
import { EdelweissLogo } from './EdelweissLogo';

interface BookingEngineProps {
  currentLang: Language;
  currency: Currency;
  preselectedRoomId?: string;
  initialCheckIn?: string;
  initialCheckOut?: string;
  initialAdults?: number;
  initialChildren?: number;
  onBookingCreated?: (reservation: Reservation) => void;
}

export const BookingEngine: React.FC<BookingEngineProps> = ({
  currentLang,
  currency,
  preselectedRoomId,
  initialCheckIn,
  initialCheckOut,
  initialAdults = 2,
  initialChildren = 0,
  onBookingCreated
}) => {
  const t = translations[currentLang];

  // Helper date format
  const todayStr = () => new Date().toISOString().split('T')[0];
  const defaultNextDay = () => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split('T')[0];
  };

  // State
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [checkIn, setCheckIn] = useState<string>(initialCheckIn || todayStr());
  const [checkOut, setCheckOut] = useState<string>(initialCheckOut || defaultNextDay());
  const [adults, setAdults] = useState<number>(initialAdults);
  const [children, setChildren] = useState<number>(initialChildren);
  const [selectedRoomId, setSelectedRoomId] = useState<string>(preselectedRoomId || 'room-1');
  const [selectedExtras, setSelectedExtras] = useState<string[]>(['extra-breakfast']);
  const [promoCode, setPromoCode] = useState<string>('');
  const [isPromoApplied, setIsPromoApplied] = useState<boolean>(false);
  const [promoError, setPromoError] = useState<string | null>(null);

  // Guest details form state
  const [guestName, setGuestName] = useState<string>('');
  const [guestEmail, setGuestEmail] = useState<string>('');
  const [guestPhone, setGuestPhone] = useState<string>('');
  const [guestCountry, setGuestCountry] = useState<string>('България');
  const [arrivalTime, setArrivalTime] = useState<string>('14:00 - 16:00');
  const [specialRequests, setSpecialRequests] = useState<string>('');
  const [paymentPreference, setPaymentPreference] = useState<'pay_at_property' | 'bank_transfer' | 'card_guarantee'>('pay_at_property');
  const [agreeTerms, setAgreeTerms] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  
  // Confirmed booking state for voucher modal
  const [confirmedBooking, setConfirmedBooking] = useState<Reservation | null>(null);

  // Sync props changes
  useEffect(() => {
    if (preselectedRoomId) {
      setSelectedRoomId(preselectedRoomId);
      // Auto move to step 2 or 3 if already on step 1
      if (step === 1) setStep(2);
    }
  }, [preselectedRoomId]);

  useEffect(() => {
    if (initialCheckIn) setCheckIn(initialCheckIn);
    if (initialCheckOut) setCheckOut(initialCheckOut);
    if (initialAdults) setAdults(initialAdults);
    if (initialChildren !== undefined) setChildren(initialChildren);
  }, [initialCheckIn, initialCheckOut, initialAdults, initialChildren]);

  // Calculate nights
  const calculateNights = () => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  };

  const nights = calculateNights();

  // Find selected room
  const selectedRoom = ROOMS_DATA.find(r => r.id === selectedRoomId) || ROOMS_DATA[0];

  // Price calculations
  const baseRoomTotalBgn = selectedRoom.priceBgnPerNight * nights;
  const baseRoomTotalEur = selectedRoom.priceEurPerNight * nights;

  let extrasTotalBgn = 0;
  let extrasTotalEur = 0;

  selectedExtras.forEach(extraId => {
    const extra = EXTRA_SERVICES_DATA.find(e => e.id === extraId);
    if (extra) {
      const multiplier = extra.perNight ? (extra.perPerson ? nights * adults : nights) : (extra.perPerson ? adults : 1);
      extrasTotalBgn += extra.priceBgn * multiplier;
      extrasTotalEur += extra.priceEur * multiplier;
    }
  });

  const subtotalBgn = baseRoomTotalBgn + extrasTotalBgn;
  const subtotalEur = baseRoomTotalEur + extrasTotalEur;

  const discountBgn = isPromoApplied ? Math.round(subtotalBgn * 0.1) : 0;
  const discountEur = isPromoApplied ? Math.round(subtotalEur * 0.1) : 0;

  const finalTotalBgn = subtotalBgn - discountBgn;
  const finalTotalEur = subtotalEur - discountEur;

  // Handle promo code apply
  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = promoCode.trim().toUpperCase();
    if (cleanCode === 'BALKAN10' || cleanCode === 'EDELVEISS' || cleanCode === 'WELCOME10') {
      setIsPromoApplied(true);
      setPromoError(null);
    } else {
      setIsPromoApplied(false);
      setPromoError(t.invalidPromo);
    }
  };

  // Toggle extra service
  const toggleExtra = (id: string) => {
    if (selectedExtras.includes(id)) {
      setSelectedExtras(selectedExtras.filter(eId => eId !== id));
    } else {
      setSelectedExtras([...selectedExtras, id]);
    }
  };

  // Extra Icon mapping
  const getExtraIcon = (iconName: string) => {
    switch (iconName) {
      case 'UtensilsCrossed': return <UtensilsCrossed className="w-5 h-5 text-[#d4af37]" />;
      case 'Wine': return <Wine className="w-5 h-5 text-[#d4af37]" />;
      case 'Flame': return <Flame className="w-5 h-5 text-[#e67e22]" />;
      case 'Bike': return <Bike className="w-5 h-5 text-[#3498db]" />;
      case 'Car': return <Car className="w-5 h-5 text-[#2ecc71]" />;
      default: return <Sparkles className="w-5 h-5 text-[#d4af37]" />;
    }
  };

  // Handle booking form submission
  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !guestEmail || !guestPhone) {
      alert('Please fill in all required guest contact fields.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const refRandom = Math.floor(1000 + Math.random() * 9000);
      const newReservation: Reservation = {
        id: 'res-' + Date.now(),
        referenceCode: `EDV-${new Date().getFullYear()}-${refRandom}`,
        createdAt: new Date().toISOString(),
        guestName,
        guestEmail,
        guestPhone,
        guestCountry,
        checkIn,
        checkOut,
        nights,
        adults,
        children,
        roomId: selectedRoom.id,
        roomName: t[selectedRoom.nameKey] || selectedRoom.nameKey,
        selectedExtras: selectedExtras.map(eId => {
          const ex = EXTRA_SERVICES_DATA.find(e => e.id === eId);
          return {
            id: eId,
            name: ex ? (t[ex.nameKey] || ex.nameKey) : eId,
            priceBgn: ex ? ex.priceBgn : 0,
            priceEur: ex ? ex.priceEur : 0
          };
        }),
        specialRequests,
        estimatedArrival: arrivalTime,
        baseTotalBgn: baseRoomTotalBgn,
        baseTotalEur: baseRoomTotalEur,
        extrasTotalBgn,
        extrasTotalEur,
        discountBgn,
        discountEur,
        promoCodeApplied: isPromoApplied ? promoCode : undefined,
        finalTotalBgn,
        finalTotalEur,
        status: 'confirmed',
        currency,
        paymentPreference
      };

      // Save to localStorage
      try {
        const stored = localStorage.getItem('edelveiss_reservations');
        const existing: Reservation[] = stored ? JSON.parse(stored) : [];
        existing.unshift(newReservation);
        localStorage.setItem('edelveiss_reservations', JSON.stringify(existing));
      } catch (err) {
        console.error('Failed to save reservation locally:', err);
      }

      setIsSubmitting(false);
      setConfirmedBooking(newReservation);

      if (onBookingCreated) {
        onBookingCreated(newReservation);
      }

      // Fire celebratory confetti!
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#d4af37', '#f5d77f', '#ffffff', '#27ae60']
        });
      } catch (e) {}

    }, 800);
  };

  const handlePrintVoucher = () => {
    window.print();
  };

  return (
    <section id="reservation" className="py-20 bg-[#070b0d] relative border-t border-[#182329]">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#162228] border border-[#2b3d45] text-[#d4af37] text-xs font-bold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Online Booking Engine</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#f2f6f7] mb-4">
            {t.bookingEngineTitle}
          </h2>
          <p className="text-sm sm:text-base text-[#9db2ba] font-light max-w-2xl mx-auto">
            {t.bookingEngineSubtitle}
          </p>
        </div>

        {/* Step Progress Navigation Bar */}
        <div className="max-w-4xl mx-auto mb-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
            
            <button
              type="button"
              onClick={() => setStep(1)}
              className={`p-3 rounded-xl border text-left transition-all flex items-center gap-2.5 ${
                step === 1
                  ? 'bg-[#18252b] border-[#d4af37] text-white ring-1 ring-[#d4af37]/30'
                  : step > 1
                  ? 'bg-[#10191c] border-[#293d46] text-[#c4d4da]'
                  : 'bg-[#0b1215] border-[#1d2a30] text-[#6d828a]'
              }`}
            >
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                step >= 1 ? 'bg-[#d4af37] text-black' : 'bg-[#1b282e] text-[#71878f]'
              }`}>
                {step > 1 ? <Check className="w-4 h-4" /> : '1'}
              </div>
              <div className="text-xs font-semibold truncate">{t.step1Dates}</div>
            </button>

            <button
              type="button"
              onClick={() => setStep(2)}
              className={`p-3 rounded-xl border text-left transition-all flex items-center gap-2.5 ${
                step === 2
                  ? 'bg-[#18252b] border-[#d4af37] text-white ring-1 ring-[#d4af37]/30'
                  : step > 2
                  ? 'bg-[#10191c] border-[#293d46] text-[#c4d4da]'
                  : 'bg-[#0b1215] border-[#1d2a30] text-[#6d828a]'
              }`}
            >
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                step >= 2 ? 'bg-[#d4af37] text-black' : 'bg-[#1b282e] text-[#71878f]'
              }`}>
                {step > 2 ? <Check className="w-4 h-4" /> : '2'}
              </div>
              <div className="text-xs font-semibold truncate">{t.step2Room}</div>
            </button>

            <button
              type="button"
              onClick={() => setStep(3)}
              className={`p-3 rounded-xl border text-left transition-all flex items-center gap-2.5 ${
                step === 3
                  ? 'bg-[#18252b] border-[#d4af37] text-white ring-1 ring-[#d4af37]/30'
                  : step > 3
                  ? 'bg-[#10191c] border-[#293d46] text-[#c4d4da]'
                  : 'bg-[#0b1215] border-[#1d2a30] text-[#6d828a]'
              }`}
            >
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                step >= 3 ? 'bg-[#d4af37] text-black' : 'bg-[#1b282e] text-[#71878f]'
              }`}>
                {step > 3 ? <Check className="w-4 h-4" /> : '3'}
              </div>
              <div className="text-xs font-semibold truncate">{t.step3Extras}</div>
            </button>

            <button
              type="button"
              onClick={() => setStep(4)}
              className={`p-3 rounded-xl border text-left transition-all flex items-center gap-2.5 ${
                step === 4
                  ? 'bg-[#18252b] border-[#d4af37] text-white ring-1 ring-[#d4af37]/30'
                  : 'bg-[#0b1215] border-[#1d2a30] text-[#6d828a]'
              }`}
            >
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                step === 4 ? 'bg-[#d4af37] text-black' : 'bg-[#1b282e] text-[#71878f]'
              }`}>
                4
              </div>
              <div className="text-xs font-semibold truncate">{t.step4Details}</div>
            </button>

          </div>
        </div>

        {/* Main Booking Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Active Step Interactive Form (7 Cols) */}
          <div className="lg:col-span-7 bg-[#0d1417] border border-[#23333a] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            
            {/* STEP 1: Dates & Guests */}
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#d4af37]" />
                  <span>{t.step1Dates}</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#8fa7b0] uppercase tracking-wider mb-2">
                      {t.checkIn} (от 14:00 ч.)
                    </label>
                    <input
                      id="step1-checkin"
                      type="date"
                      value={checkIn}
                      min={todayStr()}
                      onChange={(e) => {
                        setCheckIn(e.target.value);
                        if (e.target.value >= checkOut) {
                          const nextD = new Date(e.target.value);
                          nextD.setDate(nextD.getDate() + 1);
                          setCheckOut(nextD.toISOString().split('T')[0]);
                        }
                      }}
                      className="w-full bg-[#152126] border border-[#2b3d45] rounded-xl px-4 py-3 text-sm text-white font-medium focus:ring-2 focus:ring-[#d4af37] outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#8fa7b0] uppercase tracking-wider mb-2">
                      {t.checkOut} (до 11:00 ч.)
                    </label>
                    <input
                      id="step1-checkout"
                      type="date"
                      value={checkOut}
                      min={checkIn || todayStr()}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full bg-[#152126] border border-[#2b3d45] rounded-xl px-4 py-3 text-sm text-white font-medium focus:ring-2 focus:ring-[#d4af37] outline-none"
                      required
                    />
                  </div>
                </div>

                {/* Duration indicator pill */}
                <div className="p-3.5 rounded-xl bg-[#121c20] border border-[#223238] flex items-center justify-between text-xs text-[#a0b4bc]">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#d4af37]" />
                    <span>Период на престоя: <strong className="text-white">{nights} {t.nightsCount}</strong></span>
                  </div>
                  <div className="text-[#d4af37] font-semibold">
                    {new Date(checkIn).toLocaleDateString()} — {new Date(checkOut).toLocaleDateString()}
                  </div>
                </div>

                {/* Guests counter steppers */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-[#131d22] border border-[#24363d] flex items-center justify-between">
                    <div>
                      <div className="text-sm font-bold text-white">{t.adults}</div>
                      <div className="text-[11px] text-[#8ea4ad]">Над 12 години</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setAdults(Math.max(1, adults - 1))}
                        className="w-8 h-8 rounded-lg bg-[#1c2a30] text-white hover:bg-[#25373f] font-bold text-base flex items-center justify-center transition-colors"
                      >
                        -
                      </button>
                      <span className="font-bold text-base text-white w-4 text-center">{adults}</span>
                      <button
                        type="button"
                        onClick={() => setAdults(Math.min(14, adults + 1))}
                        className="w-8 h-8 rounded-lg bg-[#1c2a30] text-white hover:bg-[#25373f] font-bold text-base flex items-center justify-center transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#131d22] border border-[#24363d] flex items-center justify-between">
                    <div>
                      <div className="text-sm font-bold text-white">{t.children}</div>
                      <div className="text-[11px] text-[#8ea4ad]">0-12 години</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setChildren(Math.max(0, children - 1))}
                        className="w-8 h-8 rounded-lg bg-[#1c2a30] text-white hover:bg-[#25373f] font-bold text-base flex items-center justify-center transition-colors"
                      >
                        -
                      </button>
                      <span className="font-bold text-base text-white w-4 text-center">{children}</span>
                      <button
                        type="button"
                        onClick={() => setChildren(Math.min(6, children + 1))}
                        className="w-8 h-8 rounded-lg bg-[#1c2a30] text-white hover:bg-[#25373f] font-bold text-base flex items-center justify-center transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b38827] hover:from-[#e5c14f] hover:to-[#c49a35] text-[#0a0f11] font-bold text-sm shadow-xl shadow-[#d4af37]/20 transition-all flex items-center gap-2"
                  >
                    <span>{t.step2Room}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Room Selection */}
            {step === 2 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Bed className="w-5 h-5 text-[#d4af37]" />
                    <span>{t.step2Room}</span>
                  </h3>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-xs text-[#8ea4ad] hover:text-white flex items-center gap-1"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Назад към дати</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {ROOMS_DATA.map((room) => {
                    const isSelected = selectedRoomId === room.id;
                    const roomName = t[room.nameKey] || room.nameKey;
                    const rateStr = currency === 'BGN' ? `${room.priceBgnPerNight} лв` : `€${room.priceEurPerNight}`;

                    return (
                      <div
                        key={room.id}
                        onClick={() => setSelectedRoomId(room.id)}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                          isSelected
                            ? 'bg-[#18262c] border-[#d4af37] ring-1 ring-[#d4af37]/40 shadow-lg shadow-[#d4af37]/10'
                            : 'bg-[#111a1e] border-[#22333a] hover:border-[#2d424b] opacity-90 hover:opacity-100'
                        }`}
                      >
                        <div className="flex items-center gap-3.5">
                          <img
                            src={room.coverImage}
                            alt={roomName}
                            className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover shrink-0"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm sm:text-base font-bold text-white">{roomName}</h4>
                              {room.badge && (
                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#d4af37]/20 text-[#f5d77f] font-bold">
                                  {room.badge}
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-[#90a6af] mt-1 flex items-center gap-3">
                              <span>{room.sizeSqm} m²</span>
                              <span>•</span>
                              <span>{room.capacityAdults} {t.adults} {room.capacityChildren > 0 ? `+ ${room.capacityChildren} ${t.children}` : ''}</span>
                            </div>
                            <div className="text-[11px] text-[#71878f] mt-0.5">{room.bedType}</div>
                          </div>
                        </div>

                        <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-[#1c292e]">
                          <div className="text-right">
                            <span className="text-base sm:text-lg font-bold text-[#d4af37]">{rateStr}</span>
                            <span className="text-[10px] text-[#8ea4ad] ml-1">{t.perNight}</span>
                          </div>
                          <div className={`mt-1.5 px-3 py-1 rounded-lg text-xs font-bold ${
                            isSelected ? 'bg-[#d4af37] text-black' : 'bg-[#1c2a30] text-[#a1b4bc]'
                          }`}>
                            {isSelected ? 'Избрано' : 'Избери'}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-4 py-2.5 rounded-xl bg-[#142024] hover:bg-[#1b2b31] text-[#c5d5db] font-semibold text-xs transition-colors flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>{t.step1Dates}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b38827] hover:from-[#e5c14f] hover:to-[#c49a35] text-[#0a0f11] font-bold text-sm shadow-xl shadow-[#d4af37]/20 transition-all flex items-center gap-2"
                  >
                    <span>{t.step3Extras}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Extra Services */}
            {step === 3 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#d4af37]" />
                    <span>{t.step3Extras}</span>
                  </h3>
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="text-xs text-[#8ea4ad] hover:text-white flex items-center gap-1"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Назад към стаи</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {EXTRA_SERVICES_DATA.map((extra) => {
                    const isChecked = selectedExtras.includes(extra.id);
                    const title = t[extra.nameKey] || extra.nameKey;
                    const desc = t[extra.descriptionKey] || extra.descriptionKey;
                    const priceStr = currency === 'BGN' ? `${extra.priceBgn} лв` : `€${extra.priceEur}`;

                    return (
                      <div
                        key={extra.id}
                        onClick={() => toggleExtra(extra.id)}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-4 ${
                          isChecked
                            ? 'bg-[#18262c] border-[#d4af37] ring-1 ring-[#d4af37]/40 shadow-md'
                            : 'bg-[#111a1e] border-[#22333a] hover:border-[#2d424b]'
                        }`}
                      >
                        <div className="flex items-start gap-3.5">
                          <div className="p-2.5 rounded-xl bg-[#142024] border border-[#2b3c43] shrink-0 mt-0.5">
                            {getExtraIcon(extra.iconName)}
                          </div>
                          <div>
                            <div className="text-sm font-bold text-white">{title}</div>
                            <div className="text-xs text-[#8ea4ad] mt-1 leading-relaxed">{desc}</div>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <div className="text-sm font-bold text-[#d4af37]">{priceStr}</div>
                          <div className="text-[10px] text-[#71878f]">
                            {extra.perPerson ? (extra.perNight ? '/ човек / ден' : '/ човек') : 'общо'}
                          </div>
                          <div className={`mt-2 w-5 h-5 rounded-md border flex items-center justify-center ml-auto ${
                            isChecked ? 'bg-[#d4af37] border-[#d4af37] text-black' : 'border-[#3a4e56]'
                          }`}>
                            {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-4 py-2.5 rounded-xl bg-[#142024] hover:bg-[#1b2b31] text-[#c5d5db] font-semibold text-xs transition-colors flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>{t.step2Room}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(4)}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b38827] hover:from-[#e5c14f] hover:to-[#c49a35] text-[#0a0f11] font-bold text-sm shadow-xl shadow-[#d4af37]/20 transition-all flex items-center gap-2"
                  >
                    <span>{t.step4Details}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: Guest Details & Guarantee Form */}
            {step === 4 && (
              <form onSubmit={handleSubmitBooking} className="space-y-5 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-[#d4af37]" />
                    <span>{t.step4Details}</span>
                  </h3>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="text-xs text-[#8ea4ad] hover:text-white flex items-center gap-1"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Назад към екстри</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#8fa7b0] uppercase tracking-wider mb-1.5">
                      {t.fullName} *
                    </label>
                    <input
                      id="guest-fullname-input"
                      type="text"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder="Иван Петров / John Doe"
                      className="w-full bg-[#152126] border border-[#2b3d45] rounded-xl px-4 py-2.5 text-sm text-white font-medium focus:ring-2 focus:ring-[#d4af37] outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#8fa7b0] uppercase tracking-wider mb-1.5">
                      {t.email} *
                    </label>
                    <input
                      id="guest-email-input"
                      type="email"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      placeholder="ivan@example.com"
                      className="w-full bg-[#152126] border border-[#2b3d45] rounded-xl px-4 py-2.5 text-sm text-white font-medium focus:ring-2 focus:ring-[#d4af37] outline-none"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#8fa7b0] uppercase tracking-wider mb-1.5">
                      {t.phone} *
                    </label>
                    <input
                      id="guest-phone-input"
                      type="tel"
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      placeholder="+359 88 123 4567"
                      className="w-full bg-[#152126] border border-[#2b3d45] rounded-xl px-4 py-2.5 text-sm text-white font-medium focus:ring-2 focus:ring-[#d4af37] outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#8fa7b0] uppercase tracking-wider mb-1.5">
                      {t.country}
                    </label>
                    <input
                      id="guest-country-input"
                      type="text"
                      value={guestCountry}
                      onChange={(e) => setGuestCountry(e.target.value)}
                      placeholder="България / Sofia"
                      className="w-full bg-[#152126] border border-[#2b3d45] rounded-xl px-4 py-2.5 text-sm text-white font-medium focus:ring-2 focus:ring-[#d4af37] outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#8fa7b0] uppercase tracking-wider mb-1.5">
                      {t.arrivalTime}
                    </label>
                    <select
                      id="guest-arrival-select"
                      value={arrivalTime}
                      onChange={(e) => setArrivalTime(e.target.value)}
                      className="w-full bg-[#152126] border border-[#2b3d45] rounded-xl px-4 py-2.5 text-sm text-white font-medium focus:ring-2 focus:ring-[#d4af37] outline-none cursor-pointer"
                    >
                      <option value="14:00 - 16:00" className="bg-[#121c20]">14:00 - 16:00 (Препоръчително)</option>
                      <option value="16:00 - 18:00" className="bg-[#121c20]">16:00 - 18:00</option>
                      <option value="18:00 - 20:00" className="bg-[#121c20]">18:00 - 20:00</option>
                      <option value="След 20:00 (късно настаняване)" className="bg-[#121c20]">След 20:00 (късно настаняване)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#8fa7b0] uppercase tracking-wider mb-1.5">
                      {t.paymentMethod}
                    </label>
                    <select
                      id="guest-payment-pref-select"
                      value={paymentPreference}
                      onChange={(e) => setPaymentPreference(e.target.value as any)}
                      className="w-full bg-[#152126] border border-[#2b3d45] rounded-xl px-4 py-2.5 text-sm text-white font-medium focus:ring-2 focus:ring-[#d4af37] outline-none cursor-pointer"
                    >
                      <option value="pay_at_property" className="bg-[#121c20]">{t.payAtProperty}</option>
                      <option value="bank_transfer" className="bg-[#121c20]">{t.bankTransfer}</option>
                      <option value="card_guarantee" className="bg-[#121c20]">{t.cardGuarantee}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#8fa7b0] uppercase tracking-wider mb-1.5">
                    {t.specialRequests}
                  </label>
                  <textarea
                    id="guest-special-requests-input"
                    rows={2}
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    placeholder="Напр. детско легло, ранно настаняване, хранителни предпочитания..."
                    className="w-full bg-[#152126] border border-[#2b3d45] rounded-xl px-4 py-2.5 text-sm text-white font-medium focus:ring-2 focus:ring-[#d4af37] outline-none resize-none"
                  />
                </div>

                {/* Terms Agreement Checkbox */}
                <div className="flex items-start gap-3 pt-1">
                  <input
                    id="agree-terms-checkbox"
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded accent-[#d4af37] cursor-pointer"
                    required
                  />
                  <label htmlFor="agree-terms-checkbox" className="text-xs text-[#9eb3bc] cursor-pointer">
                    {t.agreeTerms}
                  </label>
                </div>

                <div className="pt-3 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="px-4 py-2.5 rounded-xl bg-[#142024] hover:bg-[#1b2b31] text-[#c5d5db] font-semibold text-xs transition-colors flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>{t.step3Extras}</span>
                  </button>

                  <button
                    id="submit-confirm-booking-btn"
                    type="submit"
                    disabled={isSubmitting || !agreeTerms}
                    className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b38827] hover:from-[#e5c14f] hover:to-[#c49a35] text-[#0a0f11] font-bold text-sm shadow-xl shadow-[#d4af37]/25 transition-all flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>{t.processingBooking}</span>
                    ) : (
                      <>
                        <CheckCircle2 className="w-5 h-5 text-black" />
                        <span>{t.confirmBookingBtn}</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

          </div>

          {/* Right Column: Live Booking Summary & Price Breakdown (5 Cols) */}
          <div className="lg:col-span-5 bg-[#0d1417] border border-[#23333a] rounded-3xl p-6 sm:p-7 shadow-2xl space-y-6 sticky top-24">
            
            <div className="flex items-center justify-between border-b border-[#1b272d] pb-4">
              <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                <Tag className="w-4 h-4 text-[#d4af37]" />
                <span>{t.summaryTitle}</span>
              </h3>
              <span className="text-xs px-2.5 py-1 rounded-full bg-[#1b292f] text-[#d4af37] font-semibold">
                {nights} {t.nightsCount}
              </span>
            </div>

            {/* Selected Room Snapshot */}
            <div className="flex gap-3.5 items-center p-3 rounded-2xl bg-[#121c20] border border-[#223238]">
              <img
                src={selectedRoom.coverImage}
                alt="Room"
                className="w-16 h-16 rounded-xl object-cover shrink-0"
                referrerPolicy="no-referrer"
              />
              <div className="overflow-hidden">
                <div className="text-[11px] text-[#8fa7b0] uppercase font-bold">{t.selectedRoom}</div>
                <div className="text-sm font-bold text-white truncate">{t[selectedRoom.nameKey] || selectedRoom.nameKey}</div>
                <div className="text-xs text-[#d4af37] font-medium">
                  {currency === 'BGN' ? `${selectedRoom.priceBgnPerNight} лв` : `€${selectedRoom.priceEurPerNight}`} {t.perNight}
                </div>
              </div>
            </div>

            {/* Dates & Guests Mini Recap */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-[#121c20] border border-[#1e2e34]">
                <div className="text-[10px] text-[#8ea4ad]">{t.checkIn}</div>
                <div className="font-bold text-white">{checkIn}</div>
              </div>
              <div className="p-2.5 rounded-xl bg-[#121c20] border border-[#1e2e34]">
                <div className="text-[10px] text-[#8ea4ad]">{t.checkOut}</div>
                <div className="font-bold text-white">{checkOut}</div>
              </div>
            </div>

            {/* Extras Recap if any */}
            {selectedExtras.length > 0 && (
              <div className="space-y-1.5 pt-1">
                <div className="text-[11px] font-bold text-[#8fa7b0] uppercase">{t.extrasSubtotal}:</div>
                {selectedExtras.map(eId => {
                  const extra = EXTRA_SERVICES_DATA.find(e => e.id === eId);
                  if (!extra) return null;
                  const name = t[extra.nameKey] || extra.nameKey;
                  const priceStr = currency === 'BGN' ? `${extra.priceBgn} лв` : `€${extra.priceEur}`;
                  return (
                    <div key={eId} className="flex items-center justify-between text-xs text-[#c5d5db]">
                      <span className="truncate pr-2">• {name}</span>
                      <span className="font-semibold text-white shrink-0">+{priceStr}</span>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Promo Code Input Box */}
            <form onSubmit={handleApplyPromo} className="pt-2 border-t border-[#1b272d]">
              <div className="flex gap-2">
                <input
                  id="promo-code-input"
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder={t.promoCodePlaceholder}
                  className="flex-1 bg-[#152126] border border-[#2a3c43] rounded-xl px-3 py-2 text-xs text-white uppercase tracking-wider outline-none focus:ring-1 focus:ring-[#d4af37]"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 rounded-xl bg-[#1b282e] hover:bg-[#25373f] text-[#d4af37] text-xs font-bold border border-[#2f424a] transition-colors"
                >
                  {t.applyPromo}
                </button>
              </div>
              {isPromoApplied && (
                <div className="text-xs text-[#2ecc71] font-semibold mt-1.5 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{t.promoApplied} (-10%)</span>
                </div>
              )}
              {promoError && (
                <div className="text-xs text-[#e74c3c] font-semibold mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{promoError}</span>
                </div>
              )}
            </form>

            {/* Final Total Calculation Table */}
            <div className="space-y-2 pt-2 border-t border-[#1b272d] text-xs">
              <div className="flex justify-between text-[#a1b4bd]">
                <span>{t.roomRate} ({nights} {t.nightsCount}):</span>
                <span className="font-medium text-white">
                  {currency === 'BGN' ? `${baseRoomTotalBgn} лв` : `€${baseRoomTotalEur}`}
                </span>
              </div>
              {extrasTotalBgn > 0 && (
                <div className="flex justify-between text-[#a1b4bd]">
                  <span>{t.extrasSubtotal}:</span>
                  <span className="font-medium text-white">
                    {currency === 'BGN' ? `+${extrasTotalBgn} лв` : `+€${extrasTotalEur}`}
                  </span>
                </div>
              )}
              {isPromoApplied && (
                <div className="flex justify-between text-[#2ecc71] font-medium">
                  <span>{t.discount} (10% Promo):</span>
                  <span>{currency === 'BGN' ? `-${discountBgn} лв` : `-€${discountEur}`}</span>
                </div>
              )}
              
              <div className="flex items-center justify-between pt-3 border-t border-[#25353c] text-sm">
                <span className="font-bold text-white">{t.totalPrice}:</span>
                <div className="text-right">
                  <div className="text-2xl font-bold text-[#d4af37]">
                    {currency === 'BGN' ? `${finalTotalBgn} лв` : `€${finalTotalEur}`}
                  </div>
                  <div className="text-[10px] text-[#71878f]">
                    {currency === 'BGN' ? `(ок. €${finalTotalEur})` : `(ок. ${finalTotalBgn} лв)`}
                  </div>
                </div>
              </div>
            </div>

            {/* Guarantee Note */}
            <div className="p-3 rounded-xl bg-[#121c20] border border-[#223238] flex items-center gap-2.5 text-[11px] text-[#8ea4ad]">
              <ShieldCheck className="w-5 h-5 text-[#2ecc71] shrink-0" />
              <span>{t.guaranteeText}</span>
            </div>

          </div>

        </div>

      </div>

      {/* CONFIRMATION / VOUCHER MODAL */}
      {confirmedBooking && (
        <div 
          id="booking-confirmation-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-300"
        >
          <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-[#0d1417] border border-[#d4af37]/60 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6">
            
            {/* Modal Close Button */}
            <button
              type="button"
              onClick={() => setConfirmedBooking(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-[#182328] text-[#9db2ba] hover:text-white border border-[#2e424a] z-10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Success Header */}
            <div className="text-center space-y-2 pt-2">
              <div className="w-16 h-16 rounded-full bg-[#27ae60]/20 border border-[#27ae60] text-[#27ae60] flex items-center justify-center mx-auto shadow-lg shadow-[#27ae60]/20">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                {t.bookingSuccessTitle}
              </h3>
              <p className="text-xs sm:text-sm text-[#9eb2ba] max-w-md mx-auto">
                {t.bookingSuccessMessage}
              </p>
            </div>

            {/* Voucher Card Container (Printable) */}
            <div className="p-6 rounded-2xl bg-[#121c20] border-2 border-dashed border-[#2f434b] space-y-4">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1f2f35] pb-4">
                <div className="flex items-center gap-3">
                  <EdelweissLogo size="sm" title={currentLang === 'bg' ? 'Еделвайс' : 'Edelveiss'} />
                  <div>
                    <div className="font-serif text-lg font-bold text-white leading-none">
                      {currentLang === 'bg' ? 'Еделвайс' : 'Edelveiss'}
                    </div>
                    <div className="text-[10px] text-[#8fa7b0] uppercase tracking-wider mt-0.5">
                      {currentLang === 'bg' ? 'Бутикова къща за гости • Габрово' : t.brandSubtitle}
                    </div>
                  </div>
                </div>

                <div className="flex sm:flex-col sm:items-end justify-between">
                  <div className="text-[11px] text-[#8fa7b0] uppercase font-bold">{t.bookingRefLabel}</div>
                  <div className="text-xl font-mono font-bold text-[#d4af37] tracking-wider">
                    {confirmedBooking.referenceCode}
                  </div>
                </div>
              </div>

              {/* Guest & Stay Details */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <div className="text-[10px] text-[#788f98]">{t.fullName}</div>
                  <div className="font-bold text-white">{confirmedBooking.guestName}</div>
                </div>
                <div>
                  <div className="text-[10px] text-[#788f98]">{t.phone}</div>
                  <div className="font-bold text-white">{confirmedBooking.guestPhone}</div>
                </div>
                <div>
                  <div className="text-[10px] text-[#788f98]">{t.email}</div>
                  <div className="font-bold text-white truncate">{confirmedBooking.guestEmail}</div>
                </div>
                <div>
                  <div className="text-[10px] text-[#788f98]">{t.checkIn}</div>
                  <div className="font-bold text-white">{confirmedBooking.checkIn}</div>
                </div>
                <div>
                  <div className="text-[10px] text-[#788f98]">{t.checkOut}</div>
                  <div className="font-bold text-white">{confirmedBooking.checkOut}</div>
                </div>
                <div>
                  <div className="text-[10px] text-[#788f98]">{t.guests}</div>
                  <div className="font-bold text-white">
                    {confirmedBooking.adults} {t.adults} {confirmedBooking.children > 0 ? `+ ${confirmedBooking.children} ${t.children}` : ''}
                  </div>
                </div>
              </div>

              {/* Room & Payment Details */}
              <div className="pt-2 border-t border-[#1f2f35] text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-[#8fa7b0]">{t.selectedRoom}:</span>
                  <span className="font-bold text-white">{confirmedBooking.roomName}</span>
                </div>
                {confirmedBooking.selectedExtras.length > 0 && (
                  <div className="flex justify-between">
                    <span className="text-[#8fa7b0]">{t.extrasSubtotal}:</span>
                    <span className="text-white">{confirmedBooking.selectedExtras.map(e => e.name).join(', ')}</span>
                  </div>
                )}
                <div className="flex justify-between items-center pt-2 text-sm font-bold border-t border-[#263840]">
                  <span className="text-white">{t.totalPrice}:</span>
                  <span className="text-lg text-[#d4af37]">
                    {confirmedBooking.currency === 'BGN' ? `${confirmedBooking.finalTotalBgn} лв` : `€${confirmedBooking.finalTotalEur}`}
                  </span>
                </div>
              </div>

              {/* Property Address & Map Reference */}
              <div className="p-3 rounded-xl bg-[#0e1619] text-[11px] text-[#8fa7b0] space-y-1">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Бутиков комплекс "Edelveiss"</span>
                </div>
                <div>ул. "Еделвайс" 4, кв. "Дядо Дянко", гр. Габрово 5300</div>
                <div className="flex items-center gap-3 pt-1 text-[#d4af37]">
                  <span>Тел: +359 88 888 2345</span>
                  <span>•</span>
                  <span>GPS: 42.8742° N, 25.3187° E</span>
                </div>
              </div>

            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={handlePrintVoucher}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#18262c] hover:bg-[#20323a] text-white text-xs font-bold border border-[#2f434b] transition-colors flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4 text-[#d4af37]" />
                <span>{t.printVoucher}</span>
              </button>

              <button
                type="button"
                onClick={() => setConfirmedBooking(null)}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b38827] text-black text-xs font-bold shadow-lg transition-all"
              >
                {t.closeConfirmation}
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};

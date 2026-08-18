import React, { useState } from 'react';
import { 
  Users, 
  Bed, 
  Maximize2, 
  Wifi, 
  Tv, 
  Coffee, 
  Sparkles, 
  Check, 
  ChevronRight, 
  Eye, 
  X,
  CalendarCheck,
  Flame,
  ShieldCheck
} from 'lucide-react';
import { Room, Language, Currency } from '../types';
import { ROOMS_DATA } from '../data/rooms';
import { translations } from '../data/translations';

interface RoomsSectionProps {
  currentLang: Language;
  currency: Currency;
  onSelectRoomForBooking: (roomId: string) => void;
}

export const RoomsSection: React.FC<RoomsSectionProps> = ({
  currentLang,
  currency,
  onSelectRoomForBooking
}) => {
  const t = translations[currentLang];
  const [filter, setFilter] = useState<'all' | 'double' | 'suite' | 'villa'>('all');
  const [selectedRoomModal, setSelectedRoomModal] = useState<Room | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  const filteredRooms = ROOMS_DATA.filter((room) => {
    if (filter === 'all') return true;
    return room.type === filter;
  });

  const openRoomDetails = (room: Room) => {
    setSelectedRoomModal(room);
    setActiveImageIndex(0);
  };

  const closeRoomDetails = () => {
    setSelectedRoomModal(null);
  };

  return (
    <section id="rooms" className="py-20 bg-[#090e10] relative">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#162228] border border-[#2b3d45] text-[#d4af37] text-xs font-bold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.roomsLabel}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#f2f6f7] mb-4">
            {t.roomsTitle}
          </h2>
          <p className="text-sm sm:text-base text-[#9db2ba] font-light max-w-2xl mx-auto">
            {t.roomsSubtitle}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              filter === 'all'
                ? 'bg-[#d4af37] text-black shadow-lg shadow-[#d4af37]/20 font-bold'
                : 'bg-[#131c20] text-[#9db2ba] hover:bg-[#1a272d] hover:text-white border border-[#25353c]'
            }`}
          >
            {t.allAccommodations} ({ROOMS_DATA.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter('double')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              filter === 'double'
                ? 'bg-[#d4af37] text-black shadow-lg shadow-[#d4af37]/20 font-bold'
                : 'bg-[#131c20] text-[#9db2ba] hover:bg-[#1a272d] hover:text-white border border-[#25353c]'
            }`}
          >
            {t.doubleRooms} (4)
          </button>
          <button
            type="button"
            onClick={() => setFilter('suite')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              filter === 'suite'
                ? 'bg-[#d4af37] text-black shadow-lg shadow-[#d4af37]/20 font-bold'
                : 'bg-[#131c20] text-[#9db2ba] hover:bg-[#1a272d] hover:text-white border border-[#25353c]'
            }`}
          >
            {t.suites} (1)
          </button>
          <button
            type="button"
            onClick={() => setFilter('villa')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              filter === 'villa'
                ? 'bg-[#d4af37] text-black shadow-lg shadow-[#d4af37]/20 font-bold'
                : 'bg-[#131c20] text-[#9db2ba] hover:bg-[#1a272d] hover:text-white border border-[#25353c]'
            }`}
          >
            {t.entireHouse}
          </button>
        </div>

        {/* Room Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRooms.map((room) => {
            const roomName = t[room.nameKey] || room.nameKey;
            const price = currency === 'BGN' ? `${room.priceBgnPerNight} лв` : `€${room.priceEurPerNight}`;

            return (
              <div
                key={room.id}
                id={`room-card-${room.id}`}
                className="bg-[#0f171a] border border-[#23333a] hover:border-[#d4af37]/60 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-[#d4af37]/10 transition-all duration-300 flex flex-col group"
              >
                {/* Room Image Container */}
                <div className="relative h-60 sm:h-64 overflow-hidden">
                  <img
                    src={room.coverImage}
                    alt={roomName}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f171a] via-transparent to-transparent" />
                  
                  {/* Badge */}
                  {room.badge && (
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#0d1518]/90 border border-[#d4af37]/40 text-[#f5d77f] text-[11px] font-bold tracking-wider backdrop-blur-md">
                      {room.badge}
                    </div>
                  )}

                  {/* Quick Gallery View Button */}
                  <button
                    type="button"
                    onClick={() => openRoomDetails(room)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-[#0d1518]/80 text-white hover:text-[#d4af37] border border-[#2e424a] backdrop-blur-md transition-transform hover:scale-110"
                    title={t.viewDetails}
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  {/* Price Tag in Bottom Right of Image */}
                  <div className="absolute bottom-3 right-4 px-3.5 py-1.5 rounded-xl bg-[#0c1417]/95 border border-[#2e424a] text-right">
                    <span className="text-base font-bold text-[#d4af37]">{price}</span>
                    <span className="text-[10px] text-[#8fa6af] ml-1">{t.perNight}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#f5f8f9] group-hover:text-[#d4af37] transition-colors leading-snug mb-2">
                      {roomName}
                    </h3>
                    
                    {/* Meta Info Bar (Guests, Bed, Size) */}
                    <div className="grid grid-cols-3 gap-2 py-3 border-y border-[#1c292f] text-xs text-[#9db2ba] mb-3">
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-[#d4af37]" />
                        <span>{room.capacityAdults + room.capacityChildren} {t.guests}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Maximize2 className="w-3.5 h-3.5 text-[#d4af37]" />
                        <span>{room.sizeSqm} m²</span>
                      </div>
                      <div className="flex items-center gap-1.5 truncate">
                        <Bed className="w-3.5 h-3.5 text-[#d4af37]" />
                        <span className="truncate">{room.bedType.split(' ')[0]}</span>
                      </div>
                    </div>

                    {/* Features Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {room.features.slice(0, 3).map((feat, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] px-2.5 py-0.5 rounded-md bg-[#162227] text-[#c0d0d6] border border-[#24363d]"
                        >
                          {feat}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => openRoomDetails(room)}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-[#152126] hover:bg-[#1d2d34] text-[#c9d8de] text-xs font-semibold border border-[#2b3e46] transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#d4af37]" />
                      <span>{t.viewDetails}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onSelectRoomForBooking(room.id)}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b38827] hover:from-[#e5c14f] hover:to-[#c49a35] text-[#0a0f11] text-xs font-bold shadow-md shadow-[#d4af37]/20 transition-all flex items-center justify-center gap-1.5 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <CalendarCheck className="w-3.5 h-3.5" />
                      <span>{t.bookThisRoom}</span>
                    </button>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Room Details & Gallery Lightbox Modal */}
      {selectedRoomModal && (
        <div 
          id="room-details-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={closeRoomDetails}
        >
          <div 
            className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#0d1417] border border-[#2d4048] rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={closeRoomDetails}
              className="absolute top-5 right-5 p-2 rounded-full bg-[#182328] text-[#9db2ba] hover:text-white border border-[#2e424a] z-10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Room Header */}
            <div>
              <div className="text-xs font-bold text-[#d4af37] uppercase tracking-wider mb-1">
                {selectedRoomModal.type.toUpperCase()} ACCOMMODATION
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                {t[selectedRoomModal.nameKey] || selectedRoomModal.nameKey}
              </h3>
            </div>

            {/* Gallery Viewer */}
            <div className="space-y-3">
              <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden border border-[#26373e]">
                <img 
                  src={selectedRoomModal.galleryImages[activeImageIndex] || selectedRoomModal.coverImage} 
                  alt="Gallery"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {selectedRoomModal.galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-14 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                      activeImageIndex === idx ? 'border-[#d4af37] scale-95' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            </div>

            {/* Room Specs & Details */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-[#121c20] border border-[#24353c]">
              <div>
                <div className="text-[11px] text-[#8ea4ad]">{t.maxGuests}</div>
                <div className="text-sm font-bold text-white">
                  {selectedRoomModal.capacityAdults} {t.adults} {selectedRoomModal.capacityChildren > 0 ? `+ ${selectedRoomModal.capacityChildren} ${t.children}` : ''}
                </div>
              </div>
              <div>
                <div className="text-[11px] text-[#8ea4ad]">{t.roomSize}</div>
                <div className="text-sm font-bold text-white">{selectedRoomModal.sizeSqm} m²</div>
              </div>
              <div>
                <div className="text-[11px] text-[#8ea4ad]">{t.bed}</div>
                <div className="text-sm font-bold text-white truncate">{selectedRoomModal.bedType}</div>
              </div>
              <div>
                <div className="text-[11px] text-[#8ea4ad]">{t.roomRate}</div>
                <div className="text-sm font-bold text-[#d4af37]">
                  {currency === 'BGN' ? `${selectedRoomModal.priceBgnPerNight} лв` : `€${selectedRoomModal.priceEurPerNight}`} {t.perNight}
                </div>
              </div>
            </div>

            {/* Included Amenities List */}
            <div>
              <h4 className="text-sm font-bold text-[#e6eff2] uppercase tracking-wider mb-3">
                {t.roomAmenitiesIncluded}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                {selectedRoomModal.amenities.map((amenity, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-[#c5d5db]">
                    <Check className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Bottom CTA */}
            <div className="pt-4 border-t border-[#223239] flex items-center justify-between gap-4">
              <div>
                <div className="text-xs text-[#8ea4ad]">{t.totalPrice} ({t.perNight}):</div>
                <div className="text-xl font-bold text-[#d4af37]">
                  {currency === 'BGN' ? `${selectedRoomModal.priceBgnPerNight} лв / €${selectedRoomModal.priceEurPerNight}` : `€${selectedRoomModal.priceEurPerNight} / ${selectedRoomModal.priceBgnPerNight} лв`}
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  const rId = selectedRoomModal.id;
                  closeRoomDetails();
                  onSelectRoomForBooking(rId);
                }}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b38827] hover:from-[#e5c14f] hover:to-[#c49a35] text-[#0a0f11] font-bold text-sm shadow-xl shadow-[#d4af37]/20 transition-all flex items-center gap-2"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>{t.bookThisRoom}</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};

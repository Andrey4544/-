import React, { useState } from 'react';
import { 
  Star, 
  Sparkles, 
  CheckCircle2, 
  Award, 
  Quote, 
  MessageSquare, 
  Send, 
  Check,
  User,
  MapPin
} from 'lucide-react';
import { Language, Review } from '../types';
import { REVIEWS_DATA } from '../data/reviews';
import { translations } from '../data/translations';

interface ReviewsSectionProps {
  currentLang: Language;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ currentLang }) => {
  const t = translations[currentLang];
  const [reviewsList, setReviewsList] = useState<Review[]>(REVIEWS_DATA);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [author, setAuthor] = useState('');
  const [cityCountry, setCityCountry] = useState('София, България');
  const [rating, setRating] = useState(10);
  const [roomStayedKey, setRoomStayedKey] = useState('Двойна Deluxe');
  const [commentKey, setCommentKey] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    const newRev: Review = {
      id: 'rev-' + Date.now(),
      author,
      cityCountry,
      rating,
      date: 'Току-що',
      roomStayedKey,
      commentKey,
      verified: true
    };
    const updated = [newRev, ...reviewsList];
    setReviewsList(updated);
    setSubmitted(true);
    setTimeout(() => {
      setIsFormOpen(false);
      setSubmitted(false);
      setAuthor('');
      setCommentKey('');
    }, 2000);
  };

  return (
    <section id="reviews" className="py-20 bg-[#070b0d] relative border-t border-[#182329]">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#162228] border border-[#2b3d45] text-[#d4af37] text-xs font-bold uppercase tracking-widest mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>{t.reviewsLabel}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#f2f6f7] mb-4">
            {t.reviewsTitle}
          </h2>
          <p className="text-sm sm:text-base text-[#9db2ba] font-light max-w-2xl mx-auto">
            {t.reviewsSubtitle}
          </p>
        </div>

        {/* Global Rating Scoreboard Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0e1619] border border-[#23333a] shadow-2xl mb-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Main Score Column */}
          <div className="lg:col-span-4 flex items-center gap-5 border-b lg:border-b-0 lg:border-r border-[#203036] pb-6 lg:pb-0 lg:pr-6">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#d4af37] text-[#090f11] flex flex-col items-center justify-center font-bold shadow-xl shadow-[#d4af37]/20 shrink-0">
              <span className="text-3xl sm:text-4xl leading-none">9.8</span>
              <span className="text-[10px] uppercase font-extrabold tracking-wider mt-1">/ 10</span>
            </div>
            <div>
              <div className="text-xs font-bold text-[#d4af37] uppercase tracking-wider">Изключителна оценка</div>
              <div className="text-lg sm:text-xl font-bold text-white mt-0.5">Booking.com & Google</div>
              <div className="flex text-[#d4af37] mt-1.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#d4af37]" />
                ))}
              </div>
            </div>
          </div>

          {/* Sub-scores breakdown */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <div className="flex justify-between text-[#a0b4bc] mb-1">
                <span>{t.cleanliness}</span>
                <span className="font-bold text-white">9.9</span>
              </div>
              <div className="w-full bg-[#172328] h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#d4af37] h-full rounded-full" style={{ width: '99%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[#a0b4bc] mb-1">
                <span>{t.staff}</span>
                <span className="font-bold text-white">9.9</span>
              </div>
              <div className="w-full bg-[#172328] h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#d4af37] h-full rounded-full" style={{ width: '99%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[#a0b4bc] mb-1">
                <span>{t.comfort}</span>
                <span className="font-bold text-white">9.8</span>
              </div>
              <div className="w-full bg-[#172328] h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#d4af37] h-full rounded-full" style={{ width: '98%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[#a0b4bc] mb-1">
                <span>{t.location}</span>
                <span className="font-bold text-white">9.7</span>
              </div>
              <div className="w-full bg-[#172328] h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#d4af37] h-full rounded-full" style={{ width: '97%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[#a0b4bc] mb-1">
                <span>{t.valueForMoney}</span>
                <span className="font-bold text-white">9.8</span>
              </div>
              <div className="w-full bg-[#172328] h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#d4af37] h-full rounded-full" style={{ width: '98%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[#a0b4bc] mb-1">
                <span>{t.poolLabel} & Спа</span>
                <span className="font-bold text-white">9.9</span>
              </div>
              <div className="w-full bg-[#172328] h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#d4af37] h-full rounded-full" style={{ width: '99%' }} />
              </div>
            </div>
          </div>

        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {reviewsList.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-3xl bg-[#0d1417] border border-[#23333a] hover:border-[#d4af37]/40 shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex text-[#d4af37]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#d4af37]" />
                    ))}
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#d4af37]/20 text-[#f5d77f] font-bold text-xs">
                    ★ {rev.rating}/10
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#c7d7dd] italic leading-relaxed mb-6 font-light">
                  "{rev.commentKey}"
                </p>
              </div>

              <div className="pt-3 border-t border-[#1c292f] flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>{rev.author}</span>
                  </div>
                  <div className="text-[10px] text-[#788f98]">{rev.cityCountry} • {rev.roomStayedKey}</div>
                </div>
                {rev.verified && (
                  <div className="flex items-center gap-1 text-[10px] text-[#2ecc71] font-semibold">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Потвърден</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Leave Review Action */}
        <div className="text-center">
          {!isFormOpen ? (
            <button
              type="button"
              onClick={() => setIsFormOpen(true)}
              className="px-6 py-3 rounded-xl bg-[#142024] hover:bg-[#1c2d33] text-[#e8f1f5] font-semibold text-xs sm:text-sm border border-[#2b3e46] hover:border-[#d4af37] transition-all inline-flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-[#d4af37]" />
              <span>{t.writeReviewBtn}</span>
            </button>
          ) : (
            <div className="max-w-xl mx-auto p-6 sm:p-8 rounded-3xl bg-[#0d1417] border border-[#2c3f47] shadow-2xl text-left">
              {submitted ? (
                <div className="text-center py-4 space-y-2">
                  <Check className="w-10 h-10 text-[#2ecc71] mx-auto" />
                  <div className="text-base font-bold text-white">Благодарим Ви за отзива!</div>
                  <p className="text-xs text-[#8ea4ad]">Вашият отзив беше добавен успешно.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmitReview} className="space-y-4">
                  <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-[#d4af37]" />
                    <span>{t.writeReviewBtn}</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[#8fa7b0] uppercase mb-1">Вашето име *</label>
                      <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        placeholder="Напр. Мария Димитрова"
                        className="w-full bg-[#152126] border border-[#2b3d45] rounded-xl px-3 py-2 text-xs text-white outline-none focus:ring-1 focus:ring-[#d4af37]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#8fa7b0] uppercase mb-1">Град / Държава</label>
                      <input
                        type="text"
                        value={cityCountry}
                        onChange={(e) => setCityCountry(e.target.value)}
                        placeholder="София, България"
                        className="w-full bg-[#152126] border border-[#2b3d45] rounded-xl px-3 py-2 text-xs text-white outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[#8fa7b0] uppercase mb-1">Оценка (1 - 10)</label>
                      <select
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                        className="w-full bg-[#152126] border border-[#2b3d45] rounded-xl px-3 py-2 text-xs text-white outline-none"
                      >
                        {[10, 9, 8, 7, 6, 5].map(r => (
                          <option key={r} value={r} className="bg-[#121c20]">{r} от 10 (Перфектно)</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#8fa7b0] uppercase mb-1">Тип настаняване</label>
                      <select
                        value={roomStayedKey}
                        onChange={(e) => setRoomStayedKey(e.target.value)}
                        className="w-full bg-[#152126] border border-[#2b3d45] rounded-xl px-3 py-2 text-xs text-white outline-none"
                      >
                        <option value="Двойна Deluxe" className="bg-[#121c20]">Двойна стая Deluxe</option>
                        <option value="Апартамент Suite" className="bg-[#121c20]">Апартамент Suite</option>
                        <option value="Цялата къща" className="bg-[#121c20]">Цялата къща</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#8fa7b0] uppercase mb-1">Вашият коментар *</label>
                    <textarea
                      rows={3}
                      value={commentKey}
                      onChange={(e) => setCommentKey(e.target.value)}
                      placeholder="Споделете впечатленията си от престоя, храната, басейна и гостоприемството..."
                      className="w-full bg-[#152126] border border-[#2b3d45] rounded-xl px-3 py-2 text-xs text-white outline-none resize-none"
                      required
                    />
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsFormOpen(false)}
                      className="px-4 py-2 rounded-xl bg-[#142024] text-[#8ea4ad] text-xs font-semibold"
                    >
                      Отказ
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b38827] text-black font-bold text-xs shadow-md"
                    >
                      Публикувай отзив
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

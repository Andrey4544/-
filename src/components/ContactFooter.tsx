import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  Navigation,
  Globe,
  Share2,
  Heart
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { EdelweissLogo } from './EdelweissLogo';

interface ContactFooterProps {
  currentLang: Language;
  onOpenMyBookings: () => void;
}

export const ContactFooter: React.FC<ContactFooterProps> = ({ currentLang, onOpenMyBookings }) => {
  const t = translations[currentLang];
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formMsg, setFormMsg] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setFormName('');
      setFormEmail('');
      setFormPhone('');
      setFormMsg('');
    }, 4000);
  };

  return (
    <footer id="contact" className="bg-[#05080a] border-t border-[#1a262c] relative pt-20 pb-12 text-[#9bb0b8]">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Contact Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#162228] border border-[#2b3d45] text-[#d4af37] text-xs font-bold uppercase tracking-widest mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span>{t.contactLabel}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#f2f6f7] mb-4">
            {t.contactTitle}
          </h2>
          <p className="text-sm sm:text-base text-[#9db2ba] font-light max-w-2xl mx-auto">
            {t.contactSubtitle}
          </p>
        </div>

        {/* Contact Grid (Cards + Form + Map) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          
          {/* Left Column: Contact Cards & Info (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Address */}
            <div className="p-5 rounded-2xl bg-[#0c1417] border border-[#203037] flex items-start gap-4">
              <div className="p-3 rounded-xl bg-[#d4af37]/15 text-[#d4af37] shrink-0 mt-1">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white mb-1">{t.addressTitle}</h4>
                <p className="text-xs text-[#9eb2ba] leading-relaxed">
                  ул. "Еделвайс" 4, кв. "Дядо Дянко", гр. Габрово 5300, България
                </p>
                <div className="text-[11px] text-[#d4af37] mt-1.5 font-medium">
                  GPS: 42.8742° N, 25.3187° E
                </div>
              </div>
            </div>

            {/* Phones */}
            <div className="p-5 rounded-2xl bg-[#0c1417] border border-[#203037] flex items-start gap-4">
              <div className="p-3 rounded-xl bg-[#2ecc71]/15 text-[#2ecc71] shrink-0 mt-1">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white mb-1">{t.phoneTitle}</h4>
                <p className="text-xs text-[#9eb2ba]">
                  Рецепция & Резервации: <a href="tel:+359888882345" className="text-white hover:text-[#d4af37] font-semibold">+359 88 888 2345</a>
                </p>
                <p className="text-xs text-[#9eb2ba] mt-0.5">
                  Ресторант: <a href="tel:+359876543210" className="text-white hover:text-[#d4af37] font-semibold">+359 87 654 3210</a>
                </p>
              </div>
            </div>

            {/* Email & Hours */}
            <div className="p-5 rounded-2xl bg-[#0c1417] border border-[#203037] flex items-start gap-4">
              <div className="p-3 rounded-xl bg-[#3498db]/15 text-[#3498db] shrink-0 mt-1">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white mb-1">{t.emailTitle}</h4>
                <p className="text-xs text-[#9eb2ba]">
                  <a href="mailto:info@edelvais.bg" className="text-white hover:text-[#d4af37]">info@edelvais.bg</a>
                </p>
                <p className="text-xs text-[#9eb2ba] mt-0.5">
                  <a href="mailto:reservations@edelvais.bg" className="text-white hover:text-[#d4af37]">reservations@edelvais.bg</a>
                </p>
              </div>
            </div>

            {/* Reception Working Hours */}
            <div className="p-5 rounded-2xl bg-[#0c1417] border border-[#203037] flex items-start gap-4">
              <div className="p-3 rounded-xl bg-[#e67e22]/15 text-[#e67e22] shrink-0 mt-1">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white mb-1">{t.receptionHours}</h4>
                <p className="text-xs text-[#9eb2ba]">
                  Всеки ден: 08:00 – 22:00 ч. (Настаняване: след 14:00 ч.)
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Direct Message Form (7 Cols) */}
          <div className="lg:col-span-7 bg-[#0c1417] border border-[#23333a] rounded-3xl p-6 sm:p-8 shadow-2xl">
            {sent ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#27ae60]/20 border border-[#27ae60] text-[#27ae60] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-white">Съобщението е изпратено!</h3>
                <p className="text-sm text-[#9eb2ba] max-w-md mx-auto">{t.contactSuccess}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-4">
                  Изпратете ни директно запитване
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#8fa7b0] uppercase mb-1.5">{t.fullName} *</label>
                    <input
                      type="text"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="Вашето име"
                      className="w-full bg-[#152126] border border-[#2b3d45] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white outline-none focus:ring-2 focus:ring-[#d4af37]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#8fa7b0] uppercase mb-1.5">{t.email} *</label>
                    <input
                      type="email"
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full bg-[#152126] border border-[#2b3d45] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white outline-none focus:ring-2 focus:ring-[#d4af37]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#8fa7b0] uppercase mb-1.5">{t.phone}</label>
                  <input
                    type="tel"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    placeholder="+359 88 123 4567"
                    className="w-full bg-[#152126] border border-[#2b3d45] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white outline-none focus:ring-2 focus:ring-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#8fa7b0] uppercase mb-1.5">{t.message} *</label>
                  <textarea
                    rows={4}
                    value={formMsg}
                    onChange={(e) => setFormMsg(e.target.value)}
                    placeholder="Въведете Вашето запитване за престой, групови събития, наем на цялата къща..."
                    className="w-full bg-[#152126] border border-[#2b3d45] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white outline-none focus:ring-2 focus:ring-[#d4af37] resize-none"
                    required
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b38827] hover:from-[#e5c14f] hover:to-[#c49a35] text-[#0a0f11] font-bold text-xs sm:text-sm shadow-xl shadow-[#d4af37]/20 transition-all flex items-center gap-2"
                  >
                    <Send className="w-4 h-4 text-black" />
                    <span>{t.sendMessage}</span>
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

        {/* Interactive Map Frame / Preview */}
        <div className="rounded-3xl overflow-hidden border border-[#22333a] shadow-2xl mb-16 h-80 relative bg-[#10181b]">
          <iframe
            title="Edelveiss Location Map Gabrovo"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d46618.34444535314!2d25.2897453!3d42.8712398!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40a9277c08828945%3A0x400a01269bf56a0!2sGabrovo%2C%20Bulgaria!5e0!3m2!1sen!2sbg!4v1700000000000!5m2!1sen!2sbg"
            width="100%"
            height="100%"
            style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)' }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="absolute top-4 left-4 p-3 rounded-2xl bg-[#0a1012]/95 border border-[#2c3f47] backdrop-blur-md shadow-lg pointer-events-none">
            <div className="text-xs font-bold text-white flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>
                {currentLang === 'bg' ? 'Бутиков комплекс "Еделвайс" • Габрово' : 'Boutique Complex "Edelveiss" • Gabrovo'}
              </span>
            </div>
            <div className="text-[11px] text-[#8fa7b0]">
              {currentLang === 'bg' ? 'Тиха зона сред природата в кв. Дядо Дянко' : 'Peaceful mountain district, Dyado Dyanko, Gabrovo'}
            </div>
          </div>
        </div>

        {/* Bottom Sub-Footer & Copyright */}
        <div className="pt-8 border-t border-[#182329] flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <EdelweissLogo size="sm" title={currentLang === 'bg' ? 'Еделвайс' : 'Edelveiss'} />
            <div className="flex flex-col text-left">
              <span className="font-serif text-base font-bold text-white tracking-wider">
                {currentLang === 'bg' ? 'Еделвайс' : 'Edelveiss'}
              </span>
              <span className="text-[10px] text-[#8fa5ad]">
                {currentLang === 'bg' ? 'Бутикова къща за гости • Габрово' : t.brandSubtitle}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={onOpenMyBookings}
              className="text-[#d4af37] hover:underline font-semibold"
            >
              {t.myBookingsTitle}
            </button>
            <a href="#about" className="hover:text-white transition-colors">{t.aboutLabel}</a>
            <a href="#rooms" className="hover:text-white transition-colors">{t.roomsLabel}</a>
            <a href="#restaurant" className="hover:text-white transition-colors">{t.restaurantLabel}</a>
            <a href="#pool" className="hover:text-white transition-colors">{t.poolLabel}</a>
          </div>

          <div className="text-[#6b8089]">
            © {new Date().getFullYear()} {currentLang === 'bg' ? 'Комплекс "Еделвайс"' : 'Edelveiss Guest House'}. {t.allRightsReserved || 'Всички права запазени.'}
          </div>
        </div>

      </div>
    <div className="pt-3 text-center text-[11px] opacity-75"><a href="https://ar-studio.site" className="hover:underline">Website made by AR Studio</a></div>
    </footer>
  );
};

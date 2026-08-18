import React from 'react';
import { 
  Award, 
  Waves, 
  Flame, 
  Compass, 
  ShieldCheck, 
  CheckCircle2,
  TreePine,
  Sparkles
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface AboutSectionProps {
  currentLang: Language;
  onScrollToBooking: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ currentLang, onScrollToBooking }) => {
  const t = translations[currentLang];

  const pillars = [
    {
      icon: Award,
      title: t.aboutFeature1Title,
      desc: t.aboutFeature1Desc,
      color: 'from-[#d4af37]/20 to-[#d4af37]/5',
      iconColor: 'text-[#d4af37]'
    },
    {
      icon: Waves,
      title: t.aboutFeature2Title,
      desc: t.aboutFeature2Desc,
      color: 'from-[#3498db]/20 to-[#3498db]/5',
      iconColor: 'text-[#3498db]'
    },
    {
      icon: Flame,
      title: t.aboutFeature3Title,
      desc: t.aboutFeature3Desc,
      color: 'from-[#e67e22]/20 to-[#e67e22]/5',
      iconColor: 'text-[#e67e22]'
    },
    {
      icon: Compass,
      title: t.aboutFeature4Title,
      desc: t.aboutFeature4Desc,
      color: 'from-[#2ecc71]/20 to-[#2ecc71]/5',
      iconColor: 'text-[#2ecc71]'
    }
  ];

  return (
    <section id="about" className="py-20 bg-[#0a0f12] relative overflow-hidden border-t border-[#1a262c]">
      
      {/* Subtle Background Glow */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-[#3498db]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#162228] border border-[#2b3d45] text-[#d4af37] text-xs font-bold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.aboutLabel}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#f2f6f7] leading-tight mb-5">
            {t.aboutTitle}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mb-6" />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          
          {/* Left Column: Visual Story */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-[#2a3c44] shadow-2xl group">
              <img 
                src="/src/assets/images/edelveiss_hero_1787050830631.jpg" 
                alt="Edelveiss Mountain Complex in Gabrovo" 
                className="w-full h-[420px] sm:h-[480px] object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f12] via-transparent to-transparent" />
              
              {/* Floating Badge in Image */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#0c1417]/90 border border-[#2d4048] backdrop-blur-md flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-[#d4af37] uppercase tracking-wider">Габрово, ул. "Еделвайс" 4</div>
                  <div className="text-sm font-semibold text-white">Кв. Дядо Дянко • В полите на Стара планина</div>
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-[#d4af37] text-black font-bold text-sm shadow-md">
                  ★ 9.8
                </div>
              </div>
            </div>

            {/* Overlapping small accent card */}
            <div className="hidden sm:flex absolute -top-5 -right-5 p-4 rounded-2xl bg-[#142025] border border-[#2c3f47] shadow-2xl items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#d4af37]/20 text-[#d4af37]">
                <TreePine className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-white">Чист балкански въздух</div>
                <div className="text-[11px] text-[#8fa6af]">Вековни борови гори</div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Pillars */}
          <div className="lg:col-span-6 space-y-6">
            <p className="text-base sm:text-lg text-[#c5d5db] leading-relaxed">
              {t.aboutP1}
            </p>
            <p className="text-sm sm:text-base text-[#9ab0b8] leading-relaxed">
              {t.aboutP2}
            </p>

            {/* Highlights List */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-sm text-[#e0ebef]">
                <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>4 бутикови двойни стаи Deluxe + 1 луксозен просторен апартамент</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#e0ebef]">
                <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>Открит топъл басейн с шезлонги и лятна тераса</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#e0ebef]">
                <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>Ресторант & механа с жива камина и автентични балкански специалитети</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#e0ebef]">
                <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>Обезопасен детски кът, безплатен частен паркинг и супер бърз Wi-Fi</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="button"
                onClick={onScrollToBooking}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b38827] hover:from-[#e5c14f] hover:to-[#c49a35] text-[#0a0f11] font-bold text-sm shadow-xl shadow-[#d4af37]/20 transition-all flex items-center gap-2"
              >
                <span>{t.bookNow}</span>
                <Sparkles className="w-4 h-4 text-black" />
              </button>
            </div>

          </div>

        </div>

        {/* 4 Value Pillars Bento */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className={`p-6 rounded-2xl bg-gradient-to-b ${p.color} border border-[#26373e] hover:border-[#d4af37]/50 transition-all duration-300 group`}
              >
                <div className={`w-12 h-12 rounded-xl bg-[#141f24] border border-[#2b3d45] flex items-center justify-center mb-4 ${p.iconColor} group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white mb-2 group-hover:text-[#d4af37] transition-colors">
                  {p.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#91a7b0] leading-relaxed">
                  {p.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

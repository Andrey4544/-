import React from 'react';
import { 
  Waves, 
  Sun, 
  TreePine, 
  Flame, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  Droplets,
  Heart
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface PoolGardenSectionProps {
  currentLang: Language;
  onScrollToBooking: () => void;
}

export const PoolGardenSection: React.FC<PoolGardenSectionProps> = ({ currentLang, onScrollToBooking }) => {
  const t = translations[currentLang];

  const poolFeatures = [
    {
      icon: Droplets,
      title: t.poolFeature1,
      desc: 'Подгрята кристално чиста планинска вода за пълен релакс през целия летен сезон.',
      color: 'text-[#3498db]',
      bg: 'bg-[#3498db]/15'
    },
    {
      icon: Sun,
      title: t.poolFeature2,
      desc: 'Премиум дървени шезлонги с меки матраци, чадъри и кърпи за басейна без допълнително заплащане.',
      color: 'text-[#f1c40f]',
      bg: 'bg-[#f1c40f]/15'
    },
    {
      icon: Flame,
      title: t.poolFeature3,
      desc: 'Външно барбекю огнище и сенчеста беседка за незабравими вечери на открито с приятели.',
      color: 'text-[#e67e22]',
      bg: 'bg-[#e67e22]/15'
    },
    {
      icon: TreePine,
      title: t.poolFeature4,
      desc: 'Панорамен 360° изглед към вековните гори на Стара планина и свеж балкански бриз.',
      color: 'text-[#2ecc71]',
      bg: 'bg-[#2ecc71]/15'
    }
  ];

  return (
    <section id="pool" className="py-20 bg-[#070b0d] relative overflow-hidden border-t border-[#182329]">
      
      {/* Soft Cyan Water Glow */}
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-[#3498db]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#162228] border border-[#2b3d45] text-[#3498db] text-xs font-bold uppercase tracking-widest mb-3">
            <Waves className="w-3.5 h-3.5" />
            <span>{t.poolLabel}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#f2f6f7] mb-4">
            {t.poolTitle}
          </h2>
          <p className="text-sm sm:text-base text-[#9db2ba] font-light max-w-2xl mx-auto">
            {t.poolSubtitle}
          </p>
        </div>

        {/* Big Visual & Feature Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Pool Image with interactive tags */}
          <div className="lg:col-span-7 relative">
            <div className="relative rounded-3xl overflow-hidden border border-[#263840] shadow-2xl group">
              <img 
                src="/src/assets/images/edelveiss_pool_1787050889240.jpg" 
                alt="Edelveiss Heated Swimming Pool & Garden" 
                className="w-full h-[400px] sm:h-[480px] object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070b0d] via-transparent to-transparent" />
              
              {/* Overlay Badges */}
              <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-xl bg-[#091114]/90 border border-[#3498db]/40 text-[#5dade2] text-xs font-bold backdrop-blur-md flex items-center gap-1.5">
                <Droplets className="w-4 h-4" />
                <span>Вода 28°C • Постоянно филтриране</span>
              </div>

              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#0c1417]/90 border border-[#2d4048] backdrop-blur-md flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-[#3498db] uppercase tracking-wider">Работно време на басейна</div>
                  <div className="text-sm font-semibold text-white">Всеки ден от 09:00 до 20:00 ч. (Сезонно)</div>
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-[#3498db]/20 text-[#3498db] border border-[#3498db]/40 text-xs font-bold">
                  Безплатно за гости
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 4 Feature cards & Booking CTA */}
          <div className="lg:col-span-5 space-y-4">
            {poolFeatures.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-[#0e1619] border border-[#1f2e34] hover:border-[#3498db]/40 transition-all group flex items-start gap-4"
                >
                  <div className={`p-3 rounded-xl ${feat.bg} ${feat.color} shrink-0 mt-0.5 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white group-hover:text-[#5dade2] transition-colors">
                      {feat.title}
                    </h3>
                    <p className="text-xs text-[#8ea4ad] mt-1 leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                </div>
              );
            })}

            <div className="pt-4">
              <button
                type="button"
                onClick={onScrollToBooking}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#3498db] to-[#2980b9] hover:from-[#5dade2] hover:to-[#3498db] text-white font-bold text-sm shadow-xl shadow-[#3498db]/20 transition-all flex items-center justify-center gap-2"
              >
                <span>{t.bookNow}</span>
                <Sparkles className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { 
  Compass, 
  MapPin, 
  Clock, 
  Sparkles, 
  Navigation,
  TreePine,
  Landmark,
  Church
} from 'lucide-react';
import { Language } from '../types';
import { ATTRACTIONS_DATA } from '../data/attractions';
import { translations } from '../data/translations';

interface AttractionsSectionProps {
  currentLang: Language;
}

export const AttractionsSection: React.FC<AttractionsSectionProps> = ({ currentLang }) => {
  const t = translations[currentLang];
  const [selectedAttractionId, setSelectedAttractionId] = useState<string>('all');

  const filteredAttractions = ATTRACTIONS_DATA.filter((attr) => {
    if (selectedAttractionId === 'all') return true;
    return attr.id === selectedAttractionId;
  });

  return (
    <section id="attractions" className="py-20 bg-[#090e10] relative border-t border-[#1a262c]">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#162228] border border-[#2b3d45] text-[#2ecc71] text-xs font-bold uppercase tracking-widest mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>{t.attractionsLabel}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#f2f6f7] mb-4">
            {t.attractionsTitle}
          </h2>
          <p className="text-sm sm:text-base text-[#9db2ba] font-light max-w-2xl mx-auto">
            {t.attractionsSubtitle}
          </p>
        </div>

        {/* Attractions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAttractions.map((attr) => {
            const title = t[attr.nameKey] || attr.nameKey;
            const desc = t[attr.descKey] || attr.descKey;

            return (
              <div
                key={attr.id}
                className="bg-[#0f171a] border border-[#23333a] hover:border-[#2ecc71]/40 rounded-3xl overflow-hidden shadow-xl transition-all duration-300 flex flex-col group"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={attr.imageUrl}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f171a] via-transparent to-transparent" />
                  
                  {/* Distance badge */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-[#091012]/90 border border-[#2c4048] text-xs font-bold text-white flex items-center gap-1.5 backdrop-blur-md">
                    <MapPin className="w-3.5 h-3.5 text-[#2ecc71]" />
                    <span>{attr.distance} км ({attr.driveTime} мин с кола)</span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-white group-hover:text-[#2ecc71] transition-colors mb-2">
                      {title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#8fa4ad] leading-relaxed line-clamp-3">
                      {desc}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#1c292f] flex items-center justify-between text-xs text-[#d4af37]">
                    <span className="font-semibold">{attr.highlightKey}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

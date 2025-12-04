import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { theme } from '../../constants';

type TripSummaryCardProps = {
  activeTrip: any;
  userPreference?: any;
  isExpanded: boolean;
  setIsExpanded: (value: boolean) => void;
};

export const TripSummaryCard = ({ activeTrip, userPreference, isExpanded, setIsExpanded }: TripSummaryCardProps) => (
  <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-4 transition-all duration-300">
    <div
      className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex flex-col gap-1.5">
        <p className="text-lg font-bold text-[#333]">这次我们在规划【{activeTrip.name}】</p>
        <p className="text-xs text-[#666]">{activeTrip.subtitle}</p>
        {userPreference && (
          <p className="text-xs text-[#999]">
            当前已应用你的旅行偏好：<span className="text-[#00bdd6] font-medium">{userPreference.tags.join(' · ')}</span>
          </p>
        )}
      </div>
      {isExpanded ? <ChevronUp size={20} className="text-[#999]" /> : <ChevronDown size={20} className="text-[#999]" />}
    </div>

    {isExpanded && (
      <div className="px-4 pb-4 border-t border-gray-100 pt-3 animate-in slide-in-from-top-2 duration-200">
         <p className="text-sm text-[#333] leading-relaxed mb-3">
           {activeTrip.tagline}
         </p>
         <div className="flex flex-wrap gap-2">
            {[`行程天数：${activeTrip.duration} 天`, `预算：约 ${activeTrip.pricePerPerson}/人`, `线路：${activeTrip.tag}`].map(tag => (
              <span key={tag} className="text-xs font-medium px-2.5 py-1.5 rounded-lg bg-[#E0F2F1]" style={{ color: theme.colors.primary }}>
                 {tag}
              </span>
            ))}
         </div>
      </div>
    )}
  </div>
);

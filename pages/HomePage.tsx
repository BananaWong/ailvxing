import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, Sparkles } from 'lucide-react';
import { theme, recommendedTrips, groupTrips, demoTrip } from '../constants';
import { ProgressBar } from '../components/ui/ProgressBar';

interface HomePageProps {
  onNavigate: (page: string) => void;
  setActiveTrip: (trip: any) => void;
  setPreloadedQuestion: (q: string) => void;
  settings: any;
  userPreference: any;
}

export const HomePage = ({ onNavigate, setActiveTrip, setPreloadedQuestion, settings, userPreference }: HomePageProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const tags = ['全部', ...Array.from(new Set(recommendedTrips.map(trip => trip.tag)))];
  const [activeTag, setActiveTag] = useState(tags[0]);
  // Exclude demoTrip from recommendations to avoid duplication
  const filteredTripsRaw = activeTag === '全部' ? recommendedTrips : recommendedTrips.filter(trip => trip.tag === activeTag);
  const filteredTrips = filteredTripsRaw.filter(trip => trip.id !== demoTrip.id);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;
    const scrollSpeed = 0.5; // Increased speed for visible animation
    let animationFrameId: number;
    const scroll = () => {
      if (!isPaused) {
        // Smooth continuous loop
        if (scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth - 1) {
          scrollContainer.scrollLeft = 0;
        } else {
          scrollContainer.scrollLeft += scrollSpeed;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };
    animationFrameId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused, filteredTrips]);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = 0;
    }
  }, [activeTag]);

  return (
    <div className="flex flex-col gap-5 pb-24">
      {/* Hero / Search Section */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-[#cde6ea]">
        <div className="relative h-72 w-full">
            <img
              alt={demoTrip.name}
              className="w-full h-full object-cover"
              src={demoTrip.image}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6 text-white w-full">
              <p className="text-xs font-medium mb-2 opacity-90">本期精选 · 中国深度线路</p>
              <h1 className="text-2xl font-bold leading-tight mb-1">{demoTrip.name}</h1>
              <p className="text-sm font-normal opacity-90 mb-2">{demoTrip.tagline}</p>
              {/* Personalized explanation */}
              {settings?.enablePersonalizedRecommendations && userPreference && (
                <p className="text-[11px] opacity-90 mb-3 leading-relaxed">
                  根据你的深度指数 <span className="font-bold">{userPreference.depthScore}</span>（{userPreference.typeName}），我们为你精选这条<strong>大西北 10 日环线</strong>：车程强度适中、景观密度高，又保留了适当的自由时间。
                </p>
              )}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setActiveTrip(demoTrip);
                    onNavigate('planDetails');
                  }}
                  className="flex-1 h-10 rounded-full text-sm font-bold bg-white text-[#333] hover:bg-gray-100 transition-colors"
                >
                  查看线路详情
                </button>
                <button
                  onClick={() => {
                    setActiveTrip(demoTrip);
                    onNavigate('workbench');
                  }}
                  className="flex-1 h-10 rounded-full text-sm font-bold border-2 border-white text-white hover:bg-white/10 transition-colors"
                >
                  和 AI 聊聊这条
                </button>
              </div>
            </div>
        </div>
      </div>

       {/* Recommendations with Auto Carousel */}
       <div className="bg-white rounded-2xl shadow-sm border border-[#cde6ea] p-4">
        <div className="flex items-center justify-between mb-1">
           <h3 className="text-[#333] font-bold text-lg">本期推荐线路</h3>
           <button
            onClick={() => onNavigate('recommendedRoutes')}
            className="flex items-center gap-0.5 text-xs font-medium text-[#00bdd6]"
           >
              查看所有
              <ChevronRight size={14} />
           </button>
        </div>
        <p className="text-gray-500 text-sm font-normal mt-1 mb-1">本期为你精选的深度线路，优先推荐中国本土路线。</p>
        {settings?.enablePersonalizedRecommendations ? (
          <>
            <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-[#e0f7fa] text-[#00bdd6] text-xs font-medium mb-1">
              <Sparkles size={12} />
              <span>个性化推荐已开启</span>
            </div>
            {userPreference && (
              <p className="text-xs text-[#666] mb-2 leading-relaxed">
                本期为你精选的<strong>大西北 10 日环线</strong>已放在上方主推位，下面是其它同样适合你的深度线路推荐。
              </p>
            )}
          </>
        ) : (
          <p className="text-xs text-[#999] mb-2">当前推荐为通用示例</p>
        )}

        <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
             {tags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  className={`shrink-0 h-8 px-4 rounded-full text-xs font-medium border transition-colors ${activeTag === tag ? 'border-transparent text-white' : 'border-gray-200 text-gray-500'}`}
                  style={{ backgroundColor: activeTag === tag ? theme.colors.primary : 'transparent' }}
                >
                  {tag}
                </button>
             ))}
        </div>

        {/* Carousel Container - Only showing other trips (demoTrip excluded) */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          {/* First Set */}
          {filteredTrips.map(trip => (
            <div key={trip.id} className="shrink-0 w-64 rounded-xl border border-gray-100 overflow-hidden group bg-white">
              <div className="h-32 overflow-hidden">
                <img src={trip.image} alt={trip.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-3">
                <h4 className="font-bold text-[#333] text-sm truncate">{trip.title}</h4>
                <p className="text-xs font-normal text-gray-500 mt-1 truncate">{trip.subtitle}</p>
                <div className="text-xs p-2 rounded-lg my-3 border-l-2 h-16 overflow-hidden relative" style={{ backgroundColor: theme.colors.primaryLight, borderColor: theme.colors.primary }}>
                   <p className="font-bold mb-1" style={{ color: theme.colors.primary }}>AI 小结：</p>
                   <p className="text-gray-600 font-normal line-clamp-2">{trip.aiSummary}</p>
                </div>
                <p className="text-lg font-bold" style={{ color: theme.colors.accent }}>{trip.price}</p>
              </div>
            </div>
          ))}

          {/* Second Set - Duplicate for seamless loop */}
          {filteredTrips.map(trip => (
            <div key={`dup-${trip.id}`} className="shrink-0 w-64 rounded-xl border border-gray-100 overflow-hidden group bg-white">
              <div className="h-32 overflow-hidden">
                <img src={trip.image} alt={trip.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-3">
                <h4 className="font-bold text-[#333] text-sm truncate">{trip.title}</h4>
                <p className="text-xs font-normal text-gray-500 mt-1 truncate">{trip.subtitle}</p>
                <div className="text-xs p-2 rounded-lg my-3 border-l-2 h-16 overflow-hidden relative" style={{ backgroundColor: theme.colors.primaryLight, borderColor: theme.colors.primary }}>
                   <p className="font-bold mb-1" style={{ color: theme.colors.primary }}>AI 小结：</p>
                   <p className="text-gray-600 font-normal line-clamp-2">{trip.aiSummary}</p>
                </div>
                <p className="text-lg font-bold" style={{ color: theme.colors.accent }}>{trip.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Group Buying */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#cde6ea] p-4">
        <h3 className="text-[#333] font-bold text-lg mb-1">别人正在拼的行程</h3>
        <p className="text-gray-500 text-xs font-normal mb-4">看看现在有哪些正在集结的团，找到感兴趣的就可以直接加入。</p>

        <div className="space-y-4">
          {groupTrips.map(trip => (
             <div
              key={trip.id}
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => {
                setActiveTrip(demoTrip);
                onNavigate('groupList');
              }}
             >
                <img src={trip.image} className="size-16 rounded-lg object-cover" alt={trip.title} />
                <div className="flex-1">
                  <h4 className="font-bold text-[#333] text-sm">{trip.title} · <span style={{ color: theme.colors.primary }}>{trip.current} / {trip.max} 人</span></h4>
                  <p className="text-xs font-medium text-gray-400 mt-1">{trip.date}</p>
                  <ProgressBar progress={(trip.current / trip.max) * 100} />
                </div>
                <button
                  className="shrink-0 h-8 px-3 rounded-lg text-xs font-bold"
                  style={{ backgroundColor: theme.colors.primaryLight, color: theme.colors.primary }}
                >
                  加入拼团
                </button>
             </div>
          ))}
        </div>
      </div>

    </div>
  );
};

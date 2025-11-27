import React, { useState, useEffect, useRef } from 'react';
import { 
  Compass, 
  Mic, 
  ArrowUp, 
  ShoppingBag, 
  Languages, 
  Music, 
  MoreHorizontal, 
  Home, 
  Map as MapIcon, 
  User, 
  ArrowRight,
  Search,
  Users,
  Sparkles,
  Loader2,
  XCircle,
  Bot,
  ArrowLeft,
  HelpCircle,
  Check,
  ChevronRight,
  MapPin,
  Tent,
  Hotel,
  Send,
  ChevronDown,
  ChevronUp,
  PlusCircle,
  CheckCircle2,
  Clock,
  Utensils,
  RefreshCcw,
  Bell,
  Shield,
  FileText,
  LogOut,
  Heart,
  Smile,
  Share2,
  Info,
  Car,
  Ticket,
  Sun,
  Navigation,
  Bus,
  Camera,
  Phone,
  AlertTriangle,
  Edit,
  Calendar,
  Contact,
  LucideIcon,
  ShoppingCart,
  Mountain,
  Landmark,
  Frown,
  Play,
  Hourglass,
  MessageCircle
} from 'lucide-react';

import { theme, activeTrips, recommendedTrips, groupTrips, quizQuestions } from './constants';
import { callGeminiAPI } from './services/geminiService';

// --- Components ---

const ProgressBar = ({ progress }: { progress: number }) => (
  <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1 overflow-hidden">
    <div 
      className="h-full rounded-full transition-all duration-500" 
      style={{ width: `${progress}%`, backgroundColor: theme.colors.primary }}
    ></div>
  </div>
);

// Fix: Make children optional to resolve TS error
const Chip = ({ children, active, onClick }: { children?: React.ReactNode; active?: boolean; onClick?: () => void }) => (
  <button 
    onClick={onClick}
    className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-medium transition-colors hover:scale-105 active:scale-95`}
    style={{ 
      backgroundColor: active ? theme.colors.primary : theme.colors.primaryLight,
      color: active ? '#fff' : theme.colors.primary
    }}
  >
    {children}
  </button>
);

interface IconButtonProps {
  icon: LucideIcon;
  label: string;
  colorClass?: string;
  bgClass?: string;
  iconStyle?: React.CSSProperties;
}

const IconButton = ({ icon: Icon, label, colorClass = "text-gray-500", bgClass = "bg-gray-100", iconStyle = {} }: IconButtonProps) => (
  <a className="flex flex-col items-center gap-2 cursor-pointer group" href="#">
    <div className={`flex items-center justify-center size-12 rounded-full ${bgClass} ${colorClass} transition-transform group-hover:scale-105`} style={iconStyle}>
      <Icon size={24} />
    </div>
    <p className="text-xs text-gray-600">{label}</p>
  </a>
);

// --- Pages ---

// 1. Home Page
const HomePage = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  const [inputText, setInputText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const tags = ['全部', ...Array.from(new Set(recommendedTrips.map(trip => trip.tag)))];
  const [activeTag, setActiveTag] = useState(tags[0]);
  const filteredTrips = activeTag === '全部' ? recommendedTrips : recommendedTrips.filter(trip => trip.tag === activeTag);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;
    const scrollSpeed = 1;
    let animationFrameId: number;
    const scroll = () => {
      if (!isPaused) {
        if (scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth) {
          scrollContainer.scrollLeft = 0;
        } else {
          scrollContainer.scrollLeft += scrollSpeed;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };
    animationFrameId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = 0;
    }
  }, [activeTag]);

  const handleAISubmit = async () => {
    if (!inputText.trim()) return;
    setIsGenerating(true);
    setAiResponse(null);
    const systemPrompt = `你是一个专业的旅行规划助手 DeepTrip AI。请用亲切、专业的口吻回答用户关于旅行的问题。如果是规划行程，请列出简要的每日安排。用户输入: ${inputText}`;
    const result = await callGeminiAPI(systemPrompt);
    setAiResponse(result);
    setIsGenerating(false);
  };

  const handleChipClick = (text: string) => {
    setInputText(text);
  };

  return (
    <div className="flex flex-col gap-5 pb-24">
      {/* Hero / Search Section */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-[#cde6ea]">
        <div className="relative h-64 w-full">
            <img 
              alt="Hero" 
              className="w-full h-full object-cover" 
              src="https://images.unsplash.com/photo-1508804185872-d7badad00f7d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6 text-white">
              <h1 className="text-2xl font-bold leading-tight">你的专属AI旅行伙伴<br/>开启全新探索</h1>
            </div>
        </div>

        <div className="p-4">
          <div className="relative">
            <textarea 
              className="w-full resize-none rounded-xl bg-[#f5f8f8] border-none p-4 text-sm font-normal text-[#333] placeholder:text-gray-400 focus:ring-2 focus:ring-[#00bdd6] focus:outline-none transition-all"
              rows={3}
              placeholder="例：五一从上海出发，想走一圈川西，看雪山和星空，预算 6000..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            ></textarea>
            
            <div className="flex items-center justify-end gap-2 mt-2">
              <button className="flex items-center justify-center p-2.5 rounded-lg bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors">
                <Mic size={18} />
              </button>
              <button 
                onClick={handleAISubmit}
                disabled={isGenerating || !inputText.trim()}
                className={`flex items-center justify-center p-2.5 rounded-lg text-white shadow-md transition-all ${isGenerating || !inputText.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'}`}
                style={{ backgroundColor: theme.colors.primary }}
              >
                {isGenerating ? <Loader2 size={18} className="animate-spin" /> : <ArrowUp size={18} />}
              </button>
            </div>
          </div>

          {aiResponse && (
            <div className="mt-4 bg-[#e0f7fa] border border-[#00bdd6]/30 rounded-xl p-4 animate-in fade-in slide-in-from-bottom-2">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                   <Sparkles size={16} className="text-[#00bdd6]" />
                   <span className="font-bold text-[#00bdd6] text-sm">AI 行程建议</span>
                </div>
                <button onClick={() => setAiResponse(null)} className="text-gray-400 hover:text-gray-600">
                  <XCircle size={16} />
                </button>
              </div>
              <div className="text-sm font-normal text-gray-700 whitespace-pre-wrap leading-relaxed">
                {aiResponse}
              </div>
            </div>
          )}

          <div className="mt-4 flex gap-2 overflow-x-auto scrollbar-hide pb-1">
            <Chip onClick={() => handleChipClick("4天成都+周边行程规划")}>4天成都+周边</Chip>
            <Chip onClick={() => handleChipClick("推荐一些暑假带父母去凉快点的地方")}>暑假带父母去凉快点</Chip>
            <Chip onClick={() => handleChipClick("帮我规划国庆去大西北的行程")}>国庆去大西北</Chip>
          </div>

          {!aiResponse && (
            <div className="mt-4 bg-[#f5f8f8] border border-[#cde6ea] rounded-xl p-3">
              <div className="text-sm flex items-center gap-2">
                <span className="font-medium text-gray-400 text-xs">上次你问</span>
                <span className="font-bold text-[#333] truncate">川西小环线7天怎么安排？</span>
              </div>
              <div className="text-sm mt-2 border-l-4 pl-3" style={{ borderColor: theme.colors.primary }}>
                <p className="font-bold text-xs mb-1" style={{ color: theme.colors.primary }}>AI 总结</p>
                <p className="text-gray-500 text-xs font-normal line-clamp-2">为你规划了成都出发的7日经典川西小环线，涵盖四姑娘山、丹巴藏寨、新都桥...</p>
              </div>
              <button 
                onClick={() => onNavigate('workbench')}
                className="mt-3 w-full py-2 text-center text-xs font-bold rounded-lg hover:bg-opacity-20 transition-colors"
                style={{ backgroundColor: theme.colors.primaryLight, color: theme.colors.primary }}
              >
                在 AI 工作台中继续对话 →
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Ongoing Trip Card */}
      <div 
        className="bg-white rounded-2xl shadow-sm border border-[#cde6ea] p-4 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => onNavigate('itinerary')}
      >
        <p className="text-sm font-bold text-[#333] mb-3">进行中的行程</p>
        <div className="relative h-44 rounded-xl overflow-hidden group">
          <img 
            alt="Trip" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
            src={activeTrips[0].image} 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
          <h3 className="absolute bottom-3 left-4 text-white font-bold text-lg">{activeTrips[0].title}</h3>
        </div>
        <div className="mt-4">
          <div className="flex justify-between items-end mb-1">
            <p className="text-sm font-bold text-[#333]">今天的大致安排</p>
            <div className="text-xs font-medium text-gray-400">Day {activeTrips[0].day} / {activeTrips[0].totalDays}</div>
          </div>
          <p className="text-xs font-normal text-gray-500 leading-relaxed mb-3">{activeTrips[0].todaySchedule}</p>
          <ProgressBar progress={activeTrips[0].progress} />
        </div>
      </div>

      {/* User Preference */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#cde6ea] p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[#333] font-bold text-lg">我的旅行偏好</h3>
          <button 
            onClick={() => onNavigate('preference')}
            className="text-sm font-bold transition-opacity hover:opacity-80" 
            style={{ color: theme.colors.primary }}
          >
            调整
          </button>
        </div>
        <div className="rounded-xl p-4 flex items-center gap-4" style={{ backgroundColor: theme.colors.primaryLight }}>
          <div className="size-16 rounded-full bg-white flex items-center justify-center shadow-sm overflow-hidden">
             <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxdNtgstku1C8AwYScBExEUOji0z_zwR7sGOFjLIM1hrVU_m4qQGgErbhoJNbPrsgT5eYGj92py8DDHWbo0TQKfOtKs9e1rnCmR4wFN8GePyN0znBEIzRNuo8_YzZtqIjKCASx2_bLpWmQlDUlOQXIpFEXi-acC3eeqx6nsOK1wUzZDmZ_tZ6aDiffRfP4xO-nX87t4foh5ygwpHcSTMxSSoLb8EcaU2AkqrM281vAg2MmHQanW_AbdppkT-chBT-oFK20VZwgPe4I" alt="User Avatar" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <p className="font-bold text-lg" style={{ color: theme.colors.primary }}>“谋定而动的规划家”</p>
            <p className="text-gray-600 text-xs font-medium mt-1">享受井井有条的旅行，偏爱在出发前就规划好一切。</p>
          </div>
        </div>
      </div>

      {/* Toolbox */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#cde6ea] p-4">
        <h3 className="text-[#333] font-bold text-lg mb-4">便捷服务</h3>
        <div className="grid grid-cols-4 gap-3 text-center">
          <IconButton icon={ShoppingBag} label="行李打包" bgClass="bg-orange-50" colorClass="text-orange-500" />
          <IconButton icon={Languages} label="实时翻译" bgClass="bg-teal-50" colorClass="text-teal-500" />
          <IconButton icon={Music} label="旅途音乐" bgClass="" colorClass="" iconStyle={{ backgroundColor: theme.colors.neteaseBg, color: theme.colors.neteaseRed }} />
          <IconButton icon={MoreHorizontal} label="全部工具" />
        </div>
      </div>

       {/* Recommendations with Auto Carousel */}
       <div className="bg-white rounded-2xl shadow-sm border border-[#cde6ea] p-4">
        <div className="flex items-center justify-between mb-1">
           <h3 className="text-[#333] font-bold text-lg">可能喜欢</h3>
           <button 
            onClick={() => onNavigate('recommendedRoutes')}
            className="flex items-center gap-0.5 text-xs font-medium text-[#00bdd6]"
           >
              查看所有
              <ChevronRight size={14} />
           </button>
        </div>
        <p className="text-gray-500 text-sm font-normal mt-1 mb-3">基于你的偏好，优先推荐中国本土深度路线。</p>
        
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

        {/* Carousel Container */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          {filteredTrips.map(trip => (
            <div key={trip.id} className="shrink-0 w-64 rounded-xl border border-gray-100 overflow-hidden group bg-white">
              <div className="h-32 overflow-hidden">
                <img src={trip.image} alt={trip.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-3">
                <h4 className="font-bold text-[#333] truncate">{trip.title}</h4>
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
        <h3 className="text-[#333] font-bold text-lg mb-1">正在拼的行程</h3>
        <p className="text-gray-500 text-xs font-normal mb-4">和你去同一条路线的人，正在集结中。</p>
        
        <div className="space-y-4">
          {groupTrips.map(trip => (
             <div 
              key={trip.id} 
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => onNavigate('groupList')}
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

      {/* Smart Travel Butler */}
      <div 
        className="bg-white rounded-2xl shadow-sm border border-[#cde6ea] p-4 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => onNavigate('dailyItinerary')}
      >
        <div className="flex items-start gap-4">
          <div className="size-12 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: theme.colors.primaryLight }}>
             <Bot size={28} style={{ color: theme.colors.primary }} />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg text-[#333]">智能旅行管家</h3>
            <p className="text-gray-500 text-sm font-medium mt-1">今天 · 西宁 → 茶卡盐湖</p>
            <div 
              className="text-xs p-2 rounded-lg mt-2 font-bold"
              style={{ backgroundColor: theme.colors.primaryLight, color: theme.colors.primary }}
            >
              今日 3 个关键事件：出发集合 / 观景点 / 返回集合
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

// 4. NEW: Recommended Routes Page
const RecommendedRoutesPage = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="flex flex-col h-full bg-[#f7f9fa] overflow-y-auto scrollbar-hide pb-8">
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center justify-between bg-[#f7f9fa] p-4 h-[56px] border-b border-[#cde6ea]">
        <button onClick={onBack} className="flex size-10 shrink-0 items-center justify-center text-[#333] hover:bg-black/5 rounded-full transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-[#333] text-xl font-medium flex-1 text-center">为你推荐的线路</h1>
        <button className="flex size-10 shrink-0 items-center justify-center text-[#333]">
          <MoreHorizontal size={24} />
        </button>
      </div>

      <div className="flex flex-col gap-4 px-4 pb-8 mt-4">
        {/* Depth Index Card */}
        <div className="flex flex-col gap-3 p-4 bg-white rounded-xl shadow-[0_2px_4px_rgba(0,0,0,0.05)]">
           <div className="flex gap-6 justify-between items-center">
              <p className="text-[#333] text-sm font-normal">你的深度指数：<span className="font-medium">7.3 / 10 · 进阶探索型</span></p>
           </div>
           <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div className="h-1.5 rounded-full bg-[#00bdd6]" style={{ width: '73%' }}></div>
           </div>
        </div>

        {/* Intro Card */}
        <div className="flex flex-col items-stretch justify-start rounded-xl bg-white shadow-[0_2px_4px_rgba(0,0,0,0.05)] p-4 gap-3">
           <p className="text-[#333] text-xl font-medium">为你量身定制</p>
           <p className="text-[#666] text-base font-normal leading-relaxed">
              根据你的旅行深度指数和偏好标签，我们为你挑选了以下更匹配你旅行风格的线路。你现在是【进阶探索型】：能接受适中车程，不太喜欢太多早起，因此我们优先推荐中等强度、景色丰富的路线。
           </p>
           <div className="flex justify-end mt-1">
              <button className="flex items-center justify-center gap-1 text-[#00bdd6] text-sm font-normal">
                 <span>了解更多</span>
                 <ArrowRight size={16} />
              </button>
           </div>
        </div>

        {/* Filter Chips */}
        <div className="flex gap-2.5 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
           <button className="flex h-8 shrink-0 items-center justify-center gap-x-1.5 rounded-2xl bg-[#00bdd6]/10 px-3 py-1.5 text-[#00bdd6]">
              <Sparkles size={18} />
              <p className="text-sm font-normal">想更轻松一点</p>
           </button>
           <button className="flex h-8 shrink-0 items-center justify-center gap-x-1.5 rounded-2xl bg-gray-100 px-3 py-1.5 text-[#666]">
              <Mountain size={18} />
              <p className="text-sm font-normal">更具挑战性</p>
           </button>
           <button className="flex h-8 shrink-0 items-center justify-center gap-x-1.5 rounded-2xl bg-gray-100 px-3 py-1.5 text-[#666]">
              <Landmark size={18} />
              <p className="text-sm font-normal">侧重文化</p>
           </button>
        </div>

        <div className="flex flex-col gap-4">
           {/* Route Card 1 */}
           <div className="flex flex-col items-stretch justify-start rounded-xl shadow-[0_2px_4px_rgba(0,0,0,0.05)] bg-white overflow-hidden">
              <div className="relative w-full bg-center bg-no-repeat aspect-video bg-cover" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAjVjX45ZuX2NX1s4nWm2GeVc2vK3eQGGyoFclhnPCiUSRE_04xiZY-9cpLejV8Z9rXw1bYoELPhE-xSjvvx3Chpsba3cW1nc2W0DVYtYSwAX5jH1VkopKJQnkt5_6oGWyrOxXMAZcjesJ_CeaiOaIqWOxvapQ-Y-gLX-tqIm_n5bLC120VQPgGIlT2rT6SgU5ocJgrs8KkCE4qDOf_OeFPCrfvQ3rH2r6yg-zjS8fs4R2IIhA8Rp8E2ZL1P_9z57UfmOQgsZKNGiA-")' }}>
                 <div className="absolute top-3 right-3 flex items-center justify-center bg-green-500/10 px-2 py-1 rounded-md">
                    <p className="text-green-500 text-xs font-bold">匹配度：高</p>
                 </div>
                 <button className="absolute top-3 left-3 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm">
                    <Heart size={18} />
                 </button>
              </div>
              <div className="flex w-full grow flex-col items-stretch justify-center gap-4 p-4">
                 <div className="flex flex-col gap-1.5">
                    <p className="text-[#333] text-lg font-medium">西北穿越 · 9 日【深度线路】</p>
                    <p className="text-[#666] text-sm font-normal">【当前推荐】</p>
                    <p className="text-[#666] text-sm font-normal">推荐理由：自然风光为主，车程适中，适合进阶探索型的你。</p>
                 </div>
                 <div className="flex items-center gap-3 justify-between">
                    <button className="flex flex-1 max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-3xl h-12 px-4 bg-[#00bdd6] text-white text-base font-medium">
                       <span className="truncate">查看详情</span>
                    </button>
                    <button className="flex flex-1 max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-3xl h-12 px-4 bg-[#00bdd6]/10 text-[#00bdd6] text-base font-medium">
                       <span className="truncate">问 AI：会不会太累？</span>
                    </button>
                 </div>
              </div>
           </div>

           {/* Route Card 2 */}
           <div className="flex flex-col items-stretch justify-start rounded-xl shadow-[0_2px_4px_rgba(0,0,0,0.05)] bg-white overflow-hidden">
              <div className="relative w-full bg-center bg-no-repeat aspect-video bg-cover" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB-KRVeKQLD_kmr5272ZIIENvKCyo7FUve1RrnM4sgfJXQiS1Iz72I9uQcKhn8gVNR_kLE1d0DpEIYWP0yIWO1ECQLlGVuLXebizNBzuFLI2s4O7NwEJit2YGqRv8c6HnW-VadNeY4QdaB6hSrkVv8AEKhq42SPOEFxW13tYEmFML1JXYenklMPFsAe4SBVomjlnZjLxubCgc3DE8ZR38swNEqCQbdXLO3O3feZa5Sysk7L_biDqK7eFXv_sFHSQSivxETetvzQsMGs")' }}>
                 <div className="absolute top-3 right-3 flex items-center justify-center bg-[#FF7043]/10 px-2 py-1 rounded-md">
                    <p className="text-[#FF7043] text-xs font-bold">匹配度：中</p>
                 </div>
                 <button className="absolute top-3 left-3 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm">
                    <Heart size={18} />
                 </button>
              </div>
              <div className="flex w-full grow flex-col items-stretch justify-center gap-4 p-4">
                 <div className="flex flex-col gap-1.5">
                    <p className="text-[#333] text-lg font-medium">云南秘境 · 12 日【挑战线路】</p>
                    <p className="text-[#666] text-sm font-normal">【未来挑战】</p>
                    <p className="text-[#666] text-sm font-normal">推荐理由：徒步强度较高，更适合作为下一阶段目标。</p>
                 </div>
                 <div className="flex items-center gap-3 justify-between">
                    <button className="flex flex-1 max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-3xl h-12 px-4 bg-[#00bdd6] text-white text-base font-medium">
                       <span className="truncate">查看详情</span>
                    </button>
                    <button className="flex flex-1 max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-3xl h-12 px-4 bg-[#00bdd6]/10 text-[#00bdd6] text-base font-medium">
                       <span className="truncate">问 AI：强度有多大？</span>
                    </button>
                 </div>
              </div>
           </div>

           {/* Empty State */}
           <div className="flex flex-col items-center justify-center rounded-xl bg-white shadow-[0_2px_4px_rgba(0,0,0,0.05)] p-8 gap-4 text-center">
              <Frown size={48} className="text-gray-400" />
              <p className="text-[#333] text-base font-normal">暂时没有更多匹配你当前偏好的线路</p>
              <p className="text-[#666] text-sm font-normal">尝试修改你的旅行偏好，或直接让 AI 帮你寻找吧</p>
              <div className="flex w-full items-center gap-3 justify-between mt-4">
                 <button className="flex flex-1 max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-3xl h-12 px-4 bg-[#00bdd6]/10 text-[#00bdd6] text-base font-medium">
                    <span className="truncate">修改旅行偏好</span>
                 </button>
                 <button className="flex flex-1 max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-3xl h-12 px-4 bg-[#00bdd6] text-white text-base font-medium">
                    <span className="truncate">问 AI 帮我找线路</span>
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

// ... (Other pages like PreferencePage, WorkbenchPage, etc. remain largely unchanged but inherit new fonts)

// 2. Preference Page
const PreferencePage = ({ onBack }: { onBack: () => void }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [sliderValue, setSliderValue] = useState(70);
  const [selectedStyles, setSelectedStyles] = useState(['大西北', '小团深度游']);
  const [selectedCarTime, setSelectedCarTime] = useState('3-4 小时');
  const [selectedStay, setSelectedStay] = useState(['舒适型酒店']);
  const [allowShared, setAllowShared] = useState(false);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleAnswer = (option: string) => {
    setAnswers({ ...answers, [quizQuestions[currentQuestion].id]: option });
  };

  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsQuizCompleted(true);
      setTimeout(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const resetQuiz = () => {
    setIsQuizCompleted(false);
    setCurrentQuestion(0);
    setAnswers({});
    setSliderValue(70);
    setSelectedStyles(['大西北', '小团深度游']);
  };

  const toggleStyle = (style: string) => {
    if (selectedStyles.includes(style)) {
      setSelectedStyles(selectedStyles.filter(s => s !== style));
    } else {
      setSelectedStyles([...selectedStyles, style]);
    }
  };
  
  const toggleStay = (stay: string) => {
    if (selectedStay.includes(stay)) {
      setSelectedStay(selectedStay.filter(s => s !== stay));
    } else {
      setSelectedStay([...selectedStay, stay]);
    }
  };

  const q = quizQuestions[currentQuestion];

  return (
    <div ref={scrollRef} className="flex flex-col h-full bg-[#f5f8f8] overflow-y-auto scrollbar-hide pb-safe">
      <div className="sticky top-0 z-10 flex items-center justify-between bg-[#f5f8f8] p-4 h-[56px] border-b border-[#cde6ea]">
        <button onClick={onBack} className="flex size-10 shrink-0 items-center justify-center text-[#333] hover:bg-black/5 rounded-full transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-[18px] font-bold text-[#333] flex-1 text-center">旅行偏好与深度体检</h2>
        <button className="flex size-10 shrink-0 items-center justify-center text-[#333]">
          <HelpCircle size={24} />
        </button>
      </div>

      <div className="p-4 flex flex-col gap-6">
        {!isQuizCompleted && (
          <>
            <div className="flex flex-col gap-2">
               <div className="flex justify-between text-xs font-medium text-[#666]">
                  <span>第 {currentQuestion + 1} 题 / 共 {quizQuestions.length} 题</span>
               </div>
               <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div 
                    className="h-1.5 rounded-full transition-all duration-300" 
                    style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%`, backgroundColor: theme.colors.primary }}
                  ></div>
               </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-4 animate-in fade-in zoom-in-95 duration-300">
               <div 
                 className="w-full aspect-video rounded-xl bg-gray-100 mb-4 bg-cover bg-center"
                 style={{ backgroundImage: `url(${q.image})` }}
               ></div>
               <h3 className="text-lg font-bold text-[#333] mb-4">{q.question}</h3>
               <div className="flex flex-col gap-3">
                  {q.options.map((option, idx) => {
                    const isSelected = answers[q.id] === option;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleAnswer(option)}
                        className={`w-full p-3 rounded-xl text-sm font-medium transition-all text-left border ${isSelected ? 'border-transparent text-white' : 'border-transparent bg-[#f7f9fa] text-[#333] hover:bg-gray-100'}`}
                        style={isSelected ? { backgroundColor: theme.colors.primary } : {}}
                      >
                        {option}
                      </button>
                    )
                  })}
               </div>
               <div className="flex gap-4 mt-6">
                  <button 
                    onClick={prevQuestion}
                    disabled={currentQuestion === 0}
                    className={`flex-1 h-11 rounded-xl font-medium text-sm transition-colors ${currentQuestion === 0 ? 'bg-gray-100 text-gray-400' : 'bg-gray-200 text-[#333] hover:bg-gray-300'}`}
                  >
                    上一步
                  </button>
                  <button 
                     onClick={nextQuestion}
                     className="flex-1 h-11 rounded-xl font-medium text-sm text-white transition-opacity hover:opacity-90"
                     style={{ backgroundColor: theme.colors.primary }}
                  >
                    {currentQuestion === quizQuestions.length - 1 ? '完成测试' : '下一题'}
                  </button>
               </div>
            </div>
          </>
        )}

        {isQuizCompleted && (
          <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-10 duration-700 fill-mode-forwards">
             <h3 className="text-xl font-bold text-[#333]">测试结果 & 自定义偏好</h3>
             
             {/* Profile Result Card */}
             <div className="bg-white rounded-2xl shadow-sm p-5 relative overflow-hidden">
                <div className="flex items-start gap-4 z-10 relative">
                   <div className="flex-1">
                      <h4 className="text-xl font-bold text-[#333]">进阶探索型</h4>
                      <p className="text-xs text-[#666] mt-1">特征代表：探索鹰</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                         {['能吃苦', '喜欢景色', '不爱早起'].map(tag => (
                            <span key={tag} className="text-[10px] font-medium px-2 py-1 rounded-md bg-[#fffbe6] text-[#d46b08]">
                               {tag}
                            </span>
                         ))}
                      </div>
                   </div>
                   <div className="size-20 bg-[#e6fffb] rounded-full flex items-center justify-center shrink-0">
                      <span className="text-4xl">🦅</span>
                   </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                   <ul className="text-sm text-[#333] list-disc list-inside space-y-1">
                      <li>你享受深入目的地的文化与自然，不畏惧挑战。</li>
                      <li>比起走马观花，更愿意花时间感受一个地方的独特魅力。</li>
                   </ul>
                </div>
                <button 
                  onClick={resetQuiz}
                  className="absolute top-4 right-4 text-xs font-bold hover:underline"
                  style={{ color: theme.colors.primary }}
                >
                  重新测试
                </button>
             </div>

             {/* Recommended Style Card */}
             <div className="bg-white rounded-2xl shadow-sm p-5">
                <h5 className="text-base font-bold text-[#333] mb-3">更适合你的旅行风格</h5>
                <div className="flex flex-wrap gap-2 mb-3">
                   {['大西北', '小团深度游', '户外徒步', '川西'].map(tag => (
                      <button 
                        key={tag}
                        onClick={() => toggleStyle(tag)}
                        className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${selectedStyles.includes(tag) ? 'bg-[#e0f7fa] text-[#00bdd6] border-[#00bdd6]' : 'bg-[#f7f9fa] text-[#333] border-transparent'}`}
                      >
                         {tag === '大西北' && <MapPin size={14} />}
                         {tag === '小团深度游' && <Users size={14} />}
                         {tag === '户外徒步' && <Tent size={14} />}
                         {tag}
                      </button>
                   ))}
                </div>
                <p className="text-xs text-[#666]">适合 6–9 天的中等强度线路，在自然风光和人文体验中找到平衡。</p>
             </div>

             {/* Custom Sliders & Toggles */}
             <div className="bg-white rounded-2xl shadow-sm p-5 flex flex-col gap-6">
                <h5 className="text-base font-bold text-[#333]">细项偏好自定义</h5>
                
                {/* Intensity Slider */}
                <div>
                   <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-medium text-[#333]">整体强度</label>
                      <span className="text-xs font-bold" style={{ color: theme.colors.primary }}>{sliderValue}%</span>
                   </div>
                   <input 
                     type="range" 
                     min="0" 
                     max="100" 
                     value={sliderValue} 
                     onChange={(e) => setSliderValue(parseInt(e.target.value))}
                     className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#00bdd6]"
                   />
                   <div className="flex justify-between text-[10px] text-[#999] mt-1">
                      <span>轻松躺平</span>
                      <span>硬核挑战</span>
                   </div>
                </div>

                {/* Car Time */}
                <div>
                   <p className="text-sm font-medium text-[#333] mb-3">可接受日均车程</p>
                   <div className="flex gap-2">
                      {['＜ 2 小时', '3-4 小时', '4-6 小时'].map(time => (
                         <button
                           key={time}
                           onClick={() => setSelectedCarTime(time)}
                           className={`flex-1 py-1.5 rounded-full text-xs font-medium transition-colors ${selectedCarTime === time ? 'text-white' : 'bg-[#f7f9fa] text-[#333]'}`}
                           style={selectedCarTime === time ? { backgroundColor: theme.colors.primary } : {}}
                         >
                           {time}
                         </button>
                      ))}
                   </div>
                </div>
             </div>

             {/* Budget & Stay */}
             <div className="bg-white rounded-2xl shadow-sm p-5 flex flex-col gap-5">
                <h5 className="text-base font-bold text-[#333]">预算与住宿偏好</h5>
                
                <div>
                   <p className="text-sm font-medium text-[#333] mb-3">住宿标准 (可多选)</p>
                   <div className="flex flex-wrap gap-2">
                      {['青旅/民宿', '舒适型酒店', '特色设计酒店'].map(stay => (
                         <button
                           key={stay}
                           onClick={() => toggleStay(stay)}
                           className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${selectedStay.includes(stay) ? 'text-white' : 'bg-[#f7f9fa] text-[#333]'}`}
                           style={selectedStay.includes(stay) ? { backgroundColor: theme.colors.primary } : {}}
                         >
                           {stay}
                         </button>
                      ))}
                   </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                   <span className="text-sm font-medium text-[#333]">不接受多人间</span>
                   <button 
                     onClick={() => setAllowShared(!allowShared)}
                     className={`w-11 h-6 rounded-full relative transition-colors ${!allowShared ? 'bg-gray-200' : ''}`}
                     style={!allowShared ? {} : { backgroundColor: theme.colors.primary }}
                   >
                      <div className={`absolute top-0.5 left-[2px] bg-white w-5 h-5 rounded-full shadow-sm transition-transform ${!allowShared ? '' : 'translate-x-full'}`}></div>
                   </button>
                </div>
             </div>
             
             {/* Reset Button Section */}
             <button 
                onClick={resetQuiz}
                className="w-full py-3 mt-4 mb-2 flex items-center justify-center gap-2 text-sm text-[#666] bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
             >
                <RefreshCcw size={16} />
                清除偏好并重置状态
             </button>
          </div>
        )}

        {isQuizCompleted && (
          <div className="sticky bottom-0 pb-4 pt-2 bg-[#f5f8f8] animate-in slide-in-from-bottom-5 duration-500">
             <button 
               onClick={onBack}
               className="w-full h-12 rounded-full text-white font-bold text-base shadow-lg transition-transform active:scale-95"
               style={{ backgroundColor: theme.colors.primary }}
             >
                保存偏好并应用
             </button>
             <p className="text-[10px] text-center text-[#999] mt-2">保存后，首页推荐和 AI 方案将优先匹配这些偏好。</p>
          </div>
        )}
      </div>
    </div>
  );
};

// 3. AI Workbench Page
const WorkbenchPage = ({ onBack, onNavigate }: { onBack: () => void, onNavigate: (page: string) => void }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputText, setInputText] = useState("");
  const [selectedPlan, setSelectedPlan] = useState('B'); 
  const [showBudgetAdjust, setShowBudgetAdjust] = useState(false);
  const [budgetRange, setBudgetRange] = useState(500); 
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({}); 

  const toggleItem = (idx: string) => {
    setExpandedItems(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleBudgetUpdate = () => {
    setShowBudgetAdjust(false);
    alert("AI 正在根据新的预算范围重新调整方案...");
  };

  const TripSummaryCard = () => (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-4 transition-all duration-300">
      <div 
        className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex flex-col">
          <p className="text-lg font-bold text-[#333]">五一 · 从上海出发的大西北方案</p>
          <p className="text-xs text-[#666] mt-0.5">可修改：时间/出发城市/预算/同行人</p>
        </div>
        {isExpanded ? <ChevronUp size={20} className="text-[#999]" /> : <ChevronDown size={20} className="text-[#999]" />}
      </div>
      
      {isExpanded && (
        <div className="px-4 pb-4 border-t border-gray-100 pt-3 animate-in slide-in-from-top-2 duration-200">
           <p className="text-sm text-[#333] leading-relaxed mb-3">
             五一从上海出发，2 人，预算 6000/人，想走 7–8 天大西北，看沙漠和星空。
           </p>
           <div className="flex flex-wrap gap-2">
              {['出发地：上海', '目的地：大西北', '天数：7–8 天', '预算：约 6000/人'].map(tag => (
                <span key={tag} className="text-xs font-medium px-2.5 py-1.5 rounded-lg bg-[#E0F2F1]" style={{ color: theme.colors.primary }}>
                   {tag}
                </span>
              ))}
           </div>
        </div>
      )}
    </div>
  );

  // Fix: Make children optional to resolve TS error
  const AIMessage = ({ children, avatar = "https://lh3.googleusercontent.com/aida-public/AB6AXuDSXfDbLUXukC1XvjVNzedYD5JEmAB3pyV0Dbg3i4f1OjpNLwhSOXlIrPWiPCFIFGxHtScLwAtdGUCbDwt60YHeb0qAiKss4mqKMZK08uUN3qp3MsT2HTggV-HcQ6h2AePKH4TJxa78XLhI7J15Po8zhIaL1zz4_7WwW04ks2BY3iuqnc_MHkCSH8nU9whcN9CJeLkttHBw2E4m9KlR8lk_68Gr6rddrHl-OOyRTHrVrnkFtMQO-e8kVdpmMSTrhQAl_GqBjaDcZq3O" }: { children?: React.ReactNode, avatar?: string }) => (
    <div className="flex items-end gap-3 mb-6 animate-in slide-in-from-left-5 duration-500">
       <div className="size-10 rounded-full bg-cover bg-center shrink-0" style={{ backgroundImage: `url(${avatar})` }}></div>
       <div className="flex flex-col items-start gap-2 max-w-[85%] w-full">
         {children}
       </div>
    </div>
  );

  const UserMessage = ({ text }: { text: string }) => (
    <div className="flex items-end justify-end gap-3 mb-6 animate-in slide-in-from-right-5 duration-500">
       <div className="max-w-[85%] bg-[#00bdd6] p-3 rounded-2xl rounded-br-none text-white text-sm shadow-sm">
         {text}
       </div>
    </div>
  );

  // Budget Adjustment Modal/Inline
  const BudgetAdjustCard = () => (
    <div className="mt-4 bg-[#fff8e1] border border-[#ffecb3] rounded-xl p-4 animate-in zoom-in-95 duration-200">
      <div className="flex justify-between items-center mb-2">
         <h4 className="text-sm font-bold text-[#d46b08]">预算调整</h4>
         <button onClick={() => setShowBudgetAdjust(false)}><XCircle size={16} className="text-[#d46b08]" /></button>
      </div>
      <p className="text-xs text-[#873800] mb-3">当前预算: ¥6,000/人。你想增加多少预算以升级体验？</p>
      
      <div className="mb-4">
        <input 
          type="range" 
          min="0" 
          max="2000" 
          step="100" 
          value={budgetRange} 
          onChange={(e) => setBudgetRange(parseInt(e.target.value))}
          className="w-full h-1.5 bg-[#ffd591] rounded-lg appearance-none cursor-pointer accent-[#fa8c16]"
        />
        <div className="flex justify-between text-xs text-[#d46b08] mt-2 font-medium">
           <span>+¥0</span>
           <span>+¥{budgetRange}</span>
           <span>+¥2000</span>
        </div>
      </div>

      <div className="flex gap-2 mb-3">
         {[500, 1000, 1500].map(val => (
           <button 
             key={val}
             onClick={() => setBudgetRange(val)}
             className={`flex-1 py-1.5 text-xs rounded-lg border ${budgetRange == val ? 'bg-[#fa8c16] text-white border-[#fa8c16]' : 'bg-white text-[#d46b08] border-[#ffd591]'}`}
           >
             +¥{val}
           </button>
         ))}
      </div>

      <button 
        onClick={handleBudgetUpdate}
        className="w-full py-2 bg-[#fa8c16] text-white text-sm font-bold rounded-lg shadow-sm active:scale-95 transition-transform"
      >
        确认调整并重新规划
      </button>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-[#f5f8f8]">
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center justify-between bg-[#f5f8f8]/90 backdrop-blur-sm p-4 h-[56px] border-b border-[#cde6ea]">
        <button onClick={onBack} className="flex size-10 shrink-0 items-center justify-center text-[#333] hover:bg-black/5 rounded-full transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-lg font-bold text-[#333] flex-1 text-center">AI 工作台</h2>
        <button className="flex size-10 shrink-0 items-center justify-center text-[#333]">
          <MoreHorizontal size={24} />
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 pb-32">
         {/* Trip Context Card */}
         <TripSummaryCard />

         {/* Chat History */}
         <AIMessage>
            <div className="bg-white p-3 rounded-2xl rounded-bl-none shadow-sm text-sm text-[#333]">
               没问题！为了更好地为你规划，你更在意什么？
               <div className="grid grid-cols-3 gap-2 mt-3">
                  <button className="py-2 bg-gray-100 rounded-lg text-xs font-medium text-[#666]">预算优先</button>
                  <button className="py-2 bg-[#00bdd6] text-white rounded-lg text-xs font-medium ring-2 ring-[#00bdd6]/30">体验均衡</button>
                  <button className="py-2 bg-gray-100 rounded-lg text-xs font-medium text-[#666]">体验优先</button>
               </div>
            </div>
         </AIMessage>

         <UserMessage text="体验均衡一些吧" />

         <AIMessage avatar="https://lh3.googleusercontent.com/aida-public/AB6AXuBUlT3siM-7UvJ3VQmJdqx66y622HKQq__bLoIIA51m385UEiLDM-WJRgZP-XwMmWwaRQdpU-iFLAPa4upZaw8fcQQWp8nweCgcexmOrG2dwSbymh5hMubsnRDMnJYb8AEk4AJURquqxRMKdhBRzyWERhhHZ_Y-v9hMDorKhMvmcsdjEhaXOZBRonpgS5e8RAawLjZfxrueDwC9gvwjZXVdBnEfFDoKJunMGZ0AQn_8qcWXUJyLgSIZEfXYnSHcIP2_4OGB3ZH4qlQU">
            <div className="w-full bg-white rounded-2xl rounded-bl-none shadow-sm overflow-hidden">
               <div className="h-32 bg-cover bg-center relative" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDHuXDQDqj5o4RBPBarvM1RgUMUgWsvlIydrYd7bOa4U--sxpxewQZo8Aeg2bVL9Fwdii6qZX1S3Z3ZhNhrxR9Wj_93xA5sTl88kz2eWlzQnrt6r7GNw3qz3GTa7MiZ37WvLmepQ4HRr9KauvsqTGlQ52kQzNDqwCRA6gQ-Kpy_5ukanlf8ym9juNeD1AlT664oxFgGssXCIfwigmkh8p-Yx9c0Dtzsu0KxLZFFlKkn0dNYxFc-CdriTTl5otitrmQouBd9D223rYkX')" }}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-4 flex flex-col justify-end text-white">
                     <span className="self-start px-2 py-0.5 bg-green-500/90 text-[10px] font-bold rounded-full mb-1">当前采用方案</span>
                     <h3 className="text-base font-bold">方案 A · 大西北 8 日</h3>
                     <p className="text-xs opacity-90">预算约 ¥5,800/人</p>
                  </div>
               </div>
               <div className="p-4">
                  <ul className="space-y-2 text-sm text-[#333]">
                     <li><span className="font-bold">Day 1:</span> 抵达西宁，入住酒店休整</li>
                     <li><span className="font-bold">Day 2:</span> 青海湖一日游，感受天空之境</li>
                     <li><span className="font-bold">Day 3:</span> 茶卡盐湖，天空之境漫步...</li>
                  </ul>
                  
                  {/* Expandable Full Plan REMOVED as requested, kept BudgetAdjust */}
                  {showBudgetAdjust && <BudgetAdjustCard />}

                  <div className="flex flex-col gap-2 mt-4">
                     {/* 1. View Full Plan - Navigates to Details */}
                     <button 
                       onClick={() => onNavigate('planDetails')}
                       className="w-full py-2.5 bg-[#00bdd6] text-white font-bold text-sm rounded-xl hover:bg-[#00bdd6]/90 active:scale-95 transition-all"
                     >
                       展开完整方案
                     </button>
                     
                     {/* 2. Confirm This Plan - Navigates to Details */}
                     <button 
                       onClick={() => onNavigate('planDetails')}
                       className="w-full py-2.5 bg-[#4CAF50] text-white font-bold text-sm rounded-xl hover:bg-[#4CAF50]/90 active:scale-95 transition-all shadow-sm"
                     >
                       确认此方案
                     </button>

                     {!showBudgetAdjust && (
                       <button 
                         onClick={() => setShowBudgetAdjust(true)}
                         className="w-full py-2.5 bg-[#E0F2F1] text-[#00bdd6] font-bold text-sm rounded-xl hover:bg-[#B2EBF2] active:scale-95 transition-all"
                       >
                         在预算内再升级一点
                       </button>
                     )}
                  </div>
               </div>
            </div>
         </AIMessage>

         <AIMessage avatar="https://lh3.googleusercontent.com/aida-public/AB6AXuDeiQChx_GSk6lzTTQXBTSxE2Y8lARJmiw6ir_tQoLSXUF18T84b1b2eiJV4uNH46Xg57Tau3W14pS1ULY5SiBCv2u2dIJpmfoumGXpCxFugdkhOqtrAG7VU8HSZcdcklbXDEYBZ8bTVBdF-35hirUW9J-ALg6jTW9TyYhd5jzgLLPf_Kgrv16advzgAkMzOP39EClYaNb71nHhGJAtv_Xouc7_B1hC6qd4d4OqeHxC1f4Y5iVB-19WEyEwF1g-9XQNtfuqrAsjOUQn">
            <div className="bg-white p-4 rounded-2xl rounded-bl-none shadow-sm text-sm text-[#333]">
               <p className="font-medium mb-1">也为你准备了一个节奏更慢的深度方案，可以对比看看：</p>
               <p className="text-xs text-[#666] mb-4">方案 B 时间更长，增加了敦煌段的游览，整体体验更深度，因此预算更高。</p>
               
               <div className="grid grid-cols-2 gap-3">
                  {/* Plan A Mini Card - Selectable */}
                  <div 
                    onClick={() => setSelectedPlan('A')}
                    className={`border rounded-xl p-3 flex flex-col cursor-pointer transition-all duration-300 ${selectedPlan === 'A' ? 'border-[#00bdd6] bg-[#E0F2F1] ring-1 ring-[#00bdd6]' : 'border-gray-200 bg-white hover:border-gray-300'}`}
                  >
                     <div className="flex justify-between items-start">
                        <h4 className="font-bold text-sm">方案 A</h4>
                        {selectedPlan === 'A' && <CheckCircle2 size={16} className="text-[#00bdd6]" />}
                     </div>
                     <p className="text-xs text-[#999] mb-2">7天 · 性价比</p>
                     <div className="flex-1 text-xs space-y-1 mb-3">
                        <div className="flex gap-1"><CheckCircle2 size={12} className={selectedPlan === 'A' ? "text-[#00bdd6]" : "text-gray-400"} />青海湖+茶卡</div>
                     </div>
                     <p className="text-lg font-bold text-[#FF7043]">¥5,800</p>
                     <p className="text-[10px] text-[#999] mb-2">含标准舒适酒店</p>
                     <button className={`w-full py-1.5 text-xs font-medium rounded-lg transition-colors ${selectedPlan === 'A' ? 'bg-[#00bdd6] text-white' : 'bg-gray-100 text-[#333]'}`}>
                       {selectedPlan === 'A' ? '已选择' : '选择方案 A'}
                     </button>
                  </div>

                  {/* Plan B Mini Card - Selectable */}
                  <div 
                    onClick={() => setSelectedPlan('B')}
                    className={`border rounded-xl p-3 flex flex-col cursor-pointer transition-all duration-300 ${selectedPlan === 'B' ? 'border-[#00bdd6] bg-[#E0F2F1] ring-1 ring-[#00bdd6]' : 'border-gray-200 bg-white hover:border-gray-300'}`}
                  >
                     <div className="flex justify-between items-start">
                        <h4 className="font-bold text-sm">方案 B</h4>
                        {selectedPlan === 'B' && <CheckCircle2 size={16} className="text-[#00bdd6]" />}
                     </div>
                     <p className="text-xs text-[#666] mb-2">9天 · 更深度</p>
                     <div className="flex-1 text-xs space-y-1 mb-3">
                        <div className="flex gap-1"><CheckCircle2 size={12} className={selectedPlan === 'B' ? "text-[#00bdd6]" : "text-gray-400"} />青海湖+茶卡</div>
                        <div className="flex gap-1"><PlusCircle size={12} className={selectedPlan === 'B' ? "text-[#00bdd6]" : "text-gray-400"} /><b>增加：</b>敦煌莫高窟</div>
                     </div>
                     <p className="text-lg font-bold text-[#FF7043]">¥7,200</p>
                     <p className="text-[10px] text-[#666] mb-2">含升级版特色住宿</p>
                     <button className={`w-full py-1.5 text-xs font-medium rounded-lg transition-colors ${selectedPlan === 'B' ? 'bg-[#00bdd6] text-white' : 'bg-gray-100 text-[#333]'}`}>
                        {selectedPlan === 'B' ? '已选择' : '选择方案 B'}
                     </button>
                  </div>
               </div>
            </div>
         </AIMessage>

         <AIMessage avatar="https://lh3.googleusercontent.com/aida-public/AB6AXuDeiQChx_GSk6lzTTQXBTSxE2Y8lARJmiw6ir_tQoLSXUF18T84b1b2eiJV4uNH46Xg57Tau3W14pS1ULY5SiBCv2u2dIJpmfoumGXpCxFugdkhOqtrAG7VU8HSZcdcklbXDEYBZ8bTVBdF-35hirUW9J-ALg6jTW9TyYhd5jzgLLPf_Kgrv16advzgAkMzOP39EClYaNb71nHhGJAtv_Xouc7_B1hC6qd4d4OqeHxC1f4Y5iVB-19WEyEwF1g-9XQNtfuqrAsjOUQn">
            <div className="bg-white p-4 rounded-2xl rounded-bl-none shadow-sm text-sm text-[#333]">
               <h4 className="font-bold mb-1">已为你组合以下产品：</h4>
               <p className="text-xs text-[#666] mb-3">这是方案 {selectedPlan} 的具体产品构成，你可以点击展开查看详情或微调。</p>
               <div className="space-y-2">
                  {[
                    {id: 'p1', title: '西宁市区酒店', sub: '2晚 · 优选舒适型', detail: '西宁伊尔顿国际饭店或同级。位于市中心，交通便利，含双人早餐。'},
                    {id: 'p2', title: '青海湖一日游 (跟团)', sub: '供应商 A', detail: '纯玩无购物，包含二郎剑景区门票、往返大巴、导游服务及午餐。'},
                    {id: 'p3', title: '敦煌特色住宿', sub: '1晚 · 沙漠景观房', detail: '敦煌山庄或同级。特色建筑风格，可在露台观赏鸣沙山日出日落。'}
                  ].map((item, idx) => (
                    <div 
                      key={idx} 
                      className="bg-gray-50 rounded-xl overflow-hidden cursor-pointer transition-colors hover:bg-gray-100"
                      onClick={() => toggleItem(item.id)}
                    >
                      <div className="flex justify-between items-center p-3">
                         <div>
                            <p className="font-medium text-xs">{item.title}</p>
                            <p className="text-[10px] text-[#999]">{item.sub}</p>
                         </div>
                         <div className="flex items-center gap-2">
                           <button className="px-3 py-1 bg-[#E0F2F1] text-[#00bdd6] text-xs font-medium rounded-lg hover:bg-[#B2EBF2]">修改</button>
                           {expandedItems[item.id] ? <ChevronUp size={16} className="text-[#999]" /> : <ChevronDown size={16} className="text-[#999]" />}
                         </div>
                      </div>
                      
                      {/* Product Detail Expansion */}
                      {expandedItems[item.id] && (
                        <div className="px-3 pb-3 pt-0 text-xs text-[#666] animate-in slide-in-from-top-1">
                          <div className="border-t border-gray-200 pt-2 flex gap-2">
                            <div className="size-12 bg-gray-200 rounded-md shrink-0 bg-cover bg-center" style={{backgroundImage: `url(https://source.unsplash.com/random/100x100?${idx})`}}></div>
                            <div className="flex-1">{item.detail}</div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
               </div>
            </div>
         </AIMessage>

         <AIMessage avatar="https://lh3.googleusercontent.com/aida-public/AB6AXuDeiQChx_GSk6lzTTQXBTSxE2Y8lARJmiw6ir_tQoLSXUF18T84b1b2eiJV4uNH46Xg57Tau3W14pS1ULY5SiBCv2u2dIJpmfoumGXpCxFugdkhOqtrAG7VU8HSZcdcklbXDEYBZ8bTVBdF-35hirUW9J-ALg6jTW9TyYhd5jzgLLPf_Kgrv16advzgAkMzOP39EClYaNb71nHhGJAtv_Xouc7_B1hC6qd4d4OqeHxC1f4Y5iVB-19WEyEwF1g-9XQNtfuqrAsjOUQn">
            <div className="bg-white p-4 rounded-2xl rounded-bl-none shadow-sm text-sm text-[#333]">
               <h4 className="font-bold mb-1">找到几个和你的需求很接近的团</h4>
               <p className="text-xs text-[#666] mb-3">如果你不介意和他人同行，可以考虑加入，能节省一些预算。</p>
               
               <div className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                  <div className="flex gap-3 p-3">
                     <div className="size-16 rounded-lg bg-cover bg-center shrink-0" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAMo605qJ-q4T_bdCj1GRHxsR0mbo0Rutm1ESzMPUoym3mQJ6puHmUpFgIfWzrOLw1BfUW3Fxpvmz9xTTMQohK15wogI1wSwuUJJBfgW9FxK0Yec-0S9Wnxs4iVjioR1X-Tln6DDWetR458VXExJm6lI1X-CjWUZe0GviK9Fwi0L4FGuIC9CiIXnImoG40xMliQO5vdHV2NhRI2g4zZXJO9tj376T27JGs7Rg0HQVWLv9aOMfJ3C6j-XsMOu50TwWrg0ZSQLiwUu7bV')" }}></div>
                     <div className="flex flex-col justify-center">
                        <p className="font-bold text-sm">大西北环线深度8日游</p>
                        <p className="text-xs text-[#666] mt-0.5">出发日期：5月2日</p>
                        <span className="inline-block mt-1 px-1.5 py-0.5 bg-[#E0F2F1] text-[#00bdd6] text-[10px] font-medium rounded-md self-start">已有 6/10 人</span>
                     </div>
                  </div>
                  <div className="bg-gray-50 flex justify-end gap-2 p-2 border-t border-gray-100">
                     <button 
                        onClick={() => onNavigate('groupList')}
                        className="px-3 py-1.5 text-xs font-medium text-[#333] hover:bg-gray-200 rounded-lg transition-colors"
                     >
                        查看详情
                     </button>
                     <button className="px-3 py-1.5 bg-[#00bdd6] text-white text-xs font-medium rounded-lg hover:bg-[#00bdd6]/90 active:scale-95 transition-transform">加入此拼团</button>
                  </div>
               </div>
            </div>
         </AIMessage>
      </div>

      {/* Footer Input */}
      <div className="fixed bottom-0 left-0 right-0 z-20 bg-[#f5f8f8]/90 backdrop-blur-sm max-w-[430px] mx-auto">
         {/* Quick Chips */}
         <div className="flex gap-2 overflow-x-auto p-4 pt-1 pb-2 scrollbar-hide">
            {['改成5天以内', '预算压到4000内', '换成更轻松的线路'].map(chip => (
               <button key={chip} className="h-8 shrink-0 px-3 bg-white border border-[#cde6ea] rounded-full text-xs text-[#333] shadow-sm whitespace-nowrap hover:bg-gray-50 active:bg-gray-100 transition-colors">
                  {chip}
               </button>
            ))}
         </div>
         {/* Input Area */}
         <div className="flex items-center gap-2 p-3 pt-0 pb-4">
            <button className="size-10 flex items-center justify-center text-[#666] hover:bg-gray-200 rounded-full transition-colors">
               <Mic size={24} />
            </button>
            <div className="flex-1 relative">
               <input 
                 type="text" 
                 value={inputText}
                 onChange={(e) => setInputText(e.target.value)}
                 placeholder="可以继续补充细节..."
                 className="w-full h-12 pl-4 pr-10 rounded-2xl border-none bg-white shadow-sm text-sm focus:ring-2 focus:ring-[#00bdd6] focus:outline-none"
               />
               <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-[#00bdd6] hover:bg-gray-100 rounded-full transition-colors">
                  <Send size={20} />
               </button>
            </div>
         </div>
      </div>
    </div>
  );
};

// 6. NEW: Group List Page
const GroupListPage = ({ onBack, onNavigate }: { onBack: () => void, onNavigate: (page: string) => void }) => {
  return (
    <div className="flex flex-col h-full bg-[#f5f8f8] overflow-y-auto scrollbar-hide pb-safe">
       {/* Header */}
       <div className="sticky top-0 z-10 flex items-center justify-between bg-[#f5f8f8] p-4 h-[56px] border-b border-[#cde6ea]">
         <button onClick={onBack} className="flex size-10 shrink-0 items-center justify-center text-[#333] hover:bg-black/5 rounded-full transition-colors">
           <ArrowLeft size={24} />
         </button>
         <h2 className="text-[18px] font-bold text-[#333] flex-1 text-center">选择拼团</h2>
         <div className="size-10"></div>
       </div>

       <div className="p-4 flex flex-col gap-4">
         {/* Recommendation Card */}
         <div className="relative flex flex-col rounded-xl bg-white shadow-sm overflow-hidden">
           <div className="absolute top-3 right-3 flex h-6 shrink-0 items-center justify-center gap-x-1 rounded-full bg-[#00bdd6]/10 px-3 py-1">
             <p className="text-[#00bdd6] text-xs font-medium">AI 推荐拼团</p>
           </div>
           <div className="w-full h-32 bg-cover bg-center" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC0boBMbzaCkuBAtniE25UJtJrAfygQdZG_yq6bZr-uy28JT46pSUmttMpp5LXUEeIVV3MDcrEDtsmMlP1tJkOpBFFQKMiCKl4tsix1oRnxqp68h4Km1xpTZ7BWZuAlYBxDWPBe6yngmIQXTB_lOENiFjyuyxrkiQnXiMF-3g6jkgpeYd16TgX9OQWxAv7foHRY7QRURdbEnboiZcJG_eELNBb07zljsZI5RkdvcgOqQA8ko7pJtZNAc3GtLb8APOKDoQ9mtfi2fbnY")'}}></div>
           <div className="flex flex-col p-4 gap-2">
             <p className="text-[#333] text-xl font-medium">丝绸之路深度探索</p>
             <p className="text-[#666] text-sm">基于你当前的方案 A · 丝绸之路 8 日行程，为你找到以下可拼团日期。</p>
             <div className="flex items-center gap-2 mt-1">
               <span className="px-2 py-0.5 bg-gray-100 rounded-full text-xs text-[#666]">8天7夜</span>
               <span className="px-2 py-0.5 bg-gray-100 rounded-full text-xs text-[#666]">文化遗产</span>
             </div>
           </div>
         </div>

         {/* Group Card 1 */}
         <div className="flex flex-col gap-4 rounded-xl bg-white p-4 shadow-sm">
           <div>
             <p className="text-[#333] text-base font-medium">出发日期：2024年8月15日</p>
             <p className="text-sm text-[#666]">与你计划的出发时间相差 2 天</p>
           </div>
           <div>
             <div className="flex items-baseline gap-2 text-sm text-[#666]">
               <p className="text-base text-[#333]">当前价格: <span className="font-medium">¥12,800 /人</span></p>
               <p className="text-sm">满团价: <span className="font-medium text-[#00bdd6]">¥11,500 /人</span></p>
             </div>
             <p className="text-xs text-[#FF7043] font-medium">再有 2 人加入，价格可降至 ¥11,500 /人</p>
           </div>
           <div className="flex flex-col gap-2">
             <div className="flex items-center justify-between">
               <p className="text-[#666] text-sm font-medium">10人成团</p>
               <div className="flex items-center gap-2">
                 <div className="flex -space-x-2">
                   <img alt="Avatar 1" className="inline-block size-6 rounded-full ring-2 ring-white" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJ56XfwVL7nKNmPfv8Zfzyu-I3ynswsahkR0KRAe2MzHJM1X9ImXi2uah1WDi-g6pajHiGc89kF_iAtBMhmuXdu9NhTOBF46S6yKrpvtOBVB490bHAeK8WP4O_iEfUsu6_QsWqsmcLXgxGxwNy4U2Xo1P1HFvmZmuNrLYcA7OLSZp6WBJreKcqyZMX6nr58gB8RnDa9zy7qGLLjFmfYq3ulYH81JUFKS_Iw-AASdDT1hxl8QJVfVrcsgkMcTI0-qtBhZ5TuZgvtwxE"/>
                   <img alt="Avatar 2" className="inline-block size-6 rounded-full ring-2 ring-white" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGwVAPCIhFLNXyHcnMY0xIUaCuTdthLz4MzjFpzkt3KNB0JR-ZXKZ2eDkfh5hR4xs1uNadJb77j9rCIyH1ERJK-clrRUbn7rWmEZKt2BMLELEdD2ZhkPwq_7D6v7qtvWlfQiI0_9mJRiInHu1IWKxJsuGgsbCkM28a2fNN5b1ZYN5VcSExzVba_fncV5Bh4Af7DYWQLRxOyJlmfdNY-ffjxiPSeEayF0RG4I45_OuL97jEDMVKDNhUwhbjqvaM0zqKEqxhpr0oedRd"/>
                   <img alt="Avatar 3" className="inline-block size-6 rounded-full ring-2 ring-white" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWmNd9TAVTYaSxO3YqbA6rZ_8K6hqa_I1gHDQzmlulqQen6sJMtq_D8-9R4K_w8wkh54yFWDQB8tM0Gzk4hfrR10NxTrFZKuqyiZTWLeFIRISTjaSvZXgpFusHUuamjchKzrqA6cph23XmzOEkZkq_xTHr2hl6Xef0RhOEfhRT_OtZ3qEKUGyHCz8Vg7caosWmlYN96aR0MWXQF-kI5_D6IlfBp4xApW4wsQsvLED7gdU3TU8Z2_HoLKohdBIuaYCBqwkOlQ4crLLx"/>
                 </div>
                 <p className="text-[#333] text-sm font-medium">8 / 15 人</p>
               </div>
             </div>
             <div className="w-full rounded-full bg-gray-100 h-2">
               <div className="h-2 rounded-full bg-[#00bdd6]" style={{ width: '53%' }}></div>
             </div>
             <p className="text-xs text-[#666]">至少 10 人成团，目前已有 8 人报名。</p>
           </div>
           
           <div className="bg-gray-50 p-3 rounded-lg text-sm text-[#666]">
              💡 已有 <span className="font-bold text-[#333]">2 位摄影爱好者</span> 和 <span className="font-bold text-[#333]">1 位历史系学生</span> 加入，很适合喜欢边走边拍的你。
           </div>

           <div className="flex gap-2 flex-wrap">
              <span className="px-2 py-0.5 bg-[#FF7043]/10 text-[#FF7043] text-xs rounded-full">适合首次深度游</span>
              <span className="px-2 py-0.5 bg-gray-100 text-[#666] text-xs rounded-full">摄影主题</span>
              <span className="px-2 py-0.5 bg-[#00bdd6]/10 text-[#00bdd6] text-xs rounded-full">AI 推荐优先</span>
           </div>

           <button 
              onClick={() => onNavigate('groupIntent')} // Changed to link to intent page
              className="w-full h-12 bg-[#00bdd6] text-white rounded-full font-bold text-base shadow-sm active:scale-95 transition-transform"
           >
              加入此拼团
           </button>
         </div>

         {/* Group Card 2 */}
         <div className="flex flex-col gap-4 rounded-xl bg-white p-4 shadow-sm">
           <div>
             <p className="text-[#333] text-base font-medium">出发日期：2024年9月5日</p>
             <p className="text-sm text-[#666]">与方案 A 完全一致的行程结构</p>
           </div>
           <div>
             <div className="flex items-baseline gap-2 text-sm text-[#666]">
               <p className="text-base text-[#333]">当前价格: <span className="font-medium">¥13,500 /人</span></p>
               <p className="text-sm">满团价: <span className="font-medium text-[#00bdd6]">¥11,800 /人</span></p>
             </div>
             <p className="text-xs text-[#FF7043] font-medium">人越多越便宜，现在是早鸟价</p>
           </div>
           
           {/* Progress */}
           <div className="flex flex-col gap-2">
             <div className="flex items-center justify-between">
               <p className="text-[#666] text-sm font-medium">10人成团</p>
               <p className="text-[#333] text-sm font-medium">3 / 15 人</p>
             </div>
             <div className="w-full rounded-full bg-gray-100 h-2">
               <div className="h-2 rounded-full bg-[#00bdd6]" style={{ width: '20%' }}></div>
             </div>
             <p className="text-xs text-[#666]">至少 10 人成团，目前已有 3 人报名。</p>
           </div>

           <div className="bg-gray-50 p-3 rounded-lg text-sm text-[#666]">
              💡 已有 <span className="font-bold text-[#333]">1 位大学教授</span> 加入，他对此路线的历史背景很有研究。
           </div>

           <button 
              className="w-full h-12 bg-[#00bdd6] text-white rounded-full font-bold text-base shadow-sm active:scale-95 transition-transform"
           >
              加入此拼团
           </button>
         </div>

         {/* AI Create Group CTA */}
         <div className="flex flex-col items-center justify-center gap-4 rounded-xl bg-white p-6 text-center shadow-sm">
            <p className="text-lg font-medium text-[#333]">找不到合适的日期？</p>
            <p className="text-sm text-[#666]">你可以让 AI 帮你发起一个新拼团：根据你的时间、预算和行程偏好，自动生成团期和招募文案。</p>
            <button className="w-full h-12 bg-[#00bdd6] text-white rounded-full font-bold text-base shadow-sm active:scale-95 transition-transform">
               让 AI 帮我发起拼团
            </button>
            <p className="text-xs text-[#999]">AI 会先收集你的大致时间范围和出发城市，再推荐合适日期并生成分享文案。</p>
         </div>
       </div>
    </div>
  );
};

// 7. NEW: Group & Intent Record Page
const GroupAndIntentPage = ({ onBack }: { onBack: () => void }) => {
  const [activeTab, setActiveTab] = useState('groups');

  return (
    <div className="flex flex-col h-full bg-[#f5f8f8] overflow-y-auto scrollbar-hide pb-safe">
      {/* Header */}
      <div className="sticky top-0 z-20 flex items-center justify-between bg-[#f5f8f8] p-4 pb-2 border-b border-[#cde6ea]">
         <button onClick={onBack} className="flex size-10 shrink-0 items-center justify-center text-[#333] hover:bg-black/5 rounded-full transition-colors">
           <ArrowLeft size={24} />
         </button>
         <h2 className="text-[18px] font-bold text-[#333] flex-1 text-center">拼团与意向记录</h2>
         <button className="flex size-10 shrink-0 items-center justify-center text-[#333]">
           <MoreHorizontal size={24} />
         </button>
      </div>

      {/* Tabs */}
      <div className="sticky top-[66px] z-10 bg-[#f5f8f8]">
         <div className="flex gap-8 border-b border-[#cde6ea] px-4">
            <button 
              onClick={() => setActiveTab('groups')}
              className={`flex-1 pb-3 pt-2 text-center border-b-2 text-sm font-medium transition-colors ${activeTab === 'groups' ? 'border-[#00bdd6] text-[#00bdd6]' : 'border-transparent text-[#666]'}`}
            >
               我的拼团
            </button>
            <button 
               onClick={() => setActiveTab('intents')}
               className={`flex-1 pb-3 pt-2 text-center border-b-2 text-sm font-medium transition-colors ${activeTab === 'intents' ? 'border-[#00bdd6] text-[#00bdd6]' : 'border-transparent text-[#666]'}`}
            >
               我的意向单
            </button>
         </div>
      </div>

      <div className="p-4 flex flex-col gap-4 flex-1">
         {activeTab === 'groups' && (
            <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-right-4 duration-300">
               {/* Card 1 */}
               <div className="relative flex flex-col overflow-hidden rounded-xl bg-white shadow-sm">
                  <div className="absolute left-0 top-0 h-full w-1 bg-[#00bdd6]"></div>
                  <div className="flex w-full flex-col gap-3 p-4">
                     <div className="flex items-start justify-between gap-3">
                        <h3 className="text-lg font-bold text-[#333]">丝绸之路深度探索</h3>
                        <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-[#666]">【我发起的】</span>
                     </div>
                     <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-[#333]">出发日期：2024年8月15日</p>
                        <span className="rounded-md bg-[#00bdd6]/10 px-2 py-1 text-xs font-medium text-[#00bdd6]">【招募中】</span>
                     </div>
                     <p className="text-xs text-[#666]">8 / 15 人 · 至少 10 人成团</p>
                     <p className="text-xs text-[#666]">当前预计价 ¥12,800/人 · 满团价 ¥11,500/人</p>
                     <div className="flex flex-col gap-1">
                        <div className="h-1 rounded-full bg-gray-200 w-full">
                           <div className="h-1 rounded-full bg-[#00bdd6]" style={{ width: '53%' }}></div>
                        </div>
                        <p className="text-[10px] text-[#999]">再有 2 人加入即可成团并锁定满团价</p>
                     </div>
                  </div>
                  <div className="flex items-center justify-end gap-3 border-t border-gray-100 p-3 bg-gray-50">
                     <button className="px-3 py-1.5 rounded-lg border border-[#00bdd6]/50 text-[#00bdd6] text-xs font-medium">让 AI 帮我写拉人文案</button>
                     <button className="px-3 py-1.5 rounded-lg bg-[#00bdd6] text-white text-xs font-medium">查看拼团详情</button>
                  </div>
               </div>

               {/* Card 2 - Success */}
               <div className="relative flex flex-col overflow-hidden rounded-xl bg-white shadow-sm">
                  <div className="absolute right-4 top-4 z-10 opacity-20 rotate-12 pointer-events-none">
                     <div className="size-16 rounded-full border-4 border-[#4CAF50] flex items-center justify-center text-[#4CAF50] font-bold text-lg -rotate-12">成团</div>
                  </div>
                  <div className="flex w-full flex-col gap-3 p-4">
                     <div className="flex items-start justify-between gap-3">
                        <h3 className="text-lg font-bold text-[#333]">云南秘境探索之旅</h3>
                        <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-[#666]">【我参与的】</span>
                     </div>
                     <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-[#333]">出发日期：2024年7月20日</p>
                        <span className="rounded-md bg-[#4CAF50]/10 px-2 py-1 text-xs font-medium text-[#4CAF50]">【已成团】</span>
                     </div>
                     <p className="text-xs text-[#666]">12 / 12 人 · 已满员</p>
                     <p className="text-xs text-[#666]">锁定满团价 ¥9,800/人</p>
                  </div>
                  <div className="flex items-center justify-end gap-3 border-t border-gray-100 p-3 bg-gray-50">
                     <button className="px-3 py-1.5 rounded-lg bg-[#00bdd6] text-white text-xs font-medium">查看拼团详情</button>
                  </div>
               </div>

               {/* Empty State Example */}
               <div className="mt-4 flex flex-col items-center justify-center gap-4 text-center p-8">
                  <div className="size-16 rounded-full bg-[#00bdd6]/10 flex items-center justify-center text-[#00bdd6]">
                     <Users size={32} />
                  </div>
                  <div>
                     <h3 className="text-base font-bold text-[#333]">你还没有参与过任何拼团</h3>
                     <p className="text-xs text-[#666] mt-1">可以先挑一条感兴趣的路线，看看有哪些拼团在招募，或直接让 AI 帮你发起一个新拼团。</p>
                  </div>
                  <button className="w-full py-2.5 bg-[#00bdd6] text-white rounded-xl text-sm font-bold">去看看可以拼的路线</button>
               </div>
            </div>
         )}

         {activeTab === 'intents' && (
            <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-right-4 duration-300">
               {/* Intent Card 1 */}
               <div className="flex flex-col rounded-xl bg-white shadow-sm">
                  <div className="flex w-full flex-col gap-3 p-4">
                     <div className="flex items-start justify-between gap-3">
                        <h3 className="text-lg font-bold text-[#333]">阿尔卑斯山脉深度徒步</h3>
                        <span className="rounded-md bg-[#FF7043]/10 px-2 py-1 text-xs font-medium text-[#FF7043]">【待联系】</span>
                     </div>
                     <div className="flex items-center justify-between text-xs text-[#666]">
                        <p>提交时间：2024.04.12 19:36</p>
                        <p>【定制此线路】</p>
                     </div>
                     <p className="text-xs text-[#666] line-clamp-2 bg-gray-50 p-2 rounded">
                        用户备注：希望节奏不要太赶，父母同行，尽量不走高海拔。住宿要求四星级以上，有景观房最好。
                     </p>
                     <p className="text-[10px] text-[#999]">处理进度：旅行顾问将在 24 小时内电话或微信联系你，确认需求细节。</p>
                  </div>
                  <div className="flex items-center justify-end gap-3 border-t border-gray-100 p-3">
                     <button className="px-3 py-1.5 rounded-lg border border-[#00bdd6]/50 text-[#00bdd6] text-xs font-medium">在 AI 工作台继续沟通</button>
                     <button className="px-3 py-1.5 text-[#666] text-xs font-medium">查看详情</button>
                  </div>
               </div>

               {/* Intent Card 2 */}
               <div className="flex flex-col rounded-xl bg-white shadow-sm">
                  <div className="flex w-full flex-col gap-3 p-4">
                     <div className="flex items-start justify-between gap-3">
                        <h3 className="text-lg font-bold text-[#333]">新西兰南岛自驾</h3>
                        <span className="rounded-md bg-[#00bdd6]/10 px-2 py-1 text-xs font-medium text-[#00bdd6]">【已接单】</span>
                     </div>
                     <div className="flex items-center justify-between text-xs text-[#666]">
                        <p>提交时间：2024.04.10 11:20</p>
                        <p>【从头规划】</p>
                     </div>
                     <p className="text-xs text-[#666] line-clamp-2 bg-gray-50 p-2 rounded">
                        用户备注：两个家庭，共4大2小，孩子分别是6岁和8岁。希望有亲子活动，比如农场体验、观星等。
                     </p>
                     <p className="text-[10px] text-[#999]">处理进度：专属顾问已在 AI 工作台与你沟通，并上传了初步方案 V1.2。</p>
                  </div>
                  <div className="flex items-center justify-end gap-3 border-t border-gray-100 p-3">
                     <button className="px-3 py-1.5 rounded-lg border border-[#00bdd6]/50 text-[#00bdd6] text-xs font-medium">在 AI 工作台继续沟通</button>
                     <button className="px-3 py-1.5 text-[#666] text-xs font-medium">查看详情</button>
                  </div>
               </div>
            </div>
         )}
      </div>
    </div>
  );
};

// ... (ItineraryPage, ProfilePage, PlanDetailsPage, DailyItineraryPage remain unchanged)
const ItineraryPage = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  return (
    <div className="relative flex flex-col w-full min-h-screen overflow-x-hidden bg-[#f5f8f8]">
      {/* Header */}
      <div className="sticky top-0 z-10 flex flex-col gap-2 p-4 pb-2 border-b border-gray-200 bg-[#f5f8f8]">
        <div className="flex items-center justify-between h-12">
          <button 
            onClick={() => onNavigate('home')}
            className="flex items-center justify-start pl-0 text-black size-12 shrink-0"
          >
            <ArrowLeft size={28} />
          </button>
        </div>
        <p className="text-[#1A202C] tracking-tight text-[28px] font-bold leading-tight">大西北 10 日环线</p>
        <p className="text-[#A0AEC0] text-base font-normal leading-normal pt-1">2024年7月20日 - 2024年7月29日</p>
        <p className="text-sm text-[#A0AEC0]">共 10 天 · 已完成 2 天 · 今天是第 3 天</p>
        <div className="flex items-start justify-between pt-2 pb-2">
          <div className="flex gap-3">
            <div className="flex items-center justify-center h-8 px-4 rounded-full gap-x-2 shrink-0 bg-[#F6AD55]/20">
              <p className="text-sm font-medium leading-normal text-[#F6AD55]">进行中，第3天</p>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-transparent text-[#48BB78] gap-2 pl-3 text-sm font-bold leading-normal tracking-[0.015em]">
              <Bot size={20} />
              <span className="truncate">智能管家已开启</span>
            </button>
          </div>
        </div>
        <p className="pb-2 text-xs text-[#A0AEC0]">AI 管家会综合行程订单、票据和定位，动态更新这趟旅程的安排。</p>
      </div>

      <main className="flex-grow px-4 pt-4 pb-24">
        {/* Today's Generated Itinerary Card */}
        <div className="w-full mb-6 cursor-pointer" onClick={() => onNavigate('dailyItinerary')}>
          <div className="relative flex flex-col items-stretch justify-start overflow-hidden bg-white shadow-md rounded-xl">
            <div className="absolute top-0 right-0 px-3 py-1 text-xs font-bold text-white rounded-bl-lg bg-[#00bdd6]/80">【今日路书已生成】</div>
            <div 
              className="w-full bg-center bg-no-repeat bg-cover aspect-[16/7]" 
              style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1581156977508-5280bf863de2?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")' }}
            ></div>
            <div className="flex flex-col items-stretch justify-center w-full gap-2 p-4 min-w-72 grow">
              <p className="text-[#2C5282] text-lg font-bold leading-tight tracking-[-0.015em]">今天是第3天</p>
              <div className="flex items-center justify-between gap-3">
                <div className="flex-col flex-grow gap-1 flex">
                  <p className="text-base font-normal leading-normal text-[#1A202C]">今日将游览青海湖，并体验茶卡盐湖的绝美风光，我已经为你安排好集合时间与最佳拍照时段。</p>
                  <p className="text-base font-bold leading-normal text-[#00bdd6]">查看今日路书</p>
                </div>
                <button className="flex items-center justify-center w-10 h-10 text-sm font-medium leading-normal text-white overflow-hidden rounded-full cursor-pointer shrink-0 bg-[#00bdd6]">
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Daily List */}
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-bold text-[#1A202C]">每日行程列表</h3>
          
          {/* Day 1 - Completed */}
          <div className="flex items-center gap-4 p-4 shadow-sm cursor-pointer rounded-xl bg-white">
            <div className="flex items-center justify-center w-10 h-10 rounded-full shrink-0 bg-[#48BB78]/20 text-[#48BB78]">
              <Check size={24} />
            </div>
            <div className="flex-grow">
              <p className="font-bold text-[#1A202C]">Day 1 · 抵达西宁，市区自由探索</p>
              <p className="text-sm text-[#A0AEC0]">7月20日</p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#48BB78]/10">
                <CheckCircle2 size={12} className="text-[#48BB78]" />
                <span className="text-xs font-medium text-[#48BB78]">已完成</span>
              </div>
            </div>
          </div>

          {/* Day 2 - Completed */}
          <div className="flex items-center gap-4 p-4 shadow-sm cursor-pointer rounded-xl bg-white">
            <div className="flex items-center justify-center w-10 h-10 rounded-full shrink-0 bg-[#48BB78]/20 text-[#48BB78]">
              <Check size={24} />
            </div>
            <div className="flex-grow">
              <p className="font-bold text-[#1A202C]">Day 2 · 塔尔寺文化巡礼，体验藏传佛教氛围</p>
              <p className="text-sm text-[#A0AEC0]">7月21日</p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#48BB78]/10">
                <CheckCircle2 size={12} className="text-[#48BB78]" />
                <span className="text-xs font-medium text-[#48BB78]">已完成</span>
              </div>
            </div>
          </div>

          {/* Day 3 - Current - Clickable */}
          <div 
            className="flex flex-col gap-2 p-4 shadow-lg cursor-pointer rounded-xl bg-[#2C5282]"
            onClick={() => onNavigate('dailyItinerary')}
          >
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-10 h-10 text-white rounded-full shrink-0 bg-white/20">
                <Play size={24} fill="currentColor" />
              </div>
              <div className="flex-grow">
                <p className="font-bold text-white">Day 3 · 青海湖壮丽观光，茶卡盐湖天空之镜</p>
                <p className="text-sm text-white/80">7月22日</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/20">
                  <RefreshCcw size={12} className="text-white" />
                  <span className="text-xs font-medium text-white">进行中</span>
                </div>
              </div>
            </div>
            <div className="pl-14">
              <p className="text-xs text-white/80">今日安排已根据实际抵达时间自动调整。</p>
            </div>
          </div>

          {/* Day 4 - Pending */}
          <div className="flex flex-col gap-3 p-4 opacity-80 shadow-sm cursor-pointer rounded-xl bg-white">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-full shrink-0 bg-[#E2E8F0] text-[#718096]">
                <Hourglass size={24} />
              </div>
              <div className="flex-grow">
                <p className="font-bold text-[#1A202C]">Day 4 · 德令哈翡翠湖，前往敦煌</p>
                <p className="text-sm text-[#A0AEC0]">7月23日</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <div className="flex items-center gap-1 px-2 py-0.5 bg-gray-100 rounded-full">
                  <Clock size={12} className="text-[#718096]" />
                  <span className="text-xs font-medium text-[#718096]">未开始</span>
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <a className="text-sm font-medium text-[#00bdd6] hover:underline" href="#">让 AI 帮我调轻松一点</a>
            </div>
          </div>

          {/* Day 5 - Pending */}
          <div className="flex flex-col gap-3 p-4 opacity-80 shadow-sm cursor-pointer rounded-xl bg-white">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-full shrink-0 bg-[#E2E8F0] text-[#718096]">
                <Hourglass size={24} />
              </div>
              <div className="flex-grow">
                <p className="font-bold text-[#1A202C]">Day 5 · 莫高窟艺术殿堂，鸣沙山月牙泉</p>
                <p className="text-sm text-[#A0AEC0]">7月24日</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <div className="flex items-center gap-1 px-2 py-0.5 bg-gray-100 rounded-full">
                  <Clock size={12} className="text-[#718096]" />
                  <span className="text-xs font-medium text-[#718096]">未开始</span>
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <a className="text-sm font-medium text-[#00bdd6] hover:underline" href="#">问 AI：这一天会不会太赶？</a>
            </div>
          </div>

          {/* Day 6 */}
          <div className="flex flex-col gap-3 p-4 opacity-80 shadow-sm cursor-pointer rounded-xl bg-white">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-full shrink-0 bg-[#E2E8F0] text-[#718096]">
                <Hourglass size={24} />
              </div>
              <div className="flex-grow">
                <p className="font-bold text-[#1A202C]">Day 6 · 嘉峪关雄伟城楼，张掖七彩丹霞</p>
                <p className="text-sm text-[#A0AEC0]">7月25日</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <div className="flex items-center gap-1 px-2 py-0.5 bg-gray-100 rounded-full">
                  <Clock size={12} className="text-[#718096]" />
                  <span className="text-xs font-medium text-[#718096]">未开始</span>
                </div>
              </div>
            </div>
          </div>
          
           {/* Day 7 */}
           <div className="flex flex-col gap-3 p-4 opacity-80 shadow-sm cursor-pointer rounded-xl bg-white">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-full shrink-0 bg-[#E2E8F0] text-[#718096]">
                <Hourglass size={24} />
              </div>
              <div className="flex-grow">
                <p className="font-bold text-[#1A202C]">Day 7 · 祁连山大草原，卓尔山观景</p>
                <p className="text-sm text-[#A0AEC0]">7月26日</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <div className="flex items-center gap-1 px-2 py-0.5 bg-gray-100 rounded-full">
                  <Clock size={12} className="text-[#718096]" />
                  <span className="text-xs font-medium text-[#718096]">未开始</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Day 8 */}
           <div className="flex flex-col gap-3 p-4 opacity-80 shadow-sm cursor-pointer rounded-xl bg-white">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-full shrink-0 bg-[#E2E8F0] text-[#718096]">
                <Hourglass size={24} />
              </div>
              <div className="flex-grow">
                <p className="font-bold text-[#1A202C]">Day 8 · 门源油菜花海（季节限定），返回西宁</p>
                <p className="text-sm text-[#A0AEC0]">7月27日</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <div className="flex items-center gap-1 px-2 py-0.5 bg-gray-100 rounded-full">
                  <Clock size={12} className="text-[#718096]" />
                  <span className="text-xs font-medium text-[#718096]">未开始</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Floating Action Button */}
      <div 
        className="fixed z-20 bottom-6 right-6" 
        title="问 AI 管家：关于这趟行程的任何问题，我都可以帮你。"
        onClick={() => onNavigate('workbench')}
      >
        <button className="flex items-center justify-center h-16 gap-2 px-5 py-2 overflow-hidden text-white shadow-xl cursor-pointer w-auto rounded-full bg-[#00bdd6]">
          <MessageCircle size={32} />
          <span className="text-lg font-bold">问 AI 管家</span>
        </button>
      </div>
    </div>
  );
};

const PlanDetailsPage = ({ onBack }: { onBack: () => void }) => {
  const [expandedDay, setExpandedDay] = useState<number | null>(1);

  // Helper to match the specific content structure of the design
  const itineraryItems = [
    {
      day: 1,
      title: "上海 → 西宁",
      details: [
        { type: 'schedule', icon: Clock, text: "上午：航班抵达西宁，专车接机入住酒店。\n下午：自由活动，适应高原气候。\n晚上：品尝当地特色美食。", highlight: false },
        { type: 'highlight', icon: MapPin, text: "重点景点：东关清真大寺，莫家街", highlight: false },
        { type: 'tip', icon: Info, text: "AI 提醒：今日海拔略高，请注意保暖与补水，避免剧烈运动。", highlight: true }
      ]
    },
    {
      day: 2,
      title: "西宁 → 青海湖",
      details: [
        { type: 'transport', icon: Car, text: "车程约 3 小时", highlight: false },
        { type: 'highlight', icon: MapPin, text: "重点景点：青海湖东岸观景台，二郎剑景区", highlight: false },
        { type: 'optional', icon: ShoppingCart, text: "可选项目：青海湖游船 (约 ¥140/人)", highlight: false }
      ]
    },
    { day: 3, title: "青海湖 → 茶卡盐湖", details: [] },
    { day: 4, title: "德令哈 → 大柴旦", details: [] }
  ];

  return (
    <div className="flex flex-col h-full bg-[#f7f9fa] overflow-y-auto scrollbar-hide pb-24">
      {/* Header */}
      <div className="sticky top-0 z-50 flex items-center justify-between p-4 bg-[#f7f9fa]/80 backdrop-blur-sm">
        <button onClick={onBack} className="flex items-center justify-center size-10 text-[#333] hover:bg-black/5 rounded-full transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h2 className="flex-1 text-xl font-medium text-center text-[#333]">当前方案</h2>
        <button className="flex items-center justify-center size-10 text-[#333]">
          <MoreHorizontal size={24} />
        </button>
      </div>

      <div className="flex flex-col gap-6 p-4">
        {/* Title Section */}
        <div>
           <div className="flex items-start justify-between">
              <h1 className="text-xl font-medium leading-tight text-[#333]">方案 A · 大西北 8 日</h1>
           </div>
           <p className="mt-2 text-sm text-[#666]">从上海出发 · 2 人 · 预计 ¥5,800/人</p>
        </div>

        {/* Hero Card */}
        <div className="flex flex-col overflow-hidden bg-white rounded-xl shadow-[0_2px_4px_rgba(0,0,0,0.05)]">
           <div className="relative w-full aspect-[2/1] bg-center bg-no-repeat bg-cover" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCuUcFVogH3sMWA2DOG-iF5d4LL4Ftl-WIz1lNCgQPW8XaoIRyg1KwYRHX_YdXKEom5mNNEpfHyC4Yc4SeoM9Im7ZoS0uBS-A7xekk2qb5ycsPq_iUHeAqbRXhUT6OBFqa14nT7KgimOspjebE32pB44MygOhNumeP7K_FO-AruFNUjpafyhE3DKTVfj1U4v9XuJn0cDobHfh_5KO4j-E44JuY6jwLXcHRSEteeUaLHTKYrZkv5WjpvPfDbg0OFRjdcqK545DQ4xJLF")' }}>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-3 left-3 px-2 py-1 bg-white/20 backdrop-blur-sm rounded-md text-xs font-medium text-white">深度线路</div>
              <div className="absolute bottom-3 right-3 px-2 py-1 bg-[#FF7043]/80 backdrop-blur-sm rounded-md text-xs font-medium text-white">匹配度 92%</div>
           </div>
           <div className="flex flex-col gap-4 p-4">
              <p className="text-base leading-relaxed text-[#333]">青海湖 + 茶卡盐湖 + 张掖丹霞，8 日环线，适合首次大西北深度游</p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                 <p className="text-base text-[#666]">出发地：<span className="font-medium text-[#333]">上海</span></p>
                 <p className="text-base text-[#666]">天数：<span className="font-medium text-[#333]">8 日</span></p>
                 <p className="text-base text-[#666]">人数：<span className="font-medium text-[#333]">2 人</span></p>
                 <p className="text-base text-[#666]">预算：<span className="font-medium text-[#333]">约 ¥5,800/人</span></p>
              </div>
              <p className="text-xs text-[#666]">以上为 AI 预估参数，最终价格与库存由人工确认。</p>
           </div>
        </div>

        {/* Daily Itinerary */}
        <div className="flex flex-col gap-4">
           <h3 className="text-2xl font-bold text-[#333]">每日行程</h3>
           <div className="relative flex flex-col gap-4 pl-5">
              <div className="absolute top-2 bottom-2 left-0 w-0.5 bg-[#00bdd6] rounded-full"></div>
              
              {itineraryItems.map((item) => (
                 <div key={item.day} className="relative">
                    <div className="absolute -left-[27px] top-4 flex size-4 items-center justify-center rounded-full bg-[#00bdd6]">
                       <div className="size-1.5 rounded-full bg-white"></div>
                    </div>
                    <div className="flex flex-col bg-white rounded-xl shadow-[0_2px_4px_rgba(0,0,0,0.05)] overflow-hidden">
                       <div 
                         className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                         onClick={() => setExpandedDay(expandedDay === item.day ? null : item.day)}
                       >
                          <p className="text-base font-medium text-[#333]">Day {item.day} · {item.title}</p>
                          {expandedDay === item.day ? <ChevronUp size={20} className="text-[#666]" /> : <ChevronDown size={20} className="text-[#666]" />}
                       </div>
                       
                       {expandedDay === item.day && (
                         <div className="flex flex-col gap-4 px-4 pb-4 border-t border-gray-100 pt-3 animate-in slide-in-from-top-1">
                            {item.details.map((detail, idx) => (
                               <div key={idx} className={`flex items-start gap-3 ${detail.highlight ? 'p-3 rounded-lg bg-[#00bdd6]/10' : ''}`}>
                                  <detail.icon size={20} className={`mt-0.5 shrink-0 ${detail.highlight ? 'text-[#00bdd6]' : 'text-[#666]'}`} />
                                  <div className={`flex-1 text-sm ${detail.highlight ? 'text-[#006064]' : 'text-[#666]'} whitespace-pre-line`}>
                                     {detail.text.split("：").map((part, i, arr) => 
                                        arr.length > 1 && i === 0 ? <span key={i} className="font-medium text-[#333]">{part}：</span> : part
                                     )}
                                  </div>
                               </div>
                            ))}
                         </div>
                       )}
                    </div>
                 </div>
              ))}
           </div>
        </div>

        {/* Budget Breakdown */}
        <div className="flex flex-col gap-4">
           <h3 className="text-2xl font-bold text-[#333]">预算与费用构成</h3>
           <div className="p-4 bg-white rounded-xl shadow-[0_2px_4px_rgba(0,0,0,0.05)]">
              <p className="text-base text-[#333]">预计人均 <span className="text-2xl font-bold text-[#00bdd6]">¥5,800</span> <span className="text-sm text-[#666]">（不含个人消费）</span></p>
              <div className="flex flex-col gap-4 mt-4">
                 {[
                   { label: '交通', price: '¥2,000/人' },
                   { label: '住宿', price: '¥2,000/人' },
                   { label: '活动/门票', price: '¥1,800/人' }
                 ].map((cost, idx) => (
                   <div key={idx} className="flex items-center gap-3">
                      <p className="flex-1 text-base text-[#333]">{cost.label}</p>
                      <p className="text-base text-[#333]">{cost.price}</p>
                   </div>
                 ))}
              </div>
              <p className="mt-4 text-sm text-[#666]">费用构成为 AI 估算，实际费用以预订时为准。</p>
           </div>
        </div>

        {/* Product Combo */}
        <div className="flex flex-col gap-4">
           <h3 className="text-2xl font-bold text-[#333]">由以下产品组合而成</h3>
           <div className="p-4 bg-white rounded-xl shadow-[0_2px_4px_rgba(0,0,0,0.05)]">
              <ul className="space-y-4">
                 <li className="flex items-start gap-4">
                    <div className="flex items-center justify-center mt-1 text-[#00bdd6]">
                       <Hotel size={24} />
                    </div>
                    <div>
                       <p className="text-base text-[#333]">西宁 1 晚 · 市区精品酒店</p>
                       <p className="text-sm text-[#666]">类型: 住宿 · 供应商: 甲</p>
                    </div>
                 </li>
                 <li className="flex items-start gap-4">
                    <div className="flex items-center justify-center mt-1 text-[#00bdd6]">
                       <Users size={24} />
                    </div>
                    <div>
                       <p className="text-base text-[#333]">青海湖一日游 · 拼团</p>
                       <p className="text-sm text-[#666]">类型: 活动 · 供应商: 乙 · 2 人起订</p>
                    </div>
                 </li>
              </ul>
              <p className="mt-4 text-sm text-[#666]">以上为示意组合，后台可根据库存自动替换为同类产品。</p>
           </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-3 bg-white/90 backdrop-blur-sm max-w-[430px] mx-auto shadow-[0_-2px_4px_rgba(0,0,0,0.05)]">
         <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
               <button className="flex items-center justify-center flex-1 h-12 gap-2 text-sm font-medium text-center border rounded-xl text-[#00bdd6] border-[#00bdd6] active:bg-[#e0f7fa] transition-colors">
                  <Share2 size={20} />
                  复制方案分享
               </button>
               <button onClick={onBack} className="flex items-center justify-center flex-1 h-12 gap-2 text-sm font-medium text-center border rounded-xl text-[#00bdd6] border-[#00bdd6] active:bg-[#e0f7fa] transition-colors">
                  <Sparkles size={20} />
                  在对话中继续调整
               </button>
            </div>
            <button className="flex items-center justify-center w-full h-12 text-base font-medium text-center text-white rounded-[24px] bg-[#00bdd6] shadow-lg shadow-[#00bdd6]/30 active:scale-95 transition-all">
               提交给旅行顾问
            </button>
         </div>
      </div>
    </div>
  );
};

// ... (ProfilePage and other existing pages remain unchanged)
const ProfilePage = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  const [settings, setSettings] = useState({
    reminders: true,
    location: true,
    aiTips: false
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="flex flex-col h-full bg-[#f5f8f8] overflow-y-auto scrollbar-hide pb-24">
      {/* Header removed as per request */}
      
      <div className="p-4 flex flex-col gap-6 pt-6">
        {/* User Card */}
        <div className="bg-white p-4 rounded-xl shadow-sm flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer">
           <div className="flex items-center gap-4">
              <div 
                className="size-16 rounded-full bg-cover bg-center" 
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBY57mwNFNTbYo8AV7oIq5jxG_YHODAaF-dmHixGbmH9hKQI49OFKE_GnBtmkUYqBbgBYNQjPZfpIaR6aAztg7BUekxS0Hjl4J3A0DR96vWHenEpcKNk1vYyIap0f_X9qHRwejDAaui8ma8lzOm3MtI8xpOOOpwMX5GWnPYqhqCS7LiedXZC63VQRADsCZPsWY1D03khM2lOML-MnQfAdXmEbZCP24wpo5pZEUZ4MdDTrQFfQjNFCNjEAkvS22XMm95xb4K99VuyJY1")' }}
              ></div>
              <div className="flex flex-col">
                 <p className="text-lg font-bold text-[#333]">Wanderer123</p>
                 <p className="text-xs text-[#666]">使用手机号注册的 DeepTrip 账号</p>
              </div>
           </div>
           <ChevronRight size={20} className="text-[#999]" />
        </div>

        {/* Preferences & Settings */}
        <div className="flex flex-col gap-3">
           <h2 className="text-xs text-[#666] px-1">偏好与设置</h2>
           <div className="bg-white rounded-xl shadow-sm overflow-hidden divide-y divide-[#f0f0f0]">
              
              {/* Trip Reminders */}
              <div className="p-4 flex items-center justify-between gap-4">
                 <div className="flex gap-3 flex-1 min-w-0">
                    <div className="size-10 rounded-lg bg-[#e0f7fa] flex items-center justify-center text-[#00bdd6] shrink-0">
                       <Bell size={20} />
                    </div>
                    <div className="flex flex-col pr-2">
                       <p className="text-sm font-medium text-[#333]">行程提醒</p>
                       <p className="text-xs text-[#666] mt-0.5 leading-tight">包括出发前提醒、集合时间、天气与安全提示</p>
                    </div>
                 </div>
                 <button 
                   onClick={() => toggleSetting('reminders')}
                   className={`w-[52px] h-[32px] rounded-full p-0.5 transition-colors shrink-0 ${settings.reminders ? 'bg-[#00bdd6]' : 'bg-[#e0e0e0]'}`}
                 >
                    <div className={`size-[28px] bg-white rounded-full shadow-sm transform transition-transform ${settings.reminders ? 'translate-x-[20px]' : 'translate-x-0'}`}></div>
                 </button>
              </div>

              {/* Location Optimization */}
              <div className="p-4 flex items-center justify-between gap-4">
                 <div className="flex gap-3 flex-1 min-w-0">
                    <div className="size-10 rounded-lg bg-[#e0f7fa] flex items-center justify-center text-[#00bdd6] shrink-0">
                       <MapPin size={20} />
                    </div>
                    <div className="flex flex-col pr-2">
                       <p className="text-sm font-medium text-[#333]">使用定位优化行程提醒</p>
                       <p className="text-xs text-[#666] mt-0.5 leading-tight">开启后，AI 管家会根据你的实时位置调整集合提醒和路书建议。</p>
                    </div>
                 </div>
                 <button 
                   onClick={() => toggleSetting('location')}
                   className={`w-[52px] h-[32px] rounded-full p-0.5 transition-colors shrink-0 ${settings.location ? 'bg-[#00bdd6]' : 'bg-[#e0e0e0]'}`}
                 >
                    <div className={`size-[28px] bg-white rounded-full shadow-sm transform transition-transform ${settings.location ? 'translate-x-[20px]' : 'translate-x-0'}`}></div>
                 </button>
              </div>

              {/* AI Butler Tips */}
              <div className="p-4 flex items-center justify-between gap-4">
                 <div className="flex gap-3 flex-1 min-w-0">
                    <div className="size-10 rounded-lg bg-[#e0f7fa] flex items-center justify-center text-[#00bdd6] shrink-0">
                       <Bot size={20} />
                    </div>
                    <div className="flex flex-col pr-2">
                       <p className="text-sm font-medium text-[#333]">AI 管家小贴士</p>
                       <p className="text-xs text-[#666] mt-0.5 leading-tight">开启后，AI 会根据你的行程和偏好，适度推送路线建议与优化提示</p>
                    </div>
                 </div>
                 <button 
                   onClick={() => toggleSetting('aiTips')}
                   className={`w-[52px] h-[32px] rounded-full p-0.5 transition-colors shrink-0 ${settings.aiTips ? 'bg-[#00bdd6]' : 'bg-[#e0e0e0]'}`}
                 >
                    <div className={`size-[28px] bg-white rounded-full shadow-sm transform transition-transform ${settings.aiTips ? 'translate-x-[20px]' : 'translate-x-0'}`}></div>
                 </button>
              </div>

              {/* Privacy */}
              <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors gap-4">
                 <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="size-10 rounded-lg bg-[#e0f7fa] flex items-center justify-center text-[#00bdd6] shrink-0">
                       <Shield size={20} />
                    </div>
                    <div className="flex flex-col pr-2">
                       <p className="text-sm font-medium text-[#333]">个性化推荐与隐私</p>
                       <p className="text-xs text-[#666] mt-0.5 leading-tight">管理用于推荐和行程优化的记录、偏好、票据和定位数据。</p>
                    </div>
                 </div>
                 <ChevronRight size={20} className="text-[#999] shrink-0" />
              </div>
           </div>
        </div>

        {/* Depth Index Card */}
        <div className="bg-white rounded-xl shadow-sm p-4 flex flex-col gap-4">
           <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                 <p className="text-sm font-medium text-[#333]">我的深度指数/类型</p>
                 <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FF7043]/10 text-[#FF7043] text-xs font-medium">
                    <Smile size={14} />
                    人文探索家
                 </div>
              </div>
              <p className="text-xs text-[#666] mt-1">当前深度指数：7.3 / 10 · 偏好人文景点、适中行程强度</p>
           </div>
           <div className="border-t border-[#f0f0f0]"></div>
           <button 
             onClick={() => onNavigate('preference')}
             className="text-center text-sm font-medium text-[#00bdd6] hover:underline"
           >
             查看/编辑我的旅行偏好
           </button>
           <button 
             onClick={() => {
               onNavigate('preference'); 
             }}
             className="w-full h-11 rounded-full bg-[#00bdd6] text-white text-sm font-bold shadow-sm hover:opacity-90 active:scale-95 transition-all"
           >
             重新做一次偏好测试
           </button>
        </div>

        {/* AI & Account */}
        <div className="flex flex-col gap-3">
           <h2 className="text-xs text-[#666] px-1">AI 与账户</h2>
           <div className="bg-white rounded-xl shadow-sm overflow-hidden divide-y divide-[#f0f0f0]">
              {[
                { title: '我的愿望清单', icon: Heart, action: () => onNavigate('groupIntent') }, // Changed to link to groupIntent for demo
                { title: '拼团与意向记录', icon: Users, action: () => onNavigate('groupIntent') },
                { title: '数据导出与删除', icon: FileText, action: () => {} }
              ].map((item, idx) => {
                 const Icon = item.icon;
                 return (
                  <div 
                    key={idx} 
                    className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={item.action}
                  >
                     <div className="flex items-center gap-3">
                        <Icon size={18} className="text-[#666]" />
                        <p className="text-sm text-[#333]">{item.title}</p>
                     </div>
                     <ChevronRight size={20} className="text-[#999]" />
                  </div>
                 )
              })}
           </div>
        </div>

        {/* Footer Links */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden divide-y divide-[#f0f0f0]">
           {['服务条款', '隐私政策', '关于 DeepTrip'].map((item, idx) => (
             <div key={idx} className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors">
                <p className="text-sm text-[#333]">{item}</p>
                <ChevronRight size={20} className="text-[#999]" />
             </div>
           ))}
        </div>

        {/* Logout */}
        <button className="w-full h-12 rounded-full bg-[#f0f0f0] text-[#666] text-sm font-bold hover:bg-[#e0e0e0] active:scale-95 transition-all mb-4">
           退出登录
        </button>

      </div>
    </div>
  );
};

// 5. NEW: Daily Itinerary Page
const DailyItineraryPage = ({ onBack }: { onBack: () => void }) => {
  const [expandedDay, setExpandedDay] = useState(3); // Demo day
  const [lunchOption, setLunchOption] = useState('tibetan');

  const lunchImages: Record<string, string> = {
    tibetan: "https://images.unsplash.com/photo-1605333396915-47ed6b68a00e?auto=format&fit=crop&w=800&q=80",
    noodles: "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=800&q=80"
  };

  return (
    <div className="flex flex-col h-full bg-[#f5f8f8] overflow-y-auto scrollbar-hide pb-24">
      {/* Sticky Header */}
      <div className="sticky top-0 z-20 flex items-center justify-between bg-[#f5f8f8]/90 backdrop-blur-sm p-4 h-[56px]">
        <button onClick={onBack} className="flex size-10 shrink-0 items-center justify-center text-[#333] hover:bg-black/5 rounded-full transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-lg font-bold text-[#333] flex-1 text-center">智能旅行管家 · 每日路书</h2>
        <button className="flex size-10 shrink-0 items-center justify-center text-[#333]">
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="flex flex-col gap-6 p-4">
        {/* Day Info Card */}
        <div className="bg-white rounded-2xl shadow-sm p-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-bold text-[#333]">今天是第 3 天</h2>
            <div className="flex items-center gap-1 text-[#666]">
              <Sun size={18} />
              <span className="text-sm font-medium">晴 · 15–25℃</span>
            </div>
          </div>
          <p className="text-sm text-[#666] leading-relaxed mb-3">今天是探索青海湖与茶卡盐湖的绝美一日，我已经为你规划好最佳观光路线与拍照时段，请注意高原防晒。</p>
          <p className="text-[10px] text-[#999] mb-4">本日路书已根据你的行程订单、机票/火车票、酒店信息和当前定位生成。</p>
          
          <div className="mb-4">
            <div className="flex justify-between text-xs text-[#666] mb-1">
              <span>大西北 10 日环线 · 当前第 3 天</span>
              <span>已完成 2/10</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
              <div className="h-full bg-[#00bdd6] rounded-full" style={{ width: '20%' }}></div>
            </div>
          </div>

          <div className="border-t border-[#f0f0f0] pt-3">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={16} className="text-[#00bdd6]" />
              <span className="text-sm font-bold text-[#333]">来自 AI 管家的小提醒</span>
            </div>
            <ul className="space-y-1 pl-1">
              {['海拔较高，注意补水，避免剧烈运动。', '日照强烈，务必携带墨镜、防晒霜和帽子。', '温差大，备好外套。'].map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-[#666]">
                  <span className="text-[#00bdd6] mt-1">●</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative pl-4">
          <div className="absolute top-2 bottom-0 left-[27px] w-0.5 bg-[#00bdd6]/20"></div>
          
          {/* 07:30 Breakfast */}
          <div className="relative flex gap-4 mb-8">
            <div className="relative z-10 shrink-0 mt-1">
              <div className="size-8 rounded-full bg-[#4CAF50] ring-4 ring-[#f5f8f8] flex items-center justify-center text-white">
                <Check size={16} />
              </div>
            </div>
            <div className="flex-1 pt-1">
              <p className="text-xs text-[#666] mb-2">07:30</p>
              <div className="bg-white rounded-xl shadow-sm p-3">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="text-base font-bold text-[#333]">酒店早餐</h3>
                  <span className="px-2 py-0.5 rounded-full bg-[#4CAF50]/10 text-[#4CAF50] text-[10px] font-bold">已完成</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-[#666] mb-1">
                  <MapPin size={12} />
                  <span>西宁 XX 酒店餐厅</span>
                </div>
                <p className="text-xs text-[#666] mb-2">早餐时间：07:00 - 10:00</p>
                <p className="text-xs text-[#666] mb-3 bg-gray-50 p-2 rounded-lg">中西式自助早餐，提供现煮牛肉面、青海老酸奶、热菜、面包及水果。</p>
                <button className="w-full h-9 flex items-center justify-between px-3 bg-gray-100 rounded-lg text-xs font-medium text-[#333]">
                  <div className="flex items-center gap-2">
                    <Navigation size={14} className="text-[#00bdd6]" />
                    室内导航
                  </div>
                  <ChevronRight size={14} className="text-[#999]" />
                </button>
              </div>
            </div>
          </div>

          {/* 09:00 Departure */}
          <div className="relative flex gap-4 mb-8">
            <div className="relative z-10 shrink-0 mt-1">
              <div className="size-8 rounded-full bg-[#00bdd6] ring-4 ring-[#f5f8f8] flex items-center justify-center text-white">
                <Bus size={16} />
              </div>
            </div>
            <div className="flex-1 pt-1">
              <p className="text-xs text-[#666] mb-2">09:00</p>
              <div className="bg-[#00bdd6]/10 rounded-xl p-3 border border-[#00bdd6]/30">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-base font-bold text-[#333]">出发前往青海湖</h3>
                  <span className="px-2 py-0.5 rounded-full bg-[#00bdd6] text-white text-[10px] font-bold">距集合点约 4 公里</span>
                </div>
                <p className="text-xs text-[#666] mb-2">乘坐舒适旅游巴士，沿途欣赏青海湖风光。预计车程约 2 小时。</p>
                <p className="text-[10px] text-[#666] mb-3">根据当前定位，你距离集合点约 4 公里，建议现在出发或与领队联系。</p>
                
                <div className="flex items-center justify-between bg-white rounded-lg p-3 border border-gray-100 mb-3">
                  <div className="flex items-start gap-3">
                    <Navigation size={18} className="text-[#00bdd6] mt-0.5" />
                    <div>
                      <p className="text-sm font-bold text-[#333]">集合点导航</p>
                      <p className="text-[10px] text-[#666]">导航会根据你的当前位置自动调整路线。</p>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-[#999]" />
                </div>
                
                <div className="w-full h-32 rounded-lg bg-cover bg-center mb-3" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1605068263928-dc295689add1?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")' }}></div>
                
                <div className="bg-white/80 rounded-lg p-2 text-xs text-[#333]">
                   <div className="flex justify-between mb-1">
                      <span className="text-[#666]">今日车号:</span> <span className="font-bold">03</span>
                   </div>
                   <div className="flex justify-between mb-1">
                      <span className="text-[#666]">车牌:</span> <span className="font-bold">青A·88888</span>
                   </div>
                   <div className="flex justify-between">
                      <span className="text-[#666]">联系人:</span> <span className="font-bold">王师傅 138-0000-0000</span>
                   </div>
                </div>
              </div>
            </div>
          </div>

          {/* 11:00 Sightseeing */}
          <div className="relative flex gap-4 mb-8">
            <div className="relative z-10 shrink-0 mt-1">
              <div className="size-8 rounded-full bg-white border-2 border-[#00bdd6] ring-4 ring-[#f5f8f8] flex items-center justify-center text-[#00bdd6]">
                <Camera size={16} />
              </div>
            </div>
            <div className="flex-1 pt-1">
              <p className="text-xs text-[#666] mb-2">11:00</p>
              <div className="bg-white rounded-xl shadow-sm p-3">
                <h3 className="text-base font-bold text-[#333] mb-2">青海湖观光</h3>
                <p className="text-xs text-[#666] mb-3">在二郎剑景区深度体验青海湖的壮丽景色，感受湖畔的宁静与浩瀚。</p>
                
                <div className="bg-[#FF7043]/10 rounded-lg p-3 mb-3">
                  <p className="text-[10px] text-[#666] text-center mb-2">如果觉得人太多或身体不适，可以随时点下面的按钮先告诉 AI 管家，我会帮你联系导游或调整行程。</p>
                  <button className="w-full py-2 bg-[#FF7043] text-white text-xs font-bold rounded-full flex items-center justify-center gap-2">
                    <Bot size={14} />
                    紧急联络管家
                  </button>
                </div>

                <div className="w-full h-32 rounded-lg bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1593528084264-9ef118086b75?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")' }}></div>
              </div>
            </div>
          </div>

          {/* 13:00 Lunch */}
          <div className="relative flex gap-4 mb-8">
            <div className="relative z-10 shrink-0 mt-1">
              <div className="size-8 rounded-full bg-white border-2 border-[#00bdd6] ring-4 ring-[#f5f8f8] flex items-center justify-center text-[#00bdd6]">
                <Utensils size={16} />
              </div>
            </div>
            <div className="flex-1 pt-1">
              <p className="text-xs text-[#666] mb-2">13:00</p>
              <div className="bg-white rounded-xl shadow-sm p-3">
                <h3 className="text-base font-bold text-[#333] mb-2">当地餐厅午餐</h3>
                <p className="text-xs text-[#666] mb-3">可选择特色藏餐（糌粑、酥油茶）或清真面食（牛肉拉面）。AI 推荐：【藏家私房菜】或【青海老酸奶店】</p>
                
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <button 
                    onClick={() => setLunchOption('tibetan')}
                    className={`border rounded-lg p-2 text-center transition-colors ${lunchOption === 'tibetan' ? 'border-[#00bdd6] bg-[#e0f7fa]' : 'border-gray-200'}`}
                  >
                    <p className="text-xs font-bold text-[#333]">特色藏餐</p>
                    <p className="text-[10px] text-[#999]">糌粑、酥油茶</p>
                  </button>
                  <button 
                    onClick={() => setLunchOption('noodles')}
                    className={`border rounded-lg p-2 text-center transition-colors ${lunchOption === 'noodles' ? 'border-[#00bdd6] bg-[#e0f7fa]' : 'border-gray-200'}`}
                  >
                    <p className="text-xs font-bold text-[#333]">清真面食</p>
                    <p className="text-[10px] text-[#999]">牛肉拉面</p>
                  </button>
                </div>
                
                <button className="w-full py-2 bg-[#00bdd6]/10 text-[#00bdd6] border border-[#00bdd6]/30 text-xs font-bold rounded-lg mb-3">选择制作</button>
                <div 
                  className="w-full h-32 rounded-lg bg-cover bg-center transition-all duration-500" 
                  style={{ backgroundImage: `url(${lunchImages[lunchOption]})` }}
                ></div>
              </div>
            </div>
          </div>

          {/* 14:30 To Chaka */}
          <div className="relative flex gap-4 mb-8">
            <div className="relative z-10 shrink-0 mt-1">
              <div className="size-8 rounded-full bg-white border-2 border-[#00bdd6] ring-4 ring-[#f5f8f8] flex items-center justify-center text-[#00bdd6]">
                <Car size={16} />
              </div>
            </div>
            <div className="flex-1 pt-1">
              <p className="text-xs text-[#666] mb-2">14:30</p>
              <div className="bg-white rounded-xl shadow-sm p-3">
                <h3 className="text-base font-bold text-[#333] mb-1">前往茶卡盐湖</h3>
                <p className="text-xs text-[#666] mb-3">乘车前往“天空之镜”茶卡盐湖，预计车程约 1.5 小时。</p>
                <div className="w-full h-32 rounded-lg bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1588814928518-238716568ef4?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")' }}></div>
              </div>
            </div>
          </div>

          {/* 16:00 Chaka */}
          <div className="relative flex gap-4 mb-8">
            <div className="relative z-10 shrink-0 mt-1">
              <div className="size-8 rounded-full bg-white border-2 border-[#00bdd6] ring-4 ring-[#f5f8f8] flex items-center justify-center text-[#00bdd6]">
                <Camera size={16} />
              </div>
            </div>
            <div className="flex-1 pt-1">
              <p className="text-xs text-[#666] mb-2">16:00</p>
              <div className="bg-white rounded-xl shadow-sm p-3">
                <h3 className="text-base font-bold text-[#333] mb-1">茶卡盐湖深度体验</h3>
                <p className="text-xs text-[#666] mb-3">自由漫步盐湖，拍摄天空之镜的倒影奇观，感受纯净的白色世界。</p>
                <div className="w-full h-32 rounded-lg bg-cover bg-center mb-3" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1731031401558-beb65501a4a7?q=80&w=1145&auto=format")' }}></div>
                <button className="w-full py-2 bg-[#F44336]/10 text-[#F44336] text-xs font-bold rounded-lg flex items-center justify-center gap-2">
                  <Phone size={14} />
                  紧急联络管家
                </button>
              </div>
            </div>
          </div>

          {/* 18:30 Return */}
          <div className="relative flex gap-4">
            <div className="relative z-10 shrink-0 mt-1">
              <div className="size-8 rounded-full bg-white border-2 border-[#00bdd6] ring-4 ring-[#f5f8f8] flex items-center justify-center text-[#00bdd6]">
                <Bus size={16} />
              </div>
            </div>
            <div className="flex-1 pt-1">
              <p className="text-xs text-[#666] mb-2">18:30</p>
              <div className="bg-white rounded-xl shadow-sm p-3">
                <h3 className="text-base font-bold text-[#333] mb-1">返回西宁</h3>
                <p className="text-xs text-[#666]">结束茶卡盐湖之旅，乘车返回西宁市区。预计车程约 3 小时。</p>
              </div>
            </div>
          </div>
        </div>

        {/* AI Suggestions */}
        <div className="bg-white rounded-2xl shadow-sm p-4">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={16} className="text-[#00bdd6]" />
            <h3 className="text-base font-bold text-[#333]">AI 提醒与建议</h3>
          </div>
          <ul className="space-y-2">
            {[
              { label: '穿衣建议:', text: '青海湖畔风大，气温变化快，建议穿着防风外套和舒适长裤，内搭保暖衣物。' },
              { label: '拍照时间:', text: '青海湖日出（06:00-06:30）和茶卡盐湖日落（19:00-19:30）是最佳摄影时段，光线柔和，色彩丰富。' },
              { label: '饮食提醒:', text: '今日行程在高海拔地区，饮食宜清淡，多喝热水，避免过度饮酒。若有高原反应，请及时告知管家。' }
            ].map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-[#666]">
                <span className="text-[#00bdd6] mt-1">●</span>
                <div><span className="font-bold text-[#333]">{item.label}</span> {item.text}</div>
              </li>
            ))}
          </ul>
        </div>

        {/* Trouble? */}
        <div>
          <h3 className="text-base font-bold text-[#333] mb-3 px-1">遇到问题？</h3>
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center gap-2 bg-white p-3 rounded-xl shadow-sm text-left">
              <Clock size={18} className="text-[#00bdd6]" />
              <span className="text-xs font-bold text-[#333]">我可能会迟到</span>
            </button>
            <button className="flex items-center gap-2 bg-white p-3 rounded-xl shadow-sm text-left">
              <Edit size={18} className="text-[#00bdd6]" />
              <span className="text-xs font-bold text-[#333]">想调整行程</span>
            </button>
            <button className="flex items-center gap-2 bg-white p-3 rounded-xl shadow-sm text-left">
              <AlertTriangle size={18} className="text-[#00bdd6]" />
              <span className="text-xs font-bold text-[#333]">身体不舒服</span>
            </button>
            <button className="flex items-center gap-2 bg-white p-3 rounded-xl shadow-sm text-left">
              <Phone size={18} className="text-[#00bdd6]" />
              <span className="text-xs font-bold text-[#333]">直接联系导游</span>
            </button>
            <button className="col-span-2 flex items-center gap-2 bg-white p-3 rounded-xl shadow-sm text-left">
              <MapIcon size={18} className="text-[#00bdd6]" />
              <span className="text-xs font-bold text-[#333]">票据信息/定位不对，帮我重新调整</span>
            </button>
          </div>
        </div>

        {/* Next Day Preview */}
        <div className="bg-white rounded-2xl shadow-sm p-4">
          <h3 className="text-base font-bold text-[#333] mb-2">明日预告</h3>
          <p className="text-sm font-bold text-[#00bdd6] mb-1">Day 4 · 德令哈翡翠湖 → 敦煌</p>
          <p className="text-xs text-[#666] mb-3">预计车程 4 小时，中途会在柴达木盆地观景点短暂停留，感受荒漠的浩瀚。</p>
          <button className="w-full flex items-center justify-end gap-1 text-xs font-bold text-[#00bdd6]">
            查看完整行程
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 z-10 bg-white/90 backdrop-blur-sm border-t border-[#f0f0f0] p-4 max-w-[430px] mx-auto">
        <div className="flex gap-3">
          <button className="flex-1 h-12 bg-[#00bdd6]/10 text-[#00bdd6] font-bold text-sm rounded-xl hover:bg-[#00bdd6]/20 transition-colors">
            查看集合地点地图
          </button>
          <button className="flex-1 h-12 bg-[#00bdd6] text-white font-bold text-sm rounded-xl hover:bg-[#00bdd6]/90 transition-colors shadow-lg shadow-[#00bdd6]/30">
            问智能管家
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Main App Component ---

export default function DeepTripApp() {
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return <HomePage onNavigate={setActiveTab} />;
      case 'preference': return <PreferencePage onBack={() => setActiveTab('home')} />;
      case 'workbench': return <WorkbenchPage onBack={() => setActiveTab('home')} onNavigate={setActiveTab} />;
      case 'planDetails': return <PlanDetailsPage onBack={() => setActiveTab('workbench')} />;
      case 'itinerary': return <ItineraryPage onNavigate={setActiveTab} />;
      case 'profile': return <ProfilePage onNavigate={setActiveTab} />;
      case 'dailyItinerary': return <DailyItineraryPage onBack={() => setActiveTab('home')} />;
      case 'groupList': return <GroupListPage onBack={() => setActiveTab('workbench')} onNavigate={setActiveTab} />;
      case 'groupIntent': return <GroupAndIntentPage onBack={() => setActiveTab('profile')} />;
      case 'recommendedRoutes': return <RecommendedRoutesPage onBack={() => setActiveTab('home')} />;
      default: return <HomePage onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="font-sans min-h-screen max-w-[430px] mx-auto bg-[#f5f8f8] relative shadow-2xl overflow-hidden flex flex-col">
      {/* Status Bar Mock (Hide on special pages) */}
      {activeTab !== 'preference' && activeTab !== 'workbench' && activeTab !== 'planDetails' && activeTab !== 'dailyItinerary' && activeTab !== 'groupList' && activeTab !== 'groupIntent' && activeTab !== 'recommendedRoutes' && activeTab !== 'itinerary' && (
        <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-[#cde6ea]">
           <div className="flex items-center gap-2">
              <Compass size={24} style={{ color: theme.colors.primary }} />
              <div>
                 <h1 className="text-lg font-bold text-[#333] leading-none">DeepTrip AI</h1>
                 <p className="text-[10px] text-gray-500 font-medium">智能旅行助手</p>
              </div>
           </div>
           <div className="flex items-center gap-2">
              <div className="size-8 rounded-full bg-gray-100 flex items-center justify-center">
                 <span className="text-xs font-bold text-gray-600">VI</span>
              </div>
           </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto scrollbar-hide">
         {renderContent()}
      </main>

      {/* Bottom Navigation (Hide on special pages) */}
      {activeTab !== 'preference' && activeTab !== 'workbench' && activeTab !== 'planDetails' && activeTab !== 'dailyItinerary' && activeTab !== 'groupList' && activeTab !== 'groupIntent' && activeTab !== 'recommendedRoutes' && activeTab !== 'itinerary' && (
        <nav className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto h-[64px] bg-white border-t border-[#cde6ea] flex justify-around items-center z-30 pb-safe">
          <button 
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center justify-center gap-1 w-full h-full transition-colors ${activeTab === 'home' ? 'text-[#00bdd6]' : 'text-gray-400'}`}
          >
            <Home size={24} strokeWidth={activeTab === 'home' ? 2.5 : 2} />
            <span className="text-[10px] font-medium">首页</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('itinerary')}
            className={`flex flex-col items-center justify-center gap-1 w-full h-full transition-colors ${activeTab === 'itinerary' ? 'text-[#00bdd6]' : 'text-gray-400'}`}
          >
            <MapIcon size={24} strokeWidth={activeTab === 'itinerary' ? 2.5 : 2} />
            <span className="text-[10px] font-medium">行程</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center justify-center gap-1 w-full h-full transition-colors ${activeTab === 'profile' ? 'text-[#00bdd6]' : 'text-gray-400'}`}
          >
            <User size={24} strokeWidth={activeTab === 'profile' ? 2.5 : 2} />
            <span className="text-[10px] font-medium">我的</span>
          </button>
        </nav>
      )}
      
      {/* AI Assistant Floating Action Button */}
      {activeTab === 'home' && (
        <div className="fixed bottom-20 right-4 z-20">
           <button 
             onClick={() => {
               const textarea = document.querySelector('textarea');
               if (textarea) textarea.focus();
             }}
             className="size-12 rounded-full shadow-lg flex items-center justify-center text-white transition-transform hover:scale-110 active:scale-95"
             style={{ backgroundColor: theme.colors.primary }}
           >
              <div className="absolute animate-ping inline-flex h-full w-full rounded-full opacity-30 bg-white"></div>
              <Sparkles size={24} />
           </button>
        </div>
      )}
    </div>
  );
}
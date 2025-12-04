import React from 'react';
import {
  ArrowLeft,
  MoreHorizontal,
  ArrowRight,
  Sparkles,
  Mountain,
  Landmark,
  Heart,
  Frown
} from 'lucide-react';
import { demoTrip } from '../constants';
import type { UserPreference } from '../types';

export const RecommendedRoutesPage = ({ onBack, onNavigate, setActiveTrip, setPreloadedQuestion, userPreference }: { onBack: () => void; onNavigate: (page: string) => void; setActiveTrip: (trip: any) => void; setPreloadedQuestion: (q: string) => void; userPreference: UserPreference }) => {
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
              <p className="text-[#333] text-sm font-normal">你的深度指数：<span className="font-medium">{userPreference.depthScore.toFixed(1)} / 10 · {userPreference.typeName}</span></p>
           </div>
           <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div className="h-1.5 rounded-full bg-[#00bdd6]" style={{ width: `${userPreference.depthScore * 10}%` }}></div>
           </div>
        </div>

        {/* Intro Card */}
        <div className="flex flex-col items-stretch justify-start rounded-xl bg-white shadow-[0_2px_4px_rgba(0,0,0,0.05)] p-4 gap-3">
           <p className="text-[#333] text-xl font-medium">为你量身定制</p>
           <p className="text-[#666] text-base font-normal leading-relaxed">
              根据你的旅行深度指数（{userPreference.depthScore.toFixed(1)}）和偏好标签（{userPreference.tags.join(' · ')}），我们为你挑选了以下更匹配你旅行风格的线路。你现在是【{userPreference.typeName}】，因此我们优先推荐符合你偏好的路线。
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
           {/* Route Card 1 - demoTrip */}
           <div className="flex flex-col items-stretch justify-start rounded-xl shadow-[0_2px_4px_rgba(0,0,0,0.05)] bg-white overflow-hidden">
              <div className="relative w-full bg-center bg-no-repeat aspect-video bg-cover" style={{ backgroundImage: `url("${demoTrip.image}")` }}>
                 <div className="absolute top-3 right-3 flex items-center justify-center bg-green-500/10 px-2 py-1 rounded-md">
                    <p className="text-green-500 text-xs font-bold">匹配度：高</p>
                 </div>
                 <button className="absolute top-3 left-3 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm">
                    <Heart size={18} />
                 </button>
              </div>
              <div className="flex w-full grow flex-col items-stretch justify-center gap-4 p-4">
                 <div className="flex flex-col gap-1.5">
                    <p className="text-[#333] text-lg font-medium">{demoTrip.name}</p>
                    <p className="text-[#666] text-sm font-normal">{demoTrip.tagline}</p>
                    <p className="text-[#666] text-sm font-normal">{demoTrip.aiSummary}</p>
                 </div>
                 <div className="flex items-center gap-3 justify-between">
                    <button
                      onClick={() => {
                        setActiveTrip?.(demoTrip);
                        onNavigate?.('planDetails');
                      }}
                      className="flex flex-1 max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-3xl h-12 px-4 bg-[#00bdd6] text-white text-base font-medium"
                    >
                       <span className="truncate">查看详情</span>
                    </button>
                    <button
                      onClick={() => {
                        setActiveTrip?.(demoTrip);
                        setPreloadedQuestion?.(`这条${demoTrip.name}会不会太晒？`);
                        onNavigate?.('workbench');
                      }}
                      className="flex flex-1 max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-3xl h-12 px-4 bg-[#00bdd6]/10 text-[#00bdd6] text-base font-medium"
                    >
                       <span className="truncate">问 AI：会不会太晒？</span>
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

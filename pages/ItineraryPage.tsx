import React from 'react';
import {
  ArrowLeft,
  Bot,
  ChevronRight,
  Check,
  CheckCircle2,
  Play,
  RefreshCcw,
  Hourglass,
  Clock,
  MessageCircle
} from 'lucide-react';

export const ItineraryPage = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
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

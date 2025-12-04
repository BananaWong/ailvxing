import React from 'react';
import { ArrowLeft } from 'lucide-react';

export const GroupListPage = ({
  onBack,
  onNavigate,
  activeTrip,
  setActiveTrip
}: {
  onBack: () => void;
  onNavigate: (page: string) => void;
  activeTrip: any;
  setActiveTrip: (trip: any) => void;
}) => {
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
         {/* Trip Header Card */}
         <div className="relative flex flex-col rounded-xl bg-white shadow-sm overflow-hidden">
           <div className="w-full h-32 bg-cover bg-center" style={{backgroundImage: `url('${activeTrip.image}')`}}></div>
           <div className="flex flex-col p-4 gap-2">
             <p className="text-[#333] text-xl font-medium">{activeTrip.name}</p>
             <p className="text-[#666] text-sm">{activeTrip.duration} 天 {activeTrip.duration - 1} 夜 · 小团深度游</p>
             <div className="flex items-center gap-2 mt-1">
               <span className="px-2 py-0.5 bg-gray-100 rounded-full text-xs text-[#666]">{activeTrip.duration}天{activeTrip.duration - 1}夜</span>
               <span className="px-2 py-0.5 bg-gray-100 rounded-full text-xs text-[#666]">{activeTrip.tag}</span>
             </div>
             <p className="text-xs text-[#999] mt-2">以下是这条线路正在招募的拼团，你也可以让 AI 帮你发起一个新团。</p>
           </div>
         </div>

         {/* Group Card 1 */}
         <div className="flex flex-col gap-4 rounded-xl bg-white p-4 shadow-sm">
           <div>
             <p className="text-[#333] text-base font-medium">{activeTrip.name} · {activeTrip.startDate} 出发 · 摄影主题团</p>
             <p className="text-sm text-[#666]">与方案 A 完全一致的行程结构</p>
           </div>
           <div>
             <div className="flex items-baseline gap-2 text-sm text-[#666]">
               <p className="text-base text-[#333]">当前价格: <span className="font-medium">¥{Math.round(activeTrip.pricePerPerson * 1.6)} /人</span></p>
               <p className="text-sm">满团价: <span className="font-medium text-[#00bdd6]">¥{Math.round(activeTrip.pricePerPerson * 1.5)} /人</span></p>
             </div>
             <p className="text-xs text-[#FF7043] font-medium">再有 2 人加入，价格可降至 ¥{Math.round(activeTrip.pricePerPerson * 1.5)} /人</p>
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
             <p className="text-[#333] text-base font-medium">{activeTrip.name} · 2024-07-22 出发 · 节奏轻松团</p>
             <p className="text-sm text-[#666]">与方案 A 完全一致的行程结构</p>
           </div>
           <div>
             <div className="flex items-baseline gap-2 text-sm text-[#666]">
               <p className="text-base text-[#333]">当前价格: <span className="font-medium">¥{Math.round(activeTrip.pricePerPerson * 1.4)} /人</span></p>
               <p className="text-sm">满团价: <span className="font-medium text-[#00bdd6]">¥{Math.round(activeTrip.pricePerPerson * 1.3)} /人</span></p>
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
              onClick={() => onNavigate('groupIntent')}
              className="w-full h-12 bg-[#00bdd6] text-white rounded-full font-bold text-base shadow-sm active:scale-95 transition-transform"
           >
              加入此拼团
           </button>
         </div>

         {/* AI Create Group CTA */}
         <div className="flex flex-col items-center justify-center gap-4 rounded-xl bg-white p-6 text-center shadow-sm">
            <p className="text-lg font-medium text-[#333]">找不到合适的日期？</p>
            <p className="text-sm text-[#666]">你可以让 AI 帮你发起一个新拼团：根据你的时间、预算和行程偏好，自动生成团期和招募文案。</p>
            <button
               onClick={() => {
                  setActiveTrip(activeTrip);
                  onNavigate('groupIntent');
               }}
               className="w-full h-12 bg-[#00bdd6] text-white rounded-full font-bold text-base shadow-sm active:scale-95 transition-transform"
            >
               让 AI 帮我发起拼团
            </button>
            <p className="text-xs text-[#999]">AI 会先收集你的大致时间范围和出发城市，再推荐合适日期并生成分享文案。</p>
         </div>
       </div>
    </div>
  );
};

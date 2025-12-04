import React, { useState } from 'react';
import { ArrowLeft, MoreHorizontal, Users } from 'lucide-react';

export const GroupAndIntentPage = ({
  onBack,
  onNavigate,
  activeTrip
}: {
  onBack: () => void;
  onNavigate?: (page: string) => void;
  activeTrip?: any;
}) => {
  const [activeTab, setActiveTab] = useState('groups');
  const [isCreatingGroup, setIsCreatingGroup] = useState(!!activeTrip);

  // Form states for create group
  const [departureDate, setDepartureDate] = useState(activeTrip?.startDate || '');
  const [groupSize, setGroupSize] = useState('6-12');
  const [budget, setBudget] = useState(activeTrip ? Math.round(activeTrip.pricePerPerson * 1.5) : 0);
  const [requirements, setRequirements] = useState(
    activeTrip ? `线路主题是【${activeTrip.name}】，我希望和喜欢摄影的伙伴一起，行程节奏轻松，预算适中。` : ''
  );

  return (
    <div className="flex flex-col h-full bg-[#f5f8f8] overflow-y-auto scrollbar-hide pb-safe">
      {/* Header */}
      <div className="sticky top-0 z-20 flex items-center justify-between bg-[#f5f8f8] p-4 pb-2 border-b border-[#cde6ea]">
         <button onClick={onBack} className="flex size-10 shrink-0 items-center justify-center text-[#333] hover:bg-black/5 rounded-full transition-colors">
           <ArrowLeft size={24} />
         </button>
         <h2 className="text-[18px] font-bold text-[#333] flex-1 text-center">{isCreatingGroup ? 'AI 帮你发起拼团' : '拼团与意向记录'}</h2>
         <button className="flex size-10 shrink-0 items-center justify-center text-[#333]">
           {!isCreatingGroup && <MoreHorizontal size={24} />}
         </button>
      </div>

      {/* Tabs - only show when not creating group */}
      {!isCreatingGroup && (
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
      )}

      <div className="p-4 flex flex-col gap-4 flex-1">
         {/* Create Group Form */}
         {isCreatingGroup && activeTrip && (
           <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-right-4 duration-300">
             {/* Trip Context Card */}
             <div className="flex flex-col rounded-xl bg-white shadow-sm overflow-hidden">
               <div className="w-full h-24 bg-cover bg-center" style={{backgroundImage: `url('${activeTrip.image}')`}}></div>
               <div className="flex flex-col p-4 gap-2">
                 <p className="text-[#333] text-lg font-medium">{activeTrip.name}</p>
                 <p className="text-[#666] text-sm">{activeTrip.subtitle}</p>
                 <p className="text-xs text-[#999] mt-1">AI 将基于这条线路为你生成拼团方案</p>
               </div>
             </div>

             {/* Form Fields */}
             <div className="flex flex-col gap-4 rounded-xl bg-white p-4 shadow-sm">
               <div className="flex flex-col gap-2">
                 <label className="text-sm font-medium text-[#333]">期望出发日期</label>
                 <input
                   type="date"
                   value={departureDate}
                   onChange={(e) => setDepartureDate(e.target.value)}
                   className="w-full px-3 py-2 border border-[#cde6ea] rounded-lg text-[#333] focus:outline-none focus:ring-2 focus:ring-[#00bdd6]"
                 />
                 <p className="text-xs text-[#999]">参考原始团期：{activeTrip.startDate}</p>
               </div>

               <div className="flex flex-col gap-2">
                 <label className="text-sm font-medium text-[#333]">期望团队人数</label>
                 <select
                   value={groupSize}
                   onChange={(e) => setGroupSize(e.target.value)}
                   className="w-full px-3 py-2 border border-[#cde6ea] rounded-lg text-[#333] focus:outline-none focus:ring-2 focus:ring-[#00bdd6]"
                 >
                   <option value="4-6">4-6 人小团</option>
                   <option value="6-12">6-12 人中团</option>
                   <option value="12-20">12-20 人大团</option>
                 </select>
               </div>

               <div className="flex flex-col gap-2">
                 <label className="text-sm font-medium text-[#333]">预期价格（每人）</label>
                 <div className="flex items-baseline gap-2">
                   <input
                     type="number"
                     value={budget}
                     onChange={(e) => setBudget(parseInt(e.target.value))}
                     className="w-full px-3 py-2 border border-[#cde6ea] rounded-lg text-[#333] focus:outline-none focus:ring-2 focus:ring-[#00bdd6]"
                   />
                   <span className="text-sm text-[#666]">元</span>
                 </div>
                 <p className="text-xs text-[#999]">参考满团价：¥{Math.round(activeTrip.pricePerPerson * 1.5)} /人</p>
               </div>

               <div className="flex flex-col gap-2">
                 <label className="text-sm font-medium text-[#333]">招募文案（AI 已生成，可编辑）</label>
                 <textarea
                   value={requirements}
                   onChange={(e) => setRequirements(e.target.value)}
                   rows={4}
                   className="w-full px-3 py-2 border border-[#cde6ea] rounded-lg text-[#333] focus:outline-none focus:ring-2 focus:ring-[#00bdd6] resize-none"
                   placeholder="描述你对这次旅行的期待..."
                 />
               </div>
             </div>

             {/* AI Tips */}
             <div className="flex flex-col gap-2 rounded-xl bg-[#00bdd6]/5 p-4">
               <p className="text-sm font-medium text-[#333]">💡 AI 贴心提示</p>
               <p className="text-xs text-[#666]">• 提交后 AI 会优化你的招募文案，让更多志同道合的人看到</p>
               <p className="text-xs text-[#666]">• 可以在拼团详情页继续调整日期和价格</p>
               <p className="text-xs text-[#666]">• 系统会自动匹配合适的旅伴推荐给你</p>
             </div>

             {/* Submit Button */}
             <button
               onClick={() => {
                 alert('拼团创建成功！AI 正在为你匹配合适的旅伴...');
                 onBack();
               }}
               className="w-full h-12 bg-[#00bdd6] text-white rounded-full font-bold text-base shadow-sm active:scale-95 transition-transform"
             >
               提交并发布拼团
             </button>
           </div>
         )}

         {/* Original tabs content */}
         {!isCreatingGroup && activeTab === 'groups' && (
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

         {!isCreatingGroup && activeTab === 'intents' && (
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

import React, { useState } from 'react';
import {
  ArrowLeft,
  MoreHorizontal,
  ChevronUp,
  ChevronDown,
  Clock,
  MapPin,
  Info,
  Car,
  ShoppingCart,
  Hotel,
  Users,
  Share2,
  Sparkles
} from 'lucide-react';

export const PlanDetailsPage = ({ onBack }: { onBack: () => void }) => {
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

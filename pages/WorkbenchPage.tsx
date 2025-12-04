import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  User,
  Bell,
  Mic,
  Send,
  Loader2,
  Sparkles,
  XCircle,
  CheckCircle2,
  PlusCircle,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { theme } from '../constants';
import { AIMessage } from '../components/chat/AIMessage';
import { UserMessage } from '../components/chat/UserMessage';
import { TripSummaryCard } from '../components/trip/TripSummaryCard';
import { BudgetAdjustCard } from '../components/trip/BudgetAdjustCard';

// AI switch configuration
const USE_REAL_AI = false; // demo default false

export const WorkbenchPage = ({
  onBack,
  onNavigate,
  activeTrip,
  setActiveTrip,
  preloadedQuestion,
  setPreloadedQuestion,
  settings,
  userPreference
}: {
  onBack: () => void;
  onNavigate: (page: string) => void;
  activeTrip: any;
  setActiveTrip: (trip: any) => void;
  preloadedQuestion: string;
  setPreloadedQuestion: (q: string) => void;
  settings: any;
  userPreference: any;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputText, setInputText] = useState("");
  const [selectedPlan, setSelectedPlan] = useState('B');
  const [showBudgetAdjust, setShowBudgetAdjust] = useState(false);
  const [budgetRange, setBudgetRange] = useState(500);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isPreferenceDrawerOpen, setIsPreferenceDrawerOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([]);

  const toggleItem = (idx: string) => {
    setExpandedItems(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleBudgetUpdate = () => {
    setShowBudgetAdjust(false);
    alert("AI 正在根据新的预算范围重新调整方案...");
  };

  // Handle preloadedQuestion
  useEffect(() => {
    if (preloadedQuestion) {
      setMessages(prev => [...prev, { role: 'user', content: preloadedQuestion }]);
      setPreloadedQuestion(''); // Clear
      // Optional: auto scroll to bottom
    }
  }, [preloadedQuestion, setPreloadedQuestion]);

  const handleAISubmit = async () => {
    if (!inputText.trim()) return;

    // Add user message to history
    const userMessage = inputText;
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInputText('');
    setIsGenerating(true);
    setAiResponse(null);

    const systemPrompt = `你是一个专业的旅行规划助手 DeepTrip AI。当前正在规划的线路是：${activeTrip.name}。请用亲切、专业的口吻回答用户关于这条线路的问题。用户输入: ${userMessage}`;

    if (USE_REAL_AI) {
      try {
        // const result = await callGeminiAPI(systemPrompt);
        // setAiResponse(result);
        // setMessages(prev => [...prev, { role: 'assistant', content: result }]);
        throw new Error('AI API not available');
      } catch (e) {
        const fallbackText = '【AI 调用失败】使用本地示例方案代替。';
        setAiResponse(fallbackText);
        setMessages(prev => [...prev, { role: 'assistant', content: fallbackText }]);
      }
    } else {
      // Demo text
      const demoText = `【示例】已根据你的要求调整"${activeTrip.name}"：1）把第三天车程缩短，改为在张掖多停留半天；2）预算控制在 7000 元以内，酒店降低一档，但保留一晚高星体验。整体节奏会更轻松，适合想深度游但不想太累的你。`;
      setAiResponse(demoText);
      setMessages(prev => [...prev, { role: 'assistant', content: demoText }]);
    }

    setIsGenerating(false);
  };

  return (
    <div className="flex flex-col h-full bg-[#f5f8f8]">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[#f5f8f8]/90 backdrop-blur-sm border-b border-[#cde6ea]">
        <div className="flex items-center justify-between p-4 h-[56px]">
          <button onClick={onBack} className="flex size-10 shrink-0 items-center justify-center text-[#333] hover:bg-black/5 rounded-full transition-colors">
            <ArrowLeft size={24} />
          </button>
          <div className="flex-1 text-center">
            <h2 className="text-lg font-bold text-[#333]">路线规划</h2>
          </div>
          <button
            onClick={() => setIsPreferenceDrawerOpen(true)}
            className="flex size-10 shrink-0 items-center justify-center text-[#333] hover:bg-black/5 rounded-full transition-colors"
          >
            <User size={24} />
          </button>
        </div>
        <p className="text-xs text-center text-gray-500 pb-3 px-4">和懂中国线路的 AI，一起设计你的下一次旅行</p>
      </div>

      {/* Trip Notifications Banner */}
      {settings?.enableTripNotifications && (
        <div className="mx-4 mb-3 px-3 py-2 rounded-lg bg-[#e0f7fa] border border-[#00bdd6]/20 flex items-center gap-2">
          <Bell size={14} className="text-[#00bdd6] shrink-0" />
          <p className="text-xs text-[#006776]">
            <span className="font-medium">小提示：</span>已为这次行程开启出发前提醒
          </p>
        </div>
      )}

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 pb-36">
         {/* Trip Context Card */}
         <TripSummaryCard activeTrip={activeTrip} userPreference={userPreference} isExpanded={isExpanded} setIsExpanded={setIsExpanded} />

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
                     <h3 className="text-base font-bold">方案 A · {activeTrip.name} · 标准版</h3>
                     <p className="text-xs opacity-90">预算约 ¥{activeTrip.pricePerPerson}/人</p>
                  </div>
               </div>
               <div className="p-4">
                  <ul className="space-y-2 text-sm text-[#333]">
                     <li><span className="font-bold">Day 1:</span> 抵达西宁，入住酒店休整</li>
                     <li><span className="font-bold">Day 2:</span> 青海湖一日游，感受天空之境</li>
                     <li><span className="font-bold">Day 3:</span> 茶卡盐湖，天空之境漫步...</li>
                  </ul>

                  {/* Expandable Full Plan REMOVED as requested, kept BudgetAdjust */}
                  {showBudgetAdjust && <BudgetAdjustCard budgetRange={budgetRange} setBudgetRange={setBudgetRange} setShowBudgetAdjust={setShowBudgetAdjust} handleBudgetUpdate={handleBudgetUpdate} />}

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
               <p className="text-xs text-[#666] mb-4">方案 B 将 {activeTrip.name} 压缩为 8 日，节奏更轻松，预算略低。</p>

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
               <h4 className="font-bold mb-1">已有 3 个与你的 {activeTrip.name} 需求接近的拼团</h4>
               <p className="text-xs text-[#666] mb-3">如果你不介意和他人同行，可以考虑加入，能节省一些预算。</p>

               <div className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                  <div className="flex gap-3 p-3">
                     <div className="size-16 rounded-lg bg-cover bg-center shrink-0" style={{ backgroundImage: `url('${activeTrip.image}')` }}></div>
                     <div className="flex flex-col justify-center">
                        <p className="font-bold text-sm">{activeTrip.name}</p>
                        <p className="text-xs text-[#666] mt-0.5">出发日期：{activeTrip.startDate}</p>
                        <span className="inline-block mt-1 px-1.5 py-0.5 bg-[#E0F2F1] text-[#00bdd6] text-[10px] font-medium rounded-md self-start">已有 6/12 人</span>
                     </div>
                  </div>
                  <div className="bg-gray-50 flex justify-end gap-2 p-2 border-t border-gray-100">
                     <button
                        onClick={() => {
                          setActiveTrip(activeTrip);
                          onNavigate('groupList');
                        }}
                        className="px-3 py-1.5 text-xs font-medium text-[#333] hover:bg-gray-200 rounded-lg transition-colors"
                     >
                        看看拼团
                     </button>
                     <button className="px-3 py-1.5 bg-[#00bdd6] text-white text-xs font-medium rounded-lg hover:bg-[#00bdd6]/90 active:scale-95 transition-transform">加入此拼团</button>
                  </div>
               </div>
            </div>
         </AIMessage>
      </div>

      {/* Footer Input */}
      <div className="fixed bottom-[64px] left-0 right-0 z-40 max-w-[430px] mx-auto">
         {/* AI Response Display (if any) */}
         {aiResponse && (
           <div className="mx-3 mb-2 px-3 py-1.5 bg-[#e0f7fa]/95 backdrop-blur-sm rounded-xl shadow-sm max-h-16 overflow-y-auto">
             <div className="flex justify-between items-start mb-0.5">
               <div className="flex items-center gap-1">
                 <Sparkles size={12} className="text-[#00bdd6]" />
                 <span className="font-bold text-[#00bdd6] text-[10px]">AI 建议</span>
               </div>
               <button onClick={() => setAiResponse(null)} className="text-gray-400 hover:text-gray-600">
                 <XCircle size={12} />
               </button>
             </div>
             <div className="text-[10px] text-gray-700 line-clamp-2">
               {aiResponse}
             </div>
           </div>
         )}

         {/* Quick Chips */}
         <div className="flex gap-1.5 overflow-x-auto px-3 pb-2 scrollbar-hide">
            {['改成5天以内', '预算压到4000内', '换成更轻松的线路'].map((chip, idx) => (
               <button
                 key={chip}
                 onClick={() => {
                   setInputText(chip);
                 }}
                 className="h-6 shrink-0 px-2.5 bg-white/90 backdrop-blur-sm shadow-sm border border-gray-200 rounded-full text-[10px] text-[#555] font-medium whitespace-nowrap hover:bg-white hover:border-[#00bdd6] hover:shadow-md active:scale-95 transition-all"
               >
                  {chip}
               </button>
            ))}
         </div>

         {/* Input Area */}
         <div className="flex items-center gap-2 px-3 pb-2">
            <button
              className="size-8 flex items-center justify-center text-[#666] bg-white/90 backdrop-blur-sm hover:bg-white shadow-sm rounded-full transition-all shrink-0"
              onClick={() => alert('语音输入功能')}
            >
               <Mic size={20} />
            </button>
            <div className="flex-1 relative">
               <input
                 type="text"
                 value={inputText}
                 onChange={(e) => setInputText(e.target.value)}
                 onKeyPress={(e) => {
                   if (e.key === 'Enter' && !isGenerating && inputText.trim()) {
                     handleAISubmit();
                   }
                 }}
                 placeholder="告诉我这次想怎么玩..."
                 className="w-full h-9 pl-3 pr-10 rounded-full border border-gray-200 bg-white/90 backdrop-blur-sm shadow-sm text-sm focus:ring-2 focus:ring-[#00bdd6] focus:outline-none focus:bg-white focus:border-[#00bdd6] focus:shadow-md transition-all"
               />
               <button
                 onClick={handleAISubmit}
                 disabled={isGenerating || !inputText.trim()}
                 className={`absolute right-1 top-1/2 -translate-y-1/2 size-7 flex items-center justify-center rounded-full text-white shadow-md transition-all ${isGenerating || !inputText.trim() ? 'opacity-40 cursor-not-allowed bg-gray-400' : 'bg-[#00bdd6] hover:bg-[#00a8bf] active:scale-95'}`}
               >
                  {isGenerating ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
               </button>
            </div>
            <button
              className="size-8 flex items-center justify-center text-[#666] bg-white/90 backdrop-blur-sm hover:bg-white shadow-sm rounded-full transition-all shrink-0"
              onClick={() => setIsPreferenceDrawerOpen(true)}
            >
               <User size={20} />
            </button>
         </div>
      </div>

      {/* Preference Drawer */}
      {isPreferenceDrawerOpen && (
        <div className="fixed inset-0 z-40 flex">
          {/* Backdrop */}
          <div
            className="flex-1 bg-black/30"
            onClick={() => setIsPreferenceDrawerOpen(false)}
          />
          {/* Drawer */}
          <div className="w-full max-w-sm bg-white rounded-t-2xl md:rounded-none md:h-full md:max-w-xs md:ml-auto p-6 shadow-xl animate-in slide-in-from-right-5 md:slide-in-from-bottom-5 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-[#333]">我的旅行偏好</h3>
              <button
                onClick={() => setIsPreferenceDrawerOpen(false)}
                className="flex size-8 items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              >
                <XCircle size={20} />
              </button>
            </div>

            {/* Preference Content */}
            <div className="space-y-4">
              <div className="bg-[#f5f8f8] rounded-xl p-4">
                <h4 className="font-bold text-sm text-[#333] mb-2">测试结果</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">旅行风格</span>
                    <span className="font-medium text-[#00bdd6]">深度探索型</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">强度偏好</span>
                    <span className="font-medium text-[#00bdd6]">中等强度</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">预算范围</span>
                    <span className="font-medium text-[#00bdd6]">5000-8000/人</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#f5f8f8] rounded-xl p-4">
                <h4 className="font-bold text-sm text-[#333] mb-2">自定义偏好</h4>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-gray-600 mb-1 block">兴趣标签</label>
                    <div className="flex flex-wrap gap-2">
                      {['自然风光', '人文历史', '美食体验', '摄影打卡'].map(tag => (
                        <span
                          key={tag}
                          className="text-xs px-3 py-1.5 rounded-full font-medium"
                          style={{ backgroundColor: theme.colors.primaryLight, color: theme.colors.primary }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-gray-600 mb-1 block">出行方式</label>
                    <div className="flex gap-2">
                      <button className="flex-1 py-2 text-xs rounded-lg font-medium bg-white border border-gray-200 text-gray-600">
                        自由行
                      </button>
                      <button
                        className="flex-1 py-2 text-xs rounded-lg font-medium text-white"
                        style={{ backgroundColor: theme.colors.primary }}
                      >
                        跟团游
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 space-y-2">
              <button
                onClick={() => {
                  alert('已根据你的最新偏好调整当前路线推荐');
                  setIsPreferenceDrawerOpen(false);
                }}
                className="w-full h-12 rounded-xl text-white font-bold text-sm shadow-lg"
                style={{ backgroundColor: theme.colors.primary }}
              >
                保存偏好并应用本次规划
              </button>
              <button
                onClick={() => onNavigate('preference')}
                className="w-full h-10 rounded-xl text-sm font-bold"
                style={{ backgroundColor: theme.colors.primaryLight, color: theme.colors.primary }}
              >
                重新做一次偏好测试
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

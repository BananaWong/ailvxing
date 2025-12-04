import React, { useState, useRef } from 'react';
import {
  ArrowLeft,
  HelpCircle,
  MapPin,
  Users,
  Tent,
  RefreshCcw
} from 'lucide-react';
import { theme, quizQuestions } from '../constants';
import type { UserPreference } from '../types';

type PreferencePageProps = {
  onBack: () => void;
  userPreference: UserPreference;
  setUserPreference: (value: UserPreference) => void;
};

export const PreferencePage = ({ onBack, userPreference, setUserPreference }: PreferencePageProps) => {
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

  const handleSavePreference = () => {
    // 根据问卷结果计算深度指数
    const depthScore = sliderValue / 10; // 将 0-100 转换为 0-10

    // 根据深度指数确定类型名称
    let typeName = '谋定而动的规划家';
    if (depthScore < 4) {
      typeName = '轻松休闲型';
    } else if (depthScore < 7) {
      typeName = '平衡探索型';
    } else if (depthScore < 9) {
      typeName = '进阶探索型';
    } else {
      typeName = '深度冒险家';
    }

    // 生成偏好标签（基于选择的旅行风格、车程、住宿等）
    const tags: string[] = [];

    // 根据选择的旅行风格生成标签
    if (selectedStyles.includes('小团深度游')) tags.push('喜欢深度');
    if (selectedStyles.includes('大西北')) tags.push('喜欢景色');
    if (selectedStyles.includes('人文历史')) tags.push('喜欢人文');

    // 根据车程偏好
    if (selectedCarTime === '5-6 小时') tags.push('能吃苦');
    if (selectedCarTime === '1-2 小时') tags.push('舒适优先');

    // 根据住宿偏好
    if (selectedStay.includes('青旅/民宿')) tags.push('体验优先');
    if (selectedStay.includes('高星酒店')) tags.push('品质优先');

    // 如果没有生成标签，使用默认标签
    if (tags.length === 0) {
      tags.push('喜欢景色', '平衡体验');
    }

    const updatedPreference: UserPreference = {
      depthScore,
      typeName,
      tags
    };

    // 更新全局状态
    setUserPreference?.(updatedPreference);

    // 返回上一页
    onBack();
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
               onClick={handleSavePreference}
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

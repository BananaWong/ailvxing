import React from 'react';
import { ChevronLeft, ChevronRight, Bell, Bot, Shield } from 'lucide-react';

export const SettingsPage = ({
  onBack,
  settings,
  setSettings
}: {
  onBack: () => void;
  settings: {
    enableTripNotifications: boolean;
    enableAiTips: boolean;
    enablePersonalizedRecommendations: boolean;
  };
  setSettings: (settings: any) => void;
}) => {
  const toggleSetting = (key: keyof typeof settings) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

  return (
    <div className="flex flex-col h-full bg-[#f5f8f8] overflow-y-auto scrollbar-hide pb-24">
      {/* 顶部 App Bar */}
      <div className="sticky top-0 z-10 flex items-center justify-between bg-[#f5f8f8]/90 px-4 pt-4 pb-2 backdrop-blur border-b border-[#e0e0e0]">
        <button onClick={onBack} className="flex items-center gap-1 text-sm text-[#333]">
          <ChevronLeft size={18} />
          返回
        </button>
        <h1 className="text-base font-semibold text-[#111]">设置</h1>
        <div className="w-10" /> {/* 占位，保证标题居中 */}
      </div>

      <div className="p-4 flex flex-col gap-4">
        <h2 className="text-xs text-[#666] px-1">通知与提醒</h2>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden divide-y divide-[#f0f0f0]">
          {/* 行程提醒 */}
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
              onClick={() => toggleSetting('enableTripNotifications')}
              className={`w-[52px] h-[32px] rounded-full p-0.5 transition-colors shrink-0 ${settings.enableTripNotifications ? 'bg-[#00bdd6]' : 'bg-[#e0e0e0]'}`}
            >
              <div className={`size-[28px] bg-white rounded-full shadow-sm transform transition-transform ${settings.enableTripNotifications ? 'translate-x-[20px]' : 'translate-x-0'}`}></div>
            </button>
          </div>

          {/* AI 管家小贴士 */}
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
              onClick={() => toggleSetting('enableAiTips')}
              className={`w-[52px] h-[32px] rounded-full p-0.5 transition-colors shrink-0 ${settings.enableAiTips ? 'bg-[#00bdd6]' : 'bg-[#e0e0e0]'}`}
            >
              <div className={`size-[28px] bg-white rounded-full shadow-sm transform transition-transform ${settings.enableAiTips ? 'translate-x-[20px]' : 'translate-x-0'}`}></div>
            </button>
          </div>
        </div>

        <h2 className="text-xs text-[#666] px-1 mt-4">推荐与隐私</h2>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* 个性化推荐 */}
          <div className="p-4 flex items-center justify-between gap-4">
            <div className="flex gap-3 flex-1 min-w-0">
              <div className="size-10 rounded-lg bg-[#e0f7fa] flex items-center justify-center text-[#00bdd6] shrink-0">
                <Shield size={20} />
              </div>
              <div className="flex flex-col pr-2">
                <p className="text-sm font-medium text-[#333]">个性化推荐</p>
                <p className="text-xs text-[#666] mt-0.5 leading-tight">根据你的偏好、记录和行程优化首页推荐内容</p>
              </div>
            </div>
            <button
              onClick={() => toggleSetting('enablePersonalizedRecommendations')}
              className={`w-[52px] h-[32px] rounded-full p-0.5 transition-colors shrink-0 ${settings.enablePersonalizedRecommendations ? 'bg-[#00bdd6]' : 'bg-[#e0e0e0]'}`}
            >
              <div className={`size-[28px] bg-white rounded-full shadow-sm transform transition-transform ${settings.enablePersonalizedRecommendations ? 'translate-x-[20px]' : 'translate-x-0'}`}></div>
            </button>
          </div>
        </div>

        {/* Legal & Logout */}
        <h2 className="text-xs text-[#666] px-1 mt-4">其他</h2>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden divide-y divide-[#f0f0f0]">
          {['服务条款', '隐私政策', '关于 DeepTrip'].map((item, idx) => (
            <div key={idx} className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors">
              <p className="text-sm text-[#333]">{item}</p>
              <ChevronRight size={20} className="text-[#999]" />
            </div>
          ))}
        </div>

        {/* Logout */}
        <button className="w-full h-12 rounded-full bg-[#f0f0f0] text-[#666] text-sm font-bold hover:bg-[#e0e0e0] active:scale-95 transition-all mt-2 mb-4">
          退出登录
        </button>
      </div>
    </div>
  );
};

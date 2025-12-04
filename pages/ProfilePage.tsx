import React from 'react';
import {
  Headphones,
  Settings,
  ChevronRight,
  CreditCard,
  CalendarClock,
  MessageCircle,
  LifeBuoy,
  FileText,
  Building2,
  BedDouble,
  Ticket,
  Bus,
  Smile,
  Heart,
  Users
} from 'lucide-react';
import { demoTrip } from '../constants';
import type { UserPreference } from '../types';

export const ProfilePage = ({ onNavigate, setActiveTrip, userPreference }: { onNavigate: (page: string) => void; setActiveTrip: (trip: any) => void; userPreference: UserPreference }) => {
  return (
    <div className="flex flex-col h-full bg-[#f5f8f8] overflow-y-auto scrollbar-hide pb-24">
      {/* App Bar */}
      <div className="sticky top-0 z-10 flex items-center justify-between bg-[#f5f8f8]/90 px-4 pt-4 pb-2 backdrop-blur">
        <h1 className="text-lg font-bold text-[#111]">我的</h1>
        <div className="flex items-center gap-3">
          {/* 人工客服图标按钮 */}
          <button
            className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white shadow-sm text-xs text-[#333] hover:bg-gray-50"
            onClick={() => {
              const el = document.getElementById('customer-service-card');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <Headphones size={16} className="text-[#00bdd6]" />
            <span>人工客服</span>
          </button>

          {/* 设置图标按钮：跳转到 SettingsPage */}
          <button
            className="flex items-center justify-center size-9 rounded-full bg-white shadow-sm hover:bg-gray-50"
            onClick={() => onNavigate('settings')}
            aria-label="设置"
          >
            <Settings size={18} className="text-[#333]" />
          </button>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-6 pt-4">
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

        {/* Orders Status Card */}
        <div className="bg-white rounded-xl shadow-sm p-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-[#333]">我的订单</p>
            <button className="flex items-center gap-1 text-xs text-[#999] hover:text-[#666]">
              <span>全部订单</span>
              <ChevronRight size={14} />
            </button>
          </div>
          <div className="flex items-center justify-between mt-2">
            {[
              { label: '待付款', icon: CreditCard, action: null },
              { label: '待出行', icon: CalendarClock, action: () => {
                // 显示订单详情并设置 activeTrip
                alert(`你有一个待出行订单：\n\n${demoTrip.name} · ${demoTrip.startDate} 出发\n状态：待出行\n订单号：DT-DEMO-001\n\n点击确定查看行程详情`);
                setActiveTrip(demoTrip);
                onNavigate('dailyItinerary');
              }},
              { label: '待评价', icon: MessageCircle, action: null },
              { label: '售后', icon: LifeBuoy, action: null },
              { label: '全部', icon: FileText, action: null }
            ].map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  onClick={item.action || undefined}
                  className="flex flex-col items-center gap-1 flex-1 text-xs text-[#555] hover:text-[#00bdd6] relative"
                >
                  <div className="size-9 rounded-full bg-[#e0f7fa] flex items-center justify-center mb-0.5">
                    <Icon size={16} className="text-[#00bdd6]" />
                  </div>
                  <span className="truncate">{item.label}</span>
                  {item.label === '待出行' && (
                    <span className="absolute top-0 right-1 size-2 rounded-full bg-[#FF7043]"></span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Customer Service Card */}
        <div
          id="customer-service-card"
          className="bg-white rounded-xl shadow-sm p-4 flex flex-col gap-3"
        >
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-[#333]">联系客服</p>
            <span className="text-xs text-[#999]">7×24 小时在线</span>
          </div>
          <div className="grid grid-cols-3 gap-3 pt-1">
            {[
              { label: '人工客服', icon: Headphones },
              { label: '平台客服', icon: Building2 },
              { label: '酒店客服', icon: BedDouble },
              { label: '票务客服', icon: Ticket },
              { label: '交通客服', icon: Bus },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#f7fafa] hover:bg-[#e9f5f7] text-xs text-[#333]"
                >
                  <div className="size-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                    <Icon size={16} className="text-[#00bdd6]" />
                  </div>
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Travel Preference Card */}
        <div className="bg-white rounded-xl shadow-sm p-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-[#333]">我的旅行偏好</p>
            <button
              onClick={() => onNavigate('preference')}
              className="text-xs text-[#00bdd6] hover:underline"
            >
              调整
            </button>
          </div>

          {/* 说明：偏好如何影响推荐和规划 */}
          <div className="bg-[#f7fafa] px-3 py-2 rounded-lg border-l-2 border-[#00bdd6]">
            <p className="text-xs text-[#555] leading-relaxed">
              <span className="font-bold text-[#00bdd6]">当前偏好已经应用到首页推荐和 AI 规划方案。</span>你的旅行偏好将影响首页的线路推荐和 AI 工作台的智能规划。我们会根据你的偏好类型和深度指数，为你推荐更合适的路线和行程安排。
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-xl bg-[#e0f7fa] px-3 py-3">
            <div
              className="size-12 rounded-full bg-cover bg-center"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBY57mwNFNTbYo8AV7oIq5jxG_YHODAaF-dmHixGbmH9hKQI49OFKE_GnBtmkUYqBbgBYNQjPZfpIaR6aAztg7BUekxS0Hjl4J3A0DR96vWHenEpcKNk1vYyIap0f_X9qHRwejDAaui8ma8lzOm3MtI8xpOOOpwMX5GWnPYqhqCS7LiedXZC63VQRADsCZPsWY1D03khM2lOML-MnQfAdXmEbZCP24wpo5pZEUZ4MdDTrQFfQjNFCNjEAkvS22XMm95xb4K99VuyJY1")'
              }}
            />
            <div className="flex flex-col gap-1">
              <p className="text-sm font-semibold text-[#006776]">"{userPreference.typeName}"</p>
              <p className="text-xs text-[#004d40]">
                {userPreference.tags.join(' · ')}
              </p>
            </div>
          </div>

          <div className="flex justify-between items-center text-xs text-[#666]">
            <span>当前深度指数：{userPreference.depthScore.toFixed(1)} / 10</span>
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white text-[#FF7043] border border-[#ffe0d3]">
              <Smile size={14} />
              {userPreference.typeName}
            </span>
          </div>

          {/* 上次更新时间 */}
          <div className="pt-2 border-t border-gray-100">
            <p className="text-[10px] text-[#999]">上次更新：2024-07-01</p>
          </div>
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

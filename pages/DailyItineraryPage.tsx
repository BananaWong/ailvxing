import React, { useState } from 'react';
import {
  ArrowLeft,
  MoreHorizontal,
  Bot,
  Sun,
  Sparkles,
  Check,
  Bus,
  MapPin,
  Navigation,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Camera,
  Utensils,
  Car,
  Phone,
  ShoppingBag,
  Languages,
  Music,
  Clock,
  Edit,
  AlertTriangle,
  Map as MapIcon,
  Headphones
} from 'lucide-react';
import { theme } from '../constants';
import { IconButton } from '../components/ui/IconButton';

// Mock data for all 10 days of the trip
const demoItineraryByDay: Record<number, {
  title: string;
  weather: string;
  summary: string;
  events: Array<{ time: string; title: string; description: string; status?: string }>;
  aiTips: Array<{ label: string; text: string }>;
  nextDayPreview?: string;
}> = {
  1: {
    title: '上海集合 → 西宁',
    weather: '晴 · 12–22℃',
    summary: '今天是集合日，大家从全国各地抵达西宁。适应高原环境，准备开始精彩的大西北之旅。',
    events: [
      { time: '全天', title: '抵达西宁', description: '自行前往西宁，入住指定酒店。可在市区自由活动，品尝当地美食。', status: 'completed' }
    ],
    aiTips: [
      { label: '高原准备:', text: '西宁海拔约2200米，初到可能有轻微高原反应，建议多休息，避免剧烈运动。' },
      { label: '美食推荐:', text: '可尝试羊肉手抓饭、酿皮、甜醅等当地特色小吃。' }
    ],
    nextDayPreview: 'Day 2 · 塔尔寺 · 拉脊山'
  },
  2: {
    title: '塔尔寺 · 拉脊山',
    weather: '晴 · 10–20℃',
    summary: '游览藏传佛教圣地塔尔寺，感受宗教文化的深厚底蕴。下午经过拉脊山，欣赏高原草甸风光。',
    events: [
      { time: '08:30', title: '酒店早餐', description: '享用丰盛的早餐，为一天的行程充电。', status: 'completed' },
      { time: '09:30', title: '前往塔尔寺', description: '乘车前往塔尔寺，车程约1小时。', status: 'completed' },
      { time: '10:30', title: '游览塔尔寺', description: '深度参观塔尔寺，了解藏传佛教文化和艺术。' },
      { time: '14:00', title: '翻越拉脊山', description: '途经拉脊山，海拔3800米，欣赏高原牧场风光。' },
      { time: '18:00', title: '抵达青海湖畔', description: '入住青海湖畔酒店，欣赏湖边日落。' }
    ],
    aiTips: [
      { label: '穿衣建议:', text: '早晚温差大，建议穿着保暖外套，携带防风衣物。' },
      { label: '拍照提示:', text: '塔尔寺内部分区域禁止拍照，请遵守规定。' }
    ],
    nextDayPreview: 'Day 3 · 茶卡盐湖 · 天空之境'
  },
  3: {
    title: '茶卡盐湖 · 天空之境',
    weather: '晴 · 15–25℃',
    summary: '今天是探索青海湖与茶卡盐湖的绝美一日，体验天空之镜的震撼美景。',
    events: [
      { time: '07:30', title: '酒店早餐', description: '早餐时间：07:00 - 10:00', status: 'completed' },
      { time: '09:00', title: '出发前往青海湖', description: '乘坐舒适旅游巴士，沿途欣赏青海湖风光。预计车程约 2 小时。' },
      { time: '11:00', title: '青海湖观光', description: '在二郎剑景区深度体验青海湖的壮丽景色。' },
      { time: '13:00', title: '当地餐厅午餐', description: '可选择特色藏餐或清真面食。' },
      { time: '14:30', title: '前往茶卡盐湖', description: '乘车前往"天空之镜"茶卡盐湖，预计车程约 1.5 小时。' },
      { time: '16:00', title: '茶卡盐湖深度体验', description: '自由漫步盐湖，拍摄天空之镜的倒影奇观。' },
      { time: '18:30', title: '返回西宁', description: '结束茶卡盐湖之旅，乘车返回西宁市区。预计车程约 3 小时。' }
    ],
    aiTips: [
      { label: '穿衣建议:', text: '青海湖畔风大，气温变化快，建议穿着防风外套和舒适长裤。' },
      { label: '拍照时间:', text: '青海湖日出（06:00-06:30）和茶卡盐湖日落（19:00-19:30）是最佳摄影时段。' },
      { label: '饮食提醒:', text: '今日行程在高海拔地区，饮食宜清淡，多喝热水。' }
    ],
    nextDayPreview: 'Day 4 · 德令哈翡翠湖 → 敦煌'
  },
  4: {
    title: '德令哈翡翠湖 → 敦煌',
    weather: '晴 · 18–28℃',
    summary: '预计车程 4 小时，中途会在柴达木盆地观景点短暂停留，感受荒漠的浩瀚。',
    events: [
      { time: '08:00', title: '酒店早餐', description: '充足的早餐为长途车程做准备。' },
      { time: '09:00', title: '前往德令哈', description: '沿途欣赏柴达木盆地风光，车程约3小时。' },
      { time: '12:00', title: '德令哈翡翠湖', description: '游览翡翠湖，欣赏盐湖在阳光下呈现的翡翠绿色。' },
      { time: '14:00', title: '前往敦煌', description: '继续前行，途经柴达木盆地，预计车程5小时。' },
      { time: '19:00', title: '抵达敦煌', description: '入住敦煌酒店，晚上可逛沙洲夜市。' }
    ],
    aiTips: [
      { label: '行程提示:', text: '今日车程较长，建议准备一些零食和水。' },
      { label: '防晒准备:', text: '柴达木盆地紫外线强，务必做好防晒措施。' }
    ],
    nextDayPreview: 'Day 5 · 莫高窟 · 鸣沙山月牙泉'
  },
  5: {
    title: '莫高窟 · 鸣沙山月牙泉',
    weather: '晴 · 20–32℃',
    summary: '探访世界文化遗产莫高窟，下午游览鸣沙山月牙泉，体验沙漠奇观。',
    events: [
      { time: '08:00', title: '前往莫高窟', description: '乘车前往莫高窟数字展示中心。' },
      { time: '09:00', title: '莫高窟参观', description: '观看数字电影，参观洞窟，了解千年佛教艺术。' },
      { time: '12:30', title: '敦煌午餐', description: '品尝敦煌特色美食，如驴肉黄面。' },
      { time: '15:00', title: '鸣沙山月牙泉', description: '体验骑骆驼、滑沙，欣赏沙漠中的月牙泉奇景。' },
      { time: '19:00', title: '沙洲夜市', description: '自由逛夜市，品尝当地小吃。' }
    ],
    aiTips: [
      { label: '预约提示:', text: '莫高窟需提前预约，请随团统一安排。' },
      { label: '防沙准备:', text: '鸣沙山风沙较大，建议戴口罩和头巾。' }
    ],
    nextDayPreview: 'Day 6 · 张掖丹霞 · 绝美地貌'
  },
  6: {
    title: '张掖丹霞 · 绝美地貌',
    weather: '晴 · 16–26℃',
    summary: '前往张掖，游览七彩丹霞地貌，欣赏大自然的鬼斧神工。',
    events: [
      { time: '08:00', title: '出发前往张掖', description: '车程约5小时，途中欣赏祁连山脉风光。' },
      { time: '14:00', title: '张掖丹霞地质公园', description: '游览七彩丹霞，最佳观赏时间为日落前后。' },
      { time: '18:30', title: '观看日落', description: '在最佳观景台欣赏丹霞日落的绚丽色彩。' },
      { time: '20:00', title: '入住张掖', description: '入住张掖市区酒店。' }
    ],
    aiTips: [
      { label: '拍照建议:', text: '日落时分是拍摄丹霞地貌的最佳时机，提前找好机位。' },
      { label: '穿衣提示:', text: '观景台风大，建议携带外套保暖。' }
    ],
    nextDayPreview: 'Day 7 · 门源油菜花海（季节限定）'
  },
  7: {
    title: '门源油菜花海（季节限定）',
    weather: '晴 · 12–22℃',
    summary: '7-8月游览门源百里油菜花海，感受高原花海的壮观。其他季节游览祁连山草原。',
    events: [
      { time: '08:30', title: '前往门源', description: '车程约3小时，沿途欣赏祁连山风光。' },
      { time: '11:30', title: '门源油菜花海', description: '(7-8月) 游览百里油菜花海，拍摄金色花海与雪山的完美结合。' },
      { time: '14:00', title: '祁连山草原', description: '在高原草甸自由活动，体验草原风情。' },
      { time: '17:00', title: '返回西宁', description: '车程约2小时，回到西宁休整。' }
    ],
    aiTips: [
      { label: '季节提示:', text: '油菜花最佳观赏期为7月中旬至8月初，其他时间可欣赏草原风光。' },
      { label: '高原注意:', text: '祁连山海拔较高，请注意防寒保暖。' }
    ],
    nextDayPreview: 'Day 8 · 坎布拉国家森林公园'
  },
  8: {
    title: '坎布拉国家森林公园',
    weather: '晴 · 15–25℃',
    summary: '游览坎布拉国家森林公园，欣赏丹霞地貌与黄河的完美融合。',
    events: [
      { time: '08:30', title: '前往坎布拉', description: '车程约2小时。' },
      { time: '10:30', title: '坎布拉景区游览', description: '乘船游览，欣赏丹霞地貌与碧水蓝天。' },
      { time: '15:00', title: '返回西宁', description: '下午返回西宁，可在市区自由活动。' },
      { time: '18:00', title: '欢送晚宴', description: '全体队员聚餐，分享旅途感悟。' }
    ],
    aiTips: [
      { label: '游览建议:', text: '建议选择乘船游览，可从不同角度欣赏丹霞地貌。' },
      { label: '摄影提示:', text: '上午光线较好，适合拍摄丹霞与黄河交融的景色。' }
    ],
    nextDayPreview: 'Day 9 · 西宁市区自由活动'
  },
  9: {
    title: '西宁市区自由活动',
    weather: '晴 · 13–23℃',
    summary: '全天自由活动，可逛东关清真大寺、莫家街，购买特产，或选择参加青海省博物馆游览。',
    events: [
      { time: '全天', title: '西宁市区自由活动', description: '推荐景点：东关清真大寺、莫家街美食街、青海省博物馆。可自行购买牦牛肉干、枸杞等特产。' }
    ],
    aiTips: [
      { label: '购物建议:', text: '莫家街是购买特产的好地方，注意货比三家。' },
      { label: '景点推荐:', text: '青海省博物馆免费参观，可深入了解青海历史文化。' }
    ],
    nextDayPreview: 'Day 10 · 西宁送机 · 返程'
  },
  10: {
    title: '西宁送机 · 返程',
    weather: '晴 · 14–24℃',
    summary: '根据航班时间送机，结束愉快的大西北之旅。期待下次再会！',
    events: [
      { time: '全天', title: '送机服务', description: '根据各自航班时间安排送机，结束10天的大西北环线之旅。带着美好回忆，期待下次重逢。' }
    ],
    aiTips: [
      { label: '退房提示:', text: '请检查好随身物品，确保没有遗落。' },
      { label: '返程建议:', text: '建议预留充足时间前往机场，避免误机。' }
    ]
  }
};

export const DailyItineraryPage = ({
  onBack,
  activeTrip,
  enableAiTips
}: {
  onBack: () => void;
  activeTrip: any;
  enableAiTips: boolean;
}) => {
  const [selectedDay, setSelectedDay] = useState(3); // Current day (Day 3)
  const [lunchOption, setLunchOption] = useState('tibetan');
  const [showAllDays, setShowAllDays] = useState(false); // Control trip overview expansion

  // Get data for the selected day
  const currentDayData = demoItineraryByDay[selectedDay];

  const lunchImages: Record<string, string> = {
    tibetan: "https://images.unsplash.com/photo-1605333396915-47ed6b68a00e?auto=format&fit=crop&w=800&q=80",
    noodles: "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=800&q=80"
  };

  return (
    <div className="flex flex-col h-full bg-[#f5f8f8] overflow-y-auto scrollbar-hide pb-24">
      {/* Sticky Header */}
      <div className="sticky top-0 z-20 flex items-center justify-between bg-[#f5f8f8]/90 backdrop-blur-sm p-4 h-[56px] border-b border-[#cde6ea]">
        <button onClick={onBack} className="flex size-10 shrink-0 items-center justify-center text-[#333] hover:bg-black/5 rounded-full transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-lg font-bold text-[#333] flex-1 text-center">旅行管家</h2>
        <div className="flex items-center gap-1">
          <button
            onClick={() => alert('人工客服入口占位，后续接入 IM 或电话。')}
            className="flex size-10 shrink-0 items-center justify-center text-[#333] hover:bg-black/5 rounded-full transition-colors"
          >
            <Headphones size={20} />
          </button>
          <button className="flex size-10 shrink-0 items-center justify-center text-[#333] hover:bg-black/5 rounded-full transition-colors">
            <MoreHorizontal size={20} />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-6 p-4">
        {/* Trip Overview Card - from ItineraryPage */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#cde6ea] p-4">
          <h3 className="text-[#1A202C] text-xl font-bold leading-tight mb-1">{activeTrip.name}</h3>
          <p className="text-[#A0AEC0] text-sm font-normal mb-1">{activeTrip.startDate.replace(/-/g, '年').replace(/年(\d{2})$/, '年$1日').replace(/年0?/, '年').replace(/月0?/, '月')} - 2024年7月29日</p>
          <p className="text-xs text-[#A0AEC0] mb-3">共 {activeTrip.duration} 天 · 已完成 {selectedDay - 1} 天 · 今天是第 {selectedDay} 天</p>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-3 overflow-hidden">
            <div className="h-2 rounded-full bg-[#00bdd6]" style={{ width: `${((selectedDay - 1) / activeTrip.duration) * 100}%` }}></div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <div className="flex items-center justify-center h-8 px-3 rounded-full bg-[#F6AD55]/20">
              <p className="text-xs font-medium text-[#F6AD55]">进行中，第{selectedDay}天</p>
            </div>
            <button className="flex items-center gap-1 px-3 h-8 rounded-full bg-transparent text-[#48BB78] text-xs font-bold">
              <Bot size={16} />
              <span>智能管家{enableAiTips ? '已开启' : '已关闭'}</span>
            </button>
          </div>

          <p className="pt-3 text-xs text-[#A0AEC0] border-t border-gray-100 mt-3">
            AI 已同步订单和定位，实时更新路书
          </p>

          {/* Collapsible Trip Overview */}
          <div className="mt-3 pt-3 border-t border-gray-100">
            <button
              onClick={() => setShowAllDays(!showAllDays)}
              className="w-full flex items-center justify-between text-left"
            >
              <span className="text-sm font-bold text-[#333]">本期行程总览</span>
              <div className="flex items-center gap-2 text-xs text-[#666]">
                <span>今天是 Day {selectedDay} / {activeTrip.duration}</span>
                {showAllDays ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </div>
            </button>

            {showAllDays && (
              <div className="mt-3 space-y-2">
                {Array.from({ length: activeTrip.duration }, (_, i) => i + 1).map((day) => {
                  const dayStatus = day < selectedDay ? 'completed' : day === selectedDay ? 'current' : 'upcoming';
                  return (
                    <div
                      key={day}
                      onClick={() => setSelectedDay(day)}
                      className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-all ${
                        dayStatus === 'current'
                          ? 'bg-[#e0f7fa] border border-[#00bdd6]'
                          : dayStatus === 'completed'
                          ? 'bg-gray-50 opacity-60'
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      <div
                        className={`flex items-center justify-center size-6 rounded-full shrink-0 font-bold text-[10px] ${
                          dayStatus === 'current'
                            ? 'bg-[#00bdd6] text-white'
                            : dayStatus === 'completed'
                            ? 'bg-green-500 text-white'
                            : 'bg-white border border-gray-300 text-gray-600'
                        }`}
                      >
                        {dayStatus === 'completed' ? <Check size={12} /> : day}
                      </div>
                      <div className="flex-1">
                        <p
                          className={`text-xs font-medium ${
                            dayStatus === 'current'
                              ? 'text-[#00bdd6]'
                              : dayStatus === 'completed'
                              ? 'text-gray-500'
                              : 'text-[#333]'
                          }`}
                        >
                          Day {day} · {demoItineraryByDay[day].title}
                        </p>
                      </div>
                      {dayStatus === 'current' && (
                        <span className="text-[9px] font-bold bg-[#00bdd6] text-white px-1.5 py-0.5 rounded-full">
                          今天
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Day Info Card */}
        <div className="bg-white rounded-2xl shadow-sm p-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-bold text-[#333]">今天是第 {selectedDay} 天</h2>
            <div className="flex items-center gap-1 text-[#666]">
              <Sun size={18} />
              <span className="text-sm font-medium">{currentDayData.weather}</span>
            </div>
          </div>
          <p className="text-sm text-[#666] leading-relaxed mb-3">{currentDayData.summary}</p>
          <p className="text-[10px] text-[#999] mb-4">本日路书已根据你的行程订单、机票/火车票、酒店信息和当前定位生成。</p>

          <div className="mb-4">
            <div className="flex justify-between text-xs text-[#666] mb-1">
              <span>{activeTrip.name} · 当前第 {selectedDay} 天</span>
              <span>已完成 {selectedDay - 1}/{activeTrip.duration}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
              <div className="h-full bg-[#00bdd6] rounded-full" style={{ width: `${((selectedDay - 1) / activeTrip.duration) * 100}%` }}></div>
            </div>
          </div>

          {enableAiTips && (
            <div className="border-t border-[#f0f0f0] pt-3">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={16} className="text-[#00bdd6]" />
                <span className="text-sm font-bold text-[#333]">来自 AI 管家的小提醒</span>
              </div>
              <ul className="space-y-1 pl-1">
                {currentDayData.aiTips.slice(0, 3).map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-[#666]">
                    <span className="text-[#00bdd6] mt-1">●</span>
                    <span><span className="font-medium">{tip.label}</span> {tip.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {!enableAiTips && (
            <div className="border-t border-[#f0f0f0] pt-3 text-center">
              <p className="text-xs text-[#999]">你已关闭 AI 管家小贴士，可以在设置中重新开启</p>
            </div>
          )}
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
                <p className="text-xs text-[#666] mb-3">乘车前往"天空之镜"茶卡盐湖，预计车程约 1.5 小时。</p>
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

        {/* Toolbox - Convenient Services */}
        <div className="bg-white rounded-2xl shadow-sm p-3">
          <h3 className="text-sm font-bold text-[#333] mb-2">便捷服务</h3>
          <div className="grid grid-cols-4 gap-2 text-center">
            <IconButton icon={ShoppingBag} label="行李打包" bgClass="bg-orange-50" colorClass="text-orange-500" />
            <IconButton icon={Languages} label="实时翻译" bgClass="bg-teal-50" colorClass="text-teal-500" />
            <IconButton icon={Music} label="旅途音乐" bgClass="" colorClass="" iconStyle={{ backgroundColor: theme.colors.neteaseBg, color: theme.colors.neteaseRed }} />
            <IconButton icon={MoreHorizontal} label="全部工具" />
          </div>
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
        {selectedDay < activeTrip.duration && (
          <div className="bg-white rounded-2xl shadow-sm p-4">
            <h3 className="text-base font-bold text-[#333] mb-2">明日预告</h3>
            <p className="text-sm font-bold text-[#00bdd6] mb-1">Day {selectedDay + 1} · {demoItineraryByDay[selectedDay + 1].title}</p>
            <p className="text-xs text-[#666] mb-3">{demoItineraryByDay[selectedDay + 1].summary}</p>
            <button
              onClick={() => setSelectedDay(selectedDay + 1)}
              className="w-full flex items-center justify-end gap-1 text-xs font-bold text-[#00bdd6]"
            >
              查看完整行程
              <ChevronRight size={14} />
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 z-10 bg-white/90 backdrop-blur-sm border-t border-[#f0f0f0] p-4 max-w-[430px] mx-auto">
        <div className="flex gap-3">
          <button
            onClick={() => alert('打开本期旅行聊天室（占位）')}
            className="flex-1 h-12 bg-[#e0f7fa] text-[#00bdd6] font-bold text-sm rounded-xl hover:bg-[#00bdd6]/20 transition-colors shadow-sm"
          >
            本期旅行聊天室
          </button>
          <button
            onClick={() => alert('联系人工管家（占位）')}
            className="flex-1 h-12 bg-[#00bdd6] text-white font-bold text-sm rounded-xl hover:bg-[#00bdd6]/90 transition-colors shadow-lg shadow-[#00bdd6]/30"
          >
            联系人工管家
          </button>
        </div>
      </div>
    </div>
  );
};

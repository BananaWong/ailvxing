import { Theme, ActiveTrip, RecommendedTrip, GroupTrip, QuizQuestion } from './types';

// --- VI Design Tokens ---
export const theme: Theme = {
  colors: {
    primary: '#00bdd6', // Cyan from VI
    primaryLight: '#e0f7fa', // Very light cyan for backgrounds
    accent: '#FF7043', // Orange from VI
    success: '#4CAF50',
    alert: '#F44336',
    backgroundLight: '#f5f8f8', // From VI
    backgroundDark: '#0f2123',
    cardLight: '#ffffff',
    cardDark: '#1A2C2E',
    textMain: '#333333',
    textSub: '#666666',
    border: '#cde6ea',
    neteaseRed: '#d43c33', 
    neteaseBg: '#fdf2f2', 
  },
  borderRadius: {
    DEFAULT: '1rem',
    lg: '2rem',
    xl: '3rem',
  }
};

// --- Mock Data ---
export const activeTrips: ActiveTrip[] = [
  {
    id: 1,
    title: "大西北 10 日环线",
    image: "https://images.unsplash.com/photo-1624882986992-705ef6c9e4c3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    progress: 30,
    day: 3,
    totalDays: 10,
    todaySchedule: "早上在酒店用餐后，上午：驱车前往青海湖，下午：游览茶卡盐湖。"
  }
];

export const recommendedTrips: RecommendedTrip[] = [
  {
    id: 1,
    title: "滇西北 · 人文与风光之旅",
    subtitle: "大理古城 + 丽江雪山 + 泸沽湖",
    tag: "滇西北",
    price: "¥4800 起",
    image: "https://images.unsplash.com/photo-1665494697817-dccdb2952fd1?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    aiSummary: "这条线路非常符合你“规划家”的特质。行程清晰，覆盖经典地标，让你在有限时间内高效领略滇西北的人文与自然风光。"
  },
  {
    id: 2,
    title: "川西秘境 · 雪山草甸之约",
    subtitle: "四姑娘山 + 稻城亚丁 + 新都桥",
    tag: "川西",
    price: "¥5200 起",
    image: "https://images.unsplash.com/photo-1704419021934-65aa0212e7d4?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    aiSummary: "专为摄影爱好者设计，避开人流，深入川西秘境。行程安排松弛有度，有充足时间等待最佳光影。"
  },
  {
    id: 3,
    title: "南疆风情 · 丝路古道探秘",
    subtitle: "喀什古城 + 帕米尔高原 + 塔克拉玛干",
    tag: "南疆",
    price: "¥6800 起",
    image: "https://images.unsplash.com/photo-1569660003459-6c30601dc19c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    aiSummary: "一场跨越千年的文化苦旅。从古城的人文气息到高原的壮丽风光，深度体验南疆的独特魅力。"
  },
   {
    id: 4,
    title: "桂林山水 · 画中游",
    subtitle: "阳朔西街 + 龙脊梯田 + 漓江竹筏",
    tag: "桂林山水",
    price: "¥3500 起",
    image: "https://images.unsplash.com/photo-1599703277928-054fc3e538fd?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    aiSummary: "经典的山水田园风光，适合放松身心。行程包含竹筏漂流和梯田徒步，动静结合。"
  }
];

export const groupTrips: GroupTrip[] = [
  {
    id: 1,
    title: "大西北 10 日",
    current: 3,
    max: 8,
    date: "10月1日出发",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 2,
    title: "川西小环线 7 日",
    current: 5,
    max: 6,
    date: "9月28日出发",
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80"
  }
];

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "一趟 7–8 天的旅行，你更喜欢怎样的节奏？",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    options: [
      "每天安排满满，看遍所有景点",
      "观光和放空各一半，松弛有度",
      "只挑 2–3 个地方深度漫游"
    ]
  },
  {
    id: 2,
    question: "关于住宿，你通常的首选是？",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    options: [
      "性价比至上，青旅或快捷酒店即可",
      "舒适型酒店，干净安静最重要",
      "特色民宿或设计酒店，住也是风景"
    ]
  },
  {
    id: 3,
    question: "在旅途中的饮食，你倾向于？",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    options: [
      "跟着必吃榜打卡网红餐厅",
      "钻进巷子寻找当地人的苍蝇馆子",
      "随意解决，便利店或快餐也行"
    ]
  },
];

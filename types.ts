export interface Theme {
  colors: {
    primary: string;
    primaryLight: string;
    accent: string;
    success: string;
    alert: string;
    backgroundLight: string;
    backgroundDark: string;
    cardLight: string;
    cardDark: string;
    textMain: string;
    textSub: string;
    border: string;
    neteaseRed: string;
    neteaseBg: string;
  };
  borderRadius: {
    DEFAULT: string;
    lg: string;
    xl: string;
  };
}

export interface ActiveTrip {
  id: number;
  title: string;
  image: string;
  progress: number;
  day: number;
  totalDays: number;
  todaySchedule: string;
}

export interface RecommendedTrip {
  id: number;
  title: string;
  subtitle: string;
  tag: string;
  price: string;
  image: string;
  aiSummary: string;
}

export interface GroupTrip {
  id: number;
  title: string;
  current: number;
  max: number;
  date: string;
  image: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  image: string;
  options: string[];
}

export interface DemoTrip {
  id: number;
  name: string;
  tagline: string;
  subtitle: string;
  image: string;
  pricePerPerson: number;
  startDate: string;
  duration: number;
  tag: string;
  aiSummary: string;
}

// 通用行程类型（可以用于 activeTrip）
export type Trip = DemoTrip;

// 全局设置类型
export interface Settings {
  enableTripNotifications: boolean;
  enableAiTips: boolean;
  enablePersonalizedRecommendations: boolean;
}

// 旅行偏好类型
export interface UserPreference {
  depthScore: number;   // 0-10
  typeName: string;     // 例如「谋定而动的规划家」
  tags: string[];       // 例如 ['能吃苦', '喜欢景色', '不爱早起']
}

// 聊天消息类型
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  createdAt?: string;
}

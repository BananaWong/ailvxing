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

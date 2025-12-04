# DeepTrip AI - 项目结构与功能说明文档

## 📋 目录

- [项目概述](#项目概述)
- [技术栈](#技术栈)
- [目录结构](#目录结构)
- [组件说明](#组件说明)
- [页面说明](#页面说明)
- [数据流与状态管理](#数据流与状态管理)
- [开发指南](#开发指南)

---

## 项目概述

**DeepTrip AI** 是一个基于 AI 的智能旅行规划助手应用。用户可以通过 AI 对话来规划旅行路线、查看推荐线路、管理行程、参与拼团等。

### 核心功能
- 🏠 首页精选路线推荐
- 🤖 AI 智能路线规划对话
- 📅 每日行程管理
- 👥 拼团功能
- 👤 个人中心与设置
- 🎯 旅行偏好定制

---

## 技术栈

### 核心框架
- **框架**: React 19.2.0 + TypeScript 5.8.2
- **构建工具**: Vite 6.2.0
- **样式**: Tailwind CSS (CDN)
- **图标**: Lucide React 0.555.0
- **状态管理**: React Hooks (useState)
- **路由**: 自定义路由（基于状态切换）

### AI 集成
- **AI 服务**: Google Gemini API (@google/genai 1.30.0)
- **模型**: gemini-2.5-flash-preview-09-2025
- **容错机制**: 3次重试（指数退避） + Mock响应

### 开发环境
- **编译目标**: ES2022
- **模块系统**: ESNext
- **开发服务器**: localhost:3000

---

## 目录结构

```
E:\ailvxing-main\
├── components/              # 可复用组件
│   ├── ui/                 # 基础 UI 组件
│   │   ├── ProgressBar.tsx    # 进度条
│   │   ├── Chip.tsx           # 标签/筹码
│   │   └── IconButton.tsx     # 图标按钮
│   ├── chat/               # 聊天相关组件
│   │   ├── AIMessage.tsx      # AI 消息气泡
│   │   └── UserMessage.tsx    # 用户消息气泡
│   └── trip/               # 行程相关组件
│       ├── TripSummaryCard.tsx    # 行程摘要卡片
│       └── BudgetAdjustCard.tsx   # 预算调整卡片
│
├── pages/                   # 页面组件
│   ├── HomePage.tsx               # 首页
│   ├── WorkbenchPage.tsx          # AI 工作台（路线规划）
│   ├── DailyItineraryPage.tsx     # 每日行程（旅行管家）
│   ├── ProfilePage.tsx            # 个人中心
│   ├── SettingsPage.tsx           # 设置页面
│   ├── GroupListPage.tsx          # 拼团列表
│   ├── GroupAndIntentPage.tsx     # 拼团详情与意向
│   ├── PlanDetailsPage.tsx        # 路线详情
│   ├── ItineraryPage.tsx          # 行程列表
│   ├── PreferencePage.tsx         # 偏好设置
│   └── RecommendedRoutesPage.tsx  # 推荐路线列表
│
├── services/                # 服务层
│   └── geminiService.ts     # Gemini AI API 服务（含容错机制）
│
├── App.tsx                  # 根组件（路由 + 全局状态）
├── constants.ts             # 常量配置（主题、示例数据）
├── types.ts                 # TypeScript 类型定义
├── index.tsx                # 应用入口
├── index.html               # HTML 入口（Tailwind CDN + importmap）
├── vite.config.ts           # Vite 配置（端口3000、API密钥注入）
├── tsconfig.json            # TypeScript 配置
├── package.json             # 项目依赖
├── metadata.json            # 项目元数据
├── PROJECT_STRUCTURE.md     # 本文档
└── .gitignore               # Git 忽略配置
```

---

## 组件说明

### 🎨 UI 组件 (`components/ui/`)

#### 1. ProgressBar
**文件**: `components/ui/ProgressBar.tsx`

**功能**: 显示进度条

**接口**:
```typescript
type ProgressBarProps = {
  progress: number;  // 进度值 0-100
}
```

**使用示例**:
```tsx
<ProgressBar progress={75} />
```

---

#### 2. Chip
**文件**: `components/ui/Chip.tsx`

**功能**: 可点击的标签按钮，支持激活状态

**接口**:
```typescript
type ChipProps = {
  children?: React.ReactNode;  // 标签内容
  active?: boolean;            // 是否激活
  onClick?: () => void;        // 点击事件
}
```

**使用示例**:
```tsx
<Chip active={isActive} onClick={() => setActive(true)}>
  文化游
</Chip>
```

---

#### 3. IconButton
**文件**: `components/ui/IconButton.tsx`

**功能**: 带图标和标签的按钮

**接口**:
```typescript
interface IconButtonProps {
  icon: LucideIcon;              // Lucide 图标组件
  label: string;                 // 按钮标签
  colorClass?: string;           // 图标颜色类名
  bgClass?: string;              // 背景颜色类名
  iconStyle?: React.CSSProperties; // 自定义样式
}
```

**使用示例**:
```tsx
<IconButton
  icon={MapPin}
  label="景点"
  colorClass="text-blue-500"
  bgClass="bg-blue-100"
/>
```

---

### 💬 聊天组件 (`components/chat/`)

#### 1. AIMessage
**文件**: `components/chat/AIMessage.tsx`

**功能**: AI 消息气泡容器

**接口**:
```typescript
type AIMessageProps = {
  children?: ReactNode;  // 消息内容
  avatar?: string;       // AI 头像 URL（可选）
}
```

**使用示例**:
```tsx
<AIMessage>
  <div className="bg-white p-3 rounded-lg">
    您好！我是 DeepTrip AI
  </div>
</AIMessage>
```

---

#### 2. UserMessage
**文件**: `components/chat/UserMessage.tsx`

**功能**: 用户消息气泡

**接口**:
```typescript
type UserMessageProps = {
  text: string;  // 消息文本
}
```

**使用示例**:
```tsx
<UserMessage text="我想去西北旅游" />
```

---

### 🗺️ 行程组件 (`components/trip/`)

#### 1. TripSummaryCard
**文件**: `components/trip/TripSummaryCard.tsx`

**功能**: 显示行程摘要信息，可展开/收起

**接口**:
```typescript
type TripSummaryCardProps = {
  activeTrip: any;                      // 当前行程对象
  userPreference?: any;                 // 用户偏好（可选）
  isExpanded: boolean;                  // 是否展开
  setIsExpanded: (value: boolean) => void; // 设置展开状态
}
```

**使用示例**:
```tsx
<TripSummaryCard
  activeTrip={demoTrip}
  userPreference={userPreference}
  isExpanded={isExpanded}
  setIsExpanded={setIsExpanded}
/>
```

---

#### 2. BudgetAdjustCard
**文件**: `components/trip/BudgetAdjustCard.tsx`

**功能**: 预算调整卡片，包含滑块和快捷按钮

**接口**:
```typescript
type BudgetAdjustCardProps = {
  budgetRange: number;                       // 当前预算增量
  setBudgetRange: (value: number) => void;   // 设置预算增量
  setShowBudgetAdjust: (value: boolean) => void; // 关闭卡片
  handleBudgetUpdate: () => void;            // 确认更新回调
}
```

**使用示例**:
```tsx
<BudgetAdjustCard
  budgetRange={budgetRange}
  setBudgetRange={setBudgetRange}
  setShowBudgetAdjust={setShowBudgetAdjust}
  handleBudgetUpdate={handleBudgetUpdate}
/>
```

---

## 服务层说明

### 🤖 Gemini AI 服务
**文件**: `services/geminiService.ts`

**功能**: 封装 Google Gemini API 调用，提供 AI 对话能力，内置容错机制

**核心方法**:

#### 1. callGeminiAPI()
```typescript
async function callGeminiAPI(prompt: string): Promise<string>
```

**功能**:
- 调用 Gemini 2.5 Flash 模型生成 AI 响应
- 自动重试机制（最多3次）
- 指数退避策略（2秒、4秒、8秒）
- 无 API 密钥时返回 Mock 响应

**参数**:
- `prompt: string` - 用户输入的提示词

**返回**:
- `Promise<string>` - AI 生成的文本响应

**容错机制**:
```typescript
// 重试配置
maxRetries: 3
initialDelay: 2000ms
backoff: exponential (2x)

// 错误处理
1. API 密钥未配置 → 返回 Mock 响应
2. 网络请求失败 → 自动重试（最多3次）
3. 所有重试失败 → 抛出错误信息
```

**使用示例**:
```typescript
import { callGeminiAPI } from '../services/geminiService';

// 调用 AI
const response = await callGeminiAPI('推荐一条云南旅游路线');
console.log(response);
```

---

#### 2. buildMockAIResponse()
```typescript
function buildMockAIResponse(prompt: string): string
```

**功能**:
- 演示环境下生成模拟 AI 响应
- 从 `constants.ts` 的 `recommendedTrips` 提取建议
- 返回格式化的旅行推荐文本

**使用场景**:
- 开发环境测试
- API 密钥未配置时的降级方案
- 演示功能展示

**Mock 响应格式**:
```
好的！根据您的需求，我为您推荐以下几条旅行路线：

1. 滇西北秘境 7 日游（3200 元/人）
   [路线描述...]

2. 川西秘境 8 日游（4500 元/人）
   [路线描述...]

...

这些路线都考虑了您的预算和偏好...
```

---

#### 3. 环境变量配置

**Vite 配置** (`vite.config.ts`):
```typescript
define: {
  'process.env.GEMINI_API_KEY': JSON.stringify(process.env.GEMINI_API_KEY)
}
```

**设置 API 密钥**:
```bash
# Windows
set GEMINI_API_KEY=your-api-key-here

# Linux/Mac
export GEMINI_API_KEY=your-api-key-here
```

**获取 API 密钥**:
访问 [Google AI Studio](https://makersuite.google.com/app/apikey) 获取免费 API 密钥

---

#### 4. 技术细节

**模型配置**:
```typescript
model: 'gemini-2.5-flash-preview-09-2025'
generationConfig: {
  temperature: 1,        // 创造性程度
  topP: 0.95,           // 采样概率
  topK: 40,             // 候选词数量
  maxOutputTokens: 8192 // 最大输出长度
}
```

**安全设置**:
```typescript
safetySettings: [
  { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
  { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
  { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
  { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE }
]
```

---

#### 5. 错误处理示例

```typescript
try {
  const response = await callGeminiAPI(userInput);
  setMessages([...messages, { role: 'assistant', content: response }]);
} catch (error) {
  console.error('AI 调用失败:', error);
  setMessages([...messages, {
    role: 'assistant',
    content: '抱歉，AI 服务暂时不可用，请稍后重试。'
  }]);
}
```

---

## 页面说明

### 🏠 1. HomePage（首页）
**文件**: `pages/HomePage.tsx`

**功能**:
- 展示精选推荐路线（Hero Banner）
- 根据用户偏好推荐路线（自动轮播）
- 显示拼团信息
- 提供快速入口到 AI 规划、路线详情

**接口**:
```typescript
type HomePageProps = {
  onNavigate: (page: string) => void;         // 页面导航
  setActiveTrip: (trip: any) => void;         // 设置当前行程
  setPreloadedQuestion?: (q: string) => void; // 预设问题（可选）
  settings?: any;                             // 全局设置（可选）
  userPreference?: any;                       // 用户偏好（可选）
}
```

**主要功能**:
1. **Hero Banner 主推线路**
   - 展示 demoTrip（大西北 10 日环线）
   - 个性化说明：根据深度指数和偏好类型推荐理由
   - 两个操作按钮：查看线路详情 / 和 AI 聊聊这条
2. **本期推荐线路**
   - 自动轮播其他推荐路线（已排除 demoTrip，避免重复）
   - 标签过滤功能
   - 个性化推荐提示（说明主推线路在上方）
3. **拼团信息**
   - 显示正在拼团的行程
   - 查看拼团进度

**v2.2.0 改版要点**:
- ✅ 避免推荐重复：filteredTrips 排除 demoTrip.id
- ✅ Hero Banner 增加个性化说明区域
- ✅ 移除轮播中的两个 demoTrip 大卡片
- ✅ 更新推荐列表文案，明确主推位置

---

### 🤖 2. WorkbenchPage（AI 工作台）
**文件**: `pages/WorkbenchPage.tsx`

**功能**:
- AI 对话式路线规划
- 实时聊天交互
- 显示行程摘要
- 预算调整功能
- 查看详细规划

**接口**:
```typescript
type WorkbenchPageProps = {
  onBack: () => void;                         // 返回回调
  onNavigate: (page: string) => void;         // 页面导航
  activeTrip: any;                            // 当前行程
  setActiveTrip: (trip: any) => void;         // 设置行程
  preloadedQuestion?: string;                 // 预设问题
  setPreloadedQuestion?: (q: string) => void; // 设置预设问题
  settings?: any;                             // 全局设置
  userPreference?: any;                       // 用户偏好
}
```

**主要功能**:
1. AI 聊天界面
2. 行程偏好设置（展开/收起）
3. 预算调整滑块
4. 查看完整规划
5. 切换到行程详情

**状态管理**:
- `messages`: 聊天历史
- `inputText`: 输入文本
- `isGenerating`: AI 生成状态
- `showBudgetAdjust`: 预算调整卡片显示
- `budgetRange`: 预算增量
- `isExpanded`: 行程摘要展开状态

---

### 📅 3. DailyItineraryPage（旅行管家）
**文件**: `pages/DailyItineraryPage.tsx`

**功能**:
- 显示每日详细行程
- 时间轴展示
- AI 小提示
- 便捷服务入口
- 人工客服入口

**接口**:
```typescript
type DailyItineraryPageProps = {
  onBack: () => void;           // 返回回调
  activeTrip: any;              // 当前行程
  enableAiTips: boolean;        // 是否启用 AI 小提示
}
```

**主要功能**:
1. **顶部导航栏**
   - 返回按钮
   - 标题：旅行管家
   - 右侧操作：人工客服（Headphones）+ 更多菜单
2. **行程概览卡片**
   - 行程基本信息（名称、日期、进度）
   - 进度条显示
   - 智能管家状态
   - **可折叠的行程总览**（v2.2.0 新增）
3. **今日卡片**
   - 当前天数、天气
   - 行程摘要
   - AI 小提醒（整合在此处）
4. **时间轴**
   - 每日详细行程（景点、餐饮、住宿、交通）
   - 状态标识（已完成/进行中/未开始）
   - 导航和紧急联络入口
5. **便捷服务**（v2.2.0 优化）
   - 行李打包、实时翻译、旅途音乐、全部工具
   - 缩小视觉占比，更像工具栏
6. **遇到问题**
   - 快速联系入口（迟到、调整行程、身体不适等）
7. **明日预告**
   - 下一天行程预览

**v2.2.0 改版要点**:
- ✅ 合并 AI 提醒：删除底部独立卡片，保留今日卡片内提醒
- ✅ 行程总览可折叠：移至顶部概览卡，支持展开/收起
- ✅ 便捷服务优化：padding p-4→p-3，标题 text-base→text-sm，gap-3→gap-2
- ✅ 人工客服入口：右上角新增 Headphones 图标按钮
- ✅ 删除底部独立的"本期行程总览"卡片

---

### 👤 4. ProfilePage（个人中心）
**文件**: `pages/ProfilePage.tsx`

**功能**:
- 用户信息展示
- 订单管理
- 偏好设置入口
- 客服与帮助

**接口**:
```typescript
type ProfilePageProps = {
  onNavigate: (page: string) => void;  // 页面导航
  setActiveTrip: (trip: any) => void;  // 设置行程
}
```

**主要功能**:
1. 用户头像与信息
2. 我的订单
3. 我的路线
4. 旅行偏好
5. 设置入口
6. 客服支持

---

### ⚙️ 5. SettingsPage（设置）
**文件**: `pages/SettingsPage.tsx`

**功能**:
- 全局设置管理
- 通知设置
- AI 功能开关
- 个性化推荐

**接口**:
```typescript
type SettingsPageProps = {
  onBack: () => void;                           // 返回回调
  settings: {
    enableTripNotifications: boolean;           // 行程通知
    enableAiTips: boolean;                      // AI 小提示
    enablePersonalizedRecommendations: boolean; // 个性化推荐
  };
  setSettings: (settings: any) => void;         // 更新设置
}
```

**主要功能**:
1. 行程出发前提醒开关
2. AI 智能小提示开关
3. 个性化推荐开关

---

### 👥 6. GroupListPage（拼团列表）
**文件**: `pages/GroupListPage.tsx`

**功能**:
- 显示当前路线的拼团列表
- 加入拼团
- 查看拼团详情

**接口**:
```typescript
type GroupListPageProps = {
  onBack: () => void;                   // 返回回调
  onNavigate: (page: string) => void;   // 页面导航
  activeTrip: any;                      // 当前行程
  setActiveTrip: (trip: any) => void;   // 设置行程
}
```

---

### 🎯 7. GroupAndIntentPage（拼团详情）
**文件**: `pages/GroupAndIntentPage.tsx`

**功能**:
- 拼团与意向切换
- 查看已成团列表
- 发布新拼团
- 查看拼团意向

**接口**:
```typescript
type GroupAndIntentPageProps = {
  onBack: () => void;                   // 返回回调
  onNavigate?: (page: string) => void;  // 页面导航（可选）
  activeTrip?: any;                     // 当前行程（可选）
}
```

---

### 📋 8. PlanDetailsPage（路线详情）
**文件**: `pages/PlanDetailsPage.tsx`

**功能**:
- 显示完整路线详情
- 每日行程概览
- 预算明细
- 行程亮点

**接口**:
```typescript
type PlanDetailsPageProps = {
  onBack: () => void;  // 返回回调
}
```

**主要功能**:
1. 路线概览（天数、价格、标签）
2. 每日行程展开/收起
3. 预算详细分解
4. 行程亮点说明

---

### 📅 9. ItineraryPage（行程列表）
**文件**: `pages/ItineraryPage.tsx`

**功能**:
- 显示所有行程
- 行程状态管理
- 快速操作入口

**接口**:
```typescript
type ItineraryPageProps = {
  onNavigate: (page: string) => void;  // 页面导航
}
```

---

### 🎨 10. PreferencePage（偏好设置）
**文件**: `pages/PreferencePage.tsx`

**功能**:
- 测评问卷
- 偏好标签选择
- 生成旅行深度指数

**接口**:
```typescript
type PreferencePageProps = {
  onBack: () => void;  // 返回回调
}
```

**主要功能**:
1. 多步骤问卷（6 个问题）
2. 滑块选择偏好强度
3. 计算深度指数
4. 生成偏好标签

---

### 🌟 11. RecommendedRoutesPage（推荐路线）
**文件**: `pages/RecommendedRoutesPage.tsx`

**功能**:
- 查看所有推荐路线
- 根据深度指数筛选
- 快速预览和询问 AI

**接口**:
```typescript
type RecommendedRoutesPageProps = {
  onBack: () => void;                         // 返回回调
  onNavigate?: (page: string) => void;        // 页面导航（可选）
  setActiveTrip?: (trip: any) => void;        // 设置行程（可选）
  setPreloadedQuestion?: (q: string) => void; // 预设问题（可选）
}
```

---

## 数据流与状态管理

### 全局状态 (App.tsx)

```typescript
// 路由状态
const [activeTab, setActiveTab] = useState('home');

// 当前选中的行程
const [activeTrip, setActiveTrip] = useState<any>(null);

// 预加载问题（从首页传递到工作台）
const [preloadedQuestion, setPreloadedQuestion] = useState<string>('');

// 全局设置
const [settings, setSettings] = useState({
  enableTripNotifications: true,        // 行程通知
  enableAiTips: true,                   // AI 小提示
  enablePersonalizedRecommendations: true, // 个性化推荐
});

// 用户偏好
const [userPreference, setUserPreference] = useState({
  depthScore: 7.3,                      // 深度指数
  typeName: '谋定而动的规划家',        // 类型名称
  tags: ['能吃苦', '喜欢景色', '不爱早起'], // 偏好标签
});
```

### 页面路由映射

```typescript
const renderContent = () => {
  switch (activeTab) {
    case 'home': return <HomePage />;
    case 'preference': return <PreferencePage />;
    case 'workbench': return <WorkbenchPage />;
    case 'planDetails': return <PlanDetailsPage />;
    case 'itinerary': return <ItineraryPage />;
    case 'profile': return <ProfilePage />;
    case 'settings': return <SettingsPage />;
    case 'dailyItinerary': return <DailyItineraryPage />;
    case 'groupList': return <GroupListPage />;
    case 'groupIntent': return <GroupAndIntentPage />;
    case 'recommendedRoutes': return <RecommendedRoutesPage />;
    default: return <HomePage />;
  }
};
```

### 数据传递流程

```
用户操作
   ↓
页面组件调用 onNavigate / setActiveTrip
   ↓
App.tsx 更新全局状态
   ↓
通过 props 传递给新页面
   ↓
页面渲染最新数据
```

---

## TypeScript 类型系统 (types.ts)

### 核心类型定义

| 类型 | 说明 | 关键字段 |
|-----|------|--------|
| `Trip` (= `DemoTrip`) | 行程/路线数据 | name, duration, pricePerPerson, image, tags |
| `Settings` | 全局设置 | enableTripNotifications, enableAiTips, enablePersonalizedRecommendations |
| `UserPreference` | 用户偏好 | depthScore, typeName, tags |
| `ChatMessage` | 聊天消息 | role, content, createdAt |
| `ActiveTrip` | 进行中的行程 | title, progress, day, totalDays |
| `RecommendedTrip` | 推荐路线 | title, tag, price, aiSummary |
| `GroupTrip` | 拼团行程 | title, current, max, date, status |
| `QuizQuestion` | 问卷题目 | question, image, options |

### 类型示例

```typescript
// 行程类型
type Trip = {
  name: string;
  duration: string;
  pricePerPerson: number;
  image: string;
  tags: string[];
  description?: string;
}

// 聊天消息类型
type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
  createdAt: Date;
}

// 用户偏好类型
type UserPreference = {
  depthScore: number;      // 0-10
  typeName: string;        // 例如「谋定而动的规划家」
  tags: string[];          // 例如 ['能吃苦', '喜欢景色']
}
```

---

## 常量配置 (constants.ts)

### 主题配置
```typescript
export const theme = {
  colors: {
    primary: '#00bdd6',      // 主色（青色）
    primaryLight: '#e0f7fa', // 浅主色
    accent: '#FF7043',       // 强调色（橙色）
  }
}
```

### 示例数据
- `demoTrip`: 大西北10日环线（4800元/人）- 演示行程
- `activeTrips`: 2条正在进行的行程
- `recommendedTrips`: 4条推荐路线（滇西北、川西、南疆、桂林）
- `groupTrips`: 2个拼团活动
- `quizQuestions`: 6个问卷题目（带图片和选项）

### Mock 数据示例
```typescript
// 推荐路线示例
{
  title: '滇西北秘境 7 日游',
  tag: '人文体验',
  price: 3200,
  depthMin: 6.5,
  depthMax: 9.0,
  aiSummary: '深度探索云南少数民族文化...'
}
```

---

## 开发指南

### 安装依赖
```bash
npm install
```

### 环境变量配置
```bash
# Windows (CMD)
set GEMINI_API_KEY=your-api-key-here
npm run dev

# Windows (PowerShell)
$env:GEMINI_API_KEY="your-api-key-here"
npm run dev

# Linux/Mac
export GEMINI_API_KEY=your-api-key-here
npm run dev
```

**注意**: 如果不配置 API 密钥，应用会自动使用 Mock 响应模式

### 启动开发服务器
```bash
npm run dev
```
访问: `http://localhost:3000`

**开发服务器特性**:
- 热模块替换 (HMR)
- 自动刷新
- 快速冷启动
- TypeScript 类型检查

### 构建生产版本
```bash
npm run build
```
输出目录: `dist/`

### 预览生产构建
```bash
npm run preview
```

### 项目配置文件

| 文件 | 说明 |
|-----|------|
| `vite.config.ts` | Vite 构建配置、开发服务器端口、环境变量注入 |
| `tsconfig.json` | TypeScript 编译选项、严格模式、装饰器支持 |
| `package.json` | 项目依赖、脚本命令、项目元信息 |
| `index.html` | HTML 入口、Tailwind CDN、importmap 配置 |
| `.gitignore` | Git 忽略规则（node_modules、dist、.env） |

---

## 最佳实践

### 组件开发
1. **单一职责**: 每个组件只负责一个功能
2. **Props 类型**: 始终定义清晰的 TypeScript 类型
3. **命名规范**: 使用 PascalCase 命名组件
4. **可复用性**: UI 组件应该高度可复用

### 页面开发
1. **状态管理**: 页面级状态保持在页面内部
2. **数据传递**: 通过 props 接收全局状态
3. **导航处理**: 使用 `onNavigate` 回调进行页面跳转
4. **性能优化**: 避免不必要的重渲染

### 代码组织
```
功能相关组件 → components/[category]/
独立页面 → pages/
通用工具 → utils/
类型定义 → types.ts
常量配置 → constants.ts
```

---

## 项目统计

- **总文件数**: 25+ 个 TypeScript/TSX 文件
- **组件数**: 7 个可复用组件（UI 3个 + 聊天 2个 + 行程 2个）
- **页面数**: 11 个页面组件
- **服务层**: 1 个 AI 服务（含容错机制）
- **代码行数**: App.tsx 精简至 154 行（精简 94.7%）
- **技术栈版本**: React 19.2.0 + TypeScript 5.8.2 + Vite 6.2.0

---

## 项目亮点

### 1. 模块化架构
- 清晰的三层结构：组件层 / 页面层 / 服务层
- 高内聚低耦合的组件设计
- TypeScript 强类型约束

### 2. AI 智能集成
- Google Gemini 2.5 Flash 最新模型
- 3次重试机制 + 指数退避策略
- Mock 响应降级方案
- 零配置即可运行（演示模式）

### 3. 用户体验优化
- 响应式移动端设计（max-width: 430px）
- Tailwind CSS 现代化样式
- 流畅的页面切换动画
- 实时 AI 对话反馈

### 4. 开发友好
- Vite 快速构建（HMR + 冷启动优化）
- TypeScript 严格模式
- 清晰的 Props 接口定义
- 完善的文档说明

---

## 更新日志

### v2.2.0 - 2025-12-04
- 🎨 首页优化：避免推荐线路重复
  - 从推荐列表中排除 demoTrip，避免主推线路重复出现
  - 移除轮播中的重复卡片，优化用户体验
  - Hero Banner 新增个性化说明区域
  - 更新推荐列表文案，明确主推线路位置
- 🎨 旅行管家页面改版
  - 合并重复的 AI 提醒卡片，信息更集中
  - 行程总览改为可折叠，节省屏幕空间
  - 缩小便捷服务卡片视觉占比
  - 右上角新增人工客服入口（Headphones 图标）
  - 优化页面结构，提升信息层次

### v2.1.0 - 2025-12-04
- 📝 更新 PROJECT_STRUCTURE.md 文档
- ➕ 添加 AI 服务层详细说明
- ➕ 添加 TypeScript 类型系统说明
- ➕ 添加环境变量配置指南
- ➕ 添加容错机制技术细节
- ✨ 更新技术栈版本信息（React 19.2.0）
- ✨ 完善开发指南和项目配置说明

### v2.0.0 - 2025-12-03
- ✅ 完成项目重构
- ✅ 拆分 UI 组件、聊天组件、行程组件
- ✅ 拆分 11 个页面组件
- ✅ 优化 import 和依赖关系
- ✅ 代码量减少 94.7%
- ✅ 提升代码可维护性和可读性

---

## 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

---

## 许可证

本项目采用 MIT 许可证

---

## 联系方式

- 项目地址: [GitHub Repository]
- 问题反馈: [Issues]

---

**最后更新**: 2025-12-04
**文档版本**: v2.2.0
**维护者**: DeepTrip AI Team

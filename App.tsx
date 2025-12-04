import React, { useState } from 'react';
import {
  Compass,
  Home,
  Map as MapIcon,
  User,
  Sparkles
} from 'lucide-react';

import { theme, demoTrip } from './constants';
import type { Trip, Settings, UserPreference } from './types';

// --- Pages ---
import { HomePage } from './pages/HomePage';
import { RecommendedRoutesPage } from './pages/RecommendedRoutesPage';
import { PreferencePage } from './pages/PreferencePage';
import { WorkbenchPage } from './pages/WorkbenchPage';
import { GroupListPage } from './pages/GroupListPage';
import { GroupAndIntentPage } from './pages/GroupAndIntentPage';
import { ItineraryPage } from './pages/ItineraryPage';
import { PlanDetailsPage } from './pages/PlanDetailsPage';
import { ProfilePage } from './pages/ProfilePage';
import { SettingsPage } from './pages/SettingsPage';
import { DailyItineraryPage } from './pages/DailyItineraryPage';

// --- Main App Component ---

export default function DeepTripApp() {
  const [activeTab, setActiveTab] = useState('home');
  const [activeTrip, setActiveTrip] = useState<Trip | null>(null);
  const [preloadedQuestion, setPreloadedQuestion] = useState<string>('');

  // 全局 settings 状态
  const [settings, setSettings] = useState<Settings>({
    enableTripNotifications: true,
    enableAiTips: true,
    enablePersonalizedRecommendations: true,
  });

  // 全局 userPreference 状态
  const [userPreference, setUserPreference] = useState<UserPreference>({
    depthScore: 7.3,
    typeName: '谋定而动的规划家',
    tags: ['能吃苦', '喜欢景色', '不爱早起'],
  });

  const renderContent = () => {
    // 确保 activeTrip 始终有值
    const safeActiveTrip: Trip = activeTrip || demoTrip;

    switch (activeTab) {
      case 'home':
        return <HomePage onNavigate={setActiveTab} setActiveTrip={setActiveTrip} setPreloadedQuestion={setPreloadedQuestion} settings={settings} userPreference={userPreference} />;

      case 'preference':
        return <PreferencePage onBack={() => setActiveTab('home')} userPreference={userPreference} setUserPreference={setUserPreference} />;

      case 'workbench':
        return <WorkbenchPage onBack={() => setActiveTab('home')} onNavigate={setActiveTab} activeTrip={safeActiveTrip} setActiveTrip={setActiveTrip} preloadedQuestion={preloadedQuestion} setPreloadedQuestion={setPreloadedQuestion} settings={settings} userPreference={userPreference} />;

      case 'planDetails':
        return <PlanDetailsPage onBack={() => setActiveTab('workbench')} />;

      case 'itinerary':
        return <ItineraryPage onNavigate={setActiveTab} />;

      case 'profile':
        return <ProfilePage onNavigate={setActiveTab} setActiveTrip={setActiveTrip} userPreference={userPreference} />;

      case 'settings':
        return <SettingsPage onBack={() => setActiveTab('profile')} settings={settings} setSettings={setSettings} />;

      case 'dailyItinerary':
        return <DailyItineraryPage onBack={() => setActiveTab('home')} activeTrip={safeActiveTrip} enableAiTips={settings.enableAiTips} />;

      case 'groupList':
        return <GroupListPage onBack={() => setActiveTab('workbench')} onNavigate={setActiveTab} activeTrip={safeActiveTrip} setActiveTrip={setActiveTrip} />;

      case 'groupIntent':
        return <GroupAndIntentPage onBack={() => setActiveTab('groupList')} onNavigate={setActiveTab} activeTrip={safeActiveTrip} />;

      case 'recommendedRoutes':
        return <RecommendedRoutesPage onBack={() => setActiveTab('home')} onNavigate={setActiveTab} setActiveTrip={setActiveTrip} setPreloadedQuestion={setPreloadedQuestion} userPreference={userPreference} />;

      default:
        return <HomePage onNavigate={setActiveTab} setActiveTrip={setActiveTrip} setPreloadedQuestion={setPreloadedQuestion} settings={settings} userPreference={userPreference} />;
    }
  };

  return (
    <div className="font-sans min-h-screen max-w-[430px] mx-auto bg-[#f5f8f8] relative shadow-2xl overflow-hidden flex flex-col">
      {/* Status Bar Mock (Hide on special pages) */}
      {activeTab !== 'preference' && activeTab !== 'workbench' && activeTab !== 'planDetails' && activeTab !== 'dailyItinerary' && activeTab !== 'groupList' && activeTab !== 'groupIntent' && activeTab !== 'recommendedRoutes' && activeTab !== 'itinerary' && (
        <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-[#cde6ea]">
           <div className="flex items-center gap-2">
              <Compass size={24} style={{ color: theme.colors.primary }} />
              <div>
                 <h1 className="text-lg font-bold text-[#333] leading-none">DeepTrip AI</h1>
                 <p className="text-[10px] text-gray-500 font-medium">智能旅行助手</p>
              </div>
           </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto scrollbar-hide">
         {renderContent()}
      </main>

      {/* Bottom Navigation (Hide on special pages) */}
      {activeTab !== 'preference' && activeTab !== 'planDetails' && (
        <nav className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto h-[64px] bg-white border-t border-[#cde6ea] flex justify-around items-center z-30 pb-safe">
          {/* 本期精选 */}
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center justify-center gap-1 flex-1 ${activeTab === 'home' ? 'text-[#00bdd6]' : 'text-gray-400'}`}
          >
            <Home size={24} strokeWidth={activeTab === 'home' ? 2.5 : 2} />
            <span className="text-[10px] font-medium">本期精选</span>
          </button>

          {/* 路线规划 */}
          <button
            onClick={() => setActiveTab('workbench')}
            className={`flex flex-col items-center justify-center gap-1 flex-1 ${activeTab === 'workbench' ? 'text-[#00bdd6]' : 'text-gray-400'}`}
          >
            <Compass size={24} strokeWidth={activeTab === 'workbench' ? 2.5 : 2} />
            <span className="text-[10px] font-medium">路线规划</span>
          </button>

          {/* 旅行管家 - 强调特征 */}
          <button
            onClick={() => setActiveTab('dailyItinerary')}
            className={`relative flex flex-col items-center justify-center gap-1 flex-1 ${activeTab === 'dailyItinerary' ? 'text-[#00bdd6]' : 'text-gray-600'}`}
          >
            <div className={`relative ${activeTab === 'dailyItinerary' ? 'scale-110' : ''} transition-transform`}>
              <MapIcon size={24} strokeWidth={activeTab === 'dailyItinerary' ? 2.5 : 2} />
              {activeTab === 'dailyItinerary' && (
                <div className="absolute inset-0 bg-[#00bdd6]/10 rounded-full blur-sm -z-10"></div>
              )}
            </div>
            <span className={`text-[10px] font-bold ${activeTab === 'dailyItinerary' ? 'text-[#00bdd6]' : 'text-gray-600'}`}>
              旅行管家
            </span>
          </button>

          {/* 我的 */}
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center justify-center gap-1 flex-1 ${activeTab === 'profile' ? 'text-[#00bdd6]' : 'text-gray-400'}`}
          >
            <User size={24} strokeWidth={activeTab === 'profile' ? 2.5 : 2} />
            <span className="text-[10px] font-medium">我的</span>
          </button>
        </nav>
      )}
      
      {/* AI Assistant Floating Action Button */}
      {activeTab === 'home' && (
        <div className="fixed bottom-20 right-4 z-20">
           <button
             onClick={() => {
               setActiveTrip(demoTrip);
               setActiveTab('workbench');
             }}
             className="size-12 rounded-full shadow-lg flex items-center justify-center text-white transition-transform hover:scale-110 active:scale-95"
             style={{ backgroundColor: theme.colors.primary }}
             title="路线规划"
           >
              <div className="absolute animate-ping inline-flex h-full w-full rounded-full opacity-30 bg-white"></div>
              <Sparkles size={24} />
           </button>
        </div>
      )}
    </div>
  );
}

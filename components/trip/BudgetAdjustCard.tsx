import React from 'react';
import { XCircle } from 'lucide-react';

type BudgetAdjustCardProps = {
  budgetRange: number;
  setBudgetRange: (value: number) => void;
  setShowBudgetAdjust: (value: boolean) => void;
  handleBudgetUpdate: () => void;
};

export const BudgetAdjustCard = ({ budgetRange, setBudgetRange, setShowBudgetAdjust, handleBudgetUpdate }: BudgetAdjustCardProps) => (
  <div className="mt-4 bg-[#fff8e1] border border-[#ffecb3] rounded-xl p-4 animate-in zoom-in-95 duration-200">
    <div className="flex justify-between items-center mb-2">
       <h4 className="text-sm font-bold text-[#d46b08]">预算调整</h4>
       <button onClick={() => setShowBudgetAdjust(false)}><XCircle size={16} className="text-[#d46b08]" /></button>
    </div>
    <p className="text-xs text-[#873800] mb-3">当前预算: ¥6,000/人。你想增加多少预算以升级体验？</p>

    <div className="mb-4">
      <input
        type="range"
        min="0"
        max="2000"
        step="100"
        value={budgetRange}
        onChange={(e) => setBudgetRange(parseInt(e.target.value))}
        className="w-full h-1.5 bg-[#ffd591] rounded-lg appearance-none cursor-pointer accent-[#fa8c16]"
      />
      <div className="flex justify-between text-xs text-[#d46b08] mt-2 font-medium">
         <span>+¥0</span>
         <span>+¥{budgetRange}</span>
         <span>+¥2000</span>
      </div>
    </div>

    <div className="flex gap-2 mb-3">
       {[500, 1000, 1500].map(val => (
         <button
           key={val}
           onClick={() => setBudgetRange(val)}
           className={`flex-1 py-1.5 text-xs rounded-lg border ${budgetRange == val ? 'bg-[#fa8c16] text-white border-[#fa8c16]' : 'bg-white text-[#d46b08] border-[#ffd591]'}`}
         >
           +¥{val}
         </button>
       ))}
    </div>

    <button
      onClick={handleBudgetUpdate}
      className="w-full py-2 bg-[#fa8c16] text-white text-sm font-bold rounded-lg shadow-sm active:scale-95 transition-transform"
    >
      确认调整并重新规划
    </button>
  </div>
);

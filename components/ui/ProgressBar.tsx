import React from 'react';
import { theme } from '../../constants';

export const ProgressBar = ({ progress }: { progress: number }) => (
  <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1 overflow-hidden">
    <div
      className="h-full rounded-full transition-all duration-500"
      style={{ width: `${progress}%`, backgroundColor: theme.colors.primary }}
    ></div>
  </div>
);

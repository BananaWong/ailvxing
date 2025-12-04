import React from 'react';
import { theme } from '../../constants';

type ChipProps = {
  children?: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
};

export const Chip = ({ children, active, onClick }: ChipProps) => (
  <button
    onClick={onClick}
    className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-medium transition-colors hover:scale-105 active:scale-95`}
    style={{
      backgroundColor: active ? theme.colors.primary : theme.colors.primaryLight,
      color: active ? '#fff' : theme.colors.primary
    }}
  >
    {children}
  </button>
);

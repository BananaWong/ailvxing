import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface IconButtonProps {
  icon: LucideIcon;
  label: string;
  colorClass?: string;
  bgClass?: string;
  iconStyle?: React.CSSProperties;
}

export const IconButton = ({ icon: Icon, label, colorClass = "text-gray-500", bgClass = "bg-gray-100", iconStyle = {} }: IconButtonProps) => (
  <a className="flex flex-col items-center gap-2 cursor-pointer group" href="#">
    <div className={`flex items-center justify-center size-12 rounded-full ${bgClass} ${colorClass} transition-transform group-hover:scale-105`} style={iconStyle}>
      <Icon size={24} />
    </div>
    <p className="text-xs text-gray-600">{label}</p>
  </a>
);

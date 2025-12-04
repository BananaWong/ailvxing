import React from 'react';

type UserMessageProps = {
  text: string;
};

export const UserMessage = ({ text }: UserMessageProps) => (
  <div className="flex items-end justify-end gap-3 mb-6 animate-in slide-in-from-right-5 duration-500">
     <div className="max-w-[85%] bg-[#00bdd6] p-3 rounded-2xl rounded-br-none text-white text-sm shadow-sm">
       {text}
     </div>
  </div>
);

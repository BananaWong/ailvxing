import React, { ReactNode } from 'react';

type AIMessageProps = {
  children?: ReactNode;
  avatar?: string;
};

export const AIMessage = ({ children, avatar = "https://lh3.googleusercontent.com/aida-public/AB6AXuDSXfDbLUXukC1XvjVNzedYD5JEmAB3pyV0Dbg3i4f1OjpNLwhSOXlIrPWiPCFIFGxHtScLwAtdGUCbDwt60YHeb0qAiKss4mqKMZK08uUN3qp3MsT2HTggV-HcQ6h2AePKH4TJxa78XLhI7J15Po8zhIaL1zz4_7WwW04ks2BY3iuqnc_MHkCSH8nU9whcN9CJeLkttHBw2E4m9KlR8lk_68Gr6rddrHl-OOyRTHrVrnkFtMQO-e8kVdpmMSTrhQAl_GqBjaDcZq3O" }: AIMessageProps) => (
  <div className="flex items-end gap-3 mb-6 animate-in slide-in-from-left-5 duration-500">
     <div className="size-10 rounded-full bg-cover bg-center shrink-0" style={{ backgroundImage: `url(${avatar})` }}></div>
     <div className="flex flex-col items-start gap-2 max-w-[85%] w-full">
       {children}
     </div>
  </div>
);

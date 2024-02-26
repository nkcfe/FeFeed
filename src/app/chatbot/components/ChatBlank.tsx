import React from 'react';
import { GoHubot } from 'react-icons/go';

const ChatBlank = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <GoHubot className="size-14" />
      <div className="font-bold">어떻게 도와드릴까요?</div>
    </div>
  );
};

export default ChatBlank;

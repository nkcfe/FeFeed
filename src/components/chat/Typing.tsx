import React from 'react';
import { PulseLoader } from 'react-spinners';
import { GoHubot } from 'react-icons/go';

const Typing = () => {
  return (
    <div className="container mx-auto flex items-center gap-1 rounded-3xl bg-[#F0FAF9] p-3 lg:gap-4">
      <div className="flex justify-center rounded-full bg-green-200 p-2">
        <GoHubot className="size-5 text-green-700" />
      </div>
      <div className={'flex flex-col items-start'}>
        <div className={'whitespace-pre-wrap text-sm text-gray-600'}>
          <PulseLoader color="#36d7b7" size={12} />
        </div>
      </div>
    </div>
  );
};

export default Typing;

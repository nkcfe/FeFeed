import { cn } from '@/utils/style';
import React, { useState } from 'react';

interface DateBlockProps {
  date: string;
  activityData: string[];
}

const DateBlock = (props: DateBlockProps) => {
  const { date, activityData } = props;
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div
        key={date}
        className={cn(
          'size-4 cursor-pointer rounded-sm bg-gray-200 hover:bg-gray-300',
          activityData.includes(date) && 'bg-green-400 hover:bg-green-600',
        )}
      />
      {isHover && (
        <div className="absolute -right-10 top-7 z-10 rounded-xl bg-gray-600 px-2 py-1 text-xs font-bold text-white">
          {date}
        </div>
      )}
    </div>
  );
};

export default DateBlock;

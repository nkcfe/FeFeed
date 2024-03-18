import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { cn } from '@/utils/style';
import React, { useState } from 'react';

interface DateBlockProps {
  date: string;
  activityData?: string[];
}

const DateBlock = (props: DateBlockProps) => {
  const { date, activityData } = props;

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div
          className={cn(
            'size-2.5 cursor-pointer bg-stone-700 transition hover:bg-gray-300',
            activityData?.includes(date) && 'bg-green-400 hover:bg-green-600',
          )}
        />
      </HoverCardTrigger>
      <HoverCardContent className="flex h-6 w-20 items-center justify-center">
        <div className="text-xs font-bold">{date}</div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default DateBlock;

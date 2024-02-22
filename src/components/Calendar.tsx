import React, { useEffect, useState } from 'react';
import IconButton from './IconButton';
import { IoIosArrowDropleftCircle } from 'react-icons/io';
import { IoIosArrowDroprightCircle } from 'react-icons/io';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { format } from 'date-fns';
import DateBlock from './DateBlock';

const Calendar = () => {
  const [activityData, setActivityData] = useState<string[]>([]);
  const [calendar, setCalendar] = useState<string[][]>([]);
  const [year, setYear] = useState<number>(2024);

  const { data: dates, isSuccess } = useQuery({
    queryKey: ['dates'],
    queryFn: async () => {
      const response = await axios.get('/api/date');
      return response.data;
    },
  });

  useEffect(() => {
    if (isSuccess) {
      const formattedDates = dates.map((date: string) =>
        format(new Date(date), 'yyyy.MM.dd'),
      );
      setActivityData(formattedDates);
    }
  }, [dates, isSuccess]);

  useEffect(() => {
    // 캘린더 생성
    setCalendar(createCalendar(year)); // 예시로 2024년을 사용
  }, [year]);

  // GitHub 활동 데이터를 기반으로 월별 캘린더를 생성하는 함수
  function createCalendar(year: number) {
    const calendar = [];

    for (let month = 0; month < 12; month++) {
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const monthArray = Array.from({ length: daysInMonth }, (_, index) => {
        const day = index + 1;
        const formattedDate = `${year}.${String(month + 1).padStart(
          2,
          '0',
        )}.${String(day).padStart(2, '0')}`;
        return formattedDate;
      });
      calendar.push(monthArray);
    }

    return calendar;
  }

  const handlePrevYear = () => {
    setYear((prev) => prev - 1);
  };

  const handleNextYear = () => {
    setYear((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col rounded-xl bg-neutral-100 p-3">
      <div className="flex items-center justify-center">
        <IconButton
          Icon={IoIosArrowDropleftCircle}
          label="left"
          iconClassName="hover:text-blue-400 transition"
          onClick={handlePrevYear}
        />
        <div className="font-bold">{year}</div>
        <IconButton
          Icon={IoIosArrowDroprightCircle}
          label="left"
          iconClassName="hover:text-blue-400 transition"
          onClick={handleNextYear}
        />
      </div>
      <div className="mt-2 grid grid-cols-12 gap-1">
        {calendar.map((month) =>
          month.map((date) => (
            <DateBlock key={date} date={date} activityData={activityData} />
          )),
        )}
      </div>
    </div>
  );
};

export default Calendar;
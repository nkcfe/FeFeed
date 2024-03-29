import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/style';
import { useTheme } from 'next-themes';
import { LuMoon, LuSun } from 'react-icons/lu';

const ThemeButton = () => {
  const [isOn, setIsOn] = useState(false);
  const { setTheme } = useTheme();

  const toggleSwitch = () => {
    setIsOn(!isOn);
    setTheme(!isOn ? 'dark' : 'light');
  };

  useEffect(() => {
    const isDarkMode = window.localStorage.getItem('theme') === 'dark';
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    }
    setIsOn(isDarkMode);
  }, []);

  return (
    <div
      className={cn(
        'relative flex h-8 w-16 cursor-pointer items-center justify-start rounded-3xl bg-black/40 p-1',
        isOn
          ? 'justify-end bg-gradient-to-r from-purple-500 to-red-700'
          : 'bg-gradient-to-r from-red-200 to-blue-300',
      )}
      onClick={toggleSwitch}
    >
      <motion.div
        className={cn(
          'z-10 size-6 rounded-full',
          isOn ? 'bg-gray-800' : 'bg-white',
        )}
        layout
        transition={spring}
      />
      <LuMoon className="absolute left-2 text-white" />
      <LuSun className="absolute right-2 text-white" />
    </div>
  );
};

const spring = {
  type: 'spring',
  stiffness: 700,
  damping: 30,
};

export default ThemeButton;

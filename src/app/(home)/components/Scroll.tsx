import { motion, useScroll, useSpring } from 'framer-motion';
import React from 'react';

const Scroll = () => {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  return (
    <motion.div
      className="fixed inset-x-0 top-14 z-20 h-2 origin-[0%] bg-neutral-500/40 backdrop-blur-lg dark:bg-neutral-700/80"
      style={{ scaleX }}
    />
  );
};

export default Scroll;

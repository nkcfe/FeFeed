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
    <div className="h-[2rem] w-screen bg-white">
      <motion.div
        className="fixed inset-x-0 top-0 z-20 h-4 origin-[0%] bg-neutral-500/40 backdrop-blur-lg dark:bg-neutral-700/80"
        style={{ scaleX }}
      />
    </div>
  );
};

export default Scroll;

import { motion } from "motion/react";
const Loading = () => {
  return (
    <div className="flex min-h-[100px] items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        <div className="border-primary-main h-10 w-10 rounded-full border-4 border-t-transparent"></div>
      </motion.div>
    </div>
  );
};

export default Loading;

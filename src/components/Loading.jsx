import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="flex min-h-28 items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1 }}
      >
        <div className="h-10 w-10 rounded-full border-4 border-primary-main border-t-transparent"></div>
      </motion.div>
    </div>
  );
};
export default Loading;

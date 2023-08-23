import { motion } from "framer-motion";

const ModalOverlay = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed z-50 "
    >
      <div className="">{children}</div>
    </motion.div>
  );
};

export default ModalOverlay;

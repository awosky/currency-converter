import { motion } from "framer-motion";

const CurrencyPickerNotFound = () => {
  return (
    <motion.div
      key="empty"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="text-center text-zinc-500"
    >
      Mata uang tidak ditemukan
    </motion.div>
  );
};

export default CurrencyPickerNotFound;

import { motion } from "framer-motion";
import CurrencyPickerButton from "./Button";
import type { Currency } from "../../types/currency";

interface CurrencyPickerButtonsProps {
  currencies: Currency[];
  selectedCurrency: string;
  handleClose: (currency: Currency) => void;
}

const CurrencyPickerButtons = ({ currencies, selectedCurrency, handleClose }: CurrencyPickerButtonsProps) => {
  return (
    <motion.div
      key="currency-list"
      className="space-y-1 overflow-y-auto min-h-0 h-full"
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.025,
            delayChildren: 0.03,
          },
        },
      }}
    >
      {[...currencies]
        .sort((a, b) => a.flag.localeCompare(b.flag))
        .map((currency) => (
          <motion.div
            key={currency.code}
            variants={{
              hidden: {
                opacity: 0,
                y: 8,
              },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.25,
                  ease: [0.22, 1, 0.36, 1],
                },
              },
            }}
          >
            <CurrencyPickerButton currency={currency} selectedCurrency={selectedCurrency} handleClose={handleClose} />
          </motion.div>
        ))}
    </motion.div>
  );
};

export default CurrencyPickerButtons;

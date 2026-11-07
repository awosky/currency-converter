import { useState } from "react";
import { type Currency } from "../../types/currency";
import { AnimatePresence, motion } from "framer-motion";
import CurrencyPickerSearch from "./Search";
import CurrencyPickerHeader from "./Header";
import CurrencyPickerButton from "./Button";

interface CurrencyPickerProps {
  isOpen: boolean;
  currencies: Currency[];
  selectedCurrency: string;
  onCurrencySelect: (currencyCode: string) => void;
  onClose: () => void;
}

export const CurrencyPicker = ({
  isOpen,
  currencies,
  selectedCurrency,
  onCurrencySelect,
  onClose,
}: CurrencyPickerProps) => {
  const [filteredCurrencies, setFilteredCurrencies] = useState<Currency[]>(currencies);

  const onChangeSearch = (searchTerm: string) => {
    const filtered = currencies.filter(
      (currency) =>
        currency.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        currency.code.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFilteredCurrencies(filtered);
  };

  const handleClose = (currency: Currency) => {
    setFilteredCurrencies(currencies);
    onCurrencySelect(currency.code);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-0 sm:items-center sm:p-5"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
            className="w-full max-w-md rounded-t-3xl bg-white p-5 shadow-xl sm:rounded-3xl h-[50vh] sm:h-[80vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <CurrencyPickerHeader onClose={onClose} />

            <CurrencyPickerSearch onChangeSearch={onChangeSearch} />

            <motion.div
              className="space-y-1 overflow-y-auto min-h-0"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.025 } },
              }}
            >
              {[...filteredCurrencies]
                .sort((a, b) => a.flag.localeCompare(b.flag))
                .map((currency) => (
                  <CurrencyPickerButton
                    key={currency.code}
                    currency={currency}
                    selectedCurrency={selectedCurrency}
                    handleClose={handleClose}
                  />
                ))}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

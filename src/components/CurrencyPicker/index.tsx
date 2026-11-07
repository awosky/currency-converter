import { useState } from "react";
import { type Currency, type CurrencyType } from "../../types/currency";
import { AnimatePresence, motion } from "framer-motion";
import CurrencyPickerSearch from "./Search";
import CurrencyPickerHeader from "./Header";
import CurrencyPickerNotFound from "./NotFound";
import CurrencyPickerButtons from "./Buttons";

interface CurrencyPickerProps {
  type: CurrencyType;
  isOpen: boolean;
  currencies: Currency[];
  selectedCurrencies: string[];
  onCurrencySelect: (currency: Currency) => void;
  onClose: () => void;
}

export const CurrencyPicker = ({
  type,
  isOpen,
  currencies,
  selectedCurrencies,
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
    onCurrencySelect(currency);
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
            className="w-full max-w-md rounded-t-3xl bg-white p-5 shadow-xl sm:rounded-3xl h-[70vh] sm:h-[80vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <CurrencyPickerHeader type={type} onClose={onClose} />

            <CurrencyPickerSearch onChangeSearch={onChangeSearch} />

            <AnimatePresence mode="wait">
              {filteredCurrencies.length === 0 ? (
                <CurrencyPickerNotFound />
              ) : (
                <CurrencyPickerButtons
                  currencies={filteredCurrencies}
                  selectedCurrencies={selectedCurrencies}
                  handleClose={handleClose}
                />
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

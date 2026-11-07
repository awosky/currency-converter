import { useState } from "react";
import { type Currency } from "../types/currency";
import { FlagImage } from "./FlagImage";
import { AnimatePresence, motion } from "framer-motion";

interface CurrencyPickerProps {
  isOpen: boolean;
  currencies: Currency[];
  selectedCurrency: string;
  onCurrencySelect: (currencyCode: string) => void;
  onClose: () => void;
}

export function CurrencyPicker({
  isOpen,
  currencies,
  selectedCurrency,
  onCurrencySelect,
  onClose,
}: CurrencyPickerProps) {
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
            <div className="mx-auto mb-5 h-1.5 w-10 rounded-full bg-zinc-200 sm:hidden" />
            <div className="mb-5 flex items-center justify-between shrink-0">
              <div>
                <h2 className="text-lg font-bold">Pilih mata uang</h2>
                <p className="mt-1 text-sm text-zinc-500">Pilih mata uang yang mau dipakai</p>
              </div>

              <button
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100 text-zinc-500 shrink-0"
              >
                ×
              </button>
            </div>

            <div>
              <input
                type="text"
                placeholder="Cari mata uang..."
                className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm placeholder:text-zinc-400 focus:border-zinc-300 focus:outline-none focus:ring-1 focus:ring-zinc-300 mt-0 mb-5"
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => onChangeSearch(e.target.value.toLowerCase())}
              />
            </div>

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
                .map((currency) => {
                  const selected = currency.code === selectedCurrency;

                  return (
                    <motion.button
                      key={currency.code}
                      variants={{
                        hidden: { opacity: 0, x: -8 },
                        visible: { opacity: 1, x: 0 },
                      }}
                      onClick={() => handleClose(currency)}
                      className={`flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition ${
                        selected ? "bg-zinc-100" : "hover:bg-zinc-50"
                      }`}
                    >
                      <FlagImage flag={currency.flag} alt={currency.name} className="h-7 w-10" />

                      <div className="flex-1">
                        <p className="font-semibold">{currency.code}</p>

                        <p className="text-sm text-zinc-500">{currency.name}</p>
                      </div>

                      {selected && <span className="font-bold">✓</span>}
                    </motion.button>
                  );
                })}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

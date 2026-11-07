import { useState } from "react";
import { type Currency } from "../types/currency";
import { motion } from "framer-motion";
import { FlagImage } from "./FlagImage";
import { CurrencyPicker } from "./CurrencyPicker";

interface AddCurrencyProps {
  availableCurrencies: Currency[];
  selectedCurrencies: Currency[];
  baseCurrencyCode: string;
  onAddCurrency: (currency: Currency) => void;
  onRemoveCurrency: (currencyCode: string) => void;
}

export function AddCurrency({
  availableCurrencies,
  selectedCurrencies,
  baseCurrencyCode,
  onAddCurrency,
  onRemoveCurrency,
}: AddCurrencyProps) {
  const [isModalOpen, setModalOpen] = useState(false);
  const selectedCodes = new Set(selectedCurrencies.map((c) => c.code));
  const currenciesToAdd = availableCurrencies.filter((c) => !selectedCodes.has(c.code) && c.code !== baseCurrencyCode);
  const sortedSelectedCurrencies = [...selectedCurrencies].sort((a, b) => a.flag.localeCompare(b.flag));

  return (
    <section className="mt-8">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold">Mata uang favorit</h2>
        <span className="text-xs text-zinc-400">{selectedCurrencies.length} pilihan</span>
      </div>

      {selectedCurrencies.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {sortedSelectedCurrencies.map((currency) => (
            <div key={currency.code} className="flex items-center gap-2 rounded-full bg-zinc-100 px-3 py-2">
              <FlagImage flag={currency.flag} alt={currency.name} className="h-5 w-7" />
              <span className="text-sm font-medium">{currency.code}</span>
              {selectedCurrencies.length > 1 && (
                <button
                  onClick={() => onRemoveCurrency(currency.code)}
                  className="ml-1 flex h-5 w-5 items-center justify-center rounded-full text-zinc-500 transition hover:bg-zinc-200"
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      <motion.button
        type="button"
        onClick={() => setModalOpen((prev) => !prev)}
        whileTap={{ scale: 0.985 }}
        className="group flex w-full items-center justify-between rounded-2xl border border-dashed border-zinc-300 bg-zinc-50/70 px-4 py-3.5 text-sm transition-all duration-200 hover:border-zinc-400 hover:bg-zinc-100"
      >
        <span className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-zinc-500 shadow-sm ring-1 ring-zinc-200 transition-all group-hover:text-zinc-900 group-hover:ring-zinc-300">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v14m-7-7h14" />
            </svg>
          </span>

          <span className="flex flex-col items-start gap-0.5">
            <span className="font-medium text-zinc-700 transition-colors group-hover:text-zinc-950">
              Tambah mata uang
            </span>
            <span className="text-xs text-zinc-400">Pilih mata uang lainnya</span>
          </span>
        </span>

        <motion.svg
          animate={{ rotate: isModalOpen ? 180 : 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="h-4 w-4 text-zinc-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 9-7 7-7-7" />
        </motion.svg>
      </motion.button>

      <CurrencyPicker
        key={currenciesToAdd.length}
        type="add"
        isOpen={isModalOpen}
        currencies={currenciesToAdd}
        selectedCurrencies={selectedCurrencies.map((c) => c.code)}
        onCurrencySelect={(currency) => {
          onAddCurrency(currency);
          setModalOpen(false);
        }}
        onClose={() => setModalOpen(false)}
      />
    </section>
  );
}

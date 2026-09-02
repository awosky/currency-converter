import { useState, useRef, useEffect } from "react";
import { type Currency } from "../types/currency";

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
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selectedCodes = new Set(selectedCurrencies.map((c) => c.code));
  const availableToAdd = availableCurrencies.filter((c) => !selectedCodes.has(c.code) && c.code !== baseCurrencyCode);
  const sortedSelectedCurrencies = [...selectedCurrencies].sort((a, b) => a.flag.localeCompare(b.flag));
  const sortedAvailableToAdd = [...availableToAdd].sort((a, b) => a.flag.localeCompare(b.flag));

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
              <span className="text-lg">{currency.flag}</span>
              <span className="text-sm font-medium">{currency.code}</span>
              <button
                onClick={() => onRemoveCurrency(currency.code)}
                className="ml-1 flex h-5 w-5 items-center justify-center rounded-full text-zinc-500 transition hover:bg-zinc-200"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {availableToAdd.length > 0 && (
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-full flex items-center justify-between rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm transition hover:border-zinc-300 hover:bg-zinc-50"
          >
            <span className="text-zinc-600">+ Tambah mata uang</span>
            <svg
              className={`h-5 w-5 text-zinc-400 transition ${dropdownOpen ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>

          {dropdownOpen && (
            <div className="absolute top-full left-0 right-0 z-10 mt-2 rounded-2xl border border-zinc-200 bg-white shadow-lg">
              <div className="max-h-64 overflow-y-auto">
                {sortedAvailableToAdd.map((currency) => (
                  <button
                    key={currency.code}
                    onClick={() => {
                      onAddCurrency(currency);
                      setDropdownOpen(false);
                    }}
                    className="flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-zinc-50 first:rounded-t-2xl last:rounded-b-2xl"
                  >
                    <span className="text-2xl">{currency.flag}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm">{currency.code}</p>
                      <p className="text-xs text-zinc-500 truncate">{currency.name}</p>
                    </div>
                    <span className="text-lg text-zinc-300">+</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

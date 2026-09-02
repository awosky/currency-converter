import { type Currency } from "../types/currency";

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
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-0 sm:items-center sm:p-5"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-t-3xl bg-white p-5 shadow-xl sm:rounded-3xl max-h-[85vh] flex flex-col"
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

        <div className="space-y-1 overflow-y-auto min-h-0">
          {[...currencies]
            .sort((a, b) => a.flag.localeCompare(b.flag))
            .map((currency) => {
              const selected = currency.code === selectedCurrency;

              return (
                <button
                  key={currency.code}
                  onClick={() => {
                    onCurrencySelect(currency.code);
                    onClose();
                  }}
                  className={`flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition ${
                    selected ? "bg-zinc-100" : "hover:bg-zinc-50"
                  }`}
                >
                  <span className="text-3xl">{currency.flag}</span>

                  <div className="flex-1">
                    <p className="font-semibold">{currency.code}</p>

                    <p className="text-sm text-zinc-500">{currency.name}</p>
                  </div>

                  {selected && <span className="font-bold">✓</span>}
                </button>
              );
            })}
        </div>
      </div>
    </div>
  );
}

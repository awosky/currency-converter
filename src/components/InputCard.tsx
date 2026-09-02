import { type Currency } from "../types/currency";

interface InputCardProps {
  amount: string;
  baseCurrency: Currency;
  onAmountChange: (value: string) => void;
  onCurrencyPickerOpen: () => void;
}

export function InputCard({ amount, baseCurrency, onAmountChange, onCurrencyPickerOpen }: InputCardProps) {
  const handleAmountChange = (value: string) => {
    const unformattedValue = value.replace(/,/g, "");

    if (!/^\d*(\.\d*)?$/.test(unformattedValue)) {
      return;
    }

    const [integerPart, decimalPart] = unformattedValue.split(".");
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const formattedValue = decimalPart === undefined ? formattedInteger : `${formattedInteger}.${decimalPart}`;

    onAmountChange(formattedValue);
  };

  return (
    <section className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm">
      <label className="mb-2 block text-sm font-medium text-zinc-500">Jumlah</label>
      <div className="rounded-2xl bg-zinc-100 p-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-zinc-400">{baseCurrency.symbol}</span>

          <input
            type="text"
            inputMode="decimal"
            value={amount}
            onChange={(e) => handleAmountChange(e.target.value)}
            placeholder="0"
            className="min-w-0 flex-1 bg-transparent text-3xl font-bold outline-none placeholder:text-zinc-300"
          />
        </div>

        <button
          onClick={onCurrencyPickerOpen}
          className="mt-4 flex w-full items-center gap-3 rounded-xl bg-white px-3 py-3 text-left transition hover:bg-zinc-50"
        >
          <span className="text-2xl">{baseCurrency.flag}</span>
          <div className="flex-1">
            <p className="font-semibold">{baseCurrency.code}</p>
            <p className="text-xs text-zinc-500">{baseCurrency.name}</p>
          </div>
          <span className="text-lg text-zinc-400">›</span>
        </button>
      </div>
    </section>
  );
}

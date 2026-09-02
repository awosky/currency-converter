import { type Currency } from "../types/currency";
import { formatAmount } from "../utils/format";

interface ConversionResultsProps {
  amount: string;
  baseCurrency: Currency;
  results: Currency[];
  isLoading?: boolean;
}

export function ConversionResults({ amount, baseCurrency, results, isLoading }: ConversionResultsProps) {
  return (
    <section className="mt-8">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold">Hasil konversi</h2>
        <span className="text-xs text-zinc-400">1 {baseCurrency.code} →</span>
      </div>

      <div className="space-y-2">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <p className="text-sm text-zinc-500">Memuat kurs...</p>
          </div>
        ) : (
          [...results]
            .sort((a, b) => a.flag.localeCompare(b.flag))
            .map((currency) => {
              const converted = Number(amount.replace(/,/g, "") || 0) * currency.rate;

              return (
                <div
                  key={currency.code}
                  className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white px-4 py-4"
                >
                  <span className="text-2xl">{currency.flag}</span>

                  <div className="flex-1">
                    <p className="font-semibold">{currency.code}</p>
                    <p className="text-xs text-zinc-500">{currency.name}</p>
                  </div>

                  <div className="text-right">
                    <p className="font-bold">
                      {currency.symbol}
                      {formatAmount(converted, currency)}
                    </p>
                    <p className="text-xs text-zinc-400">
                      1 {baseCurrency.code} = {currency.symbol}
                      {formatAmount(currency.rate, currency)}
                    </p>
                  </div>
                </div>
              );
            })
        )}
      </div>
    </section>
  );
}

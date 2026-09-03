import { useState } from "react";
import { currencies } from "./types/currency";
import { Header } from "./components/Header";
import { InputCard } from "./components/InputCard";
import { ConversionResults } from "./components/ConversionResults";
import { CurrencyPicker } from "./components/CurrencyPicker";
import { Footer } from "./components/Footer";
import { AddCurrency } from "./components/AddCurrency";
import { useFavoriteCurrencies } from "./hooks/useFavoriteCurrencies";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useExchangeRates } from "./hooks/useExchangeRates";

function App() {
  const [amount, setAmount] = useLocalStorage("hitung-kurs-amount", "10,000", (value) =>
    /^\d*(,\d{3})*(\.\d*)?$/.test(value),
  );
  const [baseCurrency, setBaseCurrency] = useLocalStorage("hitung-kurs-base-currency", "IDR", (value) =>
    currencies.some((currency) => currency.code === value),
  );
  const [pickerOpen, setPickerOpen] = useState(false);
  const { favorites, addFavorite, removeFavorite, replaceFavoriteCurrency } = useFavoriteCurrencies();
  const { rates: exchangeRates, loading } = useExchangeRates(baseCurrency);

  const base = currencies.find((currency) => currency.code === baseCurrency)!;

  const results = favorites
    .filter((currency) => currency.code !== baseCurrency)
    .map((currency) => ({
      ...currency,
      rate: exchangeRates[currency.code] || currency.rate,
    }));

  const handleBaseCurrencyChange = (nextBaseCurrency: string) => {
    if (nextBaseCurrency === baseCurrency) {
      return;
    }

    replaceFavoriteCurrency(baseCurrency, nextBaseCurrency);
    setBaseCurrency(nextBaseCurrency);
  };

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col px-5 py-8">
        <Header />

        <InputCard
          amount={amount}
          baseCurrency={base}
          onAmountChange={setAmount}
          onCurrencyPickerOpen={() => setPickerOpen(true)}
        />

        <ConversionResults amount={amount} baseCurrency={base} results={results} isLoading={loading} />

        <AddCurrency
          availableCurrencies={currencies}
          selectedCurrencies={favorites}
          baseCurrencyCode={baseCurrency}
          onAddCurrency={addFavorite}
          onRemoveCurrency={removeFavorite}
        />

        <Footer />
      </div>

      <CurrencyPicker
        isOpen={pickerOpen}
        currencies={currencies}
        selectedCurrency={baseCurrency}
        onCurrencySelect={handleBaseCurrencyChange}
        onClose={() => setPickerOpen(false)}
      />
    </main>
  );
}

export default App;

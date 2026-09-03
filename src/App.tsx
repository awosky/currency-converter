import { useState, useEffect } from "react";
import { currencies } from "./types/currency";
import { Header } from "./components/Header";
import { InputCard } from "./components/InputCard";
import { ConversionResults } from "./components/ConversionResults";
import { CurrencyPicker } from "./components/CurrencyPicker";
import { Footer } from "./components/Footer";
import { AddCurrency } from "./components/AddCurrency";
import { getExchangeRates, type ExchangeRates } from "./services/exchangeRate";
import { useFavoriteCurrencies } from "./hooks/useFavoriteCurrencies";

const BASE_CURRENCY_STORAGE_KEY = "hitung-kurs-base-currency";

const getInitialBaseCurrency = () => {
  try {
    const saved = localStorage.getItem(BASE_CURRENCY_STORAGE_KEY);
    return saved && currencies.some((currency) => currency.code === saved) ? saved : "IDR";
  } catch (error) {
    console.error("Failed to load base currency:", error);
    return "IDR";
  }
};

function App() {
  const [amount, setAmount] = useState("10,000");
  const [baseCurrency, setBaseCurrency] = useState(getInitialBaseCurrency);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({});
  const [loading, setLoading] = useState(false);
  const { favorites, addFavorite, removeFavorite, replaceFavoriteCurrency } = useFavoriteCurrencies();

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

  useEffect(() => {
    localStorage.setItem(BASE_CURRENCY_STORAGE_KEY, baseCurrency);
  }, [baseCurrency]);

  useEffect(() => {
    async function fetchRates() {
      setLoading(true);
      try {
        const rates = await getExchangeRates(baseCurrency);
        setExchangeRates(rates);
      } catch (error) {
        console.error("Failed to fetch rates:", error);
        setExchangeRates({});
      } finally {
        setLoading(false);
      }
    }

    fetchRates();
  }, [baseCurrency]);

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

import { useState, useEffect } from "react";
import { type Currency, currencies } from "../types/currency";

const STORAGE_KEY = "hitung-kurs-favorite-currencies";

const DEFAULT_FAVORITES = ["USD", "AUD", "EUR", "JPY"];

const getDefaultFavorites = () =>
  DEFAULT_FAVORITES.map((code) => currencies.find((currency) => currency.code === code)).filter(
    (currency) => currency !== undefined,
  ) as Currency[];

const getInitialFavorites = (): Currency[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      return getDefaultFavorites();
    }

    const codes = JSON.parse(saved) as string[];
    return codes
      .map((code) => currencies.find((currency) => currency.code === code))
      .filter((currency) => currency !== undefined) as Currency[];
  } catch (error) {
    console.error("Failed to load favorite currencies:", error);
    return getDefaultFavorites();
  }
};

export function useFavoriteCurrencies() {
  const [favorites, setFavorites] = useState<Currency[]>(getInitialFavorites);

  useEffect(() => {
    if (favorites.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites.map((c) => c.code)));
    }
  }, [favorites]);

  const addFavorite = (currency: Currency) => {
    if (!favorites.find((c) => c.code === currency.code)) {
      setFavorites((prev) => [...prev, currency]);
    }
  };

  const removeFavorite = (currencyCode: string) => {
    setFavorites((prev) => prev.filter((c) => c.code !== currencyCode));
  };

  const replaceFavoriteCurrency = (previousCode: string, nextCode: string) => {
    setFavorites((prev) => {
      if (!prev.some((currency) => currency.code === nextCode)) {
        return prev;
      }

      const withoutNextCurrency = prev.filter((currency) => currency.code !== nextCode);

      if (withoutNextCurrency.some((currency) => currency.code === previousCode)) {
        return withoutNextCurrency;
      }

      const previousCurrency = currencies.find((currency) => currency.code === previousCode);
      return previousCurrency ? [...withoutNextCurrency, previousCurrency] : withoutNextCurrency;
    });
  };

  const resetToDefaults = () => {
    setFavorites(getDefaultFavorites());
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    replaceFavoriteCurrency,
    resetToDefaults,
  };
}

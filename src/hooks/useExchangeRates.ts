import { useEffect, useState } from "react";
import { getExchangeRates, type ExchangeRates } from "../services/exchangeRate";

export function useExchangeRates(baseCurrency: string) {
  const [rates, setRates] = useState<ExchangeRates>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function fetchRates() {
      setLoading(true);
      try {
        const nextRates = await getExchangeRates(baseCurrency);
        if (!cancelled) {
          setRates(nextRates);
        }
      } catch (error) {
        console.error("Failed to fetch rates:", error);
        if (!cancelled) {
          setRates({});
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchRates();

    return () => {
      cancelled = true;
    };
  }, [baseCurrency]);

  return { rates, loading };
}

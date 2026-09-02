const API_URL = "https://api.frankfurter.dev/v2";
const CACHE_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours

export type ExchangeRates = Record<string, number>;

interface RateData {
  date: string;
  base: string;
  quote: string;
  rate: number;
}

interface CachedRates {
  rates: ExchangeRates;
  timestamp: number;
}

function getCacheKey(baseCurrency: string): string {
  return `exchange-rates-${baseCurrency}`;
}

function getCachedRates(baseCurrency: string): ExchangeRates | null {
  try {
    const cacheKey = getCacheKey(baseCurrency);
    const cached = localStorage.getItem(cacheKey);

    if (!cached) return null;

    const { rates, timestamp }: CachedRates = JSON.parse(cached);
    const now = Date.now();

    if (now - timestamp < CACHE_DURATION_MS) {
      return rates;
    }

    localStorage.removeItem(cacheKey);
    return null;
  } catch (error) {
    console.error("Error reading from cache:", error);
    return null;
  }
}

function setCachedRates(baseCurrency: string, rates: ExchangeRates): void {
  try {
    const cacheKey = getCacheKey(baseCurrency);
    const cacheData: CachedRates = {
      rates,
      timestamp: Date.now(),
    };
    localStorage.setItem(cacheKey, JSON.stringify(cacheData));
  } catch (error) {
    console.error("Error writing to cache:", error);
  }
}

export async function getExchangeRates(baseCurrency: string): Promise<ExchangeRates> {
  const cachedRates = getCachedRates(baseCurrency);
  if (cachedRates) {
    return cachedRates;
  }

  const response = await fetch(`${API_URL}/rates?base=${baseCurrency}`);

  if (!response.ok) {
    throw new Error("Failed to fetch exchange rates");
  }

  const data = (await response.json()) as RateData[];

  const rates = data.reduce((rates: ExchangeRates, item: RateData) => {
    rates[item.quote] = item.rate;
    return rates;
  }, {});

  setCachedRates(baseCurrency, rates);

  return rates;
}

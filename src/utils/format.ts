import { type Currency } from "../types/currency";

export const formatAmount = (value: number, currency: Currency) => {
  if (currency.code === "IDR") {
    return new Intl.NumberFormat("id-ID", {
      maximumFractionDigits: 0,
    }).format(value);
  }

  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 4,
  }).format(value);
};

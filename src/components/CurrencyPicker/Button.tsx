import type { Currency } from "../../types/currency";
import { FlagImage } from "../FlagImage";
import { motion } from "framer-motion";

interface CurrencyPickerButtonProps {
  currency: Currency;
  selectedCurrencies: string[];
  handleClose: (currency: Currency) => void;
}

const CurrencyPickerButton = ({ currency, selectedCurrencies, handleClose }: CurrencyPickerButtonProps) => {
  const isSelectedCurrency = selectedCurrencies.includes(currency.code);

  return (
    <motion.button
      key={currency.code}
      variants={{
        hidden: { opacity: 0, x: -8 },
        visible: { opacity: 1, x: 0 },
      }}
      onClick={() => handleClose(currency)}
      className={`flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition ${
        isSelectedCurrency ? "bg-zinc-100" : "hover:bg-zinc-50"
      }`}
    >
      <FlagImage flag={currency.flag} alt={currency.name} className="h-7 w-10" />

      <div className="flex-1">
        <p className="font-semibold">{currency.code}</p>

        <p className="text-sm text-zinc-500">{currency.name}</p>
      </div>

      {isSelectedCurrency && <span className="font-bold">✓</span>}
    </motion.button>
  );
};

export default CurrencyPickerButton;

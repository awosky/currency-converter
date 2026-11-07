import type { CurrencyType } from "../../types/currency";

interface CurrencyPickerHeaderProps {
  type: CurrencyType;
  onClose: () => void;
}
const CurrencyPickerHeader = ({ type, onClose }: CurrencyPickerHeaderProps) => {
  return (
    <>
      <div className="mx-auto mb-5 h-1.5 w-10 rounded-full bg-zinc-200 sm:hidden" />
      <div className="mb-5 flex items-center justify-between shrink-0">
        <div>
          <h2 className="text-lg font-bold">{type === "select" ? "Pilih mata uang" : "Tambah mata uang"}</h2>
          <p className="mt-1 text-sm text-zinc-500">
            {type === "select" ? "Pilih mata uang yang mau dipakai" : "Pilih mata uang yang ingin ditambahkan"}
          </p>
        </div>

        <button
          onClick={onClose}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100 text-zinc-500 shrink-0"
        >
          ×
        </button>
      </div>
    </>
  );
};

export default CurrencyPickerHeader;

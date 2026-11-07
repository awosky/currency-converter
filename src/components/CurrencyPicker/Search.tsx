interface CurrencyPickerSearchProps {
  onChangeSearch: (searchTerm: string) => void;
}

const CurrencyPickerSearch = ({ onChangeSearch }: CurrencyPickerSearchProps) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Cari mata uang..."
        className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm placeholder:text-zinc-400 focus:border-zinc-300 focus:outline-none focus:ring-1 focus:ring-zinc-300 mt-0 mb-5"
        onClick={(e) => e.stopPropagation()}
        onChange={(e) => onChangeSearch(e.target.value)}
      />
    </div>
  );
};

export default CurrencyPickerSearch;

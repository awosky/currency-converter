import { useEffect, useState, type SetStateAction } from "react";

export function useLocalStorage<T>(key: string, initialValue: T, validate?: (value: T) => boolean) {
  const [value, setValue] = useState<T>(() => {
    try {
      const saved = localStorage.getItem(key);
      if (saved === null) {
        return initialValue;
      }

      let parsed: T;
      try {
        parsed = JSON.parse(saved) as T;
      } catch {
        parsed = saved as T;
      }

      return !validate || validate(parsed) ? parsed : initialValue;
    } catch (error) {
      console.error(`Failed to load ${key}:`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Failed to save ${key}:`, error);
    }
  }, [key, value]);

  const updateValue = (nextValue: SetStateAction<T>) => {
    setValue(nextValue);
  };

  return [value, updateValue] as const;
}

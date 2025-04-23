import { useState, useEffect } from "react";

const getStorageValue = <T>(key: string, defaultValue: T): T => {
  const saved = localStorage.getItem(key);
  if (saved === null) return defaultValue;
  try {
    return JSON.parse(saved);
  } catch {
    localStorage.removeItem(key);
    return defaultValue;
  }
};

const useLocalStorage = <T>(
  key: string,
  defaultValue: T
): [T, (newValue: T) => void] => {
  const [value, setValue] = useState<T>(() =>
    getStorageValue(key, defaultValue)
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;

export function readStorageValue<T extends string>(
  key: string,
  fallback: T,
  isValidValue: (value: string) => value is T,
): T {
  try {
    const value = localStorage.getItem(key);
    return value && isValidValue(value) ? value : fallback;
  } catch {
    return fallback;
  }
}

export function writeStorageValue(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Storage can be unavailable in private browsing or restricted contexts.
  }
}

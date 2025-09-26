import { useState, useCallback } from 'react';

export interface FilterState {
  [key: string]: unknown;
}

export function useFilters<T extends FilterState>(
  initialState: T
): [T, (key: keyof T, value: T[keyof T]) => void, () => void] {
  const [filters, setFilters] = useState<T>(initialState);

  const updateFilter = useCallback((key: keyof T, value: T[keyof T]) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(initialState);
  }, [initialState]);

  return [filters, updateFilter, resetFilters];
}

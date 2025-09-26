import { useState, useEffect } from 'react';

export interface MockDataGenerator<T> {
  generate: () => T;
  refresh?: () => void;
}

export function useMockData<T>(
  generator: () => T,
  dependencies: React.DependencyList = [],
  autoRefresh = false
): [T, () => void, boolean] {
  const [data, setData] = useState<T>(generator);
  const [loading, setLoading] = useState(false);

  const refresh = () => {
    setLoading(true);
    // Simulate async operation
    setTimeout(() => {
      setData(generator());
      setLoading(false);
    }, autoRefresh ? 1000 : 0);
  };

  useEffect(() => {
    if (autoRefresh) {
      refresh();
    }
  }, dependencies);

  return [data, refresh, loading];
}

export function useAsyncMockData<T>(
  generator: () => Promise<T>,
  dependencies: React.DependencyList = []
): [T | null, () => Promise<void>, boolean, Error | null] {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const refresh = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await generator();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, dependencies);

  return [data, refresh, loading, error];
}

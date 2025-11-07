import { useState, useEffect } from 'react';
import { testBackend } from '@/actions/backend';

export function useTestBackend() {
  const [data, setData] = useState<{ message: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await testBackend();
        setData(result);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, isLoading, error };
}
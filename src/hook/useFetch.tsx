import { useEffect, useState } from "react";

interface FetchState<T> {
  data: T | undefined;
  loading: boolean;
  error: boolean;
}

const useFetch = <T = any>(url: string): FetchState<T> => {
  const [data, setData] = useState<T | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(false);

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response failed');
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(true);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}

export default useFetch;

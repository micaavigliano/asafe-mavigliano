import { Asteroid } from '@/interface/asteroid';
import { useEffect, useState } from 'react';

interface Data {
  near_earth_objects: Asteroid[];
  page: {
    total_elements: number;
    total_pages: number;
    number: number;
  };
}

const useFetch = (url: string, currentPage: number = 0, pageSize: number = 20) => {
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(false);

      try {
        const paginatedUrl = `${url}&page=${currentPage}&size=${pageSize}`;
        const response = await fetch(paginatedUrl);
        if (!response.ok) {
          throw new Error('Network response failed');
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, currentPage, pageSize]);

  return {
    data: data?.near_earth_objects || [],
    loading,
    error,
    totalPages: data?.page.total_pages || 0,
  };
};

export default useFetch;

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

const useFetch = (url: string, initialPage: number = 0, pageSize: number = 20) => {
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(initialPage);

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

  const nextPage = () => {
    if (data && currentPage < data.page.total_pages - 1) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return {
    data: data?.near_earth_objects || [],
    loading,
    error,
    currentPage,
    totalPages: data?.page.total_pages || 0,
    nextPage,
    prevPage,
    setCurrentPage,
  };
};

export default useFetch;

import { useEffect, useState } from "react";

interface Data {
  near_earth_objects: {
    id: string;
    name: string;
    name_limited: string;
  }[];
  url: string;
  explanation: string;
}

const useFetch = (url: string) => {
  const [data, setData] = useState<Data>();
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

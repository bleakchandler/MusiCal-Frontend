import { useState, useEffect } from 'react';

function useCustomFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      setLoading(true);
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();

        if (isMounted) {
          setData(result);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error occurred:', error);
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [url]);

  return { data, loading };
}

export default useCustomFetch;

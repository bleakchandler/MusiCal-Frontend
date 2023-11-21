import { useState, useEffect } from 'react';

function useCustomFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    setLoading(true);
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((result) => {
        if (isMounted) {
          setData(result);
          setLoading(false);
        }
      })
      .catch((error) => {
      });

    return () => {
      isMounted = false;
    };
  }, [url]);

  return { data, loading };
}

export default useCustomFetch;

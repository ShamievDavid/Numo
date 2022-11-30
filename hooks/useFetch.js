import {useState} from 'react';

export function useFetch() {
  const [data, setData] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadData = async url => {
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(url);
      const json = await response.json();

      setData(json);
    } catch (err) {
      const errorMessage = err ? err.message : err;
      setError(errorMessage);
      console.error('There was an error!', err);
    } finally {
      setLoading(false);
    }
  };

  return {loadData, data, loading, error};
}

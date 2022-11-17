import { useState, useEffect } from "react";

export const useFetch = (api, dependencies = []) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const fetchAPI = async () => {
    setLoading(true);
    try {
      const { data: d } = await api();
      setData(d);
      setLoading(false);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAPI();

    return () => {};
  }, dependencies);

  return { loading, error, data };
};

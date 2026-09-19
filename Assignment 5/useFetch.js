import { useState, useEffect, useCallback } from 'react';

/**
 * Custom React Hook: useFetch
 * 
 * @param {string} url - The API URL to fetch data from
 * @returns {object} { data, loading, error, refetch }
 */
const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        if (!url) return;
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Failed to fetch data (${response.status} ${response.statusText})`);
            }
            const result = await response.json();
            setData(result);
        } catch (err) {
            setError(err.message || 'An error occurred during the fetch process.');
        } finally {
            setLoading(false);
        }
    }, [url]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error, refetch: fetchData };
};

export default useFetch;

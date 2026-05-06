import { useState, useEffect } from "react";

export function useEvents(apiUrl) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
        fetchData();
    },[apiUrl])

    const fetchData = () => {
        setLoading(true);
        setError(null);

        fetch(apiUrl)
            .then((res) => {
                if(!res.ok){
                    throw new Error (`HTTP ${res.status}`);
                }
                setTotalCount(res.headers.get("X-Total-Count"));
                return res.json();
            })
            .then((data) => {
                setData(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }

    return {
        data,
        loading,
        error,
        totalCount : Number(totalCount)
    }
}


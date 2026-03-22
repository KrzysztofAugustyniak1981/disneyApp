import { useEffect, useState } from "react";
import { getCharacters } from "../api/disneyApi";

export const useCharacters = (page) => {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await getCharacters(page);
                setCharacters(data.data);
                setTotalPages(data.info.totalPages);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [page]);

    return { characters, loading, error, totalPages };
};
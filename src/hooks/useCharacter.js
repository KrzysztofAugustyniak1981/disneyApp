import { useEffect, useState } from "react";
import { getCharacterById } from "../api/disneyApi";

export const useCharacter = (id) => {
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getCharacterById(id);
        setCharacter(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return { character, loading, error };
};
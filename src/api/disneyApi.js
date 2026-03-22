const Base_URL = "https://api.disneyapi.dev";

export const getCharacters = async (page = 1) => {
    const res = await fetch(`${Base_URL}/character?page=${page}`);

    if (!res.ok) {
        throw new Error("Błąd pobierania danych");
    }

    return res.json();
};

export const getCharacterById = async (id) => {
    const res = await fetch(`${Base_URL}/character/${id}`);

    if (!res.ok) {
        throw new Error("Błąd pobierania postaci");
    }

    return res.json();
};
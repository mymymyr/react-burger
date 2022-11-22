const BURGER_API_URL = 'https://norma.nomoreparties.space/api';

async function getIngredients() {
    const res = await fetch(`${BURGER_API_URL}/ingredients`);
    if (!res.ok) {
        const message = `Произошла ошибка: ${res.status}`;
        throw new Error(message);
    };
    return await res.json();
}

export { getIngredients };
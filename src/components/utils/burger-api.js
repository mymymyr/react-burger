const BURGER_API_URL = 'https://norma.nomoreparties.space/api';

function response(res) {
    if (!res.ok) {
        const message = `Произошла ошибка: ${res.status}`;
        throw new Error(message);
    };
    return res.json();
}

async function getIngredients() {
    const res = await fetch(`${BURGER_API_URL}/ingredients`);
    return await response(res);
}

async function createOrder(idsIngredients) {
    const res = await fetch(`${BURGER_API_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingredients: idsIngredients })
    });
    return await response(res);
}

export { getIngredients, createOrder };
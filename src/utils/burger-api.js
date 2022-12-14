const BURGER_API_URL = 'https://norma.nomoreparties.space/api';

function checkSuccess(res) {
    if (res && res.success) {
      return res;
    } else {
      throw new Error(res.message);
    }
  }

function checkResponse(res) {
    if (!res.ok) {
        const message = `Произошла ошибка: ${res.status}`;
        throw new Error(message);
    };
    return res.json();
}

async function request(url, options) {
    const res = await fetch(url, options);
    const result = await checkResponse(res);
    return checkSuccess(result);
}

function getIngredientsRequest() {
    return request(`${BURGER_API_URL}/ingredients`);
}

function createOrderRequest(idsIngredients) {
    return request(`${BURGER_API_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingredients: idsIngredients })
    });
}

export { getIngredientsRequest, createOrderRequest };

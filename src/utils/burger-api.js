const BURGER_API_URL = 'https://norma.nomoreparties.space/api';

function checkSuccess(res) {
    if (res && res.success) {
        return res;
    } else {
        throw new Error(res.message);
    }
}

async function checkResponse(res) {
    if (!res.ok) {
        const json = await res.json();
        const message = json && json.message ? json.message : "Произошла ошибка: " + res.status;
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

function createOrderRequest(idsIngredients, accessToken) {
    return request(`${BURGER_API_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'authorization': accessToken },
        body: JSON.stringify({ ingredients: idsIngredients })
    });
}

function passwordResetRequest(email) {
    return request(`${BURGER_API_URL}/password-reset`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email })
    });
}

function passwordResetResetRequest(newPassword, code) {
    return request(`${BURGER_API_URL}/password-reset/reset`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: newPassword, token: code })
    });
}

function registerRequest(email, password, name) {
    return request(`${BURGER_API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, password: password, name: name })
    });
}

function loginRequest(email, password) {
    return request(`${BURGER_API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, password: password })
    });
}

function logoutRequest(refreshToken) {
    return request(`${BURGER_API_URL}/auth/logout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: refreshToken })
    });
}

function tokenRequest(refreshToken) {
    return request(`${BURGER_API_URL}/auth/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: refreshToken })
    });
}

function getProfileDataRequest(accessToken) {
    return request(`${BURGER_API_URL}/auth/user`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'authorization': accessToken }
    });
}

function updateProfileDataRequest(accessToken, email, name, password) {
    return request(`${BURGER_API_URL}/auth/user`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'authorization': accessToken },
        body: JSON.stringify({ email: email, password: password, name: name })
    });
}

export { getIngredientsRequest, createOrderRequest, passwordResetRequest, passwordResetResetRequest, registerRequest, loginRequest, logoutRequest, tokenRequest, getProfileDataRequest, updateProfileDataRequest };

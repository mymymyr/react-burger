import { type TIngredient, type TLoginData, type TOrder, type TTokens, type TUser } from '../types';

const BURGER_API_URL = 'https://norma.nomoreparties.space/api';

type TOptions = {
  method: string
  headers: Record<string, string>
  body?: string
}

type TResponseBody<TDataKey extends string = '', TDataType = Record<string, unknown>> = {
  [key in TDataKey]: TDataType
} & {
  success: boolean
  message?: string
  headers?: Headers
};

function checkSuccess<TKey extends string, TType> (res: TResponseBody<TKey, TType>) {
  if (res && res.success) {
    return res;
  } else {
    throw new Error(res.message);
  }
}

async function checkResponse<T> (res: Response): Promise<T> {
  if (!res.ok) {
    const json = await res.json() as TResponseBody;
    const message = json && json.message ? json.message : `Произошла ошибка: ${res.status}`;
    throw new Error(message);
  }
  return await (await res.json() as Promise<T>);
}

async function request<TKey extends string, TType> (url: string, options?: TOptions): Promise<TResponseBody<TKey, TType>> {
  const res = await fetch(url, options);
  const result = await checkResponse<TResponseBody<TKey, TType>>(res);
  return checkSuccess<TKey, TType>(result);
}

async function getIngredientsRequest (): Promise<TResponseBody<'data', readonly TIngredient[]>> {
  return await request(`${BURGER_API_URL}/ingredients`);
}

async function createOrderRequest (idsIngredients: string[], accessToken: string): Promise<TResponseBody<'order', TOrder>> {
  return await request(`${BURGER_API_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', authorization: accessToken },
    body: JSON.stringify({ ingredients: idsIngredients })
  });
}

async function passwordResetRequest (email: string) {
  return await request(`${BURGER_API_URL}/password-reset`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  });
}

async function passwordResetResetRequest (newPassword: string, code: string) {
  return await request(`${BURGER_API_URL}/password-reset/reset`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password: newPassword, token: code })
  });
}

async function registerRequest (email: string, password: string, name: string): Promise<TResponseBody<'data', TLoginData>> {
  return await request(`${BURGER_API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, name })
  });
}

async function loginRequest (email: string, password: string): Promise<TResponseBody<'data', TLoginData>> {
  return await request(`${BURGER_API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
}

async function logoutRequest (refreshToken: string) {
  return await request(`${BURGER_API_URL}/auth/logout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: refreshToken })
  });
}

async function tokenRequest (refreshToken: string): Promise<TResponseBody<'tokens', TTokens>> {
  return await request(`${BURGER_API_URL}/auth/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: refreshToken })
  });
}

async function getProfileDataRequest (accessToken: string): Promise<TResponseBody<'user', TUser>> {
  return await request(`${BURGER_API_URL}/auth/user`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', authorization: accessToken }
  });
}

async function updateProfileDataRequest (accessToken: string, email: string, name: string, password: string): Promise<TResponseBody<'user', TUser>> {
  return await request(`${BURGER_API_URL}/auth/user`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', authorization: accessToken },
    body: JSON.stringify({ email, password, name })
  });
}

export { getIngredientsRequest, createOrderRequest, passwordResetRequest, passwordResetResetRequest, registerRequest, loginRequest, logoutRequest, tokenRequest, getProfileDataRequest, updateProfileDataRequest };

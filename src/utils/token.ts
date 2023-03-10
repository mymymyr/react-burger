import { tokenRequest } from './burger-api';
import { ACCESS_TOKEN, BEARER, REFRESH_TOKEN } from './constants';
import { deleteCookie, getCookie, setCookie } from './cookie';

export async function getAccessToken () {
  let accessToken = getCookie(ACCESS_TOKEN);
  if (accessToken && accessToken.length > 0) {
    return accessToken;
  }
  const refreshToken = getCookie(REFRESH_TOKEN);
  if (!refreshToken) {
    return undefined;
  }
  try {
    const data = await tokenRequest(refreshToken);
    const tokens = data.tokens.accessToken.split(BEARER);
    if (tokens.length !== 2) {
      return undefined;
    }
    accessToken = tokens[1];
    deleteCookie(ACCESS_TOKEN);
    deleteCookie(REFRESH_TOKEN);
    setCookie(ACCESS_TOKEN, accessToken, { expires: 20 * 60 });
    setCookie(REFRESH_TOKEN, data.tokens.refreshToken);
  } catch { }
  return accessToken;
}

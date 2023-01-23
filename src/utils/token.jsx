import { tokenRequest } from "./burger-api";
import { ACCESS_TOKEN, BEARER, REFRESH_TOKEN } from "./constants";
import { getCookie, setCookie } from "./cookie";

export async function getAccessToken() {
    let accessToken = getCookie(ACCESS_TOKEN);
    if (accessToken) {
        return accessToken;
    }
    const refreshToken = getCookie(REFRESH_TOKEN);
    if (!refreshToken) {
        return undefined;
    }
    try {
        const data = await tokenRequest(refreshToken);
        accessToken = data.accessToken.split(BEARER)[1];
        setCookie(ACCESS_TOKEN, accessToken, { expires: 20 * 60 });
        setCookie(REFRESH_TOKEN, data.refreshToken);
    }
    catch { }
    return accessToken;
};

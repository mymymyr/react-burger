import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    WS_CONNECTION_START,
    WS_WITH_TOKEN_CONNECTION_START,
} from "../../redux/action-types";
import { getProfile, signInUserActionFail, userClearSignState } from "../../services/actions/user";
import { getAccessToken } from "../../utils/token";
import { getCookie, deleteCookie } from "../../utils/cookie";
import { ACCESS_TOKEN } from "../../utils/constants";
import { profileRequestClearStateAction } from "../../services/actions/profile";

export function ProvideAuth({ children }) {
    const dispatch = useDispatch();
    const auth = useSelector((store) => store.user.isAuthenticated);
    const { profileRequest, profileRequestFailed } = useSelector((store) => store.profile);
    const { wsConnected, wsConnectedWithToken, wsStartConnecting } = useSelector(
        (store) => store.orders
    );

    useEffect(() => {
        const authStrategy = async () => {
            const accessToken = await getAccessToken();
            if (accessToken) {
                dispatch(getProfile(accessToken));
            } else {
                dispatch(signInUserActionFail());
            }
        };

        if (auth) {
            if (!wsConnectedWithToken) {
                dispatch({ type: WS_WITH_TOKEN_CONNECTION_START });
            }
        } else if (auth === undefined) {
            authStrategy();
        } else if (getCookie(ACCESS_TOKEN) && !profileRequest && profileRequestFailed === true) {
            deleteCookie(ACCESS_TOKEN);
            dispatch(profileRequestClearStateAction());
            dispatch(userClearSignState());
        }

        if (auth !== undefined && !wsConnected && !wsStartConnecting) {
            dispatch({ type: WS_CONNECTION_START });
        }

    }, [auth, dispatch, wsConnected, wsConnectedWithToken]);

    return auth !== undefined && children;
}

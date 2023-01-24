import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, signInUserActionFail } from "../../services/actions/user";
import { getAccessToken } from "../../utils/token";

export function ProvideAuth({ children }) {
    const dispatch = useDispatch();
    const auth = useSelector(store => store.user.isAuthenticated);

    useEffect(() => {
        const authStrategy = async () => {
            if (auth === undefined) {
                const accessToken = await getAccessToken();
                if (accessToken) {
                    dispatch(getProfile(accessToken));
                } else {
                    dispatch(signInUserActionFail());
                }
            }
        };
        authStrategy();
    }, [auth, dispatch]);
    return auth !== undefined && children;
}

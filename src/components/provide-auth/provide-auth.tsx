import { type FC, useEffect, type PropsWithChildren } from 'react';
import { useDispatch, useSelector } from '../../hooks/hooks';
import {
  getProfile,
  signInUserActionFail,
  userClearSignState
} from '../../services/actions/user';
import { getAccessToken } from '../../utils/token';
import { getCookie, deleteCookie } from '../../utils/cookie';
import { ACCESS_TOKEN } from '../../utils/constants';
import { profileRequestClearStateAction } from '../../services/actions/profile';
import { useLocation } from 'react-router-dom';
import { wsClose, wsCloseWithToken, wsConnectionStart, wsWithTokenConnectionStart } from '../../services/actions/ws';

export const ProvideAuth: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useDispatch();
  const pathnameParts = useLocation().pathname.split('/');
  const auth = useSelector((store) => store.user.isAuthenticated);
  const { profileRequest, profileRequestFailed } = useSelector(
    (store) => store.profile
  );
  const {
    wsConnected,
    wsConnectedWithToken,
    wsStartConnecting,
    wsWithTokenStartConnecting
  } = useSelector((store) => store.orders);
  useEffect(() => {
    const authStrategy = async () => {
      const accessToken = await getAccessToken();
      if (accessToken) {
        dispatch(getProfile(accessToken));
      } else {
        dispatch(signInUserActionFail());
      }
    };
    if (auth === undefined && !profileRequest) {
      authStrategy().catch((err: Error) => {
        console.error(`Произошла ошибка: ${err.message}`);
      });
    } else if (
      getCookie(ACCESS_TOKEN) &&
            !profileRequest &&
            profileRequestFailed === true
    ) {
      deleteCookie(ACCESS_TOKEN);
      dispatch(profileRequestClearStateAction());
      dispatch(userClearSignState());
    }
    if (
      pathnameParts.includes('feed') &&
            !wsConnected &&
            !wsStartConnecting
    ) {
      dispatch(wsConnectionStart());
    } else if (!pathnameParts.includes('feed') && wsConnected) {
      dispatch(wsClose());
    }
    if (
      auth &&
            pathnameParts.includes('orders') &&
            !wsConnectedWithToken &&
            !wsWithTokenStartConnecting
    ) {
      dispatch(wsWithTokenConnectionStart());
    } else if (!pathnameParts.includes('orders') && wsConnectedWithToken) {
      dispatch(wsCloseWithToken());
    }
  }, [
    auth,
    dispatch,
    pathnameParts,
    wsConnected,
    wsConnectedWithToken,
    profileRequest,
    profileRequestFailed,
    wsStartConnecting,
    wsWithTokenStartConnecting
  ]);

  return (
    <>
    {children}
    </>
  );
};

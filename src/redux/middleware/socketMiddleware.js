import { ACCESS_TOKEN } from "../../utils/constants";
import { getCookie } from "../../utils/cookie";


export const socketMiddleware = (wsUrl, wsActions, withToken) => {
  return store => {
    let socket = null;

    return next => action => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsInit, wsSendMessage, wsClose, onOpen, onClose, onError, onMessage } = wsActions;
      const token = getCookie(ACCESS_TOKEN);
      if (type === wsInit) {
        if (withToken && token) {
          socket = new WebSocket(`${wsUrl}?token=${getCookie(ACCESS_TOKEN)}`);
        } else if (!withToken) {
          socket = new WebSocket(wsUrl);
        }
      }
      if (socket) {
        socket.onopen = event => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = event => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;
          dispatch({ type: onMessage, payload: restParsedData, token: withToken });
        };

        socket.onclose = event => {
          dispatch({ type: onClose, payload: event });
        };

        if (type === wsSendMessage) {
          const message = { ...payload };
          socket.send(JSON.stringify(message));
        } else if (type === wsClose) {
          socket.close(1000);
        }
      }
      next(action);
    };
  };
};

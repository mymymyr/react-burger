import { type AnyAction } from '@reduxjs/toolkit';
import { type Dispatch } from 'react';
import { type TOrdersFromSocket } from '../../types';
import { ACCESS_TOKEN } from '../../utils/constants';
import { getCookie } from '../../utils/cookie';
import { type TWsActions, wsOnClose, wsOnConnectionSuccess, wsOnError, wsOnMessage } from '../actions';
import { type TSocketActions } from '../store';

export const socketMiddleware = (wsUrl: string, wsActions: TSocketActions, withToken: boolean) => {
  return (store: { dispatch: Dispatch<TWsActions> }) => {
    let socket: WebSocket | null = null;

    return (next: (action: AnyAction) => void) => (action: TWsActions) => {
      const { dispatch } = store;
      const { type } = action;
      const { wsInit, wsSendMessage, wsClose, onOpen, onClose, onError, onMessage } = wsActions;
      const token = getCookie(ACCESS_TOKEN);
      if (type === wsInit) {
        if (withToken && token) {
          socket = new WebSocket(`${wsUrl}?token=${token}`);
        } else if (!withToken) {
          socket = new WebSocket(wsUrl);
        }
      }
      if (socket) {
        socket.onopen = (event: Event) => {
          dispatch(wsOnConnectionSuccess(onOpen, event));
        };

        socket.onerror = (event: Event) => {
          dispatch(wsOnError(onError, event));
        };

        socket.onmessage = (event: MessageEvent<string>) => {
          const { data } = event;
          const parsedData = JSON.parse(data) as TOrdersFromSocket;
          dispatch(wsOnMessage(onMessage, parsedData, withToken));
        };

        socket.onclose = (event: Event) => {
          dispatch(wsOnClose(onClose, event));
        };

        if (type === wsSendMessage) {
          const message = { ...action.payload };
          socket.send(JSON.stringify(message));
        } else if (type === wsClose) {
          socket.close(1000);
        }
      }
      next(action);
    };
  };
};

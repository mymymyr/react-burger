import { compose, createStore, applyMiddleware } from 'redux';
import { rootReducer } from './reducers';
import thunk from 'redux-thunk';
import { socketMiddleware } from '../services/middleware/socketMiddleware';
import {
  WS_CONNECTION_CLOSE,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE,
  WS_WITH_TOKEN_CONNECTION_CLOSE,
  WS_WITH_TOKEN_CONNECTION_CLOSED,
  WS_WITH_TOKEN_CONNECTION_ERROR,
  WS_WITH_TOKEN_CONNECTION_START,
  WS_WITH_TOKEN_CONNECTION_SUCCESS,
  WS_WITH_TOKEN_GET_MESSAGE,
  WS_WITH_TOKEN_SEND_MESSAGE
} from '../services/action-types';

declare global {
  interface Window {  // eslint-disable-line 
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?? compose;

const wsUrl = 'wss://norma.nomoreparties.space/orders/all';
const wsUrlWithToken = 'wss://norma.nomoreparties.space/orders';
export type TSocketActions = {
  wsInit: string
  wsClose: typeof WS_CONNECTION_CLOSE | typeof WS_WITH_TOKEN_CONNECTION_CLOSE
  wsSendMessage: typeof WS_SEND_MESSAGE | typeof WS_WITH_TOKEN_SEND_MESSAGE
  onOpen: typeof WS_CONNECTION_SUCCESS | typeof WS_WITH_TOKEN_CONNECTION_SUCCESS
  onClose: typeof WS_CONNECTION_CLOSED | typeof WS_WITH_TOKEN_CONNECTION_CLOSED
  onError: typeof WS_CONNECTION_ERROR | typeof WS_WITH_TOKEN_CONNECTION_ERROR
  onMessage: typeof WS_GET_MESSAGE | typeof WS_WITH_TOKEN_GET_MESSAGE
}

const wsActions: TSocketActions = {
  wsInit: WS_CONNECTION_START,
  wsClose: WS_CONNECTION_CLOSE,
  wsSendMessage: WS_SEND_MESSAGE,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE
};

const wsActionsWithToken: TSocketActions = {
  wsInit: WS_WITH_TOKEN_CONNECTION_START,
  wsClose: WS_WITH_TOKEN_CONNECTION_CLOSE,
  wsSendMessage: WS_WITH_TOKEN_SEND_MESSAGE,
  onOpen: WS_WITH_TOKEN_CONNECTION_SUCCESS,
  onClose: WS_WITH_TOKEN_CONNECTION_CLOSED,
  onError: WS_WITH_TOKEN_CONNECTION_ERROR,
  onMessage: WS_WITH_TOKEN_GET_MESSAGE
};

const enhancer = composeEnhancers(
  applyMiddleware(thunk),
  applyMiddleware(socketMiddleware(wsUrl, wsActions, false)),
  applyMiddleware(socketMiddleware(wsUrlWithToken, wsActionsWithToken, true))
);

export const store = createStore(rootReducer, enhancer);

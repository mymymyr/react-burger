import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/app.jsx';
import { Provider } from 'react-redux';
import { compose, createStore, applyMiddleware } from 'redux';
import { rootReducer } from './services/reducers';
import thunk from 'redux-thunk';
import { socketMiddleware } from './redux/middleware/socketMiddleware';
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
} from './redux/action-types';

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;



const wsUrl = 'wss://norma.nomoreparties.space/orders/all';
const wsUrlWithToken = 'wss://norma.nomoreparties.space/orders';

const wsActions = {
  wsInit: WS_CONNECTION_START,
  wsClose: WS_CONNECTION_CLOSE,
  wsSendMessage: WS_SEND_MESSAGE,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE
};

const wsActionsWithToken = {
  wsInit: WS_WITH_TOKEN_CONNECTION_START,
  wsClose: WS_WITH_TOKEN_CONNECTION_CLOSE,
  wsSendMessage: WS_WITH_TOKEN_SEND_MESSAGE,
  onOpen: WS_WITH_TOKEN_CONNECTION_SUCCESS,
  onClose: WS_WITH_TOKEN_CONNECTION_CLOSED,
  onError: WS_WITH_TOKEN_CONNECTION_ERROR,
  onMessage: WS_WITH_TOKEN_GET_MESSAGE
};

const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(wsUrl, wsActions, false), socketMiddleware(wsUrlWithToken, wsActionsWithToken, true)));

const store = createStore(rootReducer, enhancer);

const root = ReactDOM.createRoot(
  document.getElementById('root')
);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

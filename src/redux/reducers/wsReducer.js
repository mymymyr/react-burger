import {
  WS_CONNECTION_START,
  WS_WITH_TOKEN_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_WITH_TOKEN_CONNECTION_SUCCESS,
  WS_WITH_TOKEN_CONNECTION_ERROR,
  WS_WITH_TOKEN_GET_MESSAGE,
  WS_WITH_TOKEN_CONNECTION_CLOSED,
  WS_START_HEARTBEAT,
  WS_WITH_TOKEN_START_HEARTBEAT,
  WS_WITH_TOKEN_STOP_HEARTBEAT,
  WS_STOP_HEARTBEAT,
} from "../action-types";

const initialState = {
  wsStartConnecting: false,
  wsWithTokenStartConnecting: false,
  wsConnected: false,
  wsConnectedWithToken: false,
  orders: [],
  profileOrders: [],
  total: null,
  totalToday: null,
  startHeartbeat: false,
  startHeartbeatWithToken: false,
};

export const wsReducer = (state = initialState, action) => {
  switch (action.type) {
    case WS_CONNECTION_START:
      return {
        ...state,
        wsStartConnecting: true,
      };
    case WS_WITH_TOKEN_CONNECTION_START:
      return {
        ...state,
        wsWithTokenStartConnecting: true,
      };
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
        wsStartConnecting: false,
      };
    case WS_WITH_TOKEN_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnectedWithToken: true,
        wsWithTokenStartConnecting: false,
      };
    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
      };
    case WS_WITH_TOKEN_CONNECTION_ERROR:
      return {
        ...state,
        wsConnectedWithToken: false,
      };
    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
      };
    case WS_WITH_TOKEN_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnectedWithToken: false,
      };
    case WS_GET_MESSAGE:
    case WS_WITH_TOKEN_GET_MESSAGE:
      return {
        ...state,
        orders: [
          ...(!action.token ? action.payload.orders : state.orders),
        ],
        profileOrders: [
          ...(action.token
            ? action.payload.orders
            : state.profileOrders),
        ],
        total: !action.token ? action.payload.total : state.total,
        totalToday: !action.token
          ? action.payload.totalToday
          : state.totalToday,
      };
    case WS_START_HEARTBEAT:
      return {
        ...state,
        startHeartbeat: true,
      };
    case WS_WITH_TOKEN_START_HEARTBEAT:
      return {
        ...state,
        startHeartbeatWithToken: true,
      };
      case WS_STOP_HEARTBEAT:
        return {
          ...state,
          startHeartbeat: false,
        };
      case WS_WITH_TOKEN_STOP_HEARTBEAT:
        return {
          ...state,
          startHeartbeatWithToken: false,
        };
    default:
      return state;
  }
};

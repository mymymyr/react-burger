import { type TOrdersFromSocket } from '../../types';
import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE,
  WS_WITH_TOKEN_SEND_MESSAGE,
  WS_START_HEARTBEAT,
  WS_WITH_TOKEN_START_HEARTBEAT,
  WS_CONNECTION_CLOSE,
  WS_WITH_TOKEN_CONNECTION_CLOSE,
  WS_STOP_HEARTBEAT,
  WS_WITH_TOKEN_STOP_HEARTBEAT,
  type WS_WITH_TOKEN_CONNECTION_CLOSED,
  type WS_WITH_TOKEN_GET_MESSAGE,
  type WS_WITH_TOKEN_CONNECTION_ERROR,
  type WS_WITH_TOKEN_CONNECTION_SUCCESS,
  WS_WITH_TOKEN_CONNECTION_START,
  WS_CONNECTION_START
} from '../action-types';

type TWsConnectionSuccess = {
  readonly type: typeof WS_CONNECTION_SUCCESS
}

type TWsConnectionError = {
  readonly type: typeof WS_CONNECTION_ERROR
}

type TWsConnectionClosed = {
  readonly type: typeof WS_CONNECTION_CLOSED
}

type TWsClose = {
  readonly type: typeof WS_CONNECTION_CLOSE
}

type TWsCloseWithToken = {
  readonly type: typeof WS_WITH_TOKEN_CONNECTION_CLOSE
}

type TWsGetMessage = {
  readonly type: typeof WS_GET_MESSAGE
  readonly payload: TOrdersFromSocket
  readonly token?: boolean
}

export type TWsSendMessage = {
  readonly type: typeof WS_SEND_MESSAGE
  readonly payload: { message: string }
}

export type TWsSendMessageWithToken = {
  readonly type: typeof WS_WITH_TOKEN_SEND_MESSAGE
  readonly payload: { message: string }
}

type TWsStartHeartbeat = {
  readonly type: typeof WS_START_HEARTBEAT
}

type TWsStartHeartbeatWithToken = {
  readonly type: typeof WS_WITH_TOKEN_START_HEARTBEAT
}

type TWsStopHeartbeat = {
  readonly type: typeof WS_STOP_HEARTBEAT
}

type TWsStopHeartbeatWithToken = {
  readonly type: typeof WS_WITH_TOKEN_STOP_HEARTBEAT
}

type TWsWithTokenConnectionClosed = {
  readonly type: typeof WS_WITH_TOKEN_CONNECTION_CLOSED
}

type TWsWithTokenGetMessage = {
  readonly type: typeof WS_WITH_TOKEN_GET_MESSAGE
  readonly payload: TOrdersFromSocket
  readonly token: boolean
}

type TWsWithTokenConnectionError = {
  readonly type: typeof WS_WITH_TOKEN_CONNECTION_ERROR
}

type TWsWithTokenConnectionSuccess = {
  readonly type: typeof WS_WITH_TOKEN_CONNECTION_SUCCESS
}

type TWsWithTokenConnectionStart = {
  readonly type: typeof WS_WITH_TOKEN_CONNECTION_START
}

type TWsConnectionStart = {
  readonly type: typeof WS_CONNECTION_START
}

export type TWsActions =
    | TWsConnectionSuccess
    | TWsConnectionError
    | TWsConnectionClosed
    | TWsClose
    | TWsCloseWithToken
    | TWsGetMessage
    | TWsSendMessage
    | TWsSendMessageWithToken
    | TWsStartHeartbeat
    | TWsStartHeartbeatWithToken
    | TWsStopHeartbeat
    | TWsStopHeartbeatWithToken
    | TWsWithTokenConnectionClosed
    | TWsWithTokenGetMessage
    | TWsWithTokenConnectionError
    | TWsWithTokenConnectionSuccess
    | TWsWithTokenConnectionStart
    | TWsConnectionStart

export const wsConnectionSuccess = (): TWsConnectionSuccess => {
  return {
    type: WS_CONNECTION_SUCCESS
  };
};

export const wsConnectionError = (): TWsConnectionError => {
  return {
    type: WS_CONNECTION_ERROR
  };
};

export const wsConnectionClosed = (): TWsConnectionClosed => {
  return {
    type: WS_CONNECTION_CLOSED
  };
};

export const wsClose = (): TWsClose => {
  return {
    type: WS_CONNECTION_CLOSE
  };
};

export const wsCloseWithToken = (): TWsCloseWithToken => {
  return {
    type: WS_WITH_TOKEN_CONNECTION_CLOSE
  };
};

export const wsGetMessage = (message: TOrdersFromSocket): TWsGetMessage => {
  return {
    type: WS_GET_MESSAGE,
    payload: message
  };
};

export const wsSendMessage = (message: { message: string }): TWsSendMessage => {
  return {
    type: WS_SEND_MESSAGE,
    payload: message
  };
};

export const wsSendMessageWithToken = (message: { message: string }): TWsSendMessageWithToken => {
  return {
    type: WS_WITH_TOKEN_SEND_MESSAGE,
    payload: message
  };
};

export const wsStartHeartbeat = (): TWsStartHeartbeat => {
  return {
    type: WS_START_HEARTBEAT
  };
};

export const wsStartHeartbeatWithToken = (): TWsStartHeartbeatWithToken => {
  return {
    type: WS_WITH_TOKEN_START_HEARTBEAT
  };
};

export const wsStopHeartbeat = (): TWsStopHeartbeat => {
  return {
    type: WS_STOP_HEARTBEAT
  };
};

export const wsStopHeartbeatWithToken = (): TWsStopHeartbeatWithToken => {
  return {
    type: WS_WITH_TOKEN_STOP_HEARTBEAT
  };
};

export const wsConnectionStart = (): TWsConnectionStart => {
  return {
    type: WS_CONNECTION_START
  };
};

export const wsWithTokenConnectionStart = (): TWsWithTokenConnectionStart => {
  return {
    type: WS_WITH_TOKEN_CONNECTION_START
  };
};

export const wsOnConnectionSuccess = (type: typeof WS_WITH_TOKEN_CONNECTION_SUCCESS | typeof WS_CONNECTION_SUCCESS, event: Event): TWsWithTokenConnectionSuccess | TWsConnectionSuccess => {
  return {
    type
  };
};

export const wsOnError = (type: typeof WS_WITH_TOKEN_CONNECTION_ERROR | typeof WS_CONNECTION_ERROR, event: Event): TWsWithTokenConnectionError | TWsConnectionError => {
  return {
    type
  };
};

export const wsOnMessage = (type: typeof WS_WITH_TOKEN_GET_MESSAGE | typeof WS_GET_MESSAGE, event: TOrdersFromSocket, withToken: boolean): TWsWithTokenGetMessage | TWsGetMessage => {
  return {
    type,
    payload: event,
    token: withToken
  };
};

export const wsOnClose = (type: typeof WS_WITH_TOKEN_CONNECTION_CLOSED | typeof WS_CONNECTION_CLOSED, event: Event): TWsWithTokenConnectionClosed | TWsConnectionClosed => {
  return {
    type
  };
};

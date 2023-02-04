import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE,
  WS_USER_NAME_UPDATE,
  WS_WITH_TOKEN_SEND_MESSAGE,
  WS_START_HEARTBEAT,
  WS_WITH_TOKEN_START_HEARTBEAT,
  WS_CONNECTION_CLOSE,
  WS_WITH_TOKEN_CONNECTION_CLOSE,
  WS_STOP_HEARTBEAT,
  WS_WITH_TOKEN_STOP_HEARTBEAT,
} from '../action-types';

export const wsConnectionSuccess = () => {
  return {
    type: WS_CONNECTION_SUCCESS
  };
};

export const wsConnectionError = () => {
  return {
    type: WS_CONNECTION_ERROR
  };
};

export const wsConnectionClosed = () => {
  return {
    type: WS_CONNECTION_CLOSED
  };
};

export const wsClose = () => {
  return {
    type: WS_CONNECTION_CLOSE
  };
};

export const wsCloseWithToken = () => {
  return {
    type: WS_WITH_TOKEN_CONNECTION_CLOSE
  };
};


export const wsGetMessage = message => {
  return {
    type: WS_GET_MESSAGE,
    payload: message
  };
};

export const wsSendMessage = message => {
  return {
    type: WS_SEND_MESSAGE,
    payload: message
  };
};

export const wsSendMessageWithToken = message => {
  return {
    type: WS_WITH_TOKEN_SEND_MESSAGE,
    payload: message
  };
};

export const wsUserNameUpdate = userName => {
  return {
    type: WS_USER_NAME_UPDATE,
    payload: userName
  };
};

export const wsStartHeartbeat = () => {
  return {
    type: WS_START_HEARTBEAT
  };
};

export const wsStartHeartbeatWithToken = () => {
  return {
    type: WS_WITH_TOKEN_START_HEARTBEAT
  };
};

export const wsStopHeartbeat = () => {
  return {
    type: WS_STOP_HEARTBEAT
  };
};

export const wsStopHeartbeatWithToken = () => {
  return {
    type: WS_WITH_TOKEN_STOP_HEARTBEAT
  };
};

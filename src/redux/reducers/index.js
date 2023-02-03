import { combineReducers } from 'redux';
import { wsReducer } from './wsReducer';

export const rootReducer = combineReducers({
  profile: wsReducer
});

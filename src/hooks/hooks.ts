import {
  type TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { type AppDispatch, type AppThunk, type RootState } from '../types';

export const useDispatch = () => dispatchHook<AppDispatch | AppThunk>();

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

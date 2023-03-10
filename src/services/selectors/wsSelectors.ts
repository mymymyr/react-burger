import { type RootState } from '../../types';

export const getOrders = (store: RootState) => store.orders.orders ?? [];
export const getProfileOrders = (store: RootState) => store.orders.profileOrders ?? [];

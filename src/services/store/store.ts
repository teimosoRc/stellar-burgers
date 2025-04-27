import { combineReducers, configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from '../slices/ingredientsSlice';
import ordersReducer from '../slices/ordersSlice';
import builderSlice from '../slices/builderSlice';
import feedsSlice from '../slices/feedsSlice';
import userReducer from '../slices/userSlice';

import {
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { ordersMiddleware } from '../middleware/orders';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  orders: ordersReducer,
  builder: builderSlice,
  feeds: feedsSlice,
  user: userReducer
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ordersMiddleware),
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch = dispatchHook.withTypes<AppDispatch>();
export const useSelector = selectorHook.withTypes<RootState>();

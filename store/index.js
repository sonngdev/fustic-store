/* eslint-disable no-underscore-dangle */

import { createStore, applyMiddleware } from 'redux';
import { createWrapper } from 'next-redux-wrapper';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
import reducer from './reducer';

// https://github.com/fazlulkarimweb/with-next-redux-wrapper-redux-persist
const makeStore = ({ isServer }) => {
  if (isServer) return createStore(reducer);

  const persistedReducer = persistReducer({
    key: 'fustic-store',
    storage,
  }, reducer);

  const middlewares = [];
  if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
  }

  return createStore(
    persistedReducer,
    applyMiddleware(...middlewares),
  );
};

export const wrapper = createWrapper(makeStore);

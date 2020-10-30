/* eslint-disable no-underscore-dangle */

import { createStore } from 'redux';
import { createWrapper } from 'next-redux-wrapper';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import reducer from './reducer';

// https://github.com/fazlulkarimweb/with-next-redux-wrapper-redux-persist
const makeStore = ({ isServer }) => {
  if (isServer) return createStore(reducer);

  const persistedReducer = persistReducer({
    key: 'fustic-store',
    storage,
  }, reducer);

  const store = createStore(
    persistedReducer,
  );
  store.__persistor = persistStore(store);

  return store;
};

export const wrapper = createWrapper(makeStore);

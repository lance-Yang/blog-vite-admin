import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import reducer from "./reducer";
import mdApi from "./mdApi";
import loginApi from "./loginApi";

const persistConfig = {
  key: "root",
  storage,
  // 配置持久化存在白名单
  whitelist: ["public"],
};

const sliceReducer = combineReducers({
  [mdApi.reducerPath]: mdApi.reducer,
  [loginApi.reducerPath]: loginApi.reducer,
  ...reducer,
});

const persistedReducer = persistReducer(persistConfig, sliceReducer);

const store = configureStore({
  reducer: persistedReducer,
  // middleware: (middle) => middle().concat([ loginApi.middleware, homeApi.middleware ])
  middleware: (middle) =>
    middle().concat([mdApi.middleware, loginApi.middleware]),
});

const persistor = persistStore(store);

export { store, persistor };


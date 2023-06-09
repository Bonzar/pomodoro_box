import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { reducer } from "./reducer.ts";

const persistConfig = { key: "root", storage };
const persistedReducer = persistReducer(
  persistConfig,
  combineReducers(reducer)
);

export const createStore = () => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });

  if (import.meta.hot) {
    import.meta.hot.accept("./reducer.ts", (mod) => {
      if (!mod) return;

      const nextReducer = combineReducers(mod.reducer as typeof reducer);
      store.replaceReducer(persistReducer(persistConfig, nextReducer));
    });
  }

  const persistor = persistStore(store);

  return { store, persistor };
};

export type RootState = ReturnType<
  ReturnType<typeof createStore>["store"]["getState"]
>;
export type AppDispatch = ReturnType<typeof createStore>["store"]["dispatch"];

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import RootMissionsSlice from "../features/RootMissions/RootMissionsSlice";
import MissionsSlice from "../features/Mission/MissionsSlice";
import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  rootMissions: RootMissionsSlice,
  missions: MissionsSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export { store, persistor };
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

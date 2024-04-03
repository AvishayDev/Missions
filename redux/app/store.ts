import { combineReducers, configureStore } from "@reduxjs/toolkit";
import RootMissionsSlice from "../features/RootMissionsSlice";
import MissionsSlice from "../features/Mission/MissionsSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  rootMissions: RootMissionsSlice,
  missions: MissionsSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

export { store, persistor };
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

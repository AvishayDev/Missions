import { configureStore } from "@reduxjs/toolkit";
import RootMissionsSlice from "../features/RootMissionsSlice";
import MissionsSlice from "../features/Mission/MissionsSlice";

export const store = configureStore({
  reducer: {
    rootMissions: RootMissionsSlice,
    missions: MissionsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

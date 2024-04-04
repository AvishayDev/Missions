import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState, store } from "../../app/store";
import { SLICES_NAMES } from "../../app/Slices.types";

const createGlobalAction = <T, R>(
  sliceName: keyof typeof SLICES_NAMES,
  actionName: string,
  action: (state: RootState, actionPayload: T) => R
) => {
  return createAsyncThunk(
    `${sliceName}/${actionName}`,
    (actionPayload: T, thunkAPI) => {
      const state = store.getState();
      return action(state, actionPayload);
    }
  );
};

export const getMissionsAction = createGlobalAction(
  SLICES_NAMES.rootMissions,
  "getMissionsAction",
  (state, actionPayload: string) => {
    return { missions: state.missions.missions, key: actionPayload };
  }
);

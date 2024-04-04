import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState, store } from "../../app/store";
import { SlicesNames } from "../../app/Slices.types";

const createGlobalAction = <T, R>(
  sliceName: keyof typeof SlicesNames,
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
  SlicesNames.rootMissions,
  "getMissionsAction",
  (state, actionPayload: string) => {
    return { missions: state.missions.missions, key: actionPayload };
  }
);

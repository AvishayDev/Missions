import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootMissionStoreType } from "../../types/Missions.types";
import { RootState } from "../app/store";

type RootMissionsSliceState = Record<string, RootMissionStoreType>;

const initialState: RootMissionsSliceState = {
  "1": {
    key: "1",
    missions: {
      "1": {
        key: "1",
        parent: null,
        title: "111111",
        children: [],
      },
    },
    title: "kukuriku",
  },
  "2": {
    key: "2",
    missions: {
      "2": {
        key: "2",
        parent: null,
        title: "222222",
        children: [],
      },
    },
    title: "kukuriku2",
  },
  "3": {
    key: "3",
    missions: {
      "3": {
        key: "3",
        parent: null,
        title: "3333333",
        children: [],
      },
    },
    title: "kukuriku3",
  },
};

export const RootMissionsSlice = createSlice({
  name: "rootMissions",
  initialState,
  reducers: {
    addRootMission: (state, action: PayloadAction<void>) => {
      const newKey = Object.keys(state).length + 1;
      state[newKey] = {
        key: newKey.toString(),
        missions: {},
        title: `kukuriku${newKey}`,
      };
    },
  },
});

export const { addRootMission } = RootMissionsSlice.actions;

const selectRootMissions = (state: RootState) => state.rootMissions;
export const RootMissionsSelector = createSelector(
  selectRootMissions,
  (rootMissions) => Object.values(rootMissions)
);

export default RootMissionsSlice.reducer;

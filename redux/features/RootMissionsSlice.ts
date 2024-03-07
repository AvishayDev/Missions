import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootMissionStoreType } from "../../types/Missions.types";
import { RootState } from "../app/store";

type RootMissionsSliceState = Record<string, RootMissionStoreType>;

const initialState: RootMissionsSliceState = {
  1: {
    index: 1,
    missions: {
      1: {
        index: 1,
        parent: null,
        title: "111111",
        children: [],
      },
    },
    title: "kukuriku",
  },
  2: {
    index: 2,
    missions: {
      2: {
        index: 2,
        parent: null,
        title: "222222",
        children: [],
      },
    },
    title: "kukuriku2",
  },
  3: {
    index: 3,
    missions: {
      3: {
        index: 3,
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
      const newKey = Object.keys(state).length;
      state[newKey] = {
        index: newKey,
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
  (rootMissions) =>
    Object.entries(rootMissions)
      .map(([key, { index, title }]) => ({ key, index, title }))
      .sort((a, b) => a.index - b.index)
);

export const RootMissionMissionsSelector =
  (key: string) => (state: RootState) =>
    state.rootMissions[key]?.missions;

export default RootMissionsSlice.reducer;

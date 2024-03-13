import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootMissionStoreType } from "../../types/Missions.types";
import { RootState } from "../app/store";
import { ActionSheetIOS } from "react-native";

type RootMissionsSliceState = {
  rootMissions: RootMissionStoreType[];
};

const initialState: RootMissionsSliceState = {
  rootMissions: [
    {
      key: 0,
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
    {
      key: 1,
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
    {
      key: 2,
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
  ],
};

export const RootMissionsSlice = createSlice({
  name: "rootMissions",
  initialState,
  reducers: {
    addRootMission: (state, action: PayloadAction<string>) => {
      state.rootMissions.push({
        key: state.rootMissions.length,
        missions: {},
        title: action.payload,
      });
    },
    removeRootMission: (state, action: PayloadAction<number>) => {
      state.rootMissions = state.rootMissions.filter(
        (rootMission) => rootMission.key !== action.payload
      );
    },
  },
});

export const { addRootMission, removeRootMission } = RootMissionsSlice.actions;

export const RootMissionsSelector = (state: RootState) =>
  state.rootMissions.rootMissions;

export default RootMissionsSlice.reducer;

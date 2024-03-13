import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootMissionStoreType } from "../../types/Missions.types";
import { RootState } from "../app/store";

type RootMissionsSliceState = {
  rootMissions: Record<string, RootMissionStoreType>;
  totalRootMissions: number;
};

const initialState: RootMissionsSliceState = {
  rootMissions: {
    0: {
      key: "0",
      missions: {
        1: {
          open: false,
          index: 0,
          parent: null,
          title: "111111",
          children: ["2"],
        },
        2: {
          open: false,
          index: 1,
          parent: "1",
          title: "222222",
          children: [],
        },
      },
      title: "kukuriku",
    },
    1: {
      key: "1",
      missions: {
        2: {
          open: false,
          index: 0,
          parent: null,
          title: "222222",
          children: [],
        },
      },
      title: "kukuriku2",
    },
    2: {
      key: "2",
      missions: {
        3: {
          open: false,
          index: 0,
          parent: null,
          title: "3333333",
          children: [],
        },
      },
      title: "kukuriku3",
    },
  },
  totalRootMissions: 3,
};

export const RootMissionsSlice = createSlice({
  name: "rootMissions",
  initialState,
  reducers: {
    addRootMission: (state, action: PayloadAction<string>) => {
      const key = state.totalRootMissions.toString();
      state.rootMissions[key] = {
        key,
        missions: {},
        title: action.payload,
      };
      state.totalRootMissions++;
    },
    removeRootMission: (state, action: PayloadAction<string>) => {
      delete state.rootMissions[action.payload];
    },
  },
});

export const { addRootMission, removeRootMission } = RootMissionsSlice.actions;

const selectRootMissions = (state: RootState) =>
  state.rootMissions.rootMissions;
export const RootMissionsSelector = createSelector(
  selectRootMissions,
  (rootMissions) => Object.values(rootMissions)
);

export default RootMissionsSlice.reducer;

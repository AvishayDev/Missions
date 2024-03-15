import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootMissionStoreType } from "../../types/Missions.types";
import { RootState } from "../app/store";

type RootMissionsSliceState = {
  rootMissions: Record<string, RootMissionStoreType>;
};

const initialState: RootMissionsSliceState = {
  rootMissions: {
    0: {
      key: "0",
      missions: {
        1: {
          open: false,
          parent: null,
          text: "111111",
          children: ["2"],
        },
        2: {
          open: false,
          parent: "1",
          text: "222222",
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
          parent: null,
          text: "222222",
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
          parent: null,
          text: "3333333",
          children: [],
        },
      },
      title: "kukuriku3",
    },
  },
};

export const RootMissionsSlice = createSlice({
  name: "rootMissions",
  initialState,
  reducers: {
    addRootMission: (state, action: PayloadAction<string>) => {
      const key = Date.now().toString();
      state.rootMissions[key] = {
        key,
        missions: {},
        title: action.payload,
      };
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

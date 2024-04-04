import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import {
  MissionDefaultValue,
  RootMissionStoreType,
} from "../../../types/Missions.types";
import { RootState } from "../../app/store";
import { setMissions } from "../Mission/MissionsSlice";
import { setMissionsPayload } from "./RootMissionsSlice.types";
import { SlicesNames } from "../../app/Slices.types";
import { getMissionsAction } from "../Global/GlobalActions";

type RootMissionsSliceState = {
  rootMissions: Record<string, RootMissionStoreType>;
};

const initialState: RootMissionsSliceState = {
  rootMissions: {
    0: {
      key: "0",
      missions: {
        root: {
          open: false,
          parent: null,
          text: "",
          children: ["1", "3"],
        },
        1: {
          open: false,
          parent: "root",
          text: "111111",
          children: ["2"],
        },
        2: {
          open: false,
          parent: "1",
          text: "222222",
          children: [],
        },
        3: {
          open: false,
          parent: "root",
          text: "222222",
          children: [],
        },
      },
      title: "kukuriku",
    },
    1: {
      key: "1",
      missions: {
        root: {
          open: false,
          parent: null,
          text: "",
          children: ["2"],
        },
        2: {
          open: false,
          parent: "root",
          text: "222222",
          children: [],
        },
      },
      title: "kukuriku2",
    },
    2: {
      key: "2",
      missions: {
        root: {
          open: false,
          parent: null,
          text: "",
          children: ["3"],
        },
        3: {
          open: false,
          parent: "root",
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
        missions: {
          root: { ...MissionDefaultValue },
        },
        title: action.payload,
      };
    },
    removeRootMission: (state, action: PayloadAction<string>) => {
      delete state.rootMissions[action.payload];
    },
    setRootMissionMissions: (
      state,
      action: PayloadAction<setMissionsPayload>
    ) => {
      state.rootMissions[action.payload.key].missions = action.payload.missions;
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(getMissionsAction.fulfilled, (state, action) => {
  //     const { missions, key } = action.payload;
  //     state.rootMissions[key!].missions = missions;
  //   });
  // },
});

export const { addRootMission, removeRootMission, setRootMissionMissions } =
  RootMissionsSlice.actions;

const selectRootMissions = (state: RootState) =>
  state.rootMissions.rootMissions;
export const RootMissionsSelector = createSelector(
  selectRootMissions,
  (rootMissions) => Object.values(rootMissions)
);

export default RootMissionsSlice.reducer;

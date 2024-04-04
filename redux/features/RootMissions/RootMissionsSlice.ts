import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import {
  MissionDefaultValue,
  RootMissionStoreType,
} from "../../../types/Missions.types";
import { RootState } from "../../app/store";
import { convertToBrother, setMissions } from "../Mission/MissionsSlice";
import { setMissionsPayload } from "./RootMissionsSlice.types";
import { SLICES_NAMES } from "../../app/Slices.types";
import { getMissionsAction } from "../Global/GlobalActions";

type RootMissionsSliceState = {
  rootMissions: Record<string, RootMissionStoreType>;
};

const initialState: RootMissionsSliceState = {
  rootMissions: {},
};

export const RootMissionsSlice = createSlice({
  name: SLICES_NAMES.rootMissions,
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

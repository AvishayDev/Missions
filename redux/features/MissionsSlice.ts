import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { MissionStoreType } from "../../types/Missions.types";
import { RootState } from "../app/store";

type MissionsSliceState = Record<string, MissionStoreType>;

const initialState: MissionsSliceState = {};

export const MissionsSlice = createSlice({
  name: "missions",
  initialState,
  reducers: {
    addMission: (state, action: PayloadAction<string>) => {},
    setMissions: (state, action: PayloadAction<MissionsSliceState>) =>
      action.payload,
    openMissionChildren: (state, action: PayloadAction<string>) => {
      state[action.payload].open = !state[action.payload].open;
    },
    removeMission: (state, action: PayloadAction<string>) => {
      const { parent } = state[action.payload];
      if (parent) {
        state[parent].children = state[parent].children.filter(
          (child) => child !== action.payload
        );
        if (state[parent].children.length === 0) state[parent].open = false;
      }
      delete state[action.payload];
    },
  },
});

export const { addMission, setMissions, openMissionChildren, removeMission } =
  MissionsSlice.actions;

const selectMission = (state: RootState) => state.missions;
export const MissionKeysSelector = createSelector(selectMission, (missions) =>
  Object.keys(missions).filter((key) => !missions[key].parent)
);

export const MissionSelector = (key: string) => (state: RootState) =>
  state.missions[key];
export default MissionsSlice.reducer;

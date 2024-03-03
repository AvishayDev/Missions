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
  },
});

export const { addMission, setMissions } = MissionsSlice.actions;

const selectMission = (state: RootState) => state.missions;
export const MissionsSelector = createSelector(selectMission, (missions) =>
  Object.values(missions)
);

export default MissionsSlice.reducer;

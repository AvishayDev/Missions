import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootMission } from "../../types/Missions.types";
import { RootState } from "../app/store";

type RootMissionsSliceState = Record<string, RootMission>;

const initialState: RootMissionsSliceState = {};

export const RootMissionsSlice = createSlice({
  name: "rootMissions",
  initialState,
  reducers: {
    addRootMission: (state, action: PayloadAction<string>) => {},
  },
});

export const { addRootMission } = RootMissionsSlice.actions;

export const selectRootMissions = (state: RootState) => state.rootMissions;

export default RootMissionsSlice.reducer;

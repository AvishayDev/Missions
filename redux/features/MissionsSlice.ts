import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Mission } from "../../types/Missions.types";
import { RootState } from "../app/store";

type MissionsSliceState = Record<string, Mission>;

const initialState: MissionsSliceState = {};

export const RootMissionsSlice = createSlice({
  name: "missions",
  initialState,
  reducers: {
    addMission: (state, action: PayloadAction<string>) => {},
  },
});

export const { addMission } = RootMissionsSlice.actions;

export const selectMission = (state: RootState) => state.rootMissions;

export default RootMissionsSlice.reducer;

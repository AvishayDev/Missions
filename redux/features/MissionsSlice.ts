import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { MissionStoreType } from "../../types/Missions.types";
import { RootState } from "../app/store";
import {
  AddMissionPayload,
  editMissionTitlePayload,
} from "../../styles/StoreActionTypes/MissionsSlice.styles";

type MissionsSliceState = Record<string, MissionStoreType>;

const initialState: MissionsSliceState = {};

export const MissionsSlice = createSlice({
  name: "missions",
  initialState,
  reducers: {
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
    editMissionTitle: (
      state,
      action: PayloadAction<editMissionTitlePayload>
    ) => {
      const { id, text } = action.payload;
      state[id].text = text;
    },
    addMission: (state, action: PayloadAction<AddMissionPayload>) => {
      const id = Date.now().toString();
      const { sourceId } = action.payload;
      state[id] = {
        text: "",
        children: [],
        open: false,
        parent: state[sourceId].parent,
      };

      if (state[sourceId].parent)
        state[state[sourceId].parent!].children.push(id);
    },
  },
});

export const {
  addMission,
  setMissions,
  openMissionChildren,
  removeMission,
  editMissionTitle,
} = MissionsSlice.actions;

const selectMissions = (state: RootState) => state.missions;
export const MissionKeysSelector = createSelector(selectMissions, (missions) =>
  Object.keys(missions).filter((key) => !missions[key].parent)
);

export const MissionSelector = (key: string) =>
  createSelector(selectMissions, (missions) => missions[key]);
export default MissionsSlice.reducer;

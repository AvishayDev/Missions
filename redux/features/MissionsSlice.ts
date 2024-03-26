import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import {
  MissionDefaultValue,
  MissionStoreType,
} from "../../types/Missions.types";
import { RootState } from "../app/store";
import {
  AddMissionPayload,
  editMissionTitlePayload,
} from "../../styles/StoreActionTypes/MissionsSlice.styles";

type MissionsSliceState = {
  missions: Record<string, MissionStoreType>;
  focusedMission: string | null;
};

const initialState: MissionsSliceState = {
  missions: {},
  focusedMission: null,
};

export const MissionsSlice = createSlice({
  name: "missions",
  initialState,
  reducers: {
    setMissions: (
      state,
      action: PayloadAction<Record<string, MissionStoreType>>
    ) => ({ missions: action.payload, focusedMission: null }),
    setFocusedMission: (state, action: PayloadAction<string | null>) => {
      state.focusedMission = action.payload;
    },
    openMissionChildren: (state, action: PayloadAction<string>) => {
      state.missions[action.payload].open =
        !state.missions[action.payload].open;
    },
    removeMission: (state, action: PayloadAction<string>) => {
      const { parent } = state.missions[action.payload];
      if (!parent) return;

      state.missions[parent].children = state.missions[parent].children.filter(
        (child) => child !== action.payload
      );
      if (state.missions[parent].children.length === 0)
        state.missions[parent].open = false;

      state.missions[action.payload].children.forEach((child) => {
        delete state.missions[child];
      });
      delete state.missions[action.payload];
    },
    editMissionTitle: (
      state,
      action: PayloadAction<editMissionTitlePayload>
    ) => {
      const { id, text } = action.payload;
      state.missions[id].text = text;
    },
    addMission: (state, action: PayloadAction<AddMissionPayload>) => {
      const id = Date.now().toString();
      const { sourceId } = action.payload;
      state.missions[id] = {
        ...MissionDefaultValue,
        parent: state.missions[sourceId].parent,
      };
      const { sourceIndex } = action.payload;
      state.missions[state.missions[sourceId].parent!].children.splice(
        sourceIndex + 1,
        0,
        id
      );
      state.focusedMission = id;
    },
  },
});

export const {
  addMission,
  setFocusedMission,
  setMissions,
  openMissionChildren,
  removeMission,
  editMissionTitle,
} = MissionsSlice.actions;

const selectMissions = (state: RootState) => state.missions;
export const MissionKeysSelector = (state: RootState) =>
  state.missions.missions.root.children;

export const MissionSelector = (key: string) =>
  createSelector(selectMissions, ({ missions }) => missions[key]);

export const focusedMissionSelector = (state: RootState) =>
  state.missions.focusedMission;

export default MissionsSlice.reducer;

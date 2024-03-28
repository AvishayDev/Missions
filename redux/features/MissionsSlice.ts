import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import {
  MissionDefaultValue,
  MissionStoreType,
} from "../../types/Missions.types";
import { RootState } from "../app/store";
import {
  SourceMissionPayload,
  editMissionTitlePayload,
} from "../../styles/StoreActionTypes/MissionsSlice.styles";
import { recursiveDeleteMission } from "../../utils/redux/MissionsSlice.utils";

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
    removeMission: (state, action: PayloadAction<SourceMissionPayload>) => {
      const { parent } = state.missions[action.payload.id];
      if (!parent) return;

      state.missions[parent].children.splice(action.payload.index, 1);
      if (state.missions[parent].children.length === 0)
        state.missions[parent].open = false;

      recursiveDeleteMission(state.missions, action.payload.id);
    },
    editMissionTitle: (
      state,
      action: PayloadAction<editMissionTitlePayload>
    ) => {
      const { id, text } = action.payload;
      state.missions[id].text = text;
    },
    addMission: (state, action: PayloadAction<SourceMissionPayload>) => {
      const id = Date.now().toString();
      const { id: sourceId } = action.payload;
      state.missions[id] = {
        ...MissionDefaultValue,
        parent: state.missions[sourceId].parent,
      };
      const { index: sourceIndex } = action.payload;
      state.missions[state.missions[sourceId].parent!].children.splice(
        sourceIndex + 1,
        0,
        id
      );
      state.focusedMission = id;
    },
    convertToChild: (state, action: PayloadAction<SourceMissionPayload>) => {
      if (action.payload.index === 0) return;

      state.missions[state.missions[action.payload.id].parent!].children.splice(
        action.payload.index,
        1
      );

      state.missions[action.payload.id].parent =
        state.missions[state.missions[action.payload.id].parent!].children[
          action.payload.index - 1
        ];

      state.missions[
        state.missions[state.missions[action.payload.id].parent!].children[
          action.payload.index - 1
        ]
      ].children.push(action.payload.id);
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
  convertToChild,
} = MissionsSlice.actions;

const selectMissions = (state: RootState) => state.missions;
export const MissionKeysSelector = (state: RootState) =>
  state.missions.missions.root.children;

export const MissionSelector = (key: string) =>
  createSelector(selectMissions, ({ missions }) => missions[key]);

export const focusedMissionSelector = (state: RootState) =>
  state.missions.focusedMission;

export default MissionsSlice.reducer;

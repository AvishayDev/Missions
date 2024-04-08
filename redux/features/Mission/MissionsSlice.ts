import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import {
  MissionDefaultValue,
  MissionStoreType,
} from "../../../types/Missions.types";
import { RootState } from "../../app/store";
import {
  SourceMissionPayload,
  editMissionTitlePayload,
} from "./MissionsSlice.types";
import { changeParent, recursiveDeleteMission } from "./MissionsSlice.utils";
import { SLICES_NAMES } from "../../app/Slices.types";

type MissionsSliceState = {
  missions: Record<string, MissionStoreType>;
  focusedMission: string | null;
};

const initialState: MissionsSliceState = {
  missions: {},
  focusedMission: null,
};

export const MissionsSlice = createSlice({
  name: SLICES_NAMES.missions,
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

      state.missions[parent].children = state.missions[parent].children.filter(
        (child) => child !== action.payload.id
      );

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
      const parent = state.missions[sourceId]?.parent || "root";
      state.missions[id] = {
        ...MissionDefaultValue,
        parent,
      };
      const { index: sourceIndex } = action.payload;
      state.missions[parent].children.splice(sourceIndex + 1, 0, id);
      state.focusedMission = id;
    },
    convertToChild: (state, action: PayloadAction<SourceMissionPayload>) => {
      const { id, index } = action.payload;
      const { parent: oldParent } = state.missions[id];
      const newParent = state.missions[oldParent!].children[index - 1];

      changeParent(state.missions, id, newParent, (missions) => {
        missions[newParent!].children.push(id);
      });
      state.missions[newParent!].open = true;
    },
    convertToBrother: (state, action: PayloadAction<SourceMissionPayload>) => {
      const { id, index } = action.payload;
      const { parent: oldParent } = state.missions[id];
      const { parent: newParent } = state.missions[oldParent!];

      changeParent(state.missions, id, newParent!, (missions) => {
        const oldParentIndex = missions[newParent!].children.findIndex(
          (child) => child === oldParent
        );
        const insertIndex =
          missions[oldParent!].children.length &&
          index <= Math.floor(missions[oldParent!].children.length / 2)
            ? oldParentIndex
            : oldParentIndex + 1;

        missions[newParent!].children.splice(insertIndex, 0, id);
      });
      state.missions[newParent!].open = true;
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
  convertToBrother,
} = MissionsSlice.actions;

const selectMissions = (state: RootState) => state.missions;
export const MissionKeysSelector = (state: RootState) =>
  state.missions.missions.root.children;

export const MissionSelector = (key: string) =>
  createSelector(selectMissions, ({ missions }) => missions[key]);

export const focusedMissionSelector = (state: RootState) =>
  state.missions.focusedMission;

export const MissionsSelector = (state: RootState) => state.missions.missions;
export default MissionsSlice.reducer;

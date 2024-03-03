import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootMission } from "../../types/Missions.types"
import { RootState } from "../app/store"


type RootMissionsSliceState = Record<string, RootMission>

const initialState: RootMissionsSliceState = {}

export const RootMissionsSlice = createSlice({
    name: 'rootMissions',
    initialState,
    reducers: {
        addRootMissions: (state, action: PayloadAction<string>) => {
            const id = action.payload
            state[id] = { id , missions: {} }
        }
    }
})

export const { addRootMissions } = RootMissionsSlice.actions

export const selectRootMissions = (state: RootState) => state.rootMissions

export default RootMissionsSlice.reducer
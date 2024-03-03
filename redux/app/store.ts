import { configureStore } from '@reduxjs/toolkit'
import RootMissionsReducer from '../features/RootMissionsSlice'


export const store = configureStore({
    reducer: {
        rootMissions: RootMissionsReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
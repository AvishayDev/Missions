import { AppDispatch, RootState } from "../../app/store";
import { setRootMissionMissions } from "../RootMissions/RootMissionsSlice";

export const setMissionToRootMission =
  (key: string) => (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState();
    dispatch(
      setRootMissionMissions({ key, missions: state.missions.missions })
    );
  };

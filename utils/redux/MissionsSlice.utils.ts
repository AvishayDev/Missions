import { MissionStoreType } from "../../types/Missions.types";

export const recursiveDeleteMission = (
  missions: Record<string, MissionStoreType>,
  id: string
) => {
  missions[id].children.forEach((child) => {
    recursiveDeleteMission(missions, child);
  });
  delete missions[id];
};

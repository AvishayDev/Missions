import { MissionStoreType } from "../../../types/Missions.types";

export const recursiveDeleteMission = (
  missions: Record<string, MissionStoreType>,
  id: string
) => {
  missions[id].children.forEach((child) => {
    recursiveDeleteMission(missions, child);
  });
  delete missions[id];
};

export const changeParent = (
  missions: Record<string, MissionStoreType>,
  id: string,
  newParent: string,
  insertToParent: (
    missions: Record<string, MissionStoreType>,
    id: string,
    newParent: string
  ) => void
) => {
  const { parent: oldParent } = missions[id];
  missions[oldParent!].children = missions[oldParent!].children.filter(
    (child) => child !== id
  );
  missions[id].parent = newParent;
  insertToParent(missions, id, newParent);
};

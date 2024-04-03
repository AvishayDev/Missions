import { MissionStoreType } from "../../../types/Missions.types";

export type setMissionsPayload = {
  key: string;
  missions: Record<string, MissionStoreType>;
};

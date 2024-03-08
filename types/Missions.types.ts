export type RootMissionStoreType = {
  key: number;
  title: string;
  missions: Record<string, MissionStoreType>;
};

export type MissionStoreType = {
  index: number;
  parent: string | null;
  title: string;
  children: string[];
};

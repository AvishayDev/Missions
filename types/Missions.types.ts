export type RootMissionStoreType = {
  key: string;
  title: string;
  missions: Record<string, MissionStoreType>;
};

export type MissionStoreType = {
  key: string;
  parent: string | null;
  title: string;
  children: string[];
};

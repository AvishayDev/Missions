export type RootMissionStoreType = {
  key: string;
  title: string;
  missions: Record<string, MissionStoreType>;
};

export type MissionStoreType = {
  open: boolean;
  index: number;
  parent: string | null;
  title: string;
  children: string[];
};

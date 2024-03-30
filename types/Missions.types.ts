export type RootMissionStoreType = {
  key: string;
  title: string;
  missions: Record<string, MissionStoreType>;
};

export type MissionStoreType = {
  open: boolean;
  parent: string | null;
  text: string;
  children: string[];
};

export const MissionDefaultValue: MissionStoreType = {
  open: true,
  parent: null,
  text: "",
  children: [],
} as const;

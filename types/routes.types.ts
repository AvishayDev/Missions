import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type HomeStackParamsList = {
  Main: undefined;
  Missions: { title: string; key: string };
};

export type HomeStackNavigatorHomeProps = NativeStackScreenProps<
  HomeStackParamsList,
  "Main"
>;
export type HomeStackNavigatorMissionsProps = NativeStackScreenProps<
  HomeStackParamsList,
  "Missions"
>;

export type DrawerParamsList = {
  Home: undefined;
  About: undefined;
};

export type DrawerNavigatorHomeProps = NativeStackScreenProps<
  DrawerParamsList,
  "Home"
>;
export type DrawerNavigatorAboutProps = NativeStackScreenProps<
  DrawerParamsList,
  "About"
>;

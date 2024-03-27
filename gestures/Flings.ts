import { Directions, Gesture } from "react-native-gesture-handler";

export const getFlingGesture = (direction: Directions) =>
  Gesture.Fling().direction(direction);

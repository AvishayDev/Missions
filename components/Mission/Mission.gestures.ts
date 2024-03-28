import { Directions, Gesture } from "react-native-gesture-handler";

interface MissionGesturesProps {
  index: number;
  nestLevel: number;
}

export const useMissionGestures = ({
  index,
  nestLevel,
}: MissionGesturesProps) => {
  const rightFling = Gesture.Fling()
    .enabled(index > 0)
    .direction(Directions.RIGHT)
    .onStart(() => console.log("fling right"));

  const leftFling = Gesture.Fling()
    .enabled(nestLevel > 0)
    .direction(Directions.LEFT)
    .onStart(() => console.log("fling left"));

  return Gesture.Simultaneous(rightFling, leftFling);
};

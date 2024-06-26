import {
  Button,
  FlatList,
  NativeSyntheticEvent,
  Text,
  TextInput,
  TextInputFocusEventData,
  View,
} from "react-native";
import { MissionStoreType } from "../../types/Missions.types";
import { globalStyles } from "../../styles/globals.styles";
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import {
  MissionSelector,
  addMission,
  convertToBrother,
  convertToChild,
  editMissionTitle,
  focusedMissionSelector,
  openMissionChildren,
  removeMission,
  setFocusedMission,
} from "../../redux/features/Mission/MissionsSlice";
import {
  Directions,
  Gesture,
  GestureDetector,
} from "react-native-gesture-handler";
import { runOnJS } from "react-native-reanimated";

interface MissionProps {
  id: string;
  index: number;
  nestLevel: number;
}

const Mission: React.FC<MissionProps> = ({
  id,
  nestLevel,
  index,
}: MissionProps) => {
  const dispatch = useAppDispatch();
  const mission: MissionStoreType = useAppSelector(MissionSelector(id));

  const rightFling = Gesture.Fling()
    .enabled(index > 0)
    .direction(Directions.RIGHT)
    .onStart(runOnJS(() => dispatch(convertToChild({ id, index }))));

  const leftFling = Gesture.Fling()
    .enabled(nestLevel > 0)
    .direction(Directions.LEFT)
    .onStart(runOnJS(() => dispatch(convertToBrother({ id, index }))));

  const gestures = Gesture.Simultaneous(rightFling, leftFling);

  const handleTextInputBlur = () => {
    dispatch(setFocusedMission(null));
    if (mission.text === "") dispatch(removeMission({ id, index }));
  };

  return (
    <View>
      <GestureDetector gesture={gestures}>
        <View style={globalStyles.rowContainer}>
          <View style={{ width: nestLevel * 20 }} />
          <Button
            title="del"
            onPress={() => dispatch(removeMission({ id, index }))}
          />
          <TextInput
            onFocus={() => dispatch(setFocusedMission(id))}
            onBlur={handleTextInputBlur}
            style={globalStyles.flex1}
            value={mission.text}
            onChangeText={(text) => dispatch(editMissionTitle({ id, text }))}
            onSubmitEditing={() => {
              mission.text && dispatch(addMission({ id, index }));
            }}
            autoFocus={!mission.text}
            blurOnSubmit={!mission.text}
          />

          {mission.children.length > 0 && (
            <Button
              title="open"
              onPress={() => dispatch(openMissionChildren(id))}
            />
          )}
        </View>
      </GestureDetector>
      {mission.open && mission.children.length > 0 && (
        <View>
          {mission.children.map((child, childrenIndex) => (
            <Mission
              key={child}
              id={child}
              nestLevel={nestLevel + 1}
              index={childrenIndex}
            />
          ))}
        </View>
      )}
    </View>
  );
};

export default Mission;

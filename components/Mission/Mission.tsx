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
  convertToChild,
  editMissionTitle,
  focusedMissionSelector,
  openMissionChildren,
  removeMission,
  setFocusedMission,
} from "../../redux/features/MissionsSlice";
import {
  Directions,
  Gesture,
  GestureDetector,
} from "react-native-gesture-handler";

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
  const focusedMission = useAppSelector(focusedMissionSelector);

  const rightFling = Gesture.Fling()
    .enabled(index > 0)
    .direction(Directions.RIGHT)
    .onStart(() => {
      console.log("fling right");
    });

  const leftFling = Gesture.Fling()
    .enabled(nestLevel > 0)
    .direction(Directions.LEFT)
    .onStart(() => console.log("fling left"));

  const gestures = Gesture.Simultaneous(rightFling, leftFling);

  const handleTextInputBlur = () => {
    dispatch(setFocusedMission(null));
    if (mission.text === "") dispatch(removeMission({ id, index }));
  };

  return (
    <GestureDetector gesture={gestures}>
      <View>
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
            onSubmitEditing={() => dispatch(addMission({ id, index }))}
            autoFocus={focusedMission === id}
          />
          {mission.children.length > 0 && (
            <Button
              title="open"
              onPress={() => dispatch(openMissionChildren(id))}
            />
          )}
        </View>
        {mission.open && mission.children.length > 0 && (
          <FlatList
            data={mission.children}
            keyExtractor={(item) => item}
            renderItem={({ item, index: childrenIndex }) => (
              <Mission
                id={item}
                nestLevel={nestLevel + 1}
                index={childrenIndex}
              />
            )}
          />
        )}
      </View>
    </GestureDetector>
  );
};

export default Mission;

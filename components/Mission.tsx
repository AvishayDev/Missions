import { Button, FlatList, Text, TextInput, View } from "react-native";
import { MissionStoreType } from "../types/Missions.types";
import { globalStyles } from "../styles/globals.styles";
import { useAppDispatch, useAppSelector } from "../redux/app/hooks";
import {
  MissionSelector,
  addMission,
  editMissionTitle,
  focusedMissionSelector,
  openMissionChildren,
  removeMission,
  setFocusedMission,
} from "../redux/features/MissionsSlice";

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

  const handleTextInputBlur = () => {
    dispatch(setFocusedMission(null));
    if (mission.text === "") dispatch(removeMission(id));
  };
  return (
    <View>
      <View style={globalStyles.rowContainer}>
        <View style={{ width: nestLevel * 20 }} />
        <Button title="del" onPress={() => dispatch(removeMission(id))} />
        <TextInput
          onFocus={() => dispatch(setFocusedMission(id))}
          onBlur={handleTextInputBlur}
          style={globalStyles.flex1}
          value={mission.text}
          onChangeText={(text) => dispatch(editMissionTitle({ id, text }))}
          onSubmitEditing={() =>
            dispatch(addMission({ sourceId: id, sourceIndex: index }))
          }
          autoFocus={focusedMission === id}
        />
        {mission.children.length > 0 && (
          <Button
            title="open"
            onPress={() => dispatch(openMissionChildren(id))}
          />
        )}
      </View>
      {mission.open && (
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
  );
};

export default Mission;

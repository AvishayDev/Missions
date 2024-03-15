import { Button, FlatList, Text, TextInput, View } from "react-native";
import { MissionStoreType } from "../types/Missions.types";
import { globalStyles } from "../styles/globals.styles";
import { useAppDispatch, useAppSelector } from "../redux/app/hooks";
import {
  MissionSelector,
  addMission,
  editMissionTitle,
  openMissionChildren,
  removeMission,
} from "../redux/features/MissionsSlice";
import { useEffect, useState } from "react";

interface MissionProps {
  id: string;
}

const Mission: React.FC<MissionProps> = ({ id }: MissionProps) => {
  const dispatch = useAppDispatch();
  const mission: MissionStoreType = useAppSelector(MissionSelector(id));

  return (
    <View>
      <View style={globalStyles.rowContainer}>
        <Button title="del" onPress={() => dispatch(removeMission(id))} />
        <TextInput
          value={mission.text}
          onChangeText={(text) => dispatch(editMissionTitle({ id, text }))}
          onSubmitEditing={() => dispatch(addMission({ sourceId: id }))}
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
          renderItem={({ item }) => <Mission id={item} />}
        />
      )}
    </View>
  );
};

export default Mission;

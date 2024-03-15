import { Button, Text, View } from "react-native";
import { MissionStoreType } from "../types/Missions.types";
import { globalStyles } from "../styles/globals.styles";
import { useAppDispatch, useAppSelector } from "../redux/app/hooks";
import {
  MissionSelector,
  openMissionChildren,
  removeMission,
} from "../redux/features/MissionsSlice";
import { useEffect } from "react";
import { FlatList } from "react-native-gesture-handler";

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
        <Text>{mission.title}</Text>
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

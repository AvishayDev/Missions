import {
  Text,
  View,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { HomeStackNavigatorMissionsProps } from "../types/routes.types";
import { useAppDispatch, useAppSelector } from "../redux/app/hooks";
import {
  addMission,
  focusedMissionSelector,
  MissionKeysSelector,
} from "../redux/features/MissionsSlice";
import { globalStyles } from "../styles/globals.styles";
import Mission from "../components/Mission";
import { missionsStyles } from "../styles/Missions.styles";

interface MissionsProps extends HomeStackNavigatorMissionsProps {}

const Missions: React.FC<MissionsProps> = ({
  navigation,
  route,
}: MissionsProps) => {
  const dispatch = useAppDispatch();
  const missions = useAppSelector(MissionKeysSelector);
  const focusedMission = useAppSelector(focusedMissionSelector);

  return (
    <View style={globalStyles.flex1}>
      <Text>{route.params.title}</Text>
      <View style={[globalStyles.cardContainer, globalStyles.flex1]}>
        <FlatList
          style={missionsStyles.flatList}
          data={missions}
          keyExtractor={(item) => item}
          renderItem={({ item, index }) => (
            <Mission id={item} nestLevel={0} index={index} />
          )}
        />
        <TouchableWithoutFeedback
          onPress={() =>
            focusedMission
              ? Keyboard.dismiss()
              : dispatch(
                  addMission({
                    sourceId: missions[missions.length - 1],
                    sourceIndex: missions.length - 1,
                  })
                )
          }
        >
          <View style={globalStyles.flex1}></View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

export default Missions;

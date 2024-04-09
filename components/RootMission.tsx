import { Button, Text, TouchableOpacity } from "react-native";
import { HomeStackNavigatorHomeProps } from "../types/routes.types";
import { useAppDispatch, useAppSelector } from "../redux/app/hooks";
import { setMissions } from "../redux/features/Mission/MissionsSlice";
import { ROUTES } from "../constants/routes";
import { RootMissionStoreType } from "../types/Missions.types";
import { globalStyles } from "../styles/globals.styles";
import { removeRootMission } from "../redux/features/RootMissions/RootMissionsSlice";
import { StyleSheet } from "react-native";
import { ROOT_MISSION_HEIGHT } from "../pages/Home/Home.consts";

interface RootMissionProps extends HomeStackNavigatorHomeProps {
  data: RootMissionStoreType;
}

const RootMission: React.FC<RootMissionProps> = ({
  data,
  navigation,
}: RootMissionProps) => {
  const dispatch = useAppDispatch();
  const { title, missions, key } = data;

  const handlePress = () => {
    dispatch(setMissions(missions));
    navigation.navigate(ROUTES.HOME_STACK.Missions, { title, key });
  };

  return (
    <TouchableOpacity
      style={[globalStyles.rowContainer, styles.rootMissionContainer]}
      onPress={handlePress}
    >
      <Button
        title="del"
        onPress={() => dispatch(removeRootMission(data.key))}
      />
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

export default RootMission;

const styles = StyleSheet.create({
  rootMissionContainer: {
    height: ROOT_MISSION_HEIGHT,
  },
});

import { Text, View, FlatList } from "react-native";
import { HomeStackNavigatorMissionsProps } from "../types/routes.types";
import { useAppSelector } from "../redux/app/hooks";
import { MissionKeysSelector } from "../redux/features/MissionsSlice";
import { globalStyles } from "../styles/globals.styles";
import Mission from "../components/Mission";
import { missionsStyles } from "../styles/Missions.styles";

interface MissionsProps extends HomeStackNavigatorMissionsProps {}

const Missions: React.FC<MissionsProps> = ({
  navigation,
  route,
}: MissionsProps) => {
  const missions = useAppSelector(MissionKeysSelector);

  return (
    <View style={missionsStyles.container}>
      <Text>{route.params.title}</Text>
      <View
        style={[globalStyles.cardContainer, missionsStyles.missionContainer]}
      >
        <FlatList
          data={missions}
          keyExtractor={(item) => item}
          renderItem={({ item, index }) => (
            <Mission id={item} nestLevel={0} index={index} />
          )}
        />
      </View>
    </View>
  );
};

export default Missions;

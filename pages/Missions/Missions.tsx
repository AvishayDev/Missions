import {
  Text,
  View,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { HomeStackNavigatorMissionsProps } from "../../types/routes.types";
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import {
  addMission,
  focusedMissionSelector,
  MissionKeysSelector,
} from "../../redux/features/Mission/MissionsSlice";
import { globalStyles } from "../../styles/globals.styles";
import Mission from "../../components/Mission/Mission";
import { missionsStyles } from "./Missions.styles";
import { AntDesign } from "@expo/vector-icons";
import { setMissionToRootMission } from "../../redux/features/Global/GlobalActions";

interface MissionsProps extends HomeStackNavigatorMissionsProps {}

const Missions: React.FC<MissionsProps> = ({
  navigation,
  route,
}: MissionsProps) => {
  const dispatch = useAppDispatch();
  const missions = useAppSelector(MissionKeysSelector);
  const focusedMission = useAppSelector(focusedMissionSelector);

  const handleBackPress = () => {
    dispatch(setMissionToRootMission(route.params.key));
    navigation.goBack();
  };

  return (
    <View style={globalStyles.flex1}>
      <View style={missionsStyles.headerContainer}>
        <AntDesign
          name="left"
          size={30}
          color="black"
          onPress={handleBackPress}
        />
        <Text style={missionsStyles.pageTitle}>{route.params.title}</Text>
      </View>
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
                    id: missions[missions.length - 1],
                    index: missions.length && missions.length - 1,
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

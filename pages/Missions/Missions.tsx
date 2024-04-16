import {
  Text,
  View,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Button,
} from "react-native";
import { HomeStackNavigatorMissionsProps } from "../../types/routes.types";
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import {
  addMission,
  focusedMissionSelector,
  MissionKeysSelector,
} from "../../redux/features/Mission/MissionsSlice";
import Mission from "../../components/Mission/Mission";
import { missionsStyles } from "./Missions.styles";
import { AntDesign } from "@expo/vector-icons";
import { setMissionToRootMission } from "../../redux/features/Global/GlobalActions";
import { ScrollView } from "react-native-gesture-handler";

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
      <KeyboardAvoidingView style={missionsStyles.rootView} behavior="padding">
        <ScrollView>
          <View style={missionsStyles.headerContainer}>
            <AntDesign
              name="left"
              size={30}
              color="black"
              onPress={handleBackPress}
            />
            <Text style={missionsStyles.pageTitle}>{route.params.title}</Text>
          </View>
          <View style={[{ backgroundColor: "blue" }]}>
            <View
              style={{
                position: "relative",
                display: "flex",
                flex: 1,
                flexGrow: 1,
                backgroundColor: "yellow",
                height: "100%",
              }}
            >
              {missions.map((mission, index) => (
                <Mission
                  key={mission}
                  id={mission}
                  nestLevel={0}
                  index={index}
                />
              ))}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default Missions;

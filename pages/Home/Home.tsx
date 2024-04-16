import {
  Button,
  KeyboardAvoidingView,
  Text,
  TextInput,
  View,
} from "react-native";
import { HomeStackNavigatorHomeProps } from "../../types/routes.types";
import { WELCOME_MESSAGES } from "../../constants/messages.consts";
import { getRandomElement } from "../../utils/functions/globalFunctions";
import { homeStyles } from "./Home.styles";
import { useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import RootMission from "../../components/RootMission";
import {
  RootMissionsSelector,
  addRootMission,
} from "../../redux/features/RootMissions/RootMissionsSlice";
import { globalStyles } from "../../styles/globals.styles";
import { ScrollView } from "react-native-gesture-handler";

interface HomeProps extends HomeStackNavigatorHomeProps {}

const Home: React.FC<HomeProps> = ({ navigation, route }: HomeProps) => {
  const welcomeText = useMemo(() => getRandomElement(WELCOME_MESSAGES), []);
  const dispatch = useAppDispatch();
  const rootMissions = useAppSelector(RootMissionsSelector);
  const [newMissionText, setNewMissionText] = useState("");

  const handlePress = () => {
    dispatch(addRootMission(newMissionText));
    setNewMissionText("");
  };

  return (
    <View>
      <Text style={homeStyles.welcomeText}>{welcomeText}</Text>
      <View style={[globalStyles.cardContainer]}>
        <View style={globalStyles.rowContainer}>
          <TextInput
            style={globalStyles.flex1}
            value={newMissionText}
            onChangeText={setNewMissionText}
          />
          <Button
            disabled={!newMissionText}
            title="add"
            onPress={handlePress}
          />
        </View>
        <View>
          {rootMissions.map((rootMission) => (
            <RootMission
              key={rootMission.key}
              data={rootMission}
              navigation={navigation}
              route={route}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

export default Home;

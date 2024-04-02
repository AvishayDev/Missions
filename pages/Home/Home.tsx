import { Button, FlatList, Text, TextInput, View } from "react-native";
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
} from "../../redux/features/RootMissionsSlice";
import { globalStyles } from "../../styles/globals.styles";

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
    <View style={homeStyles.container}>
      <Text style={homeStyles.welcomeText}>{welcomeText}</Text>
      <View
        style={[homeStyles.rootMissionsContainer, globalStyles.cardContainer]}
      >
        <FlatList
          data={rootMissions}
          renderItem={({ item }) => (
            <RootMission data={item} navigation={navigation} route={route} />
          )}
        />
        <View style={globalStyles.rowContainer}>
          <TextInput
            style={[homeStyles.addTextInput, globalStyles.flex1]}
            value={newMissionText}
            onChangeText={setNewMissionText}
          />
          <Button
            disabled={!newMissionText}
            title="add"
            onPress={handlePress}
          />
        </View>
      </View>
    </View>
  );
};

export default Home;

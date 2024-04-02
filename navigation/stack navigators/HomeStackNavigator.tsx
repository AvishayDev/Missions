import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../../pages/Home/Home";
import Missions from "../../pages/Missions/Missions";
import { ROUTES } from "../../constants/routes";
import { HomeStackParamsList } from "../../types/routes.types";

const Stack = createNativeStackNavigator<HomeStackParamsList>();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={ROUTES.HOME_STACK.Main}>
      <Stack.Screen name={ROUTES.HOME_STACK.Main} component={Home} />
      <Stack.Screen
        name={ROUTES.HOME_STACK.Missions}
        component={Missions}
        options={({ route }) => ({
          title: route.params?.title,
        })}
      />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;

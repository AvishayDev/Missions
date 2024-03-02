import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../../pages/Home";
import Missions from "../../pages/Missions";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DrawerNavigatorHomeProps } from "../DrawerNavigator";

type HomeStackParamsList = {
    Main: undefined
    Missions: {title?: string}
}
  
const Stack = createNativeStackNavigator<HomeStackParamsList>()

const HomeStackNavigator = ( {}: DrawerNavigatorHomeProps) => {

    return (
        <Stack.Navigator 
            initialRouteName="Main"
            // screenOptions={({ navigation })=> ({
            //     headerShown:navigation.canGoBack()
            // })}
            >
            <Stack.Screen 
                name='Main' 
                component={Home}
                />
            <Stack.Screen 
                name='Missions' 
                component={Missions} 
                options={({route})=>({
                    title:route.params.title
                })}/>
        </Stack.Navigator>

    )
}

export type HomeStackNavigatorHomeProps = NativeStackScreenProps<HomeStackParamsList,'Main'>
export type HomeStackNavigatorMissionsProps = NativeStackScreenProps<HomeStackParamsList,'Missions'>
export default HomeStackNavigator
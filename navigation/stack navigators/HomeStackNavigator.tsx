import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../../pages/Home";
import Missions from "../../pages/Missions";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type HomeStackParamsList = {
    Home: undefined
    Missions: {title?: string}
}
  
const Stack = createNativeStackNavigator<HomeStackParamsList>()

const HomeStackNavigator = () => {

    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen 
                name='Home' 
                component={Home}/>
            <Stack.Screen 
                name='Missions' 
                component={Missions} 
                options={({route})=>({
                    title:route.params.title
                })}/>
        </Stack.Navigator>

    )
}

export type HomeStackNavigatorHomeProps = NativeStackScreenProps<HomeStackParamsList,'Home'>
export type HomeStackNavigatorMissionsProps = NativeStackScreenProps<HomeStackParamsList,'Missions'>
export default HomeStackNavigator
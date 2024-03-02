import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeStackNavigator from "./stack navigators/HomeStackNavigator";
import About from "../pages/About";
import { NativeStackScreenProps } from "@react-navigation/native-stack";


type DrawerParamsList = {
    Home: undefined
    About: undefined
}


const Drawer = createDrawerNavigator<DrawerParamsList>()


const DrawerNavigator = () => {

    return (
        <Drawer.Navigator>
            <Drawer.Screen 
                name="Home" 
                component={HomeStackNavigator} 
                options={{headerShown:false}}
                />
            <Drawer.Screen 
            name="About" 
            component={About}/>
        </Drawer.Navigator>
    )
}

export type DrawerNavigatorHomeProps = NativeStackScreenProps<DrawerParamsList,'Home'>
export type DrawerNavigatorAboutProps = NativeStackScreenProps<DrawerParamsList,'About'>
export default DrawerNavigator
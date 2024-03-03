import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeStackNavigator from "./stack navigators/HomeStackNavigator";
import About from "../pages/About";
import { DrawerParamsList } from "../types/routes.types";
import { ROUTES } from "../constants/routes";


const Drawer = createDrawerNavigator<DrawerParamsList>()


const DrawerNavigator = () => {

    return (
        <Drawer.Navigator>
            <Drawer.Screen 
                name={ROUTES.DRAWER.Home} 
                component={HomeStackNavigator} 
                options={{headerShown:false}}
                />
            <Drawer.Screen 
            name={ROUTES.DRAWER.About} 
            component={About}/>
        </Drawer.Navigator>
    )
}

export default DrawerNavigator
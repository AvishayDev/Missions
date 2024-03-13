import { NavigationContainer, NavigationContainerProps } from "@react-navigation/native"
import DrawerNavigator from './DrawerNavigator';


type AppNavigatorProps = Omit<NavigationContainerProps,'children'>


const AppNavigator = (props:AppNavigatorProps) => {

    return (
        <NavigationContainer {...props}>
            <DrawerNavigator />
        </NavigationContainer>
  
    )
}

export default AppNavigator
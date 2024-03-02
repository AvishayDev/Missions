import { NavigationContainer } from '@react-navigation/native';
import HomeStackNavigator from './navigation/stack navigators/HomeStackNavigator';


export default function App() {
  return (
    <NavigationContainer>
      <HomeStackNavigator/>
    </NavigationContainer>
  );
}


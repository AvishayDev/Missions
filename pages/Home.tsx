import { Button, Text } from "react-native"
import { HomeStackNavigatorHomeProps } from "../navigation/stack navigators/HomeStackNavigator";



interface HomeProps extends HomeStackNavigatorHomeProps{
    
}

const Home: React.FC<HomeProps> = ({navigation, route}:HomeProps) => {
    return (
        <>
            <Text>Home Page</Text>
            <Button 
                title="koko"
                onPress={() => navigation.navigate('Missions',{})}
            />
        </>
    )
}

export default Home
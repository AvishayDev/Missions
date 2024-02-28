import { CommonActions, useNavigation } from "@react-navigation/native"
import { Button, Text } from "react-native"



interface HomeProps {
    
}

const Home: React.FC<HomeProps> = (props:HomeProps) => {
    const navigation = useNavigation();

    return (
        <>
            <Text>Home Page</Text>
            <Button 
                title="koko"
                onPress={() => navigation.dispatch(CommonActions.navigate({name:'Missions'}))}
            />
        </>
    )
}

export default Home
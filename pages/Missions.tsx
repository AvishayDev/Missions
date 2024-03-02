import { Text } from "react-native"
import { HomeStackNavigatorMissionsProps } from "../navigation/stack navigators/HomeStackNavigator"



interface MissionsProps extends HomeStackNavigatorMissionsProps{

}

const Missions: React.FC<MissionsProps> = ({navigation,route}:MissionsProps) => {
    return (
        <Text>Missions Page</Text>
    )
}

export default Missions
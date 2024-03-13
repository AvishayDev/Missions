import { Text, View, FlatList } from "react-native"
import { HomeStackNavigatorMissionsProps } from "../types/routes.types"
import { useAppSelector } from "../redux/app/hooks"
import { MissionKeysSelector } from "../redux/features/MissionsSlice"
import { globalStyles } from "../styles/globals.styles"
import Mission from "../components/Mission"
import { missionsStyles } from "../styles/Missions.styles"



interface MissionsProps extends HomeStackNavigatorMissionsProps{

}

const Missions: React.FC<MissionsProps> = ({navigation,route}:MissionsProps) => {

    const missions = useAppSelector(MissionKeysSelector)
    return (
        <View>
            <Text>{route.params.title}</Text>
            <View style={[globalStyles.cardContainer, missionsStyles.missionContainer]}>
                <FlatList 
                    data={missions}
                    keyExtractor={item=>item}
                    renderItem={({item})=><Mission id={item}/>}
                />
            </View>

        </View>
    )
}

export default Missions
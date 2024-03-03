import { Text, View, FlatList } from "react-native"
import { HomeStackNavigatorMissionsProps } from "../types/routes.types"
import { useAppSelector } from "../redux/app/hooks"
import { MissionsSelector } from "../redux/features/MissionsSlice"



interface MissionsProps extends HomeStackNavigatorMissionsProps{

}

const Missions: React.FC<MissionsProps> = ({navigation,route}:MissionsProps) => {

    const missions = useAppSelector(MissionsSelector)
    return (
        <View>
            <Text>Missions Page</Text>
            <FlatList 
                data={missions}
                renderItem={({item})=><Text>{item.title}</Text>}
            />

        </View>
    )
}

export default Missions
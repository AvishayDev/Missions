import { Text, TouchableOpacity } from "react-native"
import { RootMissionStoreType } from "../types/Missions.types"
import { HomeStackNavigatorHomeProps } from "../types/routes.types"
import { useAppDispatch } from "../redux/app/hooks"
import { setMissions } from "../redux/features/MissionsSlice"
import { ROUTES } from "../constants/routes"


interface RootMissionProps extends HomeStackNavigatorHomeProps {
    data: RootMissionStoreType
}



const RootMission:React.FC<RootMissionProps> = ({data, navigation}:RootMissionProps) => {

    const dispatch = useAppDispatch()

    const handlePress = () => {
        dispatch(setMissions(data.missions))
        navigation.navigate(ROUTES.HOME_STACK.Missions,{title:data.title})
    }

    return (
        <TouchableOpacity onPress={handlePress}>
            <Text>{data.title}</Text>
        </TouchableOpacity>

    )
}


export default RootMission
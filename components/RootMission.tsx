import { Text, TouchableOpacity } from "react-native"
import { HomeStackNavigatorHomeProps } from "../types/routes.types"
import { useAppDispatch, useAppSelector } from "../redux/app/hooks"
import { setMissions } from "../redux/features/MissionsSlice"
import { ROUTES } from "../constants/routes"
import { RootMissionStoreType } from "../types/Missions.types"


interface RootMissionProps extends HomeStackNavigatorHomeProps {
    data: RootMissionStoreType
}



const RootMission:React.FC<RootMissionProps> = ({data, navigation}:RootMissionProps) => {
    const dispatch = useAppDispatch()
    const { title, missions } = data

    const handlePress = () => {
        dispatch(setMissions(missions))
        navigation.navigate(ROUTES.HOME_STACK.Missions,{title})
    }

    return (
        <TouchableOpacity onPress={handlePress}>
            <Text>{title}</Text>
        </TouchableOpacity>

    )
}


export default RootMission
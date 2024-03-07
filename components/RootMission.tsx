import { Text, TouchableOpacity } from "react-native"
import { HomeStackNavigatorHomeProps } from "../types/routes.types"
import { useAppDispatch, useAppSelector } from "../redux/app/hooks"
import { setMissions } from "../redux/features/MissionsSlice"
import { ROUTES } from "../constants/routes"
import { RootMissionMissionsSelector } from "../redux/features/RootMissionsSlice"


interface RootMissionProps extends HomeStackNavigatorHomeProps {
    key: string
    title: string
}



const RootMission:React.FC<RootMissionProps> = ({key,title, navigation}:RootMissionProps) => {

    const dispatch = useAppDispatch()

    const handlePress = () => {
        const missions = useAppSelector(RootMissionMissionsSelector(key))
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
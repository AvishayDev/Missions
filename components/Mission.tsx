import { Button, Text, View } from "react-native";
import { MissionStoreType } from "../types/Missions.types";
import { globalStyles } from "../styles/globals.styles";
import { useAppSelector } from "../redux/app/hooks";
import { MissionSelector } from "../redux/features/MissionsSlice";


interface MissionProps{
    id: string
}

const Mission:React.FC<MissionProps> = ({id}:MissionProps) => {

    const mission:MissionStoreType = useAppSelector(MissionSelector(id))
    return (
        <View style={globalStyles.rowContainer}>
            <Button title="del" onPress={()=>{}}/>
            <Text>{mission.title}</Text>
            {mission.children.length > 0 && <Button title="open" onPress={()=>{}}/>}
        </View>
    )
}

export default Mission
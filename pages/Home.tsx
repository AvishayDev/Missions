import { Button, FlatList, Text, Touchable, TouchableWithoutFeedback, View } from "react-native"
import { HomeStackNavigatorHomeProps } from "../types/routes.types"
import { WELCOME_MESSAGES } from "../constants/messages.consts"
import { getRandomElement } from "../utils/functions/globalFunctions"
import { homeStyles } from "../styles/Home.styles"
import { useMemo } from "react"
import { useAppSelector } from "../redux/app/hooks"
import { RootMissionStoreType } from "../types/Missions.types"
import { RootMissionsSelector } from "../redux/features/RootMissionsSlice"
import RootMission from "../components/RootMission"



interface HomeProps extends HomeStackNavigatorHomeProps{
    
}

const Home: React.FC<HomeProps> = ({navigation, route}:HomeProps) => {
    const welcomeText = useMemo(()=>getRandomElement(WELCOME_MESSAGES),[])
    const rootMissions:RootMissionStoreType[] = useAppSelector(RootMissionsSelector)
    

    return (
        <View style={homeStyles.container}>
            <Text style={homeStyles.welcomeText}>{welcomeText}</Text>
            <TouchableWithoutFeedback onPress={()=>console.log('koko')}>
                <View style={homeStyles.rootMissionsContainer} >
                    <FlatList
                        data={rootMissions}
                        renderItem={({ item })=><RootMission data={item} navigation={navigation} route={route}/>}
                    />
                </View>
            </TouchableWithoutFeedback>
        </View>
    )
}

export default Home
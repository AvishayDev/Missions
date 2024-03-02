import { Text } from "react-native"
import { DrawerNavigatorAboutProps } from "../navigation/DrawerNavigator"



interface AboutProps extends DrawerNavigatorAboutProps{

}

const About: React.FC<AboutProps> = ({navigation}:AboutProps) => {
    return (
        <Text>About Page</Text>
    )
}

export default About
import { DrawerParamsList, HomeStackParamsList } from "../types/routes.types"


export type RoutesType = {
    DRAWER: Record<keyof DrawerParamsList,keyof DrawerParamsList>
    HOME_STACK: Record<keyof HomeStackParamsList,keyof HomeStackParamsList>
}

export const ROUTES: RoutesType = {
    DRAWER: {
        Home: 'Home',
        About: 'About',
    },
    HOME_STACK: {
        Main: 'Main',
        Missions: 'Missions',
    },
}
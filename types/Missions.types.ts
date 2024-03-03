


export type RootMission = {
    id: string
    missions: Record<string, Mission>
}


export type Mission = {
    id: string
    parent: string | null
    title: string
    children: string[]
}
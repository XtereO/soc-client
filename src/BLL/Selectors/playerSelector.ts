import { AppStateType } from "../store"


export const activeMusicDetailsSelector=(state:AppStateType)=>{
    return state.player.activeMusicDetails
}
export const activeMusicSettingsSelector=(state:AppStateType)=>{
    return state.player.activeMusicSettings
}
export const initSelector=(state:AppStateType)=>{
    return state.player.isInit
}
export const musicsSelector=(state:AppStateType)=>{
    return state.player.musics
}
export const modeSelector=(state:AppStateType)=>{
    return state.player.mode
}
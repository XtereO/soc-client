import { AppStateType } from "../store";



export const musicsSelector=(state:AppStateType)=>{
    return state.music.musics
}
export const initSelector=(state:AppStateType)=>{
    return state.music.isInit
}
export const messageSelector=(state:AppStateType)=>{
    return state.music.message
}
export const countSelector=(state:AppStateType)=>{
    return state.music.count
}
export const filtersSelector=(state:AppStateType)=>{
    return state.music.filters
}
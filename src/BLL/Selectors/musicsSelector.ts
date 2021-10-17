import { AppStateType } from "../store";



export const musicsSelector=(state:AppStateType)=>{
    return state.musics.musics
}
export const initSelector=(state:AppStateType)=>{
    return state.musics.isInit
}
export const messageSelector=(state:AppStateType)=>{
    return state.musics.message
}
export const countSelector=(state:AppStateType)=>{
    return state.musics.count
}
export const filtersSelector=(state:AppStateType)=>{
    return state.musics.filters
}

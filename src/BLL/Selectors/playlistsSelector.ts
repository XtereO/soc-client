
import { AppStateType } from "../store";



export const playlistsSelector=(state:AppStateType)=>{
    return state.playlists.playlists
}
export const countSelector=(state:AppStateType)=>{
    return state.playlists.count
}
export const initSelector=(state:AppStateType)=>{
    return state.playlists.isInit
}
export const messageSelector=(state:AppStateType)=>{
    return state.playlists.message
}
export const filtersSelector=(state:AppStateType)=>{
    return state.playlists.filters
}
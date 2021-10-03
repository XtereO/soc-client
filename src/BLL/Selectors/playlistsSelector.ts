
import { stat } from "fs";
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
export const musicsSelector=(state:AppStateType)=>{
    return state.playlists.musics
}
export const filtersForSearchMusics=(state:AppStateType)=>{
    return state.playlists.filtersForSearchMusics
}
export const countMusic=(state:AppStateType)=>{
    return state.playlists.countMusic
}
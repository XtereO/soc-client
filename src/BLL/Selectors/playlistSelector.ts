import { AppStateType } from "../store";


export const initSelector=(state:AppStateType)=>{
    return state.playlist.isInit
}
export const messageSelector=(state:AppStateType)=>{
    return state.playlist.message
}
export const playlistSelector=(state:AppStateType)=>{
    return state.playlist.playlist
}
export const filtersForSearchMusics=(state:AppStateType)=>{
    return state.playlist.filtersForSearchMusics
}
export const countMusicsSelector=(state:AppStateType)=>{
    return state.playlist.countMusics
}
export const musicsSelector=(state:AppStateType)=>{
    return state.playlist.musics
}
export const countReviewsSelector=(state:AppStateType)=>{
    return state.playlist.countReviews
}
export const pageReviewsSelector=(state:AppStateType)=>{
    return state.playlist.pageReviews
}
export const reviewsSelector=(state:AppStateType)=>{
    return state.playlist.reviews
}

import { AppStateType } from "../store"



export const initSelector=(state:AppStateType)=>{
    return state.music.isInit
}
export const messageSelector=(state:AppStateType)=>{
    return state.music.message
}
export const countReviewsSelector=(state:AppStateType)=>{
    return state.music.count
}
export const pageReviewsSelector=(state:AppStateType)=>{
    return state.music.page
}
export const reviewsSelector=(state:AppStateType)=>{
    return state.music.reviews
}
export const musicSelector=(state:AppStateType)=>{
    return state.music.music
}
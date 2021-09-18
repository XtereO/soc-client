
import { AppStateType } from "../store";


export const followersSelector=(state:AppStateType)=>{
    return state.followers.followers
}
export const countSelector=(state:AppStateType)=>{
    return state.followers.count
}
export const pageSelector=(state:AppStateType)=>{
    return state.followers.page
}
export const initSelector=(state:AppStateType)=>{
    return state.followers.isInit
}
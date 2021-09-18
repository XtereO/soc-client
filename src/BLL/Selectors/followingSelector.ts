
import { AppStateType } from "../store";


export const followingSelector=(state:AppStateType)=>{
    return state.following.following
}
export const countSelector=(state:AppStateType)=>{
    return state.following.count
}
export const pageSelector=(state:AppStateType)=>{
    return state.following.page
}
export const initSelector=(state:AppStateType)=>{
    return state.following.isInit
}
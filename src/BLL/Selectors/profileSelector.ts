import { AppStateType } from "../store";



export const profileSelector = (state:AppStateType)=>{
    return state.profile.profile
}
export const initSelectore = (state:AppStateType)=>{
    return state.profile.isInit
}
export const reviewsSelector = (state:AppStateType)=>{
    return state.profile.reviews
}
export const countSelector = (state:AppStateType)=>{
    return state.profile.count
}
export const pageSelector = (state:AppStateType)=>{
    return state.profile.page
}

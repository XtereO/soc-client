
import { AppStateType } from "../store";


export const peopleSelector=(state:AppStateType)=>{
    return state.people.people
}
export const countSelector=(state:AppStateType)=>{
    return state.people.count
}
export const pageSelector=(state:AppStateType)=>{
    return state.people.page
}
export const initSelector=(state:AppStateType)=>{
    return state.people.isInit
}
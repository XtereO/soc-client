import { AppStateType } from "../store";


export const authSelector=(state:AppStateType)=>{
    return state.auth.isAuth
}
export const messageSelector=(state:AppStateType)=>{
    return state.auth.message
}
export const codeSelector=(state:AppStateType)=>{
    return state.auth.code
}
export const initSelector=(state:AppStateType)=>{
    return state.auth.isInit
}
export const isShowToastSelector=(state:AppStateType)=>{
    return state.auth.isShowToast
}
export const toastMessageSelector=(state:AppStateType)=>{
    return state.auth.toastMessage
}
import { LoginRequestType, RegistrateRequestType, ShowToastType } from "../../Types/auth"


export const REGISRATE:'authReducer/REGISTRATE'='authReducer/REGISTRATE'
export const LOGIN:'authReducer/LOGIN'='authReducer/LOGIN'
export const CONFIRM_CODE:'authReducer/CONFIRM_CODE'='authReducer/CONFIRM_CODE'
const SET_SHOW_TOAST:'authReducer/SET_SHOW_REDUCER'='authReducer/SET_SHOW_REDUCER'
const SET_AUTH:'authReducer/SET_AUTH'='authReducer/SET_AUTH'
const SET_LOCAL_STORAGE:'authReducer/SET_LOCAL_STORAGE'='authReducer/SET_LOCAL_STORAGE'
const SET_CODE:'authReducer/SET_CODE'='authReducer/SET_CODE'
const SET_MESSAGE:'authReducer/SET_ERROR_MESSAGE'='authReducer/SET_ERROR_MESSAGE'
const SET_INIT:'authReducer/SET_INIT'='authReducer/SET_INIT'

const initialState = {
    isAuth: false as boolean,
    code: null as null | number,
    message: null as null | string,
    isInit: false as boolean,
    isShowToast: false as boolean,
    toastMessage: null as string | null
}

type InitialStateType = typeof initialState
type ActionType = (SetAuthType | SetLocalStorageType 
    | SetShowToastType 
    | SetCodeType | SetMessageType | SetInitType)

export const authReducer=(state=initialState, action:ActionType ):InitialStateType=>{
    switch(action.type){
        case SET_SHOW_TOAST:
            return{
                ...state,
                isShowToast: action.isShowToast,
                toastMessage: action.message
            }
        case SET_INIT:
            return{...state, isInit: action.isInit }
        case SET_MESSAGE:
            return{...state, message: action.message}
        case SET_CODE:
            const code = Math.ceil(100+(Math.random()*899))
            return{...state,code}
        case SET_LOCAL_STORAGE:
            localStorage.setItem('tokenStart',String(Math.round(Date.now()/1000)))
            localStorage.setItem('token',action.token ? action.token : '')
            return {...state}
        case SET_AUTH:
            return {...state, isAuth: action.auth}
        default: return state
    }
}


type SetShowToastType={
    type: typeof SET_SHOW_TOAST
    message: string | null
    isShowToast: boolean
    callback?:()=>void
}
export const setShowToast=(isShowToast:boolean,message: string | null=null,callback?:()=>void)=>{
    return{
        type: SET_SHOW_TOAST,
        message,
        isShowToast,
        callback
    }
}

type SetInitType={
    type: typeof SET_INIT,
    isInit: boolean
}
export const setInit=(isInit:boolean):SetInitType=>{
    return{
        type: SET_INIT,
        isInit
    }
}

type SetMessageType={
    type: typeof SET_MESSAGE
    message: string | null
}
export const setMessage=(message:(string | null)):SetMessageType=>{
    return{
        type: SET_MESSAGE,
        message
    }
}

export type ConfirmCodeType={
    type: typeof CONFIRM_CODE
    getter: string
    textMessage: string
}
export const confirmCode=(getter: string, textMessage: string):ConfirmCodeType=>{
    return{
        type: CONFIRM_CODE,
        getter, textMessage
    }
}

type SetCodeType={
    type: typeof SET_CODE
}
export const setCode=():SetCodeType=>{
    return{
        type: SET_CODE
    }
}

type SetLocalStorageType={
    type: typeof SET_LOCAL_STORAGE
    token: string | null
}
export const setLocalStorage=(token: string | null):SetLocalStorageType=>{
    return{
        type: SET_LOCAL_STORAGE,
        token
    }
}

type SetAuthType={
    type: typeof SET_AUTH,
    auth: boolean
}
export const setAuth=(auth:boolean):SetAuthType=>{
    return{
        type: SET_AUTH,auth
    }
}

export type LoginType ={
    type: typeof LOGIN
}
export const login=(req:LoginRequestType,showToast:()=>void):(LoginType & LoginRequestType & ShowToastType)=>{
    return{
        type: LOGIN,
        ...req,showToast
    }
}

export type RegistrateType={
    type: typeof REGISRATE
}
export const registrate=(req:RegistrateRequestType,showToast:()=>void):(RegistrateType & RegistrateRequestType & ShowToastType)=>{
    return{
        type: REGISRATE,
        ...req,showToast
    }
}



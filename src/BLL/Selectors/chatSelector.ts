
import { AppStateType } from "../store";



export const chatSelector = (state:AppStateType)=>{
    return state.chat.chat
}

export const messagesSelector = (state:AppStateType)=>{
    return state.chat.messages
}

export const messageSelector = (state:AppStateType)=>{
    return state.chat.message
}

export const initSelector = (state:AppStateType)=>{
    return state.chat.isInit
}

export const pageSelector = (state:AppStateType)=>{
    return state.chat.page
}

export const countSelector = (state:AppStateType)=>{
    return state.chat.count
}

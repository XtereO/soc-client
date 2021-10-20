import { AppStateType } from "../store";



export const chatsSelector = (state: AppStateType) => {
    return state.chats.chats
}

export const typeChatSelector = (state: AppStateType) => {
    return state.chats.typeChat
}

export const titleSelector = (state: AppStateType) => {
    return state.chats.title
}

export const countSelector = (state: AppStateType) => {
    return state.chats.count
}

export const pageSelector = (state: AppStateType) => {
    return state.chats.page
}

export const initSelector = (state: AppStateType) => {
    return state.chats.isInit
}

export const messageSelector = (state: AppStateType) => {
    return state.chats.message
}
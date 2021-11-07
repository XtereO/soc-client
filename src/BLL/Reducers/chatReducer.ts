import { ChatType, MessageType } from "../../Types/chat";


const SET_INIT: 'chatReducer/SET_INIT' = 'chatReducer/SET_INIT'
const SET_MESSAGE: 'chatReducer/SET_MESSAGE' = 'chatReducer/SET_MESSAGE'
const SET_PAGE: 'chatReducer/SET_PAGE' = 'chatReducer/SET_PAGE'
const SET_COUNT: 'chatReducer/SET_COUNT' = 'chatReducer/SET_COUNT'
const SET_ACTIVE_CHAT_STATE: 'chatReducer/SET_ACTIVE_CHAT_STATE' = 'chatReducer/SET_ACTIVE_CHAT_STATE'
export const SET_ACTIVE_CHAT_ASYNC: 'chatReducer/SET_ACTIVE_CHAT_ASYNC' = 'chatReducer/SET_ACTIVE_CHAT_ASYNC'
const SET_MESSAGES_STATE: 'chatReducer/SET_MESSAGES_STATE' = 'chatReducer/SET_MESSAGES_STATE'
export const SET_MESSAGES_ASYNC: 'chatReducer/SET_MESSAGES_ASYNC' = 'chatReducer/SET_MESSAGES_ASYNC'
export const ADD_COMPANION_TO_DISCUSSION: 'chatReducer/ADD_COMPANION_TO_DISCUSSION' = 'chatReducer/ADD_COMPANION_TO_DISCUSSION'
export const REMOVE_COMPANION_FROM_CHAT: 'chatReducer/REMOVE_COMPANION_FROM_CHAT' = 'chatReducer/REMOVE_COMPANION_FROM_CHAT'
export const LEAVE_CHAT: 'chatReducer/LEAVE_CHAT' = 'chatReducer/LEAVE_CHAT'
export const JOIN_GROUP: 'chatReudcer/JOIN_GROUP' = 'chatReudcer/JOIN_GROUP'
export const SEND_MESSAGE: 'chatReducer/SEND_MESSAGE' = 'chatReducer/SEND_MESSAGE'
export const WATCH_CHAT: 'chatReducer/WATCH_CHAT' = 'chatReducer/WATCH_CHAT'
export const ADD_PERMISSION: 'chatReducer/ADD_PERMISSIONS' = 'chatReducer/ADD_PERMISSIONS'
export const SET_AVATAR: 'chatReducer/SET_AVATAR' = 'chatReducer/SET_AVATAR'
export const SET_TITLE: 'chatReducer/SET_TITLE' = 'chatReducer/SET_TITLE'
export const REMOVE_PERMISSION: 'chatReducer/REMOVE_PERMISSIONS' = 'chatReducer/REMOVE_PERMISSIONS'
export const SET_LAST_MESSAGE:'chatReducer/SET_LAST_MESSAGE'='chatReducer/SET_LAST_MESSAGE'


const initialState = {
    chat: null as ChatType | null,
    messages: [] as MessageType[],
    message: null as string | null,
    isInit: false as boolean,
    page: 1 as number,
    count: 0 as number 
}

type InitialStateType = typeof initialState
type ActionType = (SetInitType | SetMessageType |
    SetActiveChatStateType | SetMessagesStateType |
    SetPageType | SetCountType)

export const chatReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case SET_PAGE:
            return {
                ...state,
                page: action.page
            }
        case SET_COUNT:
            return {
                ...state,
                count: action.count
            }
        case SET_INIT:
            return {
                ...state,
                isInit: action.isInit
            }
        case SET_MESSAGE:
            return {
                ...state,
                message: action.message
            }
        case SET_MESSAGES_STATE:
            if((!action.chatId) || (!state.chat) 
            || (state.chat && action.chatId===state.chat.chatId)){
                return {
                    ...state,
                    messages: (!action.isNew) ? 
                    [...action.messages] : [...action.messages,...state.messages]
                }
            }else{
                return{...state}
            }
        case SET_ACTIVE_CHAT_STATE:
            return {
                ...state,
                chat: action.chat
            }
        default:
            return state
    }
}


export type SetLastMessageType = {
    type: typeof SET_LAST_MESSAGE
    activeChatId: string | null
} 
export const setLastMessage = (activeChatId:string|null):SetLastMessageType =>{
    return{
        type: SET_LAST_MESSAGE,
        activeChatId
    }
}

type SetPageType = {
    type: typeof SET_PAGE
    page: number
}
export const setPage = (page: number): SetPageType => {
    return {
        type: SET_PAGE,
        page
    }
}

type SetCountType = {
    type: typeof SET_COUNT
    count: number
}
export const setCount = (count: number): SetCountType => {
    return {
        type: SET_COUNT,
        count
    }
}

type SetInitType = {
    type: typeof SET_INIT
    isInit: boolean
}
export const setInit = (isInit: boolean): SetInitType => {
    return {
        type: SET_INIT,
        isInit
    }
}

type SetMessageType = {
    type: typeof SET_MESSAGE
    message: string | null
}
export const setMessage = (message: string | null): SetMessageType => {
    return {
        type: SET_MESSAGE,
        message
    }
}

type SetActiveChatStateType = {
    type: typeof SET_ACTIVE_CHAT_STATE
    chat: ChatType | null
}
export const setActiveChatState = (chat: ChatType | null): SetActiveChatStateType => {
    return {
        type: SET_ACTIVE_CHAT_STATE,
        chat
    }
}

export type SetActiveChatAsyncType = {
    type: typeof SET_ACTIVE_CHAT_ASYNC
    chatId: string
    page: number
}
export const setActiveChatAsync = (chatId: string,page: number): SetActiveChatAsyncType => {
    return {
        type: SET_ACTIVE_CHAT_ASYNC,
        chatId, page
    }
}

type SetMessagesStateType = {
    type: typeof SET_MESSAGES_STATE
    messages: MessageType[]
    isNew?:boolean
    chatId:string|null
}
export const setMessagesState = (messages: MessageType[],isNew=false,chatId=null): SetMessagesStateType => {
    return {
        type: SET_MESSAGES_STATE,
        messages,isNew,chatId
    }
}

export type SetMessagesAsyncType = {
    type: typeof SET_MESSAGES_ASYNC
    chatId: string
}
export const setMessagesAsync = (chatId: string): SetMessagesAsyncType => {
    return {
        type: SET_MESSAGES_ASYNC,
        chatId
    }
}

export type AddCompanionToDiscussionType = {
    type: typeof ADD_COMPANION_TO_DISCUSSION
    companionId: string
    chatId: string
}
export const addCompanionToDiscussion = (chatId: string, companionId: string): AddCompanionToDiscussionType => {
    return {
        type: ADD_COMPANION_TO_DISCUSSION,
        companionId, chatId
    }
}

export type RemoveCompanionFromChatType = {
    type: typeof REMOVE_COMPANION_FROM_CHAT
    companionId: string
    chatId: string
}
export const removeCompanionFromChat = (chatId: string, companionId: string): RemoveCompanionFromChatType => {
    return {
        type: REMOVE_COMPANION_FROM_CHAT,
        companionId, chatId
    }
}

export type LeaveChatType = {
    type: typeof LEAVE_CHAT
    chatId: string
    callback: ()=>void
}
export const leaveChat = (chatId: string,callback: ()=>void): LeaveChatType => {
    return {
        type: LEAVE_CHAT,
        chatId, callback
    }
}

export type JoinGroupType = {
    type: typeof JOIN_GROUP
    chatId: string
}
export const joinGroup = (chatId: string): JoinGroupType => {
    return {
        type: JOIN_GROUP,
        chatId
    }
}

export type SendMessageType = {
    type: typeof SEND_MESSAGE
    message: string
    chatId: string
}
export const sendMessage = (chatId: string, message: string): SendMessageType => {
    return {
        type: SEND_MESSAGE,
        message, chatId
    }
}

export type WatchChatType = {
    type: typeof WATCH_CHAT
    chatId: string
}
export const watchChat = (chatId: string): WatchChatType => {
    return {
        type: WATCH_CHAT,
        chatId
    }
}

export type AddPermissionType = {
    type: typeof ADD_PERMISSION
    companionId: string
    chatId: string
}
export const addPermission = (chatId: string, companionId: string): AddPermissionType => {
    return {
        type: ADD_PERMISSION,
        chatId, companionId
    }
}

export type SetAvatarType = {
    type: typeof SET_AVATAR
    chatId: string
    avatar: any
    callback: ()=>void
}
export const setAvatar = (chatId: string, avatar: any, callback:()=>void): SetAvatarType => {
    return {
        type: SET_AVATAR,
        chatId, avatar,
        callback
    }
}

export type SetTitleType = {
    type: typeof SET_TITLE
    title: string
    chatId: string
    callback:()=>void
}
export const setTitle = (chatId: string, title: string, callback:()=>void): SetTitleType => {
    return {
        type: SET_TITLE,
        title, chatId,
        callback
    }
}

export type RemovePermissionType = {
    type: typeof REMOVE_PERMISSION
    chatId: string
    companionId: string
}
export const removePermission = (chatId: string, companionId: string): RemovePermissionType => {
    return {
        type: REMOVE_PERMISSION,
        chatId, companionId
    }
}

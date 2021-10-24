import { ChatType, TypeChatType } from "../../Types/chat";


const SET_INIT:'chatsReducer/SET_INIT'='chatsReducer/SET_INIT'
const SET_MESSAGE:'chatsReducer/SET_MESSAGE'='chatsReducer/SET_MESSAGE'
const SET_PAGE:'chatsReducer/SET_PAGE'='chatsReducer/SET_PAGE'
const SET_COUNT:'chatsReducer/SET_COUNT'='chatsReducer/SET_COUNT'
const SET_CHATS_STATE:'chatsReducer/SET_CHATS_STATE'='chatsReducer/SET_CHATS_STATE'
const SET_TYPE_CHAT:'chatsReducer/SET_TYPE_CHAT'='chatsReducer/SET_TYPE_CHAT'
const SET_TITLE:'chatsReducer/SET_TITLE'='chatsReducer/SET_TITLE'
const SET_ONLY_JOINED:'chatsReducer/SET_ONLY_JOINED'='chatsReducer/SET_ONLY_JOINED'
export const CREATE_CHAT_ASYNC:'chatsReducer/CREATE_CHAT_ASYNC'='chatsReducer/CREATE_CHAT_ASYNC'
export const SET_CHATS_ASYNC:'chatsReducer/SET_CHATS_ASYNC'='chatsReducer/SET_CHATS_ASYNC'



const initialState= {
    chats: [] as ChatType[],
    typeChat: 'dialog' as TypeChatType,
    count: 0 as number,
    title: '' as string,
    page: 1 as number,
    onlyJoined:true as boolean,
    isInit: false as boolean,
    message: null as null | string
}
 
type InitialStateType = typeof initialState
type ActionType = (SetInitType | SetMessageType |
    SetPageType | SetCountType | SetChatsStateType |
    SetTypeChatType | SetTitleType | SetOnlyJoinedType)

export const chatsReducer = (state=initialState,action:ActionType):InitialStateType=>{
    switch(action.type){
        case SET_ONLY_JOINED:
            return{
                ...state,
                onlyJoined: action.onlyJoined
            }
        case SET_INIT:
            return{
                ...state,
                isInit:action.isInit
            }
        case SET_MESSAGE:
            return{
                ...state,
                message:action.message
            }
        case SET_PAGE:
            return{
                ...state,
                page: action.page
            }
        case SET_COUNT:
            return{
                ...state,
                count: action.count
            }
        case SET_CHATS_STATE:
            return{
                ...state,
                chats: [...action.chats]
            }
        case SET_TYPE_CHAT:
            return{
                ...state,
                typeChat: action.typeChat
            }
        case SET_TITLE:
            return{
                ...state,
                title: action.title
            }
        default:
            return state
    }
}


type SetOnlyJoinedType = {
    type: typeof SET_ONLY_JOINED
    onlyJoined: boolean
}
export const setOnlyJoined=(onlyJoined:boolean):SetOnlyJoinedType=>{
    return{
        type: SET_ONLY_JOINED,
        onlyJoined
    }
}

type SetTitleType = {
    type: typeof SET_TITLE
    title: string
}
export const setTitle = (title:string):SetTitleType =>{
    return{
        type: SET_TITLE,
        title
    }
}

type SetInitType = {
    type: typeof SET_INIT
    isInit: boolean
}
export const setInit = (isInit:boolean):SetInitType=>{
    return {
        type: SET_INIT,
        isInit
    }
}

type SetMessageType = {
    type: typeof SET_MESSAGE
    message: string | null
}
export const setMessage = (message: string | null):SetMessageType=>{
    return{
        type:SET_MESSAGE,
        message
    }
}

type SetPageType = {
    type: typeof SET_PAGE
    page: number
}
export const setPage = (page: number):SetPageType=>{
    return {
        type: SET_PAGE,
        page
    }
}

type SetCountType = {
    type: typeof SET_COUNT
    count: number
}
export const setCount = (count: number):SetCountType=>{
    return{
        type: SET_COUNT,
        count
    }
}

type SetChatsStateType = {
    type: typeof SET_CHATS_STATE
    chats: ChatType[]
}
export const setChatsState=(chats:ChatType[]):SetChatsStateType=>{
    return{
        type: SET_CHATS_STATE,
        chats
    }
}

export type SetChatsAsyncType = {
    type: typeof SET_CHATS_ASYNC
    page: number
    title: string
    typeChat: TypeChatType
    onlyJoined: boolean
}
export const setChatsAsync = (page: number, title:string, typeChat: TypeChatType, onlyJoined=true) =>{
    return{
        type: SET_CHATS_ASYNC,
        page, typeChat, title,
        onlyJoined
    }
}

export type CreateChatAsyncType={
    type: typeof CREATE_CHAT_ASYNC
    typeChat: TypeChatType
    payload: PayloadChatType
    callback:()=>void
}
export type PayloadChatType = {
    avatar?: any
    title?: string
    companionId?: string
}
export const createChatAsync=(typeChat:TypeChatType,payload:PayloadChatType,callback:()=>void):CreateChatAsyncType=>{
    return{
        type: CREATE_CHAT_ASYNC,
        typeChat,payload,
        callback
    }
}

type SetTypeChatType = {
    type: typeof SET_TYPE_CHAT
    typeChat: TypeChatType
}
export const setTypeChat = (typeChat:TypeChatType):SetTypeChatType =>{
    return{
        type: SET_TYPE_CHAT,
        typeChat
    }
}
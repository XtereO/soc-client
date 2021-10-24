import { call, put, takeLatest } from "@redux-saga/core/effects";
import { ChangeChatType, createDialog, createDiscussion, createGroup, getChats, GetChatsType, getGroups, setChatAvatar } from "../../DAL/api";
import { setShowToast } from "../Reducers/authReducer";
import { CreateChatAsyncType, CREATE_CHAT_ASYNC, SetChatsAsyncType, setChatsState, setCount, setInit, setMessage, setTitle, setTypeChat, SET_CHATS_ASYNC } from "../Reducers/chatsReducer";
import { setPage } from "../Reducers/peopleReducer";





function* setChatsWorker(action:SetChatsAsyncType){
    try{
        yield put(setInit(false))
        yield put(setMessage(null))
        let data = null as null | GetChatsType
        if(!(action.typeChat==='group' && (!action.onlyJoined))){
            data = yield call(getChats,action.page,action.title,action.typeChat)
        }else{
            data = yield call(getGroups,action.page,action.title,10)
        }

        if(data && data.success){
            yield put(setInit(false))
            yield put(setChatsState(data.chats))
            yield put(setCount(data.count))
        }else if(data && data.message){
            yield put(setInit(false))
            yield put(setMessage(data.message))
        }
        yield put(setInit(false))
    }catch(e){
        yield put(setInit(false))
        yield put(setMessage(e.message))
    }
}

function* createChatWorker(action:CreateChatAsyncType){
    try{
        debugger
        yield put(setMessage(null))
        yield put(setInit(true))
        let data:ChangeChatType|null = null
        if(action.typeChat==='group' && action.payload.title){
            data = yield call(createGroup,action.payload.title)
        }if(action.typeChat==='discussion' && action.payload.title){
            data = yield call(createDiscussion,action.payload.title)
        }if(action.typeChat==='dialog' && action.payload.companionId){
            data = yield call(createDialog, action.payload.companionId)
        }

        if(data && data.success && action.typeChat!=='dialog' && action.payload.avatar){
            const dataAvatar:ChangeChatType = yield call(setChatAvatar, data.chat.chatId, action.payload.avatar)
            if((!dataAvatar.success) && data.message){
                yield put(setInit(false))
                yield put(setMessage(data.message))
            }
            if(dataAvatar.success){
                yield action.callback()
                yield put(setInit(false))
                yield put(setShowToast(true,'Chat is created successful'))
            }
        }else if(data && data.success && action.typeChat==='dialog'){
            yield action.callback()
            yield put(setInit(false))
            yield put(setShowToast(true,'Chat is created successful'))
        }
        if(data && data.message){
            yield put(setInit(false))
            yield put(setMessage(data.message))
        }
        yield put(setInit(false))

    }catch(e){
        yield put(setInit(false))
        yield put(setMessage(e.message))
    }
}


export function* chatsWatcher(){
    yield takeLatest(SET_CHATS_ASYNC, setChatsWorker)
    yield takeLatest(CREATE_CHAT_ASYNC, createChatWorker)
}
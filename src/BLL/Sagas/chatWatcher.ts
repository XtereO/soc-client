import { call, fork, put, take, takeLatest } from "@redux-saga/core/effects";
import { addCompanionToDiscussionAPI, addPermissionAPI, ChangeChatType, getDetailChat, GetDetailChatType, joinGroupAPI, leaveChatAPI, removeCompanionFromChatAPI, removePermissionAPI, ResultCodeType, sendMessageAPI, setChatAvatar, setTitleAPI, streamMessage, StreamMessageType, WatchChatAPI } from "../../DAL/api";
import { setShowToast } from "../Reducers/authReducer";
import { AddCompanionToDiscussionType, AddPermissionType, ADD_COMPANION_TO_DISCUSSION, ADD_PERMISSION, JoinGroupType, JOIN_GROUP, LeaveChatType, LEAVE_CHAT, RemoveCompanionFromChatType, RemovePermissionType, REMOVE_COMPANION_FROM_CHAT, REMOVE_PERMISSION, SendMessageType, SEND_MESSAGE, SetActiveChatAsyncType, setActiveChatState, SetAvatarType, setCount, setInit, SetLastMessageType, setMessage, setMessagesState, setPage, SetTitleType, SET_ACTIVE_CHAT_ASYNC, SET_AVATAR, SET_LAST_MESSAGE, SET_TITLE, WatchChatType, WATCH_CHAT } from "../Reducers/chatReducer";
import { setProfile, setProfileAsync } from "../Reducers/profileReducer";





function* setActiveChatWorker(action:SetActiveChatAsyncType){
    try{
        yield put(setInit(true))
        yield put(setMessage(null))
        const data:GetDetailChatType = yield call(getDetailChat,action.chatId, action.page)

        if(data.success){
            yield put(setInit(false))
            yield put(setActiveChatState(data.chat))
            yield put(setPage(action.page))
            yield put(setMessagesState(data.messages))
            yield put(setCount(data.count))
        }else if(data.message){
            yield put(setInit(false))
            yield put(setMessage(data.message))
        }
        yield put(setInit(false))
    }catch(e){
        yield put(setInit(false))
        yield put(setMessage(e.message))
    }
}
function* addCompanionToDiscussionWorker(action:AddCompanionToDiscussionType){
    try{
        yield put(setMessage(null))
        const data:ChangeChatType = yield call(addCompanionToDiscussionAPI,action.companionId,action.chatId)
        if(data.success){
            yield put(setActiveChatState(data.chat))
        }else if(data.message){
            yield put(setMessage(data.message))
        }
    }catch(e){
        yield put(setMessage(e.message))
    }
}
function* removeCompanionFromChatWorker(action:RemoveCompanionFromChatType){
    try{
        yield put(setMessage(null))
        const data:ChangeChatType = yield call(removeCompanionFromChatAPI,action.companionId,action.chatId)
        if(data.success){
            yield put(setActiveChatState(data.chat))
        }else if(data.message){
            yield put(setMessage(data.message))
        }
    }catch(e){
        yield put(setMessage(e.message))
    }
}
function* leaveChatWorker(action:LeaveChatType){
    try{
        yield put(setMessage(null))
        const data:ResultCodeType = yield call(leaveChatAPI,action.chatId)
        if(data.success){
            action.callback()
        }else if(data.message){
            yield put(setMessage(data.message))
        }
    }catch(e){
        yield put(setMessage(e.message))
    }
}
function* joinGroupWorker(action:JoinGroupType){
    try{
        yield put(setMessage(null))
        const data:ChangeChatType = yield call(joinGroupAPI,action.chatId)
        if(data.success){
            yield put(setActiveChatState(data.chat))
        }else if(data.message){
            yield put(setMessage(data.message))
        }
    }catch(e){
        yield put(setMessage(e.message))
    }
}
function* sendMessageWorker(action:SendMessageType){
    try{
        yield put(setMessage(null))
        const data:ChangeChatType = yield call(sendMessageAPI,action.chatId,action.message)
        if(data.success){
            yield put(setActiveChatState(data.chat))
        }else if(data.message){
            yield put(setMessage(data.message))
        }
    }catch(e){
        yield put(setMessage(e.message))
    }
}
function* watchChatWorker(action:WatchChatType){
    try{
        yield put(setMessage(null))
        const data:ChangeChatType = yield call(WatchChatAPI,action.chatId)
        if(data.success){
            yield put(setActiveChatState(data.chat))
        }else if(data.message){
            yield put(setMessage(data.message))
        }
    }catch(e){
        yield put(setMessage(e.message))
    }
}
function* addPermissionWorker(action:AddPermissionType){
    try{
        yield put(setMessage(null))
        const data:ChangeChatType = yield call(addPermissionAPI,action.companionId,action.chatId)
        if(data.success){
            yield put(setActiveChatState(data.chat))
        }else if(data.message){
            yield put(setMessage(data.message))
        }
    }catch(e){
        yield put(setMessage(e.message))
    }
}
function* setAvatarWorker(action:SetAvatarType){
    try{
        yield put(setMessage(null))
        const data:ChangeChatType = yield call(setChatAvatar,action.chatId,action.avatar)
        if(data.success){
            yield put(setActiveChatState(data.chat))
            yield action.callback()
            yield put(setShowToast(true,'Avatar changed successful'))
        }else if(data.message){
            yield put(setMessage(data.message))
        }
    }catch(e){
        yield put(setMessage(e.message))
    }
}
function* setTitleWorker(action:SetTitleType){
    try{
        yield put(setMessage(null))
        const data:ChangeChatType = yield call(setTitleAPI,action.title,action.chatId)
        if(data.success){
            yield put(setActiveChatState(data.chat))
            yield action.callback()
            yield put(setShowToast(true,'Title changed successful'))
        }else if(data.message){
            yield put(setMessage(data.message))
        }
    }catch(e){
        yield put(setMessage(e.message))
    }
}
function* removePermissionWorker(action:RemovePermissionType){
    try{
        yield put(setMessage(null))
        const data:ChangeChatType = yield call(removePermissionAPI,action.companionId,action.chatId)
        if(data.success){
            yield put(setActiveChatState(data.chat))
        }else if(data.message){
            yield put(setMessage(data.message))
        }
    }catch(e){
        yield put(setMessage(e.message))
    }
}
function* setLastMessageWorker(action:SetLastMessageType){
    try{
        yield put(setMessage(null))
        const data:StreamMessageType = yield call(streamMessage)
        if(data.success){
            yield put(setActiveChatState(data.chat))
            yield put(setMessagesState([data.message],true))
            yield put(setProfile(data.user,true))
        }else if(data.message){
            yield put(setMessage(data.message))
        }
    }catch(e){
        yield put(setMessage(e.message))
    }
}

export function* setLastMessageWatcher(){
    yield takeLatest(SET_LAST_MESSAGE,setLastMessageWorker)
}
export function* chatWatcher(){
    yield takeLatest(SET_ACTIVE_CHAT_ASYNC,setActiveChatWorker)    
    yield takeLatest(ADD_COMPANION_TO_DISCUSSION, addCompanionToDiscussionWorker)
    yield takeLatest(REMOVE_COMPANION_FROM_CHAT, removeCompanionFromChatWorker)
    yield takeLatest(LEAVE_CHAT, leaveChatWorker)
    yield takeLatest(JOIN_GROUP, joinGroupWorker)
    yield takeLatest(SEND_MESSAGE, sendMessageWorker)
    yield takeLatest(WATCH_CHAT, watchChatWorker)
    yield takeLatest(ADD_PERMISSION, addPermissionWorker)
    yield takeLatest(SET_AVATAR, setAvatarWorker)
    yield takeLatest(SET_TITLE, setTitleWorker)
    yield takeLatest(REMOVE_PERMISSION, removePermissionWorker)
}
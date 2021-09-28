import { call, put, takeLatest } from "@redux-saga/core/effects";
import { AddPlaylistAsyncType, ADD_PLAYLIST_ASYNC, setCount, setInit, setMessage, SetPlaylistsAsyncType, setPlaylistsState, SET_PLAYLISTS_ASYNC } from "../Reducers/playlistsReducer";
import { addPlaylist, getPlaylists, GetPlaylistsType, ResultCodeType, setImgPlaylist } from "../../DAL/api";
import { setShowToast } from "../Reducers/authReducer";



function* setPlaylistsWorker(action:SetPlaylistsAsyncType){
    try{
        yield put(setInit(true))
        yield put(setMessage(null))
        const data:GetPlaylistsType = yield call(getPlaylists,action.filters) 
        if(data.success){
            yield put(setPlaylistsState(data.playlists))
            yield put(setCount(data.count))
        }else if(data.message){
            yield put(setMessage(data.message))
        }
        yield put(setInit(false))
    }catch(e){
        yield put(setInit(false))
        yield put(setMessage(e.message))
    }
}
function* addPlaylistWorker(action:AddPlaylistAsyncType){
    try{
        yield put(setInit(true))
        yield put(setMessage(null))
        const data:(ResultCodeType & {playlistId:string}) = yield call(addPlaylist,action.title,action.isPublic)
        let textMessage = ''
        if(data.success){
            if(action.img){
                const imgData:ResultCodeType = yield call(setImgPlaylist,data.playlistId,action.img)
                if(imgData.success){
                    textMessage = 'Playlist was added successful' 
                }else if(imgData.message){
                    textMessage = `Playlist was added successful, but img don't upload`
                }
            }else{
                textMessage = 'Playlist was added successful'
            }
            yield put(setInit(false))
            yield put(setShowToast(true,textMessage,action.callback))
            yield action.callback()
        }else if(data.message){
            yield put(setMessage(data.message))
            yield put(setInit(false))
        }
    }catch(e){
        yield put(setInit(false))
        yield put(setMessage(e.message))
    }
}

export function* playlistsWatcher(){
    yield takeLatest(SET_PLAYLISTS_ASYNC, setPlaylistsWorker)
    yield takeLatest(ADD_PLAYLIST_ASYNC, addPlaylistWorker)
}
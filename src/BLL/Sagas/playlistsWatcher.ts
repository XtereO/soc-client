import { call, put, takeLatest } from "@redux-saga/core/effects";
import { AddPlaylistAsyncType, ADD_PLAYLIST_ASYNC, RemoveFromSavedPlaylistAsyncType,removeFromPlaylistState, REMOVE_FROM_SAVED_PLAYLIST_ASYNC, SavePlaylistAsyncType, savePlaylistState, SAVE_PLAYLIST_ASYNC, setCount, setInit, setMessage, SetPlaylistsAsyncType, setPlaylistsState, SET_PLAYLISTS_ASYNC, RatePlaylistAsyncType, ratePlaylistState, RATE_PLAYLIST_ASYNC, SetPlaylistAsyncType, setPlaylistState, SET_PLAYLIST_ASYNC } from "../Reducers/playlistsReducer";
import { addPlaylist, getPlaylists, GetPlaylistsType, ratePlaylist, removePlaylistFromSaved, ResultCodeType, savePlaylist, setImgPlaylist, setPlaylist } from "../../DAL/api";
import { setShowToast } from "../Reducers/authReducer";
import { getLineAndCharacterOfPosition } from "typescript";
import { ReviewType } from "../../Types/profile";
import { act } from "react-dom/test-utils";
import { backendURL } from "../../Consts";



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
function* savePlaylistWorker(action:SavePlaylistAsyncType){
    try{
        yield put(setMessage(null))
        const data:ResultCodeType = yield call(savePlaylist,action.playlistId)
        if(data.success){
            yield put(savePlaylistState(action.playlistId))
            yield put(setShowToast(true,'Playlist save successful'))
        }else if(data.message){
            yield put(setMessage(data.message))
            yield put(setShowToast(true,data.message))
        }
    }catch(e){
        yield put(setMessage(e.message))
        yield put(setShowToast(true,e.message))
    }
}
function* removeFromSavedPlaylistWorker(action:RemoveFromSavedPlaylistAsyncType){
    try{
        yield put(setMessage(null))
        const data:ResultCodeType = yield call(removePlaylistFromSaved,action.playlistId)
        if(data.success){
            yield put(removeFromPlaylistState(action.playlistId))
            yield put(setShowToast(true,'Playlist remove from saved successful'))
        }else if(data.message){
            yield put(setMessage(data.message))
            yield put(setShowToast(true,data.message))
        }
    }catch(e){
        yield put(setMessage(e.message))
        yield put(setShowToast(true,e.message))
    }
}
function* ratePlaylistWorker(action:RatePlaylistAsyncType){
    try{
        yield put(setMessage(null))
        const data:(ResultCodeType & {review:ReviewType}) = yield call(ratePlaylist,{playlistId:action.playlistId,
            review: action.review ? action.review : null, rating: action.rating,
            playlistTitle: action.playlistTitle})
        if(data.success){
            yield put(ratePlaylistState(data.review))
            yield action.callback()
            yield put(setShowToast(true, 'Playlist rated successful'))
        }else if(data.message){
            yield put(setMessage(data.message))
        }
    }catch(e){
        yield put(setMessage(e.message))
    }
}
function* setPlaylistWorker(action:SetPlaylistAsyncType){
    try{
        yield put(setMessage(null))
        yield put(setInit(true))
        if(action.payload.img){
            const data:ResultCodeType & {imgSrc:string} = yield call(setImgPlaylist,action.playlistId,action.payload.img)
        if(data.success){
            yield put(setPlaylistState(action.playlistId,{imgSrc:backendURL+data.imgSrc}))
            yield put(setInit(false))
            yield action.callback()
            yield put(setShowToast(true,'Playlist change successful'))
        }else if(data.message){
            yield put(setInit(false))
            yield put(setMessage(data.message))
        }}
        else{
        const data = yield call(setPlaylist,action.playlistId,action.payload)
        if(data.success){
            yield put(setPlaylistState(action.playlistId,action.payload))
            yield put(setInit(false))
            yield action.callback()
            yield put(setShowToast(true,'Playlist change successful'))
        }else if(data.message){
            yield put(setInit(false))
            yield put(setMessage(data.message))
        }}
    }catch(e){
        yield put(setMessage(e.message))
        yield put(setInit(false))
    }
}

export function* playlistsWatcher(){
    yield takeLatest(SET_PLAYLIST_ASYNC, setPlaylistWorker)
    yield takeLatest(RATE_PLAYLIST_ASYNC, ratePlaylistWorker)
    yield takeLatest(SAVE_PLAYLIST_ASYNC, savePlaylistWorker)
    yield takeLatest(REMOVE_FROM_SAVED_PLAYLIST_ASYNC, removeFromSavedPlaylistWorker)
    yield takeLatest(SET_PLAYLISTS_ASYNC, setPlaylistsWorker)
    yield takeLatest(ADD_PLAYLIST_ASYNC, addPlaylistWorker)
}
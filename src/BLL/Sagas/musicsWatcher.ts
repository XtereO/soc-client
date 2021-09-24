import { AddMusicType, ADD_MUSIC, setInit, setMessage, setCount, setFilters, SetMusicsAsyncType, setMusicsState, SET_MUSICS_ASYNC, SaveMusicAsyncType, saveMusicState, SAVE_MUSIC_ASYNC, RemoveFromSavedMusicStateType, removeFromSavedMusicState, REMOVE_FROM_SAVED_MUSIC_ASYNC, RateMusicAsyncType, rateMusicState, RATE_MUSIC_ASYNC } from "../Reducers/musicsReducer";
import { addMusic, AddMusicRequestType, setImgMusic, setMP3Music,ResultCodeType, GetMusicsType, getMudics, saveMusic, removeMusicFromSave, rateMusic } from "../../DAL/api";
import { call, put, takeLatest } from "@redux-saga/core/effects";
import { setShowToast } from "../Reducers/authReducer";




function* addMusicWorker(action: AddMusicType) {
    try {
        yield put(setInit(true))
        //@ts-ignore
        const data:AddMusicRequestType = yield call(addMusic, action.title, action.author, action.genre)
        
        if (data.success && data.musicId) {
            let loadImg:ResultCodeType=yield call(setImgMusic,action.img,data.musicId)
            const loadMP3:ResultCodeType = yield call(setMP3Music, action.music, data.musicId)
            if(loadMP3.success && loadImg.success){
                yield put(setInit(false))
                yield put(setMessage(null))
                yield action.showToast()
            }else{
                yield put(setInit(false))
                yield put(setMessage(loadMP3.message ? loadMP3.message : 'Some error occured'))
            }
        } else {
            yield put(setInit(false))
            yield put(setMessage(data.message ? data.message : 'Some error occured'))
        }
    } catch (e) {
        yield put(setInit(false))
        yield put(setMessage(e.message))
    }
}
function* setMusicsWorker(action: SetMusicsAsyncType){
    try{
        yield put(setInit(true))
        const data:GetMusicsType = yield call(getMudics, action.filters)
        if(data.message && (!data.success)){
            yield put(setInit(false))
            yield put(setMessage(data.message))
        }else{
            yield put(setInit(false))
            yield put(setMessage(null))
            yield put(setMusicsState(data.musics))
            yield put(setFilters(action.filters))
            yield put(setCount(data.count))
        }
    }catch(e){
        yield put(setInit(false))
        yield put(setMessage(e.message))
    }
}
function* saveMusicsWorker(action: SaveMusicAsyncType){
    try{
        yield put(setMessage(null))
        const data:ResultCodeType = yield call(saveMusic,action.musicId)
        if(data.success){
            yield put(saveMusicState(action.musicId))
            yield put(setShowToast(true,'Music save successful'))
        }else if(data.message){
            yield put(setMessage(data.message))
            yield put(setShowToast(true,data.message))
        }
    }catch(e){
        yield put(setMessage(e.message))
        yield put(setShowToast(true,e.message))
    }   
}
function* removeFromSavedMusicWorker(action: RemoveFromSavedMusicStateType){
    try{
        yield put(setMessage(null))
        const data:ResultCodeType = yield call(removeMusicFromSave,action.musicId)
        if(data.success){
            yield put(removeFromSavedMusicState(action.musicId))
            yield put(setShowToast(true,'Music remove from saved successful'))
        }else if(data.message){
            yield put(setMessage(data.message))
            yield put(setShowToast(true,data.message))
        }
    }catch(e){
        yield put(setMessage(e.message))
        yield put(setShowToast(true,e.message))
    }
}
function* rateMusicWorker(action: RateMusicAsyncType){
    try{
        yield put(setInit(true))
        yield put(setMessage(null))
        const data:ResultCodeType = yield call(rateMusic,{
            musicId: action.musicId,
            musicTitle: action.musicTitle,
            rating: action.rating, 
            review: action.review
        })
        if(data.success){
            yield put(setInit(false))
            yield put(rateMusicState(action.rating,action.musicId))
            yield put(setShowToast(true,'Rate music successful',action.callback))
        }else if(data.message){
            yield put(setInit(false))
            yield put(setMessage(data.message))
        }
    }catch(e){
        yield put(setInit(false))
        yield put(setMessage(e.message))
    }
}



export function* musicsWatcher() {
    yield takeLatest(ADD_MUSIC, addMusicWorker)
    yield takeLatest(SET_MUSICS_ASYNC, setMusicsWorker)
    yield takeLatest(SAVE_MUSIC_ASYNC, saveMusicsWorker)
    yield takeLatest(REMOVE_FROM_SAVED_MUSIC_ASYNC, removeFromSavedMusicWorker)
    yield takeLatest(RATE_MUSIC_ASYNC, rateMusicWorker)
}
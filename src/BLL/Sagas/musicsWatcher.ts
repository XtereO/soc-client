import { AddMusicType, ADD_MUSIC, setInit, setMessage, setCount, setFilters, SetMusicsAsyncType, setMusicsState, SET_MUSICS_ASYNC, SaveMusicAsyncType, saveMusicState, SAVE_MUSIC_ASYNC, RemoveFromSavedMusicAsyncType, removeFromSavedMusicState, REMOVE_FROM_SAVED_MUSIC_ASYNC, RateMusicAsyncType, rateMusicState, RATE_MUSIC_ASYNC, SetMusicAsyncType, SET_MUSIC_ASYNC, setMusicState } from "../Reducers/musicsReducer";
import { addMusic, AddMusicRequestType, setImgMusic, setMP3Music,ResultCodeType, GetMusicsType, getMudics, saveMusic, removeMusicFromSave, rateMusic, setMusic } from "../../DAL/api";
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
function* removeFromSavedMusicWorker(action: RemoveFromSavedMusicAsyncType){
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
function* setMusicWorker(action: SetMusicAsyncType){
    try{
        yield put(setInit(true))
        yield put(setMessage(null))
        if(action.payload.img){
            const dataImg:ResultCodeType & {imgSrc:string} = yield call(setImgMusic,action.payload.img,action.musicId)
            if(dataImg.success){
                yield put(setInit(false))
                yield put(setMusicState(action.musicId,{imgSrc:dataImg.imgSrc}))
                yield put(setShowToast(true,'Image changed successful',action.callback))
            }else if(dataImg.message){
                yield put(setInit(false))
                yield put(setMessage(dataImg.message))
            }
        }else if(action.payload.music){
            const dataMusic:ResultCodeType & {musicSrc:string} = yield call(setMP3Music,action.payload.music,action.musicId)
            if(dataMusic.success){
                yield put(setInit(false))
                yield put(setMusicState(action.musicId,{musicSrc:dataMusic.musicSrc}))
                yield put(setShowToast(true,'Contain music changed successful',action.callback))
            }else if(dataMusic.message){
                yield put(setInit(false))
                yield put(setMessage(dataMusic.message))
            }
        }else if(action.payload.author || action.payload.title || action.payload.genre){
            const data:ResultCodeType = yield call(setMusic,action.musicId,action.payload)
            if(data.success){
                yield put(setInit(false))
                yield put(setMusicState(action.musicId,action.payload))
                yield put(setShowToast(true,'Music information changed successful',action.callback))
            }else if(data.message){
                yield put(setInit(false))
                yield put(setMessage(data.message))
            }
        }
        
        yield put(setInit(false))
    }catch(e){
        yield put(setInit(false))
    }
}



export function* musicsWatcher() {
    yield takeLatest(ADD_MUSIC, addMusicWorker)
    yield takeLatest(SET_MUSICS_ASYNC, setMusicsWorker)
    yield takeLatest(SAVE_MUSIC_ASYNC, saveMusicsWorker)
    yield takeLatest(REMOVE_FROM_SAVED_MUSIC_ASYNC, removeFromSavedMusicWorker)
    yield takeLatest(RATE_MUSIC_ASYNC, rateMusicWorker)
    yield takeLatest(SET_MUSIC_ASYNC, setMusicWorker)
}
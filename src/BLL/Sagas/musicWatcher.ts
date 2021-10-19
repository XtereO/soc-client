import { setInit, setMessage, SaveMusicAsyncType, saveMusicState, SAVE_MUSIC_ASYNC, RemoveFromSavedMusicAsyncType, removeFromSavedMusicState, REMOVE_FROM_SAVED_MUSIC_ASYNC, RateMusicAsyncType, rateMusicState, RATE_MUSIC_ASYNC, SetMusicAsyncType, SET_MUSIC_ASYNC, setMusicState, SetActiveMusicAsyncType, setActiveMusicState, SET_ACTIVE_MUSIC_ASYNC, SetReviewsAsyncType, setReviewsState, setPageReviews, setCountReviews, SET_REVIEWS_ASYNC } from "../Reducers/musicReducer";
import { addMusic, AddMusicRequestType, setImgMusic, setMP3Music,ResultCodeType, GetMusicsType, getMudics, saveMusic, removeMusicFromSave, rateMusic, setMusic, getMusic, GetMusicType, getReviews, GetReviewType } from "../../DAL/api";
import { call, put, takeLatest } from "@redux-saga/core/effects";
import { setShowToast } from "../Reducers/authReducer";




function* setActiveMusicWorker(action: SetActiveMusicAsyncType){
    try{
        yield put(setInit(true))
        const data:GetMusicType = yield call(getMusic, action.musicId)
        if(data.message && (!data.success)){
            yield put(setInit(false))
            yield put(setMessage(data.message))
        }else{
            yield put(setInit(false))
            yield put(setMessage(null))
            yield put(setActiveMusicState(data.music))
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
            yield put(saveMusicState())
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
            yield put(removeFromSavedMusicState())
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
            yield action.callback()
            yield put(rateMusicState(action.rating))
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
                yield put(setMusicState({imgSrc:dataImg.imgSrc}))
                yield put(setShowToast(true,'Image changed successful',action.callback))
            }else if(dataImg.message){
                yield put(setInit(false))
                yield put(setMessage(dataImg.message))
            }
        }else if(action.payload.music){
            const dataMusic:ResultCodeType & {musicSrc:string} = yield call(setMP3Music,action.payload.music,action.musicId)
            if(dataMusic.success){
                yield put(setInit(false))
                yield put(setMusicState({musicSrc:dataMusic.musicSrc}))
                yield put(setShowToast(true,'Contain music changed successful',action.callback))
            }else if(dataMusic.message){
                yield put(setInit(false))
                yield put(setMessage(dataMusic.message))
            }
        }else if(action.payload.author || action.payload.title || action.payload.genre){
            const data:ResultCodeType = yield call(setMusic,action.musicId,action.payload)
            if(data.success){
                yield put(setInit(false))
                yield put(setMusicState(action.payload))
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
function* setReviewsWorker(action: SetReviewsAsyncType){
    try {
        yield put(setInit(true))
        const response: GetReviewType = yield call(getReviews, action.musicId,
            action.page, true, 6, 'MusicOrPlaylist')
            
        yield put(setReviewsState(response.reviews))
        yield put(setPageReviews(action.page))
        yield put(setCountReviews(response.count))
        yield put(setInit(false))
    } catch (e) {

    }
}




export function* musicWatcher() {
    yield takeLatest(SET_REVIEWS_ASYNC, setReviewsWorker)
    yield takeLatest(SET_ACTIVE_MUSIC_ASYNC, setActiveMusicWorker)
    yield takeLatest(SAVE_MUSIC_ASYNC, saveMusicsWorker)
    yield takeLatest(REMOVE_FROM_SAVED_MUSIC_ASYNC, removeFromSavedMusicWorker)
    yield takeLatest(RATE_MUSIC_ASYNC, rateMusicWorker)
    yield takeLatest(SET_MUSIC_ASYNC, setMusicWorker)
}
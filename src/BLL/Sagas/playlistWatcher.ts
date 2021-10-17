import { call, put, takeLatest } from "@redux-saga/core/effects";
import {removeMusicFromPlaylistState,
        SetMusicsAsyncType,
        RemoveFromSavedPlaylistAsyncType, 
        removeFromPlaylistState, 
        REMOVE_FROM_SAVED_PLAYLIST_ASYNC, 
        SavePlaylistAsyncType, savePlaylistState,
        SAVE_PLAYLIST_ASYNC, setInit, setMessage,
        RatePlaylistAsyncType, ratePlaylistState, 
        RATE_PLAYLIST_ASYNC, SetPlaylistAsyncType, 
        setPlaylistState, SET_PLAYLIST_ASYNC, 
        setMusicsState, setCountMusic, SET_MUSICS_ASYNC,
        AddMusicToPlaylistAsyncType, addMusicToPlaylistState,
        ADD_MUSIC_TO_PLAYLIST_ASYNC, 
        RemoveMusicFromPlaylistAsyncType, 
        REMOVE_MUSIC_FROM_PLAYLIST_ASYNC,
        SetActivePlaylistAsyncType,
        setActivePlaylistState,
        SET_ACTIVE_PLAYLIST_ASYNC,
        SET_MUSIC_ASYNC,
        RATE_MUSIC_ASYNC,
        REMOVE_FROM_SAVED_MUSIC_ASYNC,
        SAVE_MUSIC_ASYNC,
        setMusicState,
        SetMusicAsyncType,
        rateMusicState,
        RateMusicAsyncType,
        removeFromSavedMusicState,
        RemoveFromSavedMusicAsyncType,
        saveMusicState,
        SaveMusicAsyncType,
        SetReviewsAsyncType,
        setReviewsState,
        setPageReviews,
        setCountReviews,
        SET_REVIEWS_ASYNC
        } from "../Reducers/playlistReducer";
import {addMusicToPlaylist, 
        getMusicsForPlaylist, GetMusicsType, 
        getPlaylistDetail, getReviews, GetReviewType, rateMusic, ratePlaylist, 
        removeMusicFromPlaylist, removeMusicFromSave, removePlaylistFromSaved,
        ResultCodeType, saveMusic, savePlaylist,
        setImgMusic,
        setImgPlaylist, setMP3Music, setMusic, setPlaylist } from "../../DAL/api";
import { setShowToast } from "../Reducers/authReducer";
import { ReviewType } from "../../Types/profile";
import { backendURL } from "../../Consts";
import { PlaylistDetailType } from "../../Types/playlist";



function* savePlaylistWorker(action: SavePlaylistAsyncType) {
    try {
        yield put(setMessage(null))
        const data: ResultCodeType = yield call(savePlaylist, action.playlistId)
        if (data.success) {
            yield put(savePlaylistState(action.playlistId))
            yield put(setShowToast(true, 'Playlist save successful'))
        } else if (data.message) {
            yield put(setMessage(data.message))
            yield put(setShowToast(true, data.message))
        }
    } catch (e) {
        yield put(setMessage(e.message))
        yield put(setShowToast(true, e.message))
    }
}
function* removeFromSavedPlaylistWorker(action: RemoveFromSavedPlaylistAsyncType) {
    try {
        yield put(setMessage(null))
        const data: ResultCodeType = yield call(removePlaylistFromSaved, action.playlistId)
        if (data.success) {
            yield put(removeFromPlaylistState(action.playlistId))
            yield put(setShowToast(true, 'Playlist remove from saved successful'))
        } else if (data.message) {
            yield put(setMessage(data.message))
            yield put(setShowToast(true, data.message))
        }
    } catch (e) {
        yield put(setMessage(e.message))
        yield put(setShowToast(true, e.message))
    }
}
function* ratePlaylistWorker(action: RatePlaylistAsyncType) {
    try {
        yield put(setMessage(null))
        const data: (ResultCodeType & { review: ReviewType }) = yield call(ratePlaylist, {
            playlistId: action.playlistId,
            review: action.review ? action.review : null, rating: action.rating,
            playlistTitle: action.playlistTitle
        })
        if (data.success) {
            yield put(ratePlaylistState(data.review))
            yield action.callback()
            yield put(setShowToast(true, 'Playlist rated successful'))
        } else if (data.message) {
            yield put(setMessage(data.message))
        }
    } catch (e) {
        yield put(setMessage(e.message))
    }
}
function* setPlaylistWorker(action: SetPlaylistAsyncType) {
    try {
        yield put(setMessage(null))
        yield put(setInit(true))
        if (action.payload.img) {
            const data: ResultCodeType & { imgSrc: string } = yield call(setImgPlaylist, action.playlistId, action.payload.img)
            if (data.success) {
                yield put(setPlaylistState(action.playlistId, { imgSrc: backendURL + data.imgSrc }))
                yield put(setInit(false))
                yield action.callback()
                yield put(setShowToast(true, 'Playlist change successful'))
            } else if (data.message) {
                yield put(setInit(false))
                yield put(setMessage(data.message))
            }
        }else {
            const data: ResultCodeType = yield call(setPlaylist, action.playlistId, action.payload)
            if (data.success) {
                yield put(setPlaylistState(action.playlistId, action.payload))
                yield put(setInit(false))
                yield action.callback()
                yield put(setShowToast(true, 'Playlist change successful'))
            } else if (data.message) {
                yield put(setInit(false))
                yield put(setMessage(data.message))
            }
        }
    } catch (e) {
        yield put(setMessage(e.message))
        yield put(setInit(false))
    }
}
function* setMusicsWorker(action: SetMusicsAsyncType) {
    try {
        yield put(setInit(true))
        yield put(setMessage(null))
        const data: GetMusicsType = yield call(
            getMusicsForPlaylist, action.playlistId,
            action.filters.title, action.filters.page, 10,
            action.filters.onlyMySaved, action.filters.onlyMyCreated,
            action.filters.genre, action.filters.searchBy)
        if (data.success) {
            yield put(setMusicsState(data.musics))
            yield put(setCountMusic(data.count))
        } else if (data.message) {
            yield put(setMessage(data.message))
        }
        yield put(setInit(false))
    } catch (e) {
        yield put(setInit(false))
        yield put(setMessage(e.message))
    }
}
function* addMusicToPlaylistWorker(action: AddMusicToPlaylistAsyncType) {
    try {
        yield put(setMessage(null))
        const data: ResultCodeType = yield call(addMusicToPlaylist, action.playlistId, [action.musicId])
        if (data.success) {
            yield put(addMusicToPlaylistState(action.playlistId, action.musicId))
        } else if (data.message) {
            yield put(setMessage(data.message))
        }
        yield put(setInit(false))
    } catch (e) {
        yield put(setInit(false))
        yield put(setMessage(e.message))
    }
}
function* removeMusicFromPlaylistWorker(action: RemoveMusicFromPlaylistAsyncType) {
    try {
        yield put(setMessage(null))
        const data: ResultCodeType = yield call(removeMusicFromPlaylist, action.playlistId, [action.musicId])
        if (data.success) {
            yield put(removeMusicFromPlaylistState(action.playlistId, action.musicId))
        } else if (data.message) {
            yield put(setMessage(data.message))
        }
        yield put(setInit(false))
    } catch (e) {
        yield put(setInit(false))
        yield put(setMessage(e.message))
    }
}
function* setActivePlaylistWorker(action: SetActivePlaylistAsyncType) {
    try {
        yield put(setMessage(null))
        if (action.playlistId) {
            const data: ({ playlist: PlaylistDetailType } & ResultCodeType) = yield call(getPlaylistDetail, action.playlistId)
            if (data.success) {
                yield put(setActivePlaylistState(data.playlist))
            } else {
                yield put(setMessage(null))
            }
        } else {
            yield put(setActivePlaylistState(null))
        }
    } catch (e) {
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
            yield action.callback()
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
function* setReviewsWorker(action: SetReviewsAsyncType){
    try {
        yield put(setInit(true))
        const response: GetReviewType = yield call(getReviews, action.playlistId,
            action.page, true, 6, 'MusicOrPlaylist')
        yield put(setReviewsState(response.reviews))
        yield put(setPageReviews(action.page))
        yield put(setCountReviews(response.count))
        yield put(setInit(false))
    } catch (e) {

    }
}

export function* playlistWatcher() {
    yield takeLatest(SET_REVIEWS_ASYNC, setReviewsWorker)
    yield takeLatest(SAVE_MUSIC_ASYNC, saveMusicsWorker)
    yield takeLatest(REMOVE_FROM_SAVED_MUSIC_ASYNC, removeFromSavedMusicWorker)
    yield takeLatest(RATE_MUSIC_ASYNC, rateMusicWorker)
    yield takeLatest(SET_MUSIC_ASYNC, setMusicWorker)
    yield takeLatest(SET_ACTIVE_PLAYLIST_ASYNC, setActivePlaylistWorker)
    yield takeLatest(REMOVE_MUSIC_FROM_PLAYLIST_ASYNC, removeMusicFromPlaylistWorker)
    yield takeLatest(SET_PLAYLIST_ASYNC, setPlaylistWorker)
    yield takeLatest(RATE_PLAYLIST_ASYNC, ratePlaylistWorker)
    yield takeLatest(SAVE_PLAYLIST_ASYNC, savePlaylistWorker)
    yield takeLatest(REMOVE_FROM_SAVED_PLAYLIST_ASYNC, removeFromSavedPlaylistWorker)
    yield takeLatest(SET_MUSICS_ASYNC, setMusicsWorker)
    yield takeLatest(ADD_MUSIC_TO_PLAYLIST_ASYNC, addMusicToPlaylistWorker)
}




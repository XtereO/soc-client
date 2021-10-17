import { call, put, takeLatest } from "@redux-saga/core/effects";
import { removeMusicFromPlaylistState, AddPlaylistAsyncType, SetMusicsAsyncType, ADD_PLAYLIST_ASYNC, RemoveFromSavedPlaylistAsyncType, removeFromPlaylistState, REMOVE_FROM_SAVED_PLAYLIST_ASYNC, SavePlaylistAsyncType, savePlaylistState, SAVE_PLAYLIST_ASYNC, setCount, setInit, setMessage, SetPlaylistsAsyncType, setPlaylistsState, SET_PLAYLISTS_ASYNC, RatePlaylistAsyncType, ratePlaylistState, RATE_PLAYLIST_ASYNC, SetPlaylistAsyncType, setPlaylistState, SET_PLAYLIST_ASYNC, setMusicsState, setCountMusic, SET_MUSICS_ASYNC, AddMusicToPlaylistAsyncType, addMusicToPlaylistState, ADD_MUSIC_TO_PLAYLIST_ASYNC, RemoveMusicFromPlaylistAsyncType, REMOVE_MUSIC_FROM_PLAYLIST_ASYNC, setFiltersMusic, SetActivePlaylistAsyncType, setActivePlaylistState, SET_ACTIVE_PLAYLIST_ASYNC } from "../Reducers/playlistsReducer";
import { addMusicToPlaylist, addPlaylist, getMusicsForPlaylist, GetMusicsType, getPlaylistDetail, getPlaylists, GetPlaylistsType, rateMusic, ratePlaylist, removeMusicFromPlaylist, removeMusicFromSave, removePlaylistFromSaved, ResultCodeType, saveMusic, savePlaylist, setImgMusic, setImgPlaylist, setMP3Music, setMusic, setPlaylist } from "../../DAL/api";
import { setShowToast } from "../Reducers/authReducer";
import { ReviewType } from "../../Types/profile";
import { backendURL } from "../../Consts";
import { PlaylistDetailType } from "../../Types/playlist";
import { RateMusicAsyncType, rateMusicState, RATE_MUSIC_ASYNC, RemoveFromSavedMusicAsyncType, removeFromSavedMusicState, REMOVE_FROM_SAVED_MUSIC_ASYNC, SaveMusicAsyncType, saveMusicState, SAVE_MUSIC_ASYNC, SetMusicAsyncType, setMusicState, SET_MUSIC_ASYNC } from "../Reducers/playlistReducer";



function* setPlaylistsWorker(action: SetPlaylistsAsyncType) {
    try {
        yield put(setInit(true))
        yield put(setMessage(null))
        const data: GetPlaylistsType = yield call(getPlaylists, action.filters)
        if (data.success) {
            yield put(setPlaylistsState(data.playlists))
            yield put(setCount(data.count))
        } else if (data.message) {
            yield put(setMessage(data.message))
        }
        yield put(setInit(false))
    } catch (e) {
        yield put(setInit(false))
        yield put(setMessage(e.message))
    }
}
function* addPlaylistWorker(action: AddPlaylistAsyncType) {
    try {
        yield put(setInit(true))
        yield put(setMessage(null))
        const data: (ResultCodeType & { playlistId: string }) = yield call(addPlaylist, action.title, action.isPublic)
        let textMessage = ''
        if (data.success) {
            if (action.img) {
                const imgData: ResultCodeType = yield call(setImgPlaylist, data.playlistId, action.img)
                if (imgData.success) {
                    textMessage = 'Playlist was added successful'
                } else if (imgData.message) {
                    textMessage = `Playlist was added successful, but img don't upload`
                }
            } else {
                textMessage = 'Playlist was added successful'
            }
            yield put(setInit(false))
            yield put(setShowToast(true, textMessage, action.callback))
            yield action.callback()
        } else if (data.message) {
            yield put(setMessage(data.message))
            yield put(setInit(false))
        }
    } catch (e) {
        yield put(setInit(false))
        yield put(setMessage(e.message))
    }
}
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
        }
        else {
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


export function* playlistsWatcher() {
    yield takeLatest(SET_ACTIVE_PLAYLIST_ASYNC, setActivePlaylistWorker)
    yield takeLatest(REMOVE_MUSIC_FROM_PLAYLIST_ASYNC, removeMusicFromPlaylistWorker)
    yield takeLatest(SET_PLAYLIST_ASYNC, setPlaylistWorker)
    yield takeLatest(RATE_PLAYLIST_ASYNC, ratePlaylistWorker)
    yield takeLatest(SAVE_PLAYLIST_ASYNC, savePlaylistWorker)
    yield takeLatest(REMOVE_FROM_SAVED_PLAYLIST_ASYNC, removeFromSavedPlaylistWorker)
    yield takeLatest(SET_PLAYLISTS_ASYNC, setPlaylistsWorker)
    yield takeLatest(ADD_PLAYLIST_ASYNC, addPlaylistWorker)
    yield takeLatest(SET_MUSICS_ASYNC, setMusicsWorker)
    yield takeLatest(ADD_MUSIC_TO_PLAYLIST_ASYNC, addMusicToPlaylistWorker)
}
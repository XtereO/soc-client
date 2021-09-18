import { AddMusicType, ADD_MUSIC, setInit, setMessage } from "../Reducers/musicReducer";
import { addMusic, AddMusicRequestType, setImgMusic, setMP3Music,ResultCodeType } from "../../DAL/api";
import { call, put, takeLatest } from "@redux-saga/core/effects";





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




export function* musicWatcher() {
    yield takeLatest(ADD_MUSIC, addMusicWorker)
}
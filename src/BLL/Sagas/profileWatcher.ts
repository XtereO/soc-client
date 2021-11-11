import { call, put, takeEvery, takeLatest } from "@redux-saga/core/effects";
import { getProfile, GetProfileType, getReviews, GetReviewType, ResultCodeType, sendMessageProfile, setAvatar, SetAvatarType, setNames, setPasswords } from "../../DAL/api";
import { ProfileType, ReviewType } from "../../Types/profile";
import { setAboutMeState, SetAboutMeAsyncType, setCount, setInit, setPage, setProfile, SetProfileAsyncType, setReviews, SetReviewsAsyncType, SET_PROFILE_ASYNC, SET_REVIEWS_ASYNC, SET_ABOUT_ME_ASYNC, SetNamesAsyncType, SET_NAMES_ASYNC, setNamesState, setMessage, SetAvatarAsyncType, SET_AVATAR_ASYNC, setAvatarState, SetPasswordsAsyncType, SET_PASSWORDS_ASYNC, SendMessageType, SEND_MESSAGE } from "../Reducers/profileReducer";
import { setAboutMe } from '../../DAL/api'
import { setAuth, setShowToast } from "../Reducers/authReducer";




function* sendMessageWorker(action: SendMessageType) {
    try{
        yield put(setInit(true))
        yield put(setMessage(null))
        const response: ResultCodeType = yield call(sendMessageProfile,action.companionId,action.textMessage)
        if(response.success){
            yield put(setInit(false))
            yield action.callback()
            yield put(setShowToast(true,'Message send successfull'))
        }else if(response.message){
            yield put(setInit(false))
            yield put(setMessage(response.message))
        }
        yield put(setInit(false))
    }catch(e){
        yield put(setInit(false))
        yield put(setMessage(e.message))
    }
}
function* reviewsWorker(action: SetReviewsAsyncType) {
    try {
        yield put(setInit(true))
        yield put(setMessage(null))
        const response: GetReviewType = yield call(getReviews, action.idWhoNeedIt,
            action.page, true, action.size, 'User')
        yield put(setReviews(response.reviews))
        yield put(setPage(action.page))
        yield put(setCount(response.count))
        yield put(setInit(false))
    } catch (e) {
        yield put(setInit(false))
        yield put(setMessage(e.message))
    }
}
function* profileWorker(action: SetProfileAsyncType) {
    try {
        yield put(setInit(true))
        const res: GetProfileType = yield call(getProfile, action.userId ? action.userId : '')
        yield put(setProfile(res.user, action.isMyProfile))
        yield put(setInit(false))
    } catch (e) {

    }
}
function* aboutMeWorker(action: SetAboutMeAsyncType) {
    try {
        yield put(setInit(true))
        yield call(setAboutMe, action.aboutMe)
        yield put(setAboutMeState(action.aboutMe))
        yield put(setInit(false))
    } catch (e) {

    }
}
function* namesWorker(action: SetNamesAsyncType) {
    try{
        yield put(setInit(true))
        const res:ResultCodeType = yield call(setNames,action.names)
        yield put(setInit(false))
        if(res.success){
            yield put(setNamesState(action.names))
            yield put(setMessage(null))
            yield action.showToast()
        }else{
            yield put(setMessage(res.message ? res.message : 'Some error occured'))
        }
    }catch(e){
        yield put(setInit(false))
        yield put(setMessage(e.message))
    }
}
function* avatarWorker(action: SetAvatarAsyncType) {
    try{
        yield put(setInit(true))
        const res:(SetAvatarType & ResultCodeType) = yield call(setAvatar,action.file)
        if(res.success){
            yield put(setMessage(null))
            yield put(setInit(false))
            yield put(setAvatarState(res.avatar))
            yield action.showToast()
        }else{
            yield put(setInit(false))
            yield put(setMessage(res.message ? res.message : 'Some error occured'))
        }
    }catch(e){
        yield put(setInit(false))
        yield put(setMessage(e.message))
    }
}
function* passwordsWorker(action: SetPasswordsAsyncType) {
    try{
        yield put(setInit(true))
        const res:ResultCodeType = yield call(setPasswords,action.password,action.passwordRepeat)
        yield put(setInit(false))
        if(res.success){
            yield put(setMessage(null))
            yield action.showToast()
            yield put(setAuth(false))
        }else{
            yield put(setMessage(res.message ? res.message : 'Some error occured'))
        }
    }catch(e){
        yield put(setInit(false))
        yield put(setMessage(e.message))
    }
}

export function* profileWatcher() {
    yield takeLatest(SEND_MESSAGE, sendMessageWorker)
    yield takeLatest(SET_PROFILE_ASYNC, profileWorker)
    yield takeLatest(SET_REVIEWS_ASYNC, reviewsWorker)
    yield takeLatest(SET_ABOUT_ME_ASYNC, aboutMeWorker)
    yield takeLatest(SET_NAMES_ASYNC, namesWorker)
    yield takeLatest(SET_AVATAR_ASYNC, avatarWorker)
    yield takeLatest(SET_PASSWORDS_ASYNC, passwordsWorker)
}
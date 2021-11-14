import { takeEvery, call, put } from "redux-saga/effects";
import { confirmCode, login, registrate, ResultCodeType } from "../../DAL/api";
import { LoginRequestType, RegistrateRequestType, ShowToastType } from "../../Types/auth";
import { LOGIN, LoginType, REGISRATE, RegistrateType, setAuth, setMessage, setLocalStorage, setInit, ConfirmCodeType, CONFIRM_CODE } from "../Reducers/authReducer";



type ResultCodeWithTokenType = {
    token?: string
    success: boolean
    message?: string
}
function* loginWorker(action: (LoginType & LoginRequestType & ShowToastType)) {
    try {
        yield put(setInit(true))
        const data: ResultCodeWithTokenType = yield call(login, action.email, action.password)
        if (data.success && data.token) {
            yield put(setLocalStorage(data.token))
            yield put(setMessage(null))
            yield put(setAuth(true))
            yield put(setInit(false))
            yield action.showToast()
            yield window.location.reload()
        } else { 
            yield put(setInit(false))
            yield put(setMessage(data.message ? data.message : 'Some error occured'))
        }
    } catch (e) {
        yield put(setInit(false))
        yield put(setMessage('Some error occured'))
    }
}
function* registrateWorker(action: (ShowToastType & RegistrateType & RegistrateRequestType)) {
    try {
        const req = {
            firstName: action.firstName,
            secondName: action.secondName,
            shortNickname: action.shortNickname,
            email: action.email,
            password: action.password
        }
        yield put(setInit(true))
        const data: ResultCodeType = yield call(registrate, req)
        if (!data.success) {
            yield put(setMessage(data.message ? data.message : 'Some error occured'))
        } else {
            yield put(setMessage(null))
            yield action.showToast()
        }
        yield put(setInit(false))
    } catch (e) {
        yield put(setInit(false))
        yield put(setMessage(e.message))
    }
}
function* confirmCodeWorker(action: ConfirmCodeType) {
    yield put(setInit(true))
    const data: ResultCodeType = yield call(confirmCode, action.getter, action.textMessage)
    if (data.success) {
        yield put(setMessage(null))
    } else {
        yield put(setMessage(data.message ? data.message : 'Some error occured'))
    }
    yield put(setInit(false))
}


export function* authWatcher() {
    yield takeEvery(LOGIN, loginWorker)
    yield takeEvery(REGISRATE, registrateWorker)
    yield takeEvery(CONFIRM_CODE, confirmCodeWorker)
}
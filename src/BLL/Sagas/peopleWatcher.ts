import { call, put, takeLatest } from "@redux-saga/core/effects";
import { follow, getPeople, GetPeopleType, ResultCodeType, unfollow } from "../../DAL/api";
import { FOLLOW, FollowType, setCount, setInit, setMessage, setOnePeopleFollow, setPage, SetPeopleAsyncType, setPeopleState, SET_PEOPLE_ASYNC, UNFOLLOW, UnFollowType } from "../Reducers/peopleReducer";




function* peopleWorker(action: SetPeopleAsyncType) {
    try {
        yield put(setInit(true))
        const date: GetPeopleType = yield call(getPeople, action.page, action.portionSize, action.title)
        if (!date.success) {
            yield put(setMessage(date.message ? date.message : 'Some error occured'))
        } else {
            yield put(setMessage(null))
            yield put(setPeopleState(date.users))
            yield put(setPage(action.page))
            yield put(setCount(date.count))
        }

        yield put(setInit(false))
    } catch (e) {
        yield put(setInit(false))
        yield put(setMessage(e.message))
    }
}
function* followWorker(action: FollowType) {
    try {
        yield put(setInit(true))
        const data: ResultCodeType = yield call(follow, action.userId)
        if (!data.success) {
            yield put(setMessage(data.message ? data.message : 'Some error occured'))
        }
        yield put(setOnePeopleFollow(action.userId,true))
        yield put(setInit(false))
    } catch (e) {
        yield put(setInit(false))
        yield put(setMessage(e.message))
    }
}
function* unfollowWorker(action: UnFollowType) {
    try {
        yield put(setInit(true))
        const data: ResultCodeType = yield call(unfollow, action.userId)
        if (!data.success) {
            yield put(setMessage(data.message ? data.message : 'Some error occured'))
        }
        yield put(setOnePeopleFollow(action.userId,false))
        yield put(setInit(false))
    } catch (e) {
        yield put(setInit(false))
        yield put(setMessage(e.message))
    }
}




export function* peopleWatcher() {
    yield takeLatest(SET_PEOPLE_ASYNC, peopleWorker)
    yield takeLatest(FOLLOW, followWorker)
    yield takeLatest(UNFOLLOW, unfollowWorker)
}
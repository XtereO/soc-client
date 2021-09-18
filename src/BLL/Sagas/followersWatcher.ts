import { call, put, takeLatest } from "@redux-saga/core/effects";
import { follow, getFollowers, GetPeopleType, ResultCodeType, unfollow } from "../../DAL/api";
import { FOLLOW, FollowType, setCount, setInit, setMessage, setOnePeopleFollow, setPage, SetFollowersAsyncType, setFollowersState, SET_FOLLOWERS_ASYNC, UNFOLLOW, UnFollowType } from "../Reducers/followersReducer";




function* followersWorker(action: SetFollowersAsyncType) {
    try {
        yield put(setInit(true))
        const date: GetPeopleType = yield call(getFollowers, action.page, action.portionSize, action.title)
        if (!date.success) {
            yield put(setMessage(date.message ? date.message : 'Some error occured'))
        } else {
            yield put(setMessage(null))
            yield put(setFollowersState(date.users))
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




export function* followersWatcher() {
    yield takeLatest(SET_FOLLOWERS_ASYNC, followersWorker)
    yield takeLatest(FOLLOW, followWorker)
    yield takeLatest(UNFOLLOW, unfollowWorker)
}
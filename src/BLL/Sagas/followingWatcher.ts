import { call, put, takeLatest } from "@redux-saga/core/effects";
import { follow,  getFollowing, GetPeopleType, ResultCodeType, unfollow } from "../../DAL/api";
import { FOLLOW, FollowType, setCount, setInit, setMessage, setOnePeopleFollow, setPage, SetFollowingAsyncType, setFollowingState, SET_FOLLOWING_ASYNC, UNFOLLOW, UnFollowType } from "../Reducers/followingReducer";




function* followingWorker(action: SetFollowingAsyncType) {
    try {
        yield put(setInit(true))
        const date: GetPeopleType = yield call(getFollowing, action.page, action.portionSize, action.title, action.userId)
        if (!date.success) {
            yield put(setMessage(date.message ? date.message : 'Some error occured'))
        } else {
            yield put(setMessage(null))
            yield put(setFollowingState(date.users))
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




export function* followingWatcher() {
    yield takeLatest(SET_FOLLOWING_ASYNC, followingWorker)
    yield takeLatest(FOLLOW, followWorker)
    yield takeLatest(UNFOLLOW, unfollowWorker)
}
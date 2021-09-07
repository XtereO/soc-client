import { call, put, takeEvery } from "@redux-saga/core/effects";
import { getProfile, GetProfileType, getReviews, GetReviewType } from "../../DAL/api";
import { ProfileType, ReviewType } from "../../Types/profile";
import { setCount, setInit, setPage, setProfile, SetProfileAsyncType, setReviews, SetReviewsAsyncType, SET_PROFILE_ASYNC, SET_REVIEWS_ASYNC } from "../Reducers/profileReducer";





function* reviewsWorker(action: SetReviewsAsyncType) {
    try {
        yield put(setInit(true))
        const response: GetReviewType = yield call(getReviews, action.idWhoNeedIt,
            action.page, action.showNewFirst, action.size, 'User')
        yield put(setInit(false))
        yield put(setReviews(response.reviews))
        yield put(setPage(action.page))
        yield put(setCount(response.count))
    } catch (e) {

    }
}
function* profileWorker(action: SetProfileAsyncType) {
    try {
        yield put(setInit(true))
        const res: GetProfileType = yield call(getProfile, action.userId ? action.userId : '')
        yield put(setProfile(res.user))
        yield put(setInit(false))
    } catch (e) {

    }
}

export function* profileWatcher() {
    yield takeEvery(SET_PROFILE_ASYNC, profileWorker)
    yield takeEvery(SET_REVIEWS_ASYNC, reviewsWorker)
}
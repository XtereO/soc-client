import { ProfileType, ReviewType } from "../../Types/profile"

const SET_PROFILE: "profileReducer/SET_PROFILE" = "profileReducer/SET_PROFILE"
const SET_REVIEWS: "profileReducer/SET_REVIEWS" = "profileReducer/SET_REVIEWS"
const SET_INIT: 'profileReducer/SET_INIT' = 'profileReducer/SET_INIT'
const SET_PAGE:'profileReducer/SET_PAGE'='profileReducer/SET_PAGE'
const SET_COUNT:'profileReducer/SET_COUNT'='profileReducer/SET_COUNT'
export const SET_PROFILE_ASYNC: 'profileReducer/SET_PROFILE_ASYNC' = 'profileReducer/SET_PROFILE_ASYNC'
export const SET_REVIEWS_ASYNC: 'profileReducer/SET_REVIEWS_ASYNC' = 'profileReducer/SET_REVIEWS_ASYNC'


const initialState = {
    isInit: false as boolean,
    profile: {
        shortNickname: '' as string,
        userId: null as string | null,
        firstName: '' as string,
        secondName: '' as string,
        aboutMe: '' as string,
        followers: 0 as number,
        subscribers: 0 as number
    } as ProfileType,
    reviews: [] as ReviewType[],
    page: 1 as number,
    count: 0 as number
}

type InititialStateType = typeof initialState
type ActionType = (SetReviewsType | SetProfileType 
    | SetInitType | SetCountType | SetPageType)

export const profileReducer = (state = initialState, action: ActionType): InititialStateType => {
    switch (action.type) {
        case SET_REVIEWS:
            return {
                ...state,
                reviews: [...action.reviews]
            }
        case SET_PROFILE:
            return {
                ...state,
                profile: { ...action }
            }
        case SET_INIT:
            return {
                ...state,
                isInit: action.isInit
            }
        case SET_COUNT:
            return{
                ...state,
                count: action.count
            }
        case SET_PAGE:
            return{
                ...state,
                page: action.page
            }
        default:
            return state
    }
}

type SetCountType={
    type: typeof SET_COUNT
    count: number
}
export const setCount=(count:number):SetCountType=>{
    return{
        count,
        type: SET_COUNT
    }
}

type SetPageType = {
    type: typeof SET_PAGE
    page: number
}
export const setPage=(page:number):SetPageType=>{
    return{
        type: SET_PAGE,
        page
    }
}

type SetReviewsType = {
    type: typeof SET_REVIEWS
    reviews: ReviewType[]
}
export const setReviews = (reviews: ReviewType[]): SetReviewsType => {
    return {
        type: SET_REVIEWS,
        reviews
    }
}
type SetProfileType = {
    type: typeof SET_PROFILE
    shortNickname: string
    userId: string | null
    firstName: string
    secondName: string
    aboutMe: string
    followers: number
    subscribers: number
}
export const setProfile = (req: ProfileType): SetProfileType => {
    return {
        ...req,
        type: SET_PROFILE
    }
}
type SetInitType = {
    type: typeof SET_INIT
    isInit: boolean
}
export const setInit = (isInit: boolean): SetInitType => {
    return {
        type: SET_INIT,
        isInit
    }
}

export type SetReviewsAsyncType = {
    type: typeof SET_REVIEWS_ASYNC
    page: number
    size: number
    showNewFirst: boolean
    idWhoNeedIt: string
}
export const setReviewsAsync = (idWhoNeedIt: string, page: number = 1, size: number = 6, showNewFirst: boolean = true): SetReviewsAsyncType => {
    return {
        idWhoNeedIt,
        page, size,
        showNewFirst,
        type: SET_REVIEWS_ASYNC
    }
}
export type SetProfileAsyncType = {
    type: typeof SET_PROFILE_ASYNC
    userId: string | null
}
export const setProfileAsync = (userId: string | null = null): SetProfileAsyncType => {
    return {
        type: SET_PROFILE_ASYNC,
        userId
    }
}

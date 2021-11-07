import { NamesType, ProfileDetailType, ProfileType, ReviewType } from "../../Types/profile"

const SET_PROFILE: "profileReducer/SET_PROFILE" = "profileReducer/SET_PROFILE"
const SET_REVIEWS: "profileReducer/SET_REVIEWS" = "profileReducer/SET_REVIEWS"
const SET_INIT: 'profileReducer/SET_INIT' = 'profileReducer/SET_INIT'
const SET_PAGE: 'profileReducer/SET_PAGE' = 'profileReducer/SET_PAGE'
const SET_COUNT: 'profileReducer/SET_COUNT' = 'profileReducer/SET_COUNT'
const SET_ABOUT_ME: 'profileReducer/SET_ABOUT_ME' = 'profileReducer/SET_ABOUT_ME'
const SET_NAMES: 'profileReducer/SET_NAMES' = 'profileReducer/SET_NAMES'
const SET_MESSAGE: 'profileReducer/SET_MESSAGE' = 'profileReducer/SET_MESSAGE'
const SET_AVATAR_STATE: 'profileReducer/SET_AVATAR_STATE' = 'profileReducer/SET_AVATAR_STATE'
export const SET_PASSWORDS_ASYNC:'profileReducer/SET_PASSWORDS_ASYNC'='profileReducer/SET_PASSWORDS_ASYNC'
export const SET_AVATAR_ASYNC: 'profileReducer/SET_AVATAR_ASYNC'='profileReducer/SET_AVATAR_ASYNC'
export const SET_NAMES_ASYNC: 'profileReducer/SET_NAMES_ASYNC' = 'profileReducer/SET_NAMES_ASYNC'
export const SET_PROFILE_ASYNC: 'profileReducer/SET_PROFILE_ASYNC' = 'profileReducer/SET_PROFILE_ASYNC'
export const SET_REVIEWS_ASYNC: 'profileReducer/SET_REVIEWS_ASYNC' = 'profileReducer/SET_REVIEWS_ASYNC'
export const SET_ABOUT_ME_ASYNC: 'profileReducer/SET_ABOUT_ME_ASYNC' = 'profileReducer/SET_ABOUT_ME_ASYNC'

const initialState = {
    isInit: false as boolean,
    profile: {
        shortNickname: '',
        avatar: null,
        userId: '',
        firstName: '',
        secondName: '',
        aboutMe: '',
        followers: 0,
        following: 0,
        isFollow: null,
        unreadedMessages: 0
    } as ProfileDetailType,
    myProfile: {
        shortNickname: '',
        avatar: null,
        userId: '',
        firstName: '',
        secondName: '',
        aboutMe: '',
        followers: 0,
        following: 0,
        isFollow: null,
        unreadedMessages:0
    } as ProfileDetailType,
    reviews: [] as ReviewType[],
    page: 1 as number,
    count: 0 as number,
    message: null as null | string
}

type InititialStateType = typeof initialState
type ActionType = (SetReviewsType | SetProfileType
    | SetInitType | SetCountType | SetPageType | SetAboutMeType
    | SetNamesStateType | SetMessageType | SetAvatarStateType)

export const profileReducer = (state = initialState, action: ActionType): InititialStateType => {
    switch (action.type) {
        case SET_AVATAR_STATE:
            return{
                ...state,
                myProfile:{
                    ...state.myProfile,
                    avatar: action.avatar
                },profile:{
                    ...state.profile,
                    avatar: action.avatar
                }
            }
        case SET_MESSAGE:
            return {
                ...state,
                message: action.message
            }
        case SET_NAMES:
            return {
                ...state,
                myProfile: {
                    ...state.myProfile,
                    ...action.names
                },profile: {
                    ...state.profile,
                    ...action.names
                }
            }
        case SET_ABOUT_ME:
            return {
                ...state,
                myProfile: {
                    ...state.myProfile,
                    aboutMe: action.aboutMe
                },profile: {
                    ...state.profile,
                    aboutMe: action.aboutMe
                }
            }
        case SET_REVIEWS:
            return {
                ...state,
                reviews: [...action.reviews]
            }
        case SET_PROFILE:
            if (action.isMyProfile) {
                return {
                    ...state,
                    myProfile: { ...action }
                }
            }
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
            return {
                ...state,
                count: action.count
            }
        case SET_PAGE:
            return {
                ...state,
                page: action.page
            }
        default:
            return state
    }
}


export type SetPasswordsAsyncType={
    type: typeof SET_PASSWORDS_ASYNC
    password: string
    passwordRepeat: string
    showToast:()=>void
}
export const setPasswordsAsync=(password: string, passwordRepeat: string,showToast:()=>void):SetPasswordsAsyncType=>{
    return{
        type: SET_PASSWORDS_ASYNC,
        password,passwordRepeat,
        showToast
    }
}

type SetAvatarStateType ={
    type: typeof SET_AVATAR_STATE
    avatar: string
}
export const setAvatarState=(avatar: string):SetAvatarStateType=>{
    return{
        type: SET_AVATAR_STATE,
        avatar
    }
}
export type SetAvatarAsyncType = {
    type: typeof SET_AVATAR_ASYNC
    file: any //image
    showToast:()=>void
}
export const setAvatarAsync = (file: any, showToast:()=>void) =>{
    return{
        type: SET_AVATAR_ASYNC,
        file,showToast
    }
}

type SetMessageType = {
    type: typeof SET_MESSAGE,
    message: string | null 
}
export const setMessage = (message: string | null): SetMessageType => {
    return {
        type: SET_MESSAGE,
        message
    }
}

export type SetNamesAsyncType = {
    type: typeof SET_NAMES_ASYNC
    names: NamesType
    showToast: ()=>void
}
export const setNamesAsync = (names: NamesType,showToast:()=>void): SetNamesAsyncType => {
    return {
        type: SET_NAMES_ASYNC,
        names,showToast
    }
}
type SetNamesStateType = {
    type: typeof SET_NAMES,
    names: NamesType
}
export const setNamesState = (names: NamesType): SetNamesStateType => {
    return {
        type: SET_NAMES,
        names
    }
}

export type SetAboutMeAsyncType = {
    type: typeof SET_ABOUT_ME_ASYNC,
    aboutMe: string
}
export const SetAboutMeAsync = (aboutMe: string): SetAboutMeAsyncType => {
    return {
        type: SET_ABOUT_ME_ASYNC,
        aboutMe
    }
}

type SetAboutMeType = {
    type: typeof SET_ABOUT_ME
    aboutMe: string
}
export const setAboutMeState = (aboutMe: string): SetAboutMeType => {
    return {
        type: SET_ABOUT_ME,
        aboutMe
    }
}

type SetCountType = {
    type: typeof SET_COUNT
    count: number
}
export const setCount = (count: number): SetCountType => {
    return {
        count,
        type: SET_COUNT
    }
}

type SetPageType = {
    type: typeof SET_PAGE
    page: number
}
export const setPage = (page: number): SetPageType => {
    return {
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
    avatar: string | null
    userId: string | null
    firstName: string
    secondName: string
    aboutMe: string
    following: number
    followers: number
    isFollow: boolean | null
    isMyProfile: boolean
    unreadedMessages: number
}
export const setProfile = (req: ProfileDetailType, isMyProfile: boolean): SetProfileType => {
    return {
        ...req,
        type: SET_PROFILE,
        isMyProfile
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
    isMyProfile: boolean
}
export const setProfileAsync = (userId: string | null = null, isMyProfile = false): SetProfileAsyncType => {
    return {
        type: SET_PROFILE_ASYNC,
        userId, isMyProfile
    }
}

import { stat } from "fs";
import { GenreType, MusicDetailType } from "../../Types/music";
import { ReviewType } from "../../Types/profile";

export const SET_MUSIC_ASYNC: 'musicReducer/SET_MUSIC_ASYNC' = 'musicReducer/SET_MUSIC_ASYNC'
const SET_MUSIC_STATE: 'musicReducer/SET_MUSIC_STATE' = 'musicReducer/SET_MUSIC_STATE'
export const RATE_MUSIC_ASYNC: 'musicReducer/RATE_MUSIC_ASYNC' = 'musicReducer/RATE_MUSIC_ASYNC'
const RATE_MUSIC_STATE: 'musicReducer/RATE_MUSIC_STATE' = 'musicReducer/RATE_MUSIC_STATE'
export const SAVE_MUSIC_ASYNC: 'musicReducer/SAVE_MUSIC_ASYNC' = 'musicReducer/SAVE_MUSIC_ASYNC'
const SAVE_MUSIC_STATE: 'musicReducer/SAVE_MUSIC_STATE' = 'musicReducer/SAVE_MUSIC_STATE'
export const REMOVE_FROM_SAVED_MUSIC_ASYNC: 'musicReducer/REMOVE_FROM_SAVED_MUSIC_ASYNC' = 'musicReducer/REMOVE_FROM_SAVED_MUSIC_ASYNC'
const REMOVE_FROM_SAVED_MUSIC_STATE: 'musicReducer/REMOVE_FROM_SAVED_MUSIC_STATE' = 'musicReducer/REMOVE_FROM_SAVED_MUSIC_STATE'
export const SET_ACTIVE_MUSIC_ASYNC: 'musicReducer/SET_ACTIVE_MUSIC_ASYNC' = 'musicReducer/SET_ACTIVE_MUSIC_ASYNC'
const SET_ACTIVE_MUSIC_STATE: 'musicReducer/SET_ACTIVE_MUSIC_STATE' = 'musicReducer/SET_ACTIVE_MUSIC_STATE'
export const SET_REVIEWS_ASYNC: 'musicReducer/SET_REVIEWS_ASYNC' = 'musicReducer/SET_REVIEWS_ASYNC'
const SET_REVIEWS_STATE: 'musicReducer/SET_REVIEWS_STATE' = 'musicReducer/SET_REVIEWS_STATE'
const SET_PAGE_REVIEWS: 'musicReducer/SET_PAGE_REVIEWS' = 'musicReducer/SET_PAGE_REVIEWS'
const SET_COUNT_REVIEWS: 'musicReducer/SET_COUNT_REVIEWS' = 'musicReducer/SET_COUNT_REVIEWS'
const SET_INIT:'musicReducer/SET_INIT'='musicReducer/SET_INIT'
const SET_MESSAGE:'musicReducer/SET_MESSAGE'='musicReducer/SET_MESSAGE'



const initialState = {
    music: null as null | MusicDetailType,
    reviews: [] as ReviewType[],
    page: 1 as number,
    count: 0 as number,
    isInit: false as boolean,
    message: null as string | null
}
type InitialStateType = typeof initialState
type ActionType = (
    SetMusicStateType | RateMusicStateType |
    SaveMusicStateType | RemoveFromSavedMusicStateType |
    SetActiveMusicStateType | SetReviewsStateType |
    SetPageReviewsType | SetCountReviewsType |
    SetMessageType | SetInitType)

export const musicReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case SET_INIT: 
            return{
                ...state,
                isInit: action.isInit
            }
        case SET_MESSAGE:
            return{
                ...state,
                message: action.message
            }
        case SET_MUSIC_STATE:
            return {
                ...state,
                music: state.music ? {
                    ...state.music,
                    ...action.payload
                } : null
            }
        case RATE_MUSIC_STATE:
            return {
                ...state,
                //@ts-ignore
                music: state.music ? {
                    ...state.music,
                    summaryRating: state.music.myReview ?
                        state.music.summaryRating - state.music.myReview.rating
                        + action.rating :
                        state.music.summaryRating + action.rating,
                    countRated: state.music.myReview ?
                        state.music.countRated :
                        (state.music.countRated + 1),
                    //@ts-ignore
                    myReview: {
                        rating: action.rating,
                        review: '',
                    }
                } : null
            }
        case SAVE_MUSIC_STATE:
            return {
                ...state,
                music: state.music ? {
                    ...state.music,
                    countSaves: (state.music.countSaves + 1),
                    isSaved: true
                } : null
            }
        case REMOVE_FROM_SAVED_MUSIC_STATE:
            return {
                ...state,
                music: state.music ? {
                    ...state.music,
                    countSaves: (state.music.countSaves - 1),
                    isSaved: false
                } : null
            }
        case SET_ACTIVE_MUSIC_STATE:
            return {
                ...state,
                music: action.music
            }
        case SET_REVIEWS_STATE:
            return{
                ...state,
                reviews: [...action.reviews]
            }
        case SET_PAGE_REVIEWS:
            return{
                ...state,
                page:action.page
            }
        case SET_COUNT_REVIEWS:
            return{
                ...state,
                count:action.count
            }
        default:
            return state
    }
}


type SetInitType={
    type: typeof SET_INIT
    isInit: boolean
}
export const setInit=(isInit:boolean):SetInitType=>{
    return{
        type: SET_INIT,
        isInit
    }
}

type SetMessageType={
    type: typeof SET_MESSAGE
    message: string | null
}
export const setMessage=(message:string|null):SetMessageType=>{
    return{
        type: SET_MESSAGE,
        message
    }
}

type SetReviewsStateType = {
    type: typeof SET_REVIEWS_STATE
    reviews: ReviewType[]
}
export const setReviewsState = (reviews: ReviewType[]): SetReviewsStateType => {
    return {
        type: SET_REVIEWS_STATE,
        reviews
    }
}


export type SetReviewsAsyncType = {
    type: typeof SET_REVIEWS_ASYNC
    page: number
    musicId: string
}
export const setReviewsAsync = (page: number, musicId: string): SetReviewsAsyncType => {
    return {
        type: SET_REVIEWS_ASYNC,
        page, musicId
    }
}


type SetPageReviewsType = {
    type: typeof SET_PAGE_REVIEWS
    page: number
}
export const setPageReviews = (page: number): SetPageReviewsType => {
    return {
        type: SET_PAGE_REVIEWS,
        page
    }
}


type SetCountReviewsType = {
    type: typeof SET_COUNT_REVIEWS
    count: number
}
export const setCountReviews = (count: number): SetCountReviewsType => {
    return {
        type: SET_COUNT_REVIEWS,
        count
    }
}


export type SetMusicAsyncType = {
    type: typeof SET_MUSIC_ASYNC
    musicId: string
    payload: PayloadSetMusicAsyncType
    callback: () => void
}
type PayloadSetMusicAsyncType = {
    genre?: GenreType
    title?: string
    author?: string
    music?: any //file
    img?: any  // file
}
export const setMusicAsync = (musicId: string, callback: () => void, payload: PayloadSetMusicAsyncType): SetMusicAsyncType => {
    return {
        type: SET_MUSIC_ASYNC,
        musicId,
        payload, callback
    }
}


type SetMusicStateType = {
    type: typeof SET_MUSIC_STATE
    payload: PayloadSetMusicStateType
}
type PayloadSetMusicStateType = {
    genre?: GenreType
    title?: string
    author?: string
    musicSrc?: string
    imgSrc?: string
}
export const setMusicState = (payload: PayloadSetMusicStateType): SetMusicStateType => {
    return {
        type: SET_MUSIC_STATE,
        payload
    }
}

type RateMusicStateType = {
    type: typeof RATE_MUSIC_STATE
    rating: number
}
export const rateMusicState = (rating: number): RateMusicStateType => {
    return {
        type: RATE_MUSIC_STATE,
        rating
    }
}

export type RateMusicAsyncType = {
    type: typeof RATE_MUSIC_ASYNC
    review?: string
    rating: number
    musicId: string
    musicTitle: string
    callback: () => void
}
export const rateMusicAsync = (musicId: string, musicTitle: string, rating: number, callback: () => void, review?: string): RateMusicAsyncType => {
    return {
        musicId, review,
        musicTitle, rating,
        callback,
        type: RATE_MUSIC_ASYNC
    }
}

type SaveMusicStateType = {
    type: typeof SAVE_MUSIC_STATE
}
export const saveMusicState = (): SaveMusicStateType => {
    return {
        type: SAVE_MUSIC_STATE
    }
}

export type SaveMusicAsyncType = {
    musicId: string
    type: typeof SAVE_MUSIC_ASYNC
}
export const saveMusicAsync = (musicId: string): SaveMusicAsyncType => {
    return {
        musicId,
        type: SAVE_MUSIC_ASYNC
    }
}

type RemoveFromSavedMusicStateType = {
    type: typeof REMOVE_FROM_SAVED_MUSIC_STATE
}
export const removeFromSavedMusicState = (): RemoveFromSavedMusicStateType => {
    return {
        type: REMOVE_FROM_SAVED_MUSIC_STATE
    }
}

export type RemoveFromSavedMusicAsyncType = {
    type: typeof REMOVE_FROM_SAVED_MUSIC_ASYNC
    musicId: string
}
export const removeFromSavedMusicAsync = (musicId: string): RemoveFromSavedMusicAsyncType => {
    return {
        type: REMOVE_FROM_SAVED_MUSIC_ASYNC,
        musicId
    }
}

type SetActiveMusicStateType = {
    type: typeof SET_ACTIVE_MUSIC_STATE
    music: MusicDetailType
}
export const setActiveMusicState = (music: MusicDetailType): SetActiveMusicStateType => {
    return {
        type: SET_ACTIVE_MUSIC_STATE,
        music
    }
}
export type SetActiveMusicAsyncType = {
    type: typeof SET_ACTIVE_MUSIC_ASYNC
    musicId: string
}
export const setActiveMusicAsync = (musicId: string): SetActiveMusicAsyncType => {
    return {
        type: SET_ACTIVE_MUSIC_ASYNC,
        musicId
    }
}

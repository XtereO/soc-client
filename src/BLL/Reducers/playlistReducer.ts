import { FilterGetMusicType, GenreType } from "../../Types/music";
import { GetPlaylistsFiltersType, MinimilizeMusicType, PlaylistDetailType, PlaylistType } from "../../Types/playlist";
import { ReviewType } from "../../Types/profile";

const SET_INIT:'playlistReducer/SET_INIT'='playlistReducer/SET_INIT'
const SET_MESSAGE:'playlistReducer/SET_MESSAGE'='playlistReducer/SET_MESSAGE'
const SAVE_PLAYLIST_STATE:'playlistReducer/SAVE_PLAYLIST_STATE'='playlistReducer/SAVE_PLAYLIST_STATE'
const REMOVE_FROM_SAVED_PLAYLIST_STATE:'playlistReducer/REMOVE_FROM_SAVED_PLAYLIST_STATE'='playlistReducer/REMOVE_FROM_SAVED_PLAYLIST_STATE'
const RATE_PLAYLIST_STATE:'playlistReducer/RATE_PLAYLIST_STATE'='playlistReducer/RATE_PLAYLIST_STATE'
const SET_PLAYLIST_STATE:'playlistReducer/SET_PLAYLIST_STATE'='playlistReducer/SET_PLAYLIST_STATE'
const SET_MUSICS_STATE:'playlistReducer/SET_MUSICS_STATE'='playlistReducer/SET_MUSICS_STATE'
const ADD_MUSIC_TO_PLAYLIST_STATE:'playlistReducer/ADD_MUSIC_STATE'='playlistReducer/ADD_MUSIC_STATE'
const SET_MUSICS_FILTERS:'playlistReducer/SET_MUSICS_FILTERS'='playlistReducer/SET_MUSICS_FILTERS'
const SET_COUNT_MUSIC:'playlistReducer/SET_COUNT_MUSIC'='playlistReducer/SET_COUNT_MUSIC'
const REMOVE_MUSIC_FROM_PLAYLIST_STATE:'playlistReducer/REMOVE_MUSIC_FROM_PLAYLIST_STATE'='playlistReducer/REMOVE_MUSIC_FROM_PLAYLIST_STATE'
const SET_REVIEWS_STATE:'playlistReducer/SET_REVIEWS_STATE'='playlistReducer/SET_REVIEWS_STATE'
const SET_PAGE_REVIEWS:'playlistReducer/SET_PAGE_REVIEWS'='playlistReducer/SET_PAGE_REVIEWS'
const SET_COUNT_REVIEWS:'playlistReducer/SET_COUNT_REVIEWS'='playlistReducer/SET_COUNT_REVIEWS'
const SET_ACTIVE_PLAYLIST_STATE:'playlistReducer/SET_ACTIVE_PLAYLIST_STATE'='playlistReducer/SET_ACTIVE_PLAYLIST_STATE'
export const SET_ACTIVE_PLAYLIST_ASYNC:'playlistReducer/SET_ACTIVE_PLAYLIST_ASYNC'='playlistReducer/SET_ACTIVE_PLAYLIST_ASYNC'
export const SET_REVIEWS_ASYNC:'playlistReducer/SET_REVIEWS_ASYNC'='playlistReducer/SET_REVIEWS_ASYNC'
export const REMOVE_MUSIC_FROM_PLAYLIST_ASYNC:'playlistReducer/REMOVE_MUSIC_FROM_PLAYLIST_ASYNC'='playlistReducer/REMOVE_MUSIC_FROM_PLAYLIST_ASYNC'
export const SET_MUSICS_ASYNC:'playlistReducer/SET_MUSICS_ASYNC'='playlistReducer/SET_MUSICS_ASYNC'
export const ADD_MUSIC_TO_PLAYLIST_ASYNC:'playlistReducer/ADD_MUSIC_TO_PLAYLIST'='playlistReducer/ADD_MUSIC_TO_PLAYLIST'
export const SET_PLAYLIST_ASYNC:'playlistReducer/SET_PLAYLIST_ASYNC'='playlistReducer/SET_PLAYLIST_ASYNC'
export const RATE_PLAYLIST_ASYNC:'playlistReducer/RATE_PLAYLIST_ASYNC'='playlistReducer/RATE_PLAYLIST_ASYNC'
export const SAVE_PLAYLIST_ASYNC:'playlistReducer/SAVE_PLAYLISTS_ASYNC'='playlistReducer/SAVE_PLAYLISTS_ASYNC'
export const REMOVE_FROM_SAVED_PLAYLIST_ASYNC:'playlistReducer/REMOVE_FROM_SAVED_PLAYLIST_ASYNC'='playlistReducer/REMOVE_FROM_SAVED_PLAYLIST_ASYNC'
const SAVE_MUSIC_STATE:'playlistReducer/SAVE_MUSIC_STATE'='playlistReducer/SAVE_MUSIC_STATE'
export const SAVE_MUSIC_ASYNC:'playlistReducer/SAVE_MUSIC_ASYNC'='playlistReducer/SAVE_MUSIC_ASYNC'
const REMOVE_FROM_SAVED_MUSIC_STATE:'playlistReducer/REMOVE_FROM_SAVED_MUSIC_STATE'='playlistReducer/REMOVE_FROM_SAVED_MUSIC_STATE'
export const REMOVE_FROM_SAVED_MUSIC_ASYNC:'playlistReducer/REMOVE_FROM_SAVED_MUSIC_ASYNC'='playlistReducer/REMOVE_FROM_SAVED_MUSIC_ASYNC'
const RATE_MUSIC_STATE:'playlistReducer/RATE_MUSIC_STATE'='playlistReducer/RATE_MUSIC_STATE'
export const RATE_MUSIC_ASYNC:'playlistReducer/RATE_MUSIC_ASYNC'='playlistReducer/RATE_MUSIC_ASYNC'
const SET_MUSIC_STATE:'playlistReducer/SET_MUSIC_STATE'='playlistReducer/SET_MUSIC_STATE'
export const SET_MUSIC_ASYNC:'playlistReducer/SET_MUSIC_ASYNC'='playlistReducer/SET_MUSIC_ASYNC'


const initialState={
    isInit: false as boolean,
    message: null as null|string,
    playlist: null as null | PlaylistDetailType,
    filtersForSearchMusics:{
        page: 1 as number, 
        size: 10 as number,
        title: '' as string,
        genre:'All' as GenreType,
        onlyMyCreated: false as boolean,
        onlyMySaved: false as boolean,
        searchBy: 'title' as 'title'|'author' ,
        firstShow: 'new' as 'new' | 'old' | 'most rated'
    },
    countMusics: 0 as number,
    musics: [] as MinimilizeMusicType[],
    countReviews: 0 as number,
    pageReviews: 1 as number,
    reviews: [] as ReviewType[]
}
type InitialStateType = typeof initialState
type ActionType = ( 
    SetMusicStateType | RateMusicStateType | SaveMusicStateType
    | RemoveFromSavedMusicStateType | 
    SetMusicsStateType | SetInitType | SetCountMusicType 
    | SetMessageType |  SetFiltersMusicsType |
    RemoveFromSavedPlaylistStateType |
    AddMusicToPlaylistStateType |  
    RemoveMusicFromPlaylistStateType |
    SavePlaylistStateType | RatePlaylistStateType |
    SetPlaylistStateType | SetReviewsStateType 
    | SetActivePlaylistStateType 
    | SetCountReviewsType | SetPageReviewsType) 

export const playlistReducer = (state=initialState,action:ActionType):InitialStateType=>{
    switch(action.type){
        case SET_MUSIC_STATE:
            return{
                ...state,
                playlist: state.playlist ? {
                    ...state.playlist,
                    musics: [
                        ...state.playlist.musics.map(m=>{
                            if(m.musicId===action.musicId){
                                return{...m,...action.payload}
                            }
                            return m
                        })
                    ]
                } : null
            }
        case SAVE_MUSIC_STATE:
            return{
                ...state,
                playlist: state.playlist ? {
                    ...state.playlist,
                    musics: [
                        ...state.playlist.musics.map(m=>{
                            if(m.musicId===action.musicId){
                                return{...m,isSaved:true}
                            }
                            return m
                        })
                    ]
                } : null
            } 
        case REMOVE_FROM_SAVED_MUSIC_STATE:
            return{
                ...state,
                playlist: state.playlist ? {
                    ...state.playlist,
                    musics: [
                        ...state.playlist.musics.map(m=>{
                            if(m.musicId===action.musicId){
                                return{...m,isSaved:false}
                            }
                            return m
                        })
                    ]
                } : null
            }
        case RATE_MUSIC_STATE:
            return{
                ...state, 
                playlist: state.playlist ? {
                    ...state.playlist,
                    musics: [
                        ...state.playlist.musics.map(m=>{
                            if(m.musicId===action.musicId){
                                return{
                                    ...m,
                                    summaryRating: m.myReview ? 
                                    m.summaryRating-m.myReview.rating+action.rating :
                                    m.summaryRating+action.rating,
                                    countRated: m.myReview ? 
                                    m.countRated : (m.countRated+1),
                                    myReview: {
                                        idMusicOrPlaylist:m.musicId,
                                        titleMusicOrPlaylist:m.title,
                                        rating:action.rating,
                                        review: ''
                                    }
                                }
                            }
                            return m
                        })
                    ]
                } : null
            }
        case SET_ACTIVE_PLAYLIST_STATE:
            return{
                ...state,
                playlist: action.playlist
            }
        case SET_REVIEWS_STATE:
            return{
                ...state,
                reviews: [...action.reviews]
            }
        case SET_PAGE_REVIEWS:
            return{
                ...state,
                pageReviews: action.page
            }
        case SET_COUNT_REVIEWS:
            return{
                ...state,
                countReviews: action.count
            }
        case SET_MUSICS_FILTERS:
            return{
                ...state,
                filtersForSearchMusics:{...action.filters}
            }
        case REMOVE_MUSIC_FROM_PLAYLIST_STATE:
            return{
                ...state,
                playlist:state.playlist ? {
                    ...state.playlist,
                    musics:[...state.playlist.musics.map(m=>{
                        if(m.musicId===action.musicId){
                            return {
                                ...m,
                                isInPlaylist: false
                            }
                        }
                        return m
                    })]
                } : null,musics: state.playlist ? [
                    ...state.playlist.musics.map(m=>{
                        if(m.musicId===action.musicId){
                            return{
                                ...m,
                                isInPlaylist: false
                            }
                        }
                        return m
                    })
                ] : []
            }
        case ADD_MUSIC_TO_PLAYLIST_STATE:
            return{
                ...state,
                playlist: state.playlist ? {...state.playlist,
                    musics:[
                        ...state.playlist.musics.map(m=>{
                            if(m.musicId===action.musicId){
                                return{
                                    ...m,
                                    isInPlaylist: true
                                }
                            }
                            return m
                        })
                    ]
                } : null,musics: state.playlist ? [
                    ...state.playlist.musics.map(m=>{
                        if(m.musicId===action.musicId){
                            return{
                                ...m,
                                isInPlaylist: true
                            }
                        }
                        return m
                    })
                ] : []
            }
        case SET_COUNT_MUSIC:
            return{
                ...state,
                countMusics: action.countMusic
            }
        case SET_MUSICS_STATE:
            return{
                ...state,
                musics:[...action.musics]
            }
        case SET_PLAYLIST_STATE:
            return{
                ...state,
                playlist: state.playlist ? {
                    ...state.playlist,
                    ...action.payload
                } : null
            }
        case RATE_PLAYLIST_STATE:
            return{
                ...state,
                playlist: state.playlist ? {
                    ...state.playlist,
                    summaryRating: 
                    state.playlist.myReview 
                    ?  
                    state.playlist.summaryRating 
                    - state.playlist.myReview.rating
                    + action.review.rating 
                    :
                    state.playlist.summaryRating
                    + action.review.rating,
                    countRated: 
                    state.playlist.myReview
                    ? state.playlist.countRated 
                    : (state.playlist.countRated+1),
                    myReview: action.review
                } : null
            }
        case REMOVE_FROM_SAVED_PLAYLIST_STATE:
            return{
                ...state,
                playlist: state.playlist  ? {
                    ...state.playlist,
                    isSaved: false,
                    countSaves: (state.playlist.countSaves-1)
                } : null
            }
        case SAVE_PLAYLIST_STATE:
            return{
                ...state,
                playlist: state.playlist  ? {
                    ...state.playlist,
                    isSaved: true,
                    countSaves: (state.playlist.countSaves+1)
                } : null
            }
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
        default:
            return state
    }
}



type SetActivePlaylistStateType={
    type: typeof SET_ACTIVE_PLAYLIST_STATE
    playlist: PlaylistDetailType | null
}
export const setActivePlaylistState=(playlist:PlaylistDetailType | null):SetActivePlaylistStateType=>{
    return{
        type: SET_ACTIVE_PLAYLIST_STATE,
        playlist
    }
}

export type SetActivePlaylistAsyncType={
    type: typeof SET_ACTIVE_PLAYLIST_ASYNC
    playlistId: string | null
}
export const setActivePlaylistAsync=(playlistId:string | null):SetActivePlaylistAsyncType=>{
    return{
        type: SET_ACTIVE_PLAYLIST_ASYNC,
        playlistId
    }
}

type SetReviewsStateType={
    type: typeof SET_REVIEWS_STATE
    reviews: ReviewType[]
} 
export const setReviewsState=(reviews: ReviewType[]):SetReviewsStateType=>{
    return{
        type: SET_REVIEWS_STATE,
        reviews
    }
}


export type SetReviewsAsyncType={
    type: typeof SET_REVIEWS_ASYNC
    page: number
    playlistId: string
}
export const setReviewsAsync=(page:number, playlistId:string):SetReviewsAsyncType=>{
    return {
        type: SET_REVIEWS_ASYNC,
        page, playlistId
    }
}


type SetPageReviewsType={
    type: typeof SET_PAGE_REVIEWS
    page: number
}
export const setPageReviews=(page:number):SetPageReviewsType=>{
    return{
        type: SET_PAGE_REVIEWS,
        page
    }
}


type SetCountReviewsType={
    type: typeof SET_COUNT_REVIEWS
    count: number
}
export const setCountReviews=(count:number):SetCountReviewsType=>{
    return{
        type: SET_COUNT_REVIEWS,
        count
    }
}

type SetFiltersMusicsType={
    type:typeof SET_MUSICS_FILTERS
    filters:FilterGetMusicType
} 
export const setFiltersMusic=(filters:FilterGetMusicType):SetFiltersMusicsType=>{
    return{
        type: SET_MUSICS_FILTERS,
        filters
    }

}


type RemoveMusicFromPlaylistStateType={
    type: typeof REMOVE_MUSIC_FROM_PLAYLIST_STATE
    playlistId: string
    musicId: string
}
export const removeMusicFromPlaylistState=(playlistId:string,musicId:string):RemoveMusicFromPlaylistStateType=>{
    return{
        type: REMOVE_MUSIC_FROM_PLAYLIST_STATE,
        playlistId, musicId
    }
}
export type RemoveMusicFromPlaylistAsyncType={
    type: typeof REMOVE_MUSIC_FROM_PLAYLIST_ASYNC
    playlistId: string
    musicId: string
}
export const removeMusicFromPlaylistAsync=(playlistId:string,musicId:string):RemoveMusicFromPlaylistAsyncType=>{
    return{
        type: REMOVE_MUSIC_FROM_PLAYLIST_ASYNC,
        playlistId, musicId
    }
}

type SetCountMusicType={
    type: typeof SET_COUNT_MUSIC
    countMusic: number
}
export const setCountMusic=(countMusic:number):SetCountMusicType=>{
    return{
        type: SET_COUNT_MUSIC,
        countMusic
    }
}

type SetMusicsStateType={
    type: typeof SET_MUSICS_STATE
    musics: MinimilizeMusicType[]
}
export const setMusicsState=(musics:MinimilizeMusicType[]):SetMusicsStateType=>{
    return{
        type: SET_MUSICS_STATE,
        musics
    }
}

export type SetMusicsAsyncType={
    type: typeof SET_MUSICS_ASYNC
    playlistId:string
    filters: FilterGetMusicType
}
export const setMusicsAsync=(playlistId: string,filters: FilterGetMusicType):SetMusicsAsyncType=>{
    return{
        type: SET_MUSICS_ASYNC,
        playlistId, filters
    }
}

type AddMusicToPlaylistStateType={
    type: typeof ADD_MUSIC_TO_PLAYLIST_STATE
    playlistId: string
    musicId: string
}
export const addMusicToPlaylistState=(playlistId:string, musicId:string):AddMusicToPlaylistStateType=>{
    return{
        type: ADD_MUSIC_TO_PLAYLIST_STATE,
        playlistId, musicId
    }
}

export type AddMusicToPlaylistAsyncType={
    type: typeof ADD_MUSIC_TO_PLAYLIST_ASYNC
    playlistId: string
    musicId: string
}
export const addMusicToPlaylistAsync=(playlistId:string, musicId: string):AddMusicToPlaylistAsyncType=>{
    return{
        type: ADD_MUSIC_TO_PLAYLIST_ASYNC,
        playlistId, musicId
    }
}

type SetPlaylistStateType={
    type: typeof SET_PLAYLIST_STATE
    payload: PayloadType
    playlistId: string
}
type PayloadType={
    title?: string
    imgSrc?: string
    isPublic?: boolean
}
export const setPlaylistState=(playlistId:string, payload: PayloadType):SetPlaylistStateType=>{
    return{    
        type: SET_PLAYLIST_STATE,
        playlistId,payload
    }
}
export type PayloadAsyncType={
    title?: string
    img?: any
    isPublic?: boolean
}
export type SetPlaylistAsyncType={
    type: typeof SET_PLAYLIST_ASYNC
    payload: PayloadAsyncType
    playlistId: string
    callback:()=>void
}
export const setPlaylistAsync=(payload:PayloadAsyncType, playlistId:string, callback:()=>void):SetPlaylistAsyncType=>{
    return{
        type: SET_PLAYLIST_ASYNC,
        payload, playlistId,
        callback
    }
}

type RatePlaylistStateType={
    type: typeof RATE_PLAYLIST_STATE
    review: ReviewType
}
export const ratePlaylistState=(review:ReviewType):RatePlaylistStateType=>{
    return{
        type: RATE_PLAYLIST_STATE,
        review
    }
}

export type RatePlaylistAsyncType={
    type: typeof RATE_PLAYLIST_ASYNC
    playlistTitle: string
    playlistId: string
    review: string | null
    rating: number
    callback:()=>void
}
export const ratePlaylistAsync=(playlistId:string, rating:number,review: string|null,playlistTitle:string, callback:()=>void):RatePlaylistAsyncType=>{
    return{
        type: RATE_PLAYLIST_ASYNC,
        playlistId,playlistTitle,
        rating, review,callback
    }
}

type SavePlaylistStateType={
    type: typeof SAVE_PLAYLIST_STATE
    playlistId: string
}
export const savePlaylistState=(playlistId:string):SavePlaylistStateType=>{
    return{
        type: SAVE_PLAYLIST_STATE,
        playlistId
    }
}

type RemoveFromSavedPlaylistStateType={
    type: typeof REMOVE_FROM_SAVED_PLAYLIST_STATE
    playlistId: string
}
export const removeFromPlaylistState=(playlistId:string):RemoveFromSavedPlaylistStateType=>{
    return{
        type: REMOVE_FROM_SAVED_PLAYLIST_STATE,
        playlistId
    }
}

export type SavePlaylistAsyncType={
    type: typeof SAVE_PLAYLIST_ASYNC
    playlistId: string
}
export const savePlaylistAsync=(playlistId:string):SavePlaylistAsyncType=>{
    return{
        playlistId,
        type: SAVE_PLAYLIST_ASYNC
    }
}

export type RemoveFromSavedPlaylistAsyncType={
    type: typeof REMOVE_FROM_SAVED_PLAYLIST_ASYNC
    playlistId: string
}
export const removeFromPlaylistAsync=(playlistId:string):RemoveFromSavedPlaylistAsyncType=>{
    return{
        type: REMOVE_FROM_SAVED_PLAYLIST_ASYNC,
        playlistId
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
export const setMessage=(message:string | null):SetMessageType=>{
    return{
        type:SET_MESSAGE,
        message
    }
}

type SaveMusicStateType={
    musicId: string
    type: typeof SAVE_MUSIC_STATE
}
export const saveMusicState=(musicId: string):SaveMusicStateType=>{
    return{
        musicId,
        type: SAVE_MUSIC_STATE
    }
}

export type SaveMusicAsyncType={
    musicId: string
    type: typeof SAVE_MUSIC_ASYNC
}
export const saveMusicAsync=(musicId:string):SaveMusicAsyncType=>{
    return{
        musicId,
        type: SAVE_MUSIC_ASYNC
    }
}

type RateMusicStateType={
    type: typeof RATE_MUSIC_STATE
    rating: number
    musicId: string
}
export const rateMusicState=(rating: number, musicId: string):RateMusicStateType=>{
    return {
        type: RATE_MUSIC_STATE,
        rating, musicId
    }
}

export type RateMusicAsyncType={
    type: typeof RATE_MUSIC_ASYNC
    review?: string
    rating: number
    musicId: string
    musicTitle: string
    callback:()=>void
}
export const rateMusicAsync=(musicId:string,musicTitle:string,rating:number,callback:()=>void,review?:string):RateMusicAsyncType=>{
    return{
        musicId,review,
        musicTitle,rating,
        callback,
        type: RATE_MUSIC_ASYNC
    }
}

type RemoveFromSavedMusicStateType={
    musicId: string
    type: typeof REMOVE_FROM_SAVED_MUSIC_STATE
}
export const removeFromSavedMusicState=(musicId:string):RemoveFromSavedMusicStateType=>{
    return{
        musicId,
        type: REMOVE_FROM_SAVED_MUSIC_STATE
    }
}

export type RemoveFromSavedMusicAsyncType={
    type: typeof REMOVE_FROM_SAVED_MUSIC_ASYNC
    musicId: string
}
export const removeFromSavedMusicAsync=(musicId:string):RemoveFromSavedMusicAsyncType=>{
    return{
        type: REMOVE_FROM_SAVED_MUSIC_ASYNC,
        musicId
    }
}

export type SetMusicAsyncType={
    type: typeof SET_MUSIC_ASYNC
    musicId: string
    payload:PayloadSetMusicAsyncType
    callback:()=>void
}
type PayloadSetMusicAsyncType={
    genre?: GenreType
    title?: string
    author?: string
    music?: any //file
    img?: any  // file
}
export const setMusicAsync=(musicId:string,callback:()=>void,payload: PayloadSetMusicAsyncType):SetMusicAsyncType=>{
    return{
        type: SET_MUSIC_ASYNC,
        musicId,
        payload,callback
    }
}


type SetMusicStateType={
    type: typeof SET_MUSIC_STATE
    musicId: string
    payload: PayloadSetMusicStateType
}
type PayloadSetMusicStateType={
    genre?: GenreType
    title?: string
    author?: string
    musicSrc?: string
    imgSrc?: string
}
export const setMusicState=(musicId:string,payload:PayloadSetMusicStateType):SetMusicStateType=>{
    return{
        type: SET_MUSIC_STATE,
        musicId,
        payload
    }
}




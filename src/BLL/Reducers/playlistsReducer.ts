import { FilterGetMusicType, GenreType } from "../../Types/music";
import { GetPlaylistsFiltersType, MinimilizeMusicType, PlaylistDetailType, PlaylistType } from "../../Types/playlist";
import { ReviewType } from "../../Types/profile";

const SET_PLAYLISTS_STATE:'playlistsReducer/SET_PLAYLISTS_STATE'='playlistsReducer/SET_PLAYLISTS_STATE'
const SET_COUNT:'playlistsReducer/SET_COUNT'='playlistsReducer/SET_COUNT'
const SET_INIT:'playlistsReducer/SET_INIT'='playlistsReducer/SET_INIT'
const SET_MESSAGE:'playlistsReducer/SET_MESSAGE'='playlistsReducer/SET_MESSAGE'
const SET_FILTERS:'playlistsReducer/SET_FILTERS'='playlistsReducer/SET_FILTERS'
const SAVE_PLAYLIST_STATE:'playlistsReducer/SAVE_PLAYLIST_STATE'='playlistsReducer/SAVE_PLAYLIST_STATE'
const REMOVE_FROM_SAVED_PLAYLIST_STATE:'playlistsReducer/REMOVE_FROM_SAVED_PLAYLIST_STATE'='playlistsReducer/REMOVE_FROM_SAVED_PLAYLIST_STATE'
const RATE_PLAYLIST_STATE:'playlistsReducer/RATE_PLAYLIST_STATE'='playlistsReducer/RATE_PLAYLIST_STATE'
const SET_PLAYLIST_STATE:'playlistsReducer/SET_PLAYLIST_STATE'='playlistsReducer/SET_PLAYLIST_STATE'
const SET_MUSICS_STATE:'playlistsReducer/SET_MUSICS_STATE'='playlistsReducer/SET_MUSICS_STATE'
const ADD_MUSIC_TO_PLAYLIST_STATE:'playlistsReducer/ADD_MUSIC_STATE'='playlistsReducer/ADD_MUSIC_STATE'
const SET_MUSICS_FILTERS:'playlistsReducer/SET_MUSICS_FILTERS'='playlistsReducer/SET_MUSICS_FILTERS'
const SET_COUNT_MUSIC:'playlistsReducer/SET_COUNT_MUSIC'='playlistsReducer/SET_COUNT_MUSIC'
const REMOVE_MUSIC_FROM_PLAYLIST_STATE:'playlistsReducer/REMOVE_MUSIC_FROM_PLAYLIST_STATE'='playlistsReducer/REMOVE_MUSIC_FROM_PLAYLIST_STATE'
const SET_ACTIVE_PLAYLIST_STATE:'playlistsReducer/SET_ACTIVE_PLAYLIST_STATE'='playlistsReducer/SET_ACTIVE_PLAYLIST_STATE'
export const SET_ACTIVE_PLAYLIST_ASYNC:'playlistsReducer/SET_ACTIVE_PLAYLIST_ASYNC'='playlistsReducer/SET_ACTIVE_PLAYLIST_ASYNC'
export const REMOVE_MUSIC_FROM_PLAYLIST_ASYNC:'playlistsReducer/REMOVE_MUSIC_FROM_PLAYLIST_ASYNC'='playlistsReducer/REMOVE_MUSIC_FROM_PLAYLIST_ASYNC'
export const SET_MUSICS_ASYNC:'playlistsReducer/SET_MUSICS_ASYNC'='playlistsReducer/SET_MUSICS_ASYNC'
export const ADD_MUSIC_TO_PLAYLIST_ASYNC:'playlistsReducer/ADD_MUSIC_TO_PLAYLIST'='playlistsReducer/ADD_MUSIC_TO_PLAYLIST'
export const SET_PLAYLIST_ASYNC:'playlistsReducer/SET_PLAYLIST_ASYNC'='playlistsReducer/SET_PLAYLIST_ASYNC'
export const RATE_PLAYLIST_ASYNC:'playlistsReducer/RATE_PLAYLIST_ASYNC'='playlistsReducer/RATE_PLAYLIST_ASYNC'
export const SAVE_PLAYLIST_ASYNC:'playlistsReducer/SAVE_PLAYLISTS_ASYNC'='playlistsReducer/SAVE_PLAYLISTS_ASYNC'
export const REMOVE_FROM_SAVED_PLAYLIST_ASYNC:'playlistsReducer/REMOVE_FROM_SAVED_PLAYLIST_ASYNC'='playlistsReducer/REMOVE_FROM_SAVED_PLAYLIST_ASYNC'
export const SET_PLAYLISTS_ASYNC:'playlistsReducer/SET_PLAYLISTS_ASYNC'='playlistsReducer/SET_PLAYLISTS_ASYNC'
export const ADD_PLAYLIST_ASYNC:'playlistsReducer/ADD_PLAYLIST_ASYNC'='playlistsReducer/ADD_PLAYLIST_ASYNC'


const initialState={
    playlists: [] as PlaylistType[],
    count: 0 as number,
    isInit: false as boolean,
    message: null as null|string,
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
    filters: {
        page: 1,
        size: 10,
        title: '' as string,
        onlyMyCreated: false as boolean,
        onlyMySaved: false as boolean,
        firstShow: 'new' as 'new' | 'old' | 'most rated'
    } as GetPlaylistsFiltersType,
    activePlaylist: null as null | PlaylistDetailType,
    countMusic: 0 as number,
    musics: [] as MinimilizeMusicType[]
}
type InitialStateType = typeof initialState
type ActionType = (
    SetFiltersMusicsType | SetMusicsStateType | 
    SetCountType | SetInitType | SetCountMusicType 
    | SetMessageType | SetFiltersType | 
    RemoveFromSavedPlaylistStateType |
    AddMusicToPlaylistStateType | SetActivePlaylistStateType | 
    RemoveMusicFromPlaylistStateType |
    SavePlaylistStateType | RatePlaylistStateType | 
    SetPlaylistsStateType | SetPlaylistStateType) 

export const playlistsReducer = (state=initialState,action:ActionType):InitialStateType=>{
    switch(action.type){
        case SET_ACTIVE_PLAYLIST_STATE:
            return{
                ...state,
                activePlaylist: action.playlist
            }
        case REMOVE_MUSIC_FROM_PLAYLIST_STATE:
            return{
                ...state,
                playlists:[...state.playlists.map(p=>{
                    if(p.playlistId===action.playlistId){
                        return{
                            ...p,
                            countMusics:(p.countMusics-1)
                        }
                    }
                    return p
                })],
                musics:[...state.musics.map(m=>{
                    if(m.musicId===action.musicId){
                        return {
                            ...m,
                            isInPlaylist: false
                        }
                    }
                    return m
                })]
            }
        case ADD_MUSIC_TO_PLAYLIST_STATE:
            return{
                ...state,
                playlists:[...state.playlists.map(p=>{
                    if(p.playlistId===action.playlistId){
                        return{
                            ...p,
                            countMusics:(p.countMusics+1)
                        }
                    }
                    return p
                })],
                musics:[...state.musics.map(m=>{
                    if(m.musicId===action.musicId){
                        return {
                            ...m,
                            isInPlaylist: true
                        }
                    }
                    return m
                })]
            }
        case SET_COUNT_MUSIC:
            return{
                ...state,
                countMusic: action.countMusic
            }
        case SET_MUSICS_STATE:
            return{
                ...state,
                musics:[...action.musics]
            }
        case SET_MUSICS_FILTERS:
            return{
                ...state,
                filtersForSearchMusics:{...action.filters}
            }
        case SET_PLAYLIST_STATE:
            return{
                ...state,
                playlists: [...state.playlists.map(p=>{
                    if(p.playlistId===action.playlistId){
                        return{
                            ...p,
                            ...action.payload
                        }
                    }
                    return p
                })]
            }
        case RATE_PLAYLIST_STATE:
            return{
                ...state,
                playlists:[...state.playlists.map(p=>{
                    if(p.playlistId===action.review.idMusicOrPlaylist){
                        return {
                            ...p,
                            summaryRating: (p.myReview ? 
                                p.summaryRating-p.myReview.rating+action.review.rating 
                                : p.summaryRating+action.review.rating),
                            countRated: (p.myReview ? p.countRated : (p.countRated+1)),
                            myReview: action.review
                        }
                    }
                    return p
                })]
            }
        case REMOVE_FROM_SAVED_PLAYLIST_STATE:
            return{
                ...state,
                playlists:[...state.playlists.map(p=>{
                    if(p.playlistId===action.playlistId){
                        return{
                            ...p,
                            isSaved:false
                        }
                    }
                    return p
                })]
            }
        case SAVE_PLAYLIST_STATE:
            return{
                ...state,
                playlists:[...state.playlists.map(p=>{
                    if(p.playlistId===action.playlistId){
                        return{
                            ...p,
                            isSaved:true
                        }
                    }
                    return p
                })]
            }
        case SET_COUNT:
            return{
                ...state,
                count: action.count
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
        case SET_PLAYLISTS_STATE:
            return{
                ...state,
                playlists: action.playlists
            }
        case SET_FILTERS:
            return{
                ...state,
                filters:{
                    ...action.filters
                }
            }
        default:
            return state
    }
}



type SetActivePlaylistStateType={
    type: typeof SET_ACTIVE_PLAYLIST_STATE
    playlist: PlaylistDetailType
}
export const setActivePlaylistState=(playlist:PlaylistDetailType):SetActivePlaylistStateType=>{
    return{
        type: SET_ACTIVE_PLAYLIST_STATE,
        playlist
    }
}

export type SetActivePlaylistAsyncType={
    type: typeof SET_ACTIVE_PLAYLIST_ASYNC
    playlistId: string
}
export const setActivePlaylistAsync=(playlistId:string):SetActivePlaylistAsyncType=>{
    return{
        type: SET_ACTIVE_PLAYLIST_ASYNC,
        playlistId
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

export type AddPlaylistAsyncType={
    type: typeof ADD_PLAYLIST_ASYNC
    title: string
    isPublic: boolean
    img?: any //file
    callback: ()=>void //close modal
}
export const addPlaylistAsync=(title:string,isPublic:boolean,callback:()=>void,img?:any):AddPlaylistAsyncType=>{
    return{
        type: ADD_PLAYLIST_ASYNC,
        title, isPublic,
        img, callback
    }
}

export type SetPlaylistsAsyncType={
    type: typeof SET_PLAYLISTS_ASYNC
    filters: GetPlaylistsFiltersType
}
export const setPlaylistsAsync=(filters:GetPlaylistsFiltersType):SetPlaylistsAsyncType=>{
    return{
        filters,
        type: SET_PLAYLISTS_ASYNC
    }
}

type SetCountType={
    type:typeof SET_COUNT
    count: number
}
export const setCount=(count:number):SetCountType=>{
    return{
        count,
        type:SET_COUNT
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

type SetFiltersType={
    type: typeof SET_FILTERS,
    filters: GetPlaylistsFiltersType
}
export const setFilters=(filters:GetPlaylistsFiltersType):SetFiltersType=>{
    return{
        type: SET_FILTERS,
        filters
    }
}

type SetPlaylistsStateType={
    type: typeof SET_PLAYLISTS_STATE
    playlists: PlaylistType[]
}
export const setPlaylistsState=(playlists:PlaylistType[]):SetPlaylistsStateType=>{
    return{
        type: SET_PLAYLISTS_STATE,
        playlists
    }
}



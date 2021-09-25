import { GetPlaylistsFiltersType, PlaylistType } from "../../Types/playlist";

const SET_PLAYLISTS_STATE:'playlistsReducer/SET_PLAYLISTS_STATE'='playlistsReducer/SET_PLAYLISTS_STATE'
const SET_COUNT:'playlistsReducer/SET_COUNT'='playlistsReducer/SET_COUNT'
const SET_INIT:'playlistsReducer/SET_INIT'='playlistsReducer/SET_INIT'
const SET_MESSAGE:'playlistsReducer/SET_MESSAGE'='playlistsReducer/SET_MESSAGE'
const SET_FILTERS:'playlistsReducer/SET_FILTERS'='playlistsReducer/SET_FILTERS'
export const SET_PLAYLISTS_ASYNC:'playlistsReducer/SET_PLAYLISTS_ASYNC'='playlistsReducer/SET_PLAYLISTS_ASYNC'
export const ADD_PLAYLIST_ASYNC:'playlistsReducer/ADD_PLAYLIST_ASYNC'='playlistsReducer/ADD_PLAYLIST_ASYNC'


const initialState={
    playlists: [] as PlaylistType[],
    count: 0 as number,
    isInit: false as boolean,
    message: null as null|string,
    filters: {
        page: 1,
        size: 10,
        title: '' as string,
        onlyMyCreated: false as boolean,
        onlyMySaved: false as boolean,
        firstShow: 'new' as 'new' | 'old' | 'most rated'
    } as GetPlaylistsFiltersType
}
type InitialStateType = typeof initialState
type ActionType = any

export const playlistsReducer = (state=initialState,action:ActionType):InitialStateType=>{
    switch(action.type){
        default:
            return state
    }
}

export type AddPlaylistAsyncType={
    type: typeof ADD_PLAYLIST_ASYNC
    title: string
    isPublic: boolean
    img?: any //file
}
export const addPlaylistAsync=(title:string,isPublic:boolean,img?:any):AddPlaylistAsyncType=>{
    return{
        type: ADD_PLAYLIST_ASYNC,
        title, isPublic,
        img
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
    message: string
}
export const setMessage=(message:string):SetMessageType=>{
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



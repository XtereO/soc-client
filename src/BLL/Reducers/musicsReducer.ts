
import { stat } from "fs";
import { backendURL } from "../../Consts";
import { FilterGetMusicType, GenreType, MusicType } from "../../Types/music";


export const ADD_MUSIC:'musicReducer/ADD_MUSIC'='musicReducer/ADD_MUSIC'
export const SET_MUSICS_ASYNC:'musicReducer/SET_MUSIC_ASYNC'='musicReducer/SET_MUSIC_ASYNC'
const SET_ACTIVE_MUSIC:'musicReducer/SET_ACTIVE_MUSIC'='musicReducer/SET_ACTIVE_MUSIC'
const SET_COUNT:'musicReducer/SET_COUNT'='musicReducer/SET_COUNT'
const SET_FILTERS:'musicReducer/SET_FILTERS'='musicReducer/SET_FILTERS'
const SET_MUSICS_STATE:'musicReducer/SET_MUSIC_STATE'='musicReducer/SET_MUSIC_STATE'
const SET_INIT:'musicReducer/SET_INIT'='musicReducer/SET_INIT'
const SET_MESSAGE:'musicReducer/SET_MESSAGE'='musicReducer/SET_MESSAGE'
const SET_PLAYING_MUSIC:'musicReducer/SET_PLAYING_MUSIC_TYPE'='musicReducer/SET_PLAYING_MUSIC_TYPE'
const SET_PLAYED_MUSIC_INTERVAL:'musicReducer/SET_PLAYED_MUSIC_INTERVAL'='musicReducer/SET_PLAYED_MUSIC_INTERVAL'


const initialState={
    activeMusic: null as null | HTMLAudioElement,
    activeMusicSettings:{
        duration: 0 as number,
        playedInterval: 0 as number,
        isMusicPlay: false as boolean
    },
    activeMusicDetails: null as MusicType | null,
    musics: [] as MusicType[],
    count: 0 as number,
    isInit: false as boolean,
    message: null as null|string,
    filters: {
        page: 1,
        size: 10,
        genre: 'All' as GenreType,
        searchBy: 'title' as 'title' | 'author',
        title: '' as string,
        author: '' as string,
        onlyMyCreated: false as boolean,
        onlyMySaved: false as boolean,
        firstShow: 'new' as 'new' | 'old' | 'most rated'
    } as FilterGetMusicType
}
type InitialStateType = typeof initialState

type ActionType = (
    SetInitType | SetMessageType | SetActiveMusicType
    | SetCountType | SetFiltersType | SetMusicsStateType
    | SetPlayingMusicType | SetPlayedMusicIntervalType
    )

export const musicsReducer = (state=initialState,action:ActionType):InitialStateType=>{
    switch(action.type){
        case SET_PLAYED_MUSIC_INTERVAL:
            //@ts-ignore
            state.activeMusic.currentTime=(action.playedInterval ? action.playedInterval : ++state.activeMusicSettings.playedInterval)
            return{
                ...state,
                activeMusicSettings:{
                    ...state.activeMusicSettings,
                    playedInterval: (action.playedInterval ? action.playedInterval : state.activeMusicSettings.playedInterval)
                }
            }
        case SET_PLAYING_MUSIC:
            if(action.isPlaying){
                state.activeMusic?.play()    
            }else{
                state.activeMusic?.pause()
            }
            return{...state,
                activeMusicSettings:{
                    ...state.activeMusicSettings,
                    isMusicPlay: action.isPlaying
                }
            }
        case SET_ACTIVE_MUSIC:
            
            action.audioHTML.play()
            return{
                ...state,
                activeMusicSettings:{
                    playedInterval: 0,
                    duration: action.audioHTML.duration,
                    isMusicPlay: true
                },
                activeMusic: action.audioHTML,
                activeMusicDetails: {...action.activeMusic}
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
        case SET_COUNT:
            return{
                ...state,
                count: action.count
            }
        case SET_MUSICS_STATE:
            return{
                ...state,
                musics: [...action.musics]
            }
        case SET_FILTERS:
            return{
                ...state,
                filters: {...action.filters}
            }
        default: return state
    }
}

type SetPlayedMusicIntervalType={
    type: typeof SET_PLAYED_MUSIC_INTERVAL,
    playedInterval?: number
}
export const setPlayedMusicInterval=(playedInterval?:number):SetPlayedMusicIntervalType=>{
    return{
        type: SET_PLAYED_MUSIC_INTERVAL,
        playedInterval
    }
}

type SetPlayingMusicType={
    type: typeof SET_PLAYING_MUSIC
    isPlaying: boolean
}
export const setPlayingMusic=(isPlaying:boolean):SetPlayingMusicType=>{
    return {
        type: SET_PLAYING_MUSIC,
        isPlaying
    }
}

type SetActiveMusicType={
    type: typeof SET_ACTIVE_MUSIC
    activeMusic: MusicType
    audioHTML: HTMLAudioElement
}
export const setActiveMusic=(activeMusic:MusicType,audioHTML: HTMLAudioElement):SetActiveMusicType=>{
    return{
        type: SET_ACTIVE_MUSIC,
        activeMusic, audioHTML
    }
}

export type SetMusicsAsyncType={
    type: typeof SET_MUSICS_ASYNC
    filters: FilterGetMusicType
} 
export const setMusicsAsync=(filters:FilterGetMusicType):SetMusicsAsyncType=>{
    return{
        type: SET_MUSICS_ASYNC,
        filters
    }
}

type SetFiltersType={
    filters: FilterGetMusicType
    type: typeof SET_FILTERS
}
export const setFilters=(filters:FilterGetMusicType):SetFiltersType=>{
    return {
        filters,
        type:SET_FILTERS
    }
}

type SetMusicsStateType={
    musics: MusicType[],
    type: typeof SET_MUSICS_STATE
}
export const setMusicsState=(musics:MusicType[]):SetMusicsStateType=>{
    return{
        musics,
        type: SET_MUSICS_STATE
    }
}

type SetCountType={
    type: typeof SET_COUNT
    count: number
}
export const setCount=(count:number):SetCountType=>{
    return{
        type: SET_COUNT,
        count
    }
}

type SetMessageType={
    type: typeof SET_MESSAGE,
    message: null | string
}
export const setMessage=(message:string | null):SetMessageType=>{
    return{
        type: SET_MESSAGE,
        message
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

export type AddMusicType={
    type: typeof ADD_MUSIC
    title: string
    music: any //file
    img: any //file
    author: string | null
    genre: GenreType 
    showToast: ()=>void
}

export const addMusic=(title:string, music:any, img:any, author:string|null, genre:GenreType, showToast:()=>void):AddMusicType=>{
    return{
        type: ADD_MUSIC,
        title,music,img,
        author,genre,
        showToast
    }
}
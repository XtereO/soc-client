import { MusicType } from "../../Types/music";
import {ModeType} from '../../Types/player'

const SET_PLAYED_MUSIC_INTERVAL:'playerReducer/SET_PLAYED_MUSIC_INTERVAL'='playerReducer/SET_PLAYED_MUSIC_INTERVAL'
const SET_PLAYING_MUSIC:'playerReducer/SET_PLAYING_MUSIC'='playerReducer/SET_PLAYING_MUSIC'
const SET_INIT:'playerReducer/SET_INIT'='playerReducer/SET_INIT'
const SET_ACTIVE_MUSIC:'playerReducer/SET_ACTIVE_MUSIC'='playerReducer/SET_ACTIVE_MUSIC'
const SET_MUSICS:'playerReducer/SET_MUSICS'='playerReducer/SET_MUSICS'
const SET_MODE:'playerReducer/SET_MODE'='playerReducer/SET_MODE'



const initialState={
    activeMusic: null as null | HTMLAudioElement,
    activeMusicSettings:{
        duration: 0 as number,
        playedInterval: 0 as number,
        isMusicPlay: false as boolean
    },
    activeMusicDetails: null as MusicType | null,
    musics: [] as MusicType[],
    isInit: false as boolean,
    mode: 'Repeat' as ModeType
}

type InitialStateType = typeof initialState

type ActionType = (
    SetInitType | SetMusicsType | SetActiveMusicType
    | SetPlayingMusicType | SetPlayedMusicIntervalType |
    SetModeType
    )


export const playerReducer = (state=initialState,action:ActionType):InitialStateType=>{
    switch(action.type){
        case SET_MUSICS:
            return{
                ...state,
                musics:[...action.musics]
            }
        case SET_MODE:
            return{
                ...state,
                mode: action.mode
            }
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
            state.activeMusic?.pause()
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
        default:
            return state
    }
}

type SetModeType={
    type: typeof SET_MODE
    mode: ModeType
}
export const setMode=(mode:ModeType):SetModeType=>{
    return {
        type: SET_MODE,
        mode
    }
}

type SetMusicsType={
    type: typeof SET_MUSICS
    musics: MusicType[]
}
export const setMusics=(musics:MusicType[]):SetMusicsType=>{
    return{
        type:SET_MUSICS,
        musics
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
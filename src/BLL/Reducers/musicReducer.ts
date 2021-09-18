
import { GenreType, MusicType } from "../../Types/music";


export const ADD_MUSIC:'musicReducer/ADD_MUSIC'='musicReducer/ADD_MUSIC'
const SET_INIT:'musicReducer/SET_INIT'='musicReducer/SET_INIT'
const SET_MESSAGE:'musicReducer/SET_MESSAGE'='musicReducer/SET_MESSAGE'


const initialState={
    musics: [] as MusicType[],
    count: 0 as number,
    page: 1 as number,
    isInit: false as boolean,
    message: null as null|string
}
type InitialStateType = typeof initialState

type ActionType = SetInitType | SetMessageType

export const musicReducer = (state=initialState,action:ActionType):InitialStateType=>{
    switch(action.type){
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
        default: return state
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
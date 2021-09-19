
import { FilterGetMusicType, GenreType, MusicType } from "../../Types/music";


export const ADD_MUSIC:'musicReducer/ADD_MUSIC'='musicReducer/ADD_MUSIC'
export const SET_MUSICS_ASYNC:'musicReducer/SET_MUSIC_ASYNC'='musicReducer/SET_MUSIC_ASYNC'
const SET_COUNT:'musicReducer/SET_COUNT'='musicReducer/SET_COUNT'
const SET_FILTERS:'musicReducer/SET_FILTERS'='musicReducer/SET_FILTERS'
const SET_MUSICS_STATE:'musicReducer/SET_MUSIC_STATE'='musicReducer/SET_MUSIC_STATE'
const SET_INIT:'musicReducer/SET_INIT'='musicReducer/SET_INIT'
const SET_MESSAGE:'musicReducer/SET_MESSAGE'='musicReducer/SET_MESSAGE'


const initialState={
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
    SetInitType | SetMessageType
    | SetCountType | SetFiltersType | SetMusicsStateType
    )

export const musicsReducer = (state=initialState,action:ActionType):InitialStateType=>{
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
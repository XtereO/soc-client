import { ProfileType } from "../../Types/profile";


const SET_PAGE:'peopleReducer/SET_PAGE'='peopleReducer/SET_PAGE'
const SET_COUNT:'peopleReducer/SET_COUNT'='peopleReducer/SET_COUNT'
const SET_PEOPLE_STATE:'peopleReducer/SET_PEOPLE_STATE'='peopleReducer/SET_PEOPLE_STATE'
const SET_INIT:'peopleReducer/SET_INIT'='peopleReducer/SET_INIT'
const SET_MESSAGE:'peopleReducer/SET_MESSAGE'='peopleReducer/SET_MESSAGE'
const SET_ONE_PEOPLE_FOLLOW:'peopleReducer/SET_ONE_PEOPLE'='peopleReducer/SET_ONE_PEOPLE'
export const SET_PEOPLE_ASYNC:'peopleReducer/SET_PEOPLE_ASYNC'='peopleReducer/SET_PEOPLE_ASYNC'
export const FOLLOW:'peopleReducer/FOLLOW'='peopleReducer/FOLLOW'
export const UNFOLLOW:'peopleReducer/UNFOLLOW'='peopleReducer/UNFOLLOW'


const initialState={
    people:[] as ProfileType[],
    count: 0 as number,
    page: 1 as number,
    isInit: false as boolean,
    message: null as null | string
}
type InitialStateType=typeof initialState
type ActionType = (SetPageType | SetCountType | 
    SetPeopleStateType | SetInitType | SetOnePeopleFollowType)


export const peopleReducer=(state=initialState,action:ActionType):InitialStateType=>{
    switch(action.type){
        case SET_ONE_PEOPLE_FOLLOW:
            return{
                ...state,
                people: [...state.people.map(p=>{
                    if(p.userId===action.userId){
                        return {...p, isFollow: action.isFollow}
                    }
                    return p
                })]
            }
        case SET_INIT:
            return{
                ...state,
                isInit: action.isInit
            }
        case SET_PEOPLE_STATE:
            return {
                ...state,
                people: [...action.people]
            }
        case SET_PAGE:
            return{
                ...state,
                page: action.page
            }
        case SET_COUNT:
            return{
                ...state,
                count: action.count
            }
        default:
            return state
    }


}

type SetOnePeopleFollowType={
    type: typeof SET_ONE_PEOPLE_FOLLOW
    userId: string
    isFollow: boolean
}
export const setOnePeopleFollow=(userId:string,isFollow:boolean):SetOnePeopleFollowType=>{
    return{
        type: SET_ONE_PEOPLE_FOLLOW,
        userId,
        isFollow
    }
}

type SetMessageType={
    type: typeof SET_MESSAGE
    message: string | null
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
        type:SET_INIT,
        isInit
    }
}

type SetPageType={
    type: typeof SET_PAGE,
    page: number
}
export const setPage=(page:number):SetPageType=>{
    return{
        type: SET_PAGE,
        page
    }
}

type SetCountType={
    type: typeof SET_COUNT,
    count: number
}
export const setCount=(count:number):SetCountType=>{
    return{
        type: SET_COUNT,
        count
    }
}

type SetPeopleStateType={
    type: typeof SET_PEOPLE_STATE
    people: ProfileType[]
}
export const setPeopleState=(people:ProfileType[]):SetPeopleStateType=>{
    return{
        type: SET_PEOPLE_STATE,
        people
    }
}

export type SetPeopleAsyncType={
    type: typeof SET_PEOPLE_ASYNC
    page: number
    portionSize: number
    title: string
} 
export const setPeopleAsync=(title='',page=1,portionSize=10):SetPeopleAsyncType=>{
    return{
        type: SET_PEOPLE_ASYNC,
        page,portionSize,title
    }
}

export type FollowType={
    type: typeof FOLLOW
    userId: string
}
export const follow=(userId:string):FollowType=>{
    return{
        type: FOLLOW,
        userId
    }
}

export type UnFollowType={
    type: typeof UNFOLLOW
    userId: string
}
export const unFollow=(userId:string):UnFollowType=>{
    return{
        type: UNFOLLOW,
        userId
    }
}



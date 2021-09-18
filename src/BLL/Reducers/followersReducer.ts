
import { ProfileType } from "../../Types/profile";

const SET_FOLLOWERS_STATE:'followersReducer/SET_FOLLOWERS_STATE'='followersReducer/SET_FOLLOWERS_STATE'
const SET_PAGE:'followersReducer/SET_PAGE'='followersReducer/SET_PAGE'
const SET_INIT:'followersReducer/SET_INIT'='followersReducer/SET_INIT'
const SET_MESSAGE:'followersReducer/SET_MESSAGE'='followersReducer/SET_MESSAGE'
const SET_ONE_PEOPLE_FOLLOW:'followersReducer/SET_ONE_PEOPLE_FOLLOW'='followersReducer/SET_ONE_PEOPLE_FOLLOW'
const SET_COUNT:'followersReducer/SET_COUNT'='followersReducer/SET_COUNT'
export const SET_FOLLOWERS_ASYNC:'followersReducer/SET_FOLLOWERS_ASYNC'='followersReducer/SET_FOLLOWERS_ASYNC'
export const FOLLOW:'followersReducer/FOLLOW'='followersReducer/FOLLOW'
export const UNFOLLOW:'followersReducer/UNFOLLOW'='followersReducer/UNFOLLOW'


const initialState = {
    followers:[] as ProfileType[],
    count: 0 as number,
    page: 1 as number,
    isInit: false as boolean,
    message: null as null | string
}
type InitialStateType= typeof initialState
type ActionType = (SetPageType | SetInitType | SetCountType |
        SetMessageType | SetFollowersStateType | SetOnePeopleFollowType)

export const followersReducer=(state=initialState,action:ActionType):InitialStateType=>{
    switch(action.type){
        case SET_PAGE:
            return {
                ...state,
                page: action.page
            }
        case SET_INIT:
            return {
                ...state,
                isInit:action.isInit
            }
        case SET_COUNT:
            return{
                ...state,
                count: action.count
            }
        case SET_FOLLOWERS_STATE:
            return {
                ...state,
                followers: [...action.followers]
            } 
        case SET_MESSAGE:
            return {
                ...state,
                message: action.message
            }
        case SET_ONE_PEOPLE_FOLLOW:
            return {
                ...state,
                followers: [
                    ...state.followers.map(f=>{
                        if(f.userId===action.userId){
                            return {...f,isFollow:action.isFollow}
                        }
                        return f
                    })
                ]
            }
        default: return state
    }
}

type SetPageType={
    page: number
    type: typeof SET_PAGE
}
export const setPage=(page:number):SetPageType=>{
    return {
        page, 
        type: SET_PAGE
    }
}
type SetCountType={
    count: number
    type: typeof SET_COUNT
}
export const setCount=(count:number):SetCountType=>{
    return{
        count,
        type: SET_COUNT
    }
}
type SetInitType={
    isInit: boolean
    type: typeof SET_INIT
}
export const setInit=(isInit:boolean):SetInitType=>{
    return{
        isInit,
        type: SET_INIT
    }
}
type SetMessageType={
    message: string | null
    type: typeof SET_MESSAGE
}
export const setMessage=(message: string | null):SetMessageType=>{
    return{
        message,
        type: SET_MESSAGE
    }
}
type SetFollowersStateType={
    followers: ProfileType[]
    type: typeof SET_FOLLOWERS_STATE
}
export const setFollowersState=(followers:ProfileType[]):SetFollowersStateType=>{
    return{
        type: SET_FOLLOWERS_STATE,
        followers
    }
}
type SetOnePeopleFollowType={
    type: typeof SET_ONE_PEOPLE_FOLLOW
    userId: string
    isFollow: boolean
}
export const setOnePeopleFollow=(userId: string, isFollow: boolean ):SetOnePeopleFollowType=>{
    return {
        type: SET_ONE_PEOPLE_FOLLOW,
        userId,isFollow
    }
}
export type SetFollowersAsyncType={
    page: number
    title: string
    portionSize: number
    type: typeof SET_FOLLOWERS_ASYNC
}
export const setFollowersAsync=(title: string = '', page: number = 1 , portionSize: number=10):SetFollowersAsyncType=>{
    return{
        page,title,
        portionSize,
        type: SET_FOLLOWERS_ASYNC
    }
}
export type FollowType={
    userId: string
    type: typeof FOLLOW
}
export const follow=(userId: string):FollowType=>{
    return{
        userId,
        type: FOLLOW
    }
}
export type UnFollowType={
    userId: string
    type: typeof UNFOLLOW
}
export const unfollow=(userId:string):UnFollowType=>{
    return{
        userId,
        type: UNFOLLOW
    }
}
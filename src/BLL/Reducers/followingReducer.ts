
import { ProfileType } from "../../Types/profile";

const SET_FOLLOWING_STATE:'followingReducer/SET_FOLLOWERS_STATE'='followingReducer/SET_FOLLOWERS_STATE'
const SET_PAGE:'followingReducer/SET_PAGE'='followingReducer/SET_PAGE'
const SET_INIT:'followingReducer/SET_INIT'='followingReducer/SET_INIT'
const SET_MESSAGE:'followingReducer/SET_MESSAGE'='followingReducer/SET_MESSAGE'
const SET_ONE_PEOPLE_FOLLOW:'followingReducer/SET_ONE_PEOPLE_FOLLOW'='followingReducer/SET_ONE_PEOPLE_FOLLOW'
const SET_COUNT:'followingReducer/SET_COUNT'='followingReducer/SET_COUNT'
export const SET_FOLLOWING_ASYNC:'followingReducer/SET_FOLLOWERS_ASYNC'='followingReducer/SET_FOLLOWERS_ASYNC'
export const FOLLOW:'followingReducer/FOLLOW'='followingReducer/FOLLOW'
export const UNFOLLOW:'followingReducer/UNFOLLOW'='followingReducer/UNFOLLOW'


const initialState = {
    following:[] as ProfileType[],
    count: 0 as number,
    page: 1 as number,
    isInit: false as boolean,
    message: null as null | string
}
type InitialStateType= typeof initialState
type ActionType = (SetPageType | SetInitType | SetCountType |
        SetMessageType | SetFollowingStateType | SetOnePeopleFollowType)

export const followingReducer=(state=initialState,action:ActionType):InitialStateType=>{
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
        case SET_FOLLOWING_STATE:
            return {
                ...state,
                following: [...action.following]
            } 
        case SET_MESSAGE:
            return {
                ...state,
                message: action.message
            }
        case SET_ONE_PEOPLE_FOLLOW:
            return {
                ...state,
                following: [
                    ...state.following.map(f=>{
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
type SetFollowingStateType={
    following: ProfileType[]
    type: typeof SET_FOLLOWING_STATE
}
export const setFollowingState=(following:ProfileType[]):SetFollowingStateType=>{
    return{
        type: SET_FOLLOWING_STATE,
        following
    }
}
type SetOnePeopleFollowType={
    type: typeof SET_ONE_PEOPLE_FOLLOW
    userId: string
    isFollow: boolean
}
export const setOnePeopleFollow=(userId: string, isFollow: boolean):SetOnePeopleFollowType=>{
    return {
        type: SET_ONE_PEOPLE_FOLLOW,
        userId,isFollow
    }
}
export type SetFollowingAsyncType={
    page: number
    title: string
    portionSize: number
    userId?: string
    type: typeof SET_FOLLOWING_ASYNC
}
export const setFollowingAsync=(title: string = '', page: number = 1 , portionSize: number=10, userId?:string):SetFollowingAsyncType=>{
    return{
        page,title,
        portionSize,userId,
        type: SET_FOLLOWING_ASYNC
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
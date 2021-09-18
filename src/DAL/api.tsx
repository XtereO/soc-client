import axios from "axios";
import { type } from "os";
import { title } from "process";
import { backendURL } from "../Consts";
import { RegistrateRequestType } from "../Types/auth";
import { GenreType, MusicType } from "../Types/music";
import { NamesType, ProfileDetailType, ProfileType, ReviewType } from "../Types/profile";


const instance = axios.create({
    baseURL:`${backendURL}api/`,
    headers:{
        Authorization:localStorage.getItem('token')
    }
})

type PaginationType={
    count: number
}
export type ResultCodeType={
    success: boolean
    message?: string
}
type LoginType={
    token: string
}

/*
======================================================+-=
======================Authentithicate=================--+
======================================================---
*/
export const login=(email:string, password:string)=>{
    return instance.post<LoginType & ResultCodeType>('auth/login',{email, password})
    .then(response=>response.data)
    .catch(e=>e.response.data)
}


export const registrate=(req:RegistrateRequestType)=>{
    return instance.post<ResultCodeType>('auth/registrate',{...req})
    .then(response=>response.data)
    .catch(e=>e.response.data)
}

export const confirmCode=(getter:string, textMessage:string)=>{
    return instance.post<ResultCodeType>('auth/confirmCode',{getter, textMessage})
    .then(response=>response.data)
    .catch(e=>e.response.data)
}

/*
=========================================================
========================Profile==========================
=========================================================
*/
export type GetProfileType={
    user: ProfileDetailType
    success: boolean
}
export const getProfile=(userId?:string)=>{
    return instance.get<GetProfileType>(`users/getUser/${userId ? userId : ''}`)
    .then(res=>res.data)
    .catch(e=>e.response.data)
}
export type GetReviewType={
    count: number
    success: boolean
    reviews: ReviewType[]
}
export const getReviews=(idWhoNeedIt:string,page=1,
    showNewFirst=true,size=6,
    reviewFor:('MusicOrPlaylist' | 'User')='User')=>{
    return instance.get<GetReviewType>(`review?idWhoNeedIt=${idWhoNeedIt}&page=${page}&showNewFirst=${showNewFirst}&size=${size}&reviewFor=${reviewFor}`)
    .then(res=>res.data)
    .catch(e=>e.response.data)
}
export const setAboutMe=(aboutMe:string)=>{
    return instance.put<ResultCodeType>('profile/updateAboutMe',
    {aboutMe})
    .then(res=>res.data)
    .catch(e=>e.response.data)
}
export const setNames=(req:NamesType)=>{
    return instance.put('profile/updateDates',
    {...req})
    .then(res=>res.data)
    .catch(e=>e.response.data)
}
export type SetAvatarType={
    avatar: string
}
export const setAvatar=(file: any)=>{
    let formData = new FormData()
    formData.append("image",file)
    
    return instance.put<ResultCodeType & SetAvatarType>('profile/updateAvatar',
        formData,
        {headers:{
            "Content-Type":'multipart/form-data'
        }})
        .then(res=>res.data)
        .catch(e=>e.response.data)
}
export const setPasswords = (password: string, passwordRepeat: string)=>{
    return instance.put<ResultCodeType>('profile/updatePassword',
    {password, passwordRepeat})
    .then(res=>res.data)
    .catch(e=>e.response.data)
}

/*
====================================================
=====================People=========================
====================================================
*/
export type GetPeopleType={
    users: ProfileType[]
    count: number
    success: boolean
    message?: string
}
export const getPeople=(page=1,size=10,title?:string)=>{
    return instance.get<GetPeopleType>(`users/getUsers?page=${page}&size=${size}&title=${title ? title : ''}`)
    .then(res=>res.data)
    .catch(e=>e.response.data)
}
export const follow=(userId:string)=>{
    return instance.post<ResultCodeType>(`profile/follow/${userId}`)
    .then(res=>res.data)
    .catch(e=>e.response.data)
}
export const unfollow=(userId:string)=>{
    return instance.delete<ResultCodeType>(`profile/follow/${userId}`)
    .then(res=>res.data)
    .catch(e=>e.response.data)
}
export const getFollowers=(page=1,size=10,title?:string)=>{
    return instance.get<GetPeopleType>(`users/followers?page=${page}&size=${size}&title=${title ? title : ''}`)
    .then(res=>res.data)
    .catch(e=>e.response.data)
}
export const getFollowing=(page=1,size=10,title?:string)=>{
    return instance.get<GetPeopleType>(`users/following?page=${page}&size=${size}&title=${title ? title : ''}`)
    .then(res=>res.data)
    .catch(e=>e.response.data)
}

/*
=================================================
==================MUSIC=BLOCK====================
=================================================
*/
export type AddMusicRequestType={
    success: boolean
    musicId?: string
    message?: string
}
export const addMusic=(title: string, author: string, genre: GenreType)=>{
    return instance.post<AddMusicRequestType>(`audio/music`,
    {title, author, genre})
    .then(res=>res.data)
    .catch(e=>e.response.data)
}
export const setImgMusic=(img:any,musicId:string)=>{
    let formData = new FormData()
    formData.append('image',img)
    
    return instance.put<ResultCodeType>(`audio/imusic/${musicId}`,
    formData,{
        headers:{
        'Content-Type':'multipart/form-data'
        }
    })
    .then(res=>res.data)
    .catch(e=>e.response.data)
}
export const setMP3Music=(mp3:any,musicId:string)=>{
    let formData=new FormData()
    formData.append('music',mp3)
    
    return instance.put<ResultCodeType>(`audio/musicmp3/${musicId}`,
    formData,{
        headers:{
            'Content-Type':'multipart/form-data'
        }
    })
    .then(res=>res.data)
    .catch(e=>e.response.data)
}
export type GetMusicsType={
    success: boolean
    message?: string
    count: number
    musics: MusicType[]
} 
export const getMudics=(genre: GenreType,page=1,title=null as null | string, author=null as null | string,size=10)=>{
    if(title){
        return instance.get<GetMusicsType>(`audio/music?genre=${genre}&page=${page}&size=${size}$title=${title}`)
        .then(res=>res.data)
        .catch(e=>e.response.data)
    }else{
        return instance.get<GetMusicsType>(`audio/music?genre=${genre}&page=${page}&size=${size}$author=${author}`)
        .then(res=>res.data)
        .catch(e=>e.response.data)
    }
}
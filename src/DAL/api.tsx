import axios from "axios";
import { type } from "os";
import { title } from "process";
import { backendURL } from "../Consts";
import { RegistrateRequestType } from "../Types/auth";
import { FilterGetMusicType, GenreType, MusicType } from "../Types/music";
import { GetPlaylistsFiltersType, PlaylistType } from "../Types/playlist";
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
export const getFollowers=(page=1,size=10,title?:string,userId?:string)=>{
    return instance.get<GetPeopleType>(`users/followers?page=${page}&size=${size}&title=${title ? title : ''}&userId=${userId}`)
    .then(res=>res.data)
    .catch(e=>e.response.data)
}
export const getFollowing=(page=1,size=10,title?:string,userId?:string)=>{
    return instance.get<GetPeopleType>(`users/following?page=${page}&size=${size}&title=${title ? title : ''}&userId=${userId}`)
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
    
    return instance.put<ResultCodeType & {imgSrc: string}>(`audio/imusic/${musicId}`,
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
    
    return instance.put<ResultCodeType & {musicSrc:string}>(`audio/musicmp3/${musicId}`,
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
export const getMudics=({
        page,size,
        title,searchBy,
        genre,onlyMyCreated,
        onlyMySaved,firstShow
    }:FilterGetMusicType)=>{
    // Please dont touch string(s)!!!
    let s = `audio/musics?page=${page}&size=${size}&title=${title}&searchBy=${searchBy}&genre=${genre}&onlyMyCreated=${onlyMyCreated}&onlyMySaved=${onlyMySaved}&firstShow=${firstShow}`
    return instance.get<GetMusicsType>(s)
    .then(res=>res.data)
    .catch(e=>e.response.data)
}

export const saveMusic=(musicId:string)=>{
    return instance.post<ResultCodeType>(`audio/savemusic/${musicId}`)
    .then(res=>res.data)
    .catch(e=>e.response.data)
}
export const removeMusicFromSave=(musicId:string)=>{
    return instance.delete<ResultCodeType>(`audio/savemusic/${musicId}`)
    .then(res=>res.data)
    .catch(e=>e.response.data)
}

export type RateMusicType={
    review?: string
    rating: number
    musicId: string
    musicTitle: string
}
export const rateMusic=(req:RateMusicType)=>{
    return instance.post<ResultCodeType>(`review`,{
        idMusicOrPlaylist: req.musicId,
        reviewFor: 'Music',
        titleMusicOrPlaylist: req.musicTitle,
        rating: req.rating, review: req.review
    }).then(res=>res.data)
    .catch(e=>e.response.data)
}

type PayloadSetMusicType={
    author?:string,
    title?:string
    genre?:GenreType
}
export const setMusic=(musicId: string, payload: PayloadSetMusicType)=>{
    return instance.put<ResultCodeType>(`audio/music`,
    {musicId,...payload})
    .then(res=>res.data)
    .catch(e=>e.response.data)
}

/*
=========================================================
====================PLAYLIST=BLOCK=======================
=========================================================
*/
export type GetPlaylistsType={
    playlists: PlaylistType[]
    count: number
    success: boolean
    message?: string
}
export const getPlaylists=(filters:GetPlaylistsFiltersType)=>{
    return instance.get<GetPlaylistsType>(`audio/playlists?page=${filters.page}&size=${filters.size}&title=${filters.title}&onlyMySaved=${filters.onlyMySaved}&onlyMyCreated=${filters.onlyMyCreated}&firstShow=${filters.firstShow}`)
    .then(res=>res.data)
    .catch(e=>e.response.data)
}
export const setImgPlaylist=(playlistId:string,img: any)=>{
    const formData = new FormData()
    formData.append('image',img)

    return instance.put<ResultCodeType & {imgSrc:string}>(`audio/iplaylist/${playlistId}`,
    formData,{headers:{
        'Content-Type':'multipart/form-data'
    }}
    ).then(res=>res.data)
    .catch(e=>e.response.data)
}
export const addPlaylist=(title:string, isPublic:boolean)=>{
    return instance.post<ResultCodeType & {playlistId:string}>(`audio/playlist`,
    {title,isPublic})
    .then(res=>res.data)
    .catch(e=>e.response.data)
}
export const savePlaylist=(playlistId:string)=>{
    return instance.post<ResultCodeType>(`audio/saveplaylist/${playlistId}`)
    .then(res=>res.data)
    .catch(e=>e.response.data)
}
export const removePlaylistFromSaved=(playlistId:string)=>{
    return instance.delete<ResultCodeType>(`audio/saveplaylist/${playlistId}`)
    .then(res=>res.data)
    .catch(e=>e.response.data)
}
type RatePlaylistType={
    review: string | null
    rating: number
    playlistId: string
    playlistTitle: string
}
export const ratePlaylist=(req:RatePlaylistType)=>{
    return instance.post<ResultCodeType & {review:ReviewType}>(`review`,{
        idMusicOrPlaylist: req.playlistId,
        reviewFor: 'Playlist',
        titleMusicOrPlaylist: req.playlistTitle,
        rating: req.rating, review: req.review
    }).then(res=>res.data)
    .catch(e=>e.response.data)
}

export const setPlaylist=(playlistId:string, payload:{isPublic?:boolean,title?:string})=>{
    return instance.put<ResultCodeType>(`audio/changeplaylist`,
    {payload,playlistId})
    .then(res=>res.data)
    .catch(e=>e.response.data)
}

import axios from "axios";
import { backendURL } from "../Consts";
import { RegistrateRequestType } from "../Types/auth";
import { NamesType, ProfileType, ReviewType } from "../Types/profile";


const instance = axios.create({
    baseURL:`${backendURL}api/`,
    headers:{
        Authorization:localStorage.getItem('token')
    }
})


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
    user: ProfileType
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
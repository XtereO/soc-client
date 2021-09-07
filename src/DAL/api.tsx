import axios from "axios";
import { RegistrateRequestType } from "../Types/auth";
import { ProfileType, ReviewType } from "../Types/profile";


const instance = axios.create({
    baseURL:'http://localhost:5000/api/',
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
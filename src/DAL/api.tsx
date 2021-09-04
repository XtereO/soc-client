import axios from "axios";
import { RegistrateRequestType } from "../Types/auth";


const instance = axios.create({
    baseURL:'http://localhost:5000/api/',
})


export type ResultCodeType={
    success: boolean
    message?: string
}
type LoginType={
    token: string
}

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
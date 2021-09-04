


export type LoginRequestType={
    email: string
    password: string
}

export type RegistrateRequestType={
    password:string
    firstName:string
    secondName:string
    shortNickname:string
    email:string
}

export type ShowToastType={
    showToast:()=>void
}
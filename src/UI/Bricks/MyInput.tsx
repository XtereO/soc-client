import React from "react"



type PropsType={
    onChange?: (e:React.ChangeEvent<HTMLInputElement>)=>void
    onBlur?: (e:React.ChangeEvent<HTMLInputElement>)=>void
    placeholder?: string
    style?: any
    value?: string | number
    defaultChecked?: boolean | undefined
    required?: boolean
    type?: string
    name?: string
    id?: string
}

export const MyInput:React.FC<PropsType>=(props)=>{
    
    
    
    return<input {...props}
    className="Input 
    Input_focus Input_hover" />
}
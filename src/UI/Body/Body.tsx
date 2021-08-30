import React from "react"
import { Route } from "react-router-dom"
import { Music } from "../Music/Music"



type PropsType={
    //true - pc, false - phone
    mode: boolean
}

export const Body:React.FC<PropsType> = ({mode})=>{
    return<div className="container">
        <Route path="/music/:musicId?" render={()=><Music/>} />
    </div>
}
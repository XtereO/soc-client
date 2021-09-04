import React from "react"
import { Loader } from "../Bricks/Loader"


type PropsType={
}

export const WithSuspense:React.FC<PropsType>=(props)=>{
    return<React.Suspense fallback={
        <div className="Center">
        <Loader />
        </div>}>
        {props.children}
    </React.Suspense>
}
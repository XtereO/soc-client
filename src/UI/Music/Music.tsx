import React from "react"
import { PlayingMusic } from "./PlayingMusic"
import { RecomendationList } from "./RecomendationList"
import { Reviews } from "./Reviews"



type PropsType = {
}

export const Music:React.FC<PropsType> = (props)=>{
    return<div> 
    <PlayingMusic/>
    <div className="mt-2">
        <div className="">
            <h3>Reviews</h3>
            <Reviews reviews={[]} />
        </div>
        <div className="">
            <h3>Recomendations</h3>
            <RecomendationList recomendations={[]} />
        </div>
    </div>
</div>
}
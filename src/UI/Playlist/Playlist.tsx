
import React from "react";
import { MusicItem, MusicItemType } from "../Musics/Bricks/MusicItem";
import { Reviews } from "../Music/Reviews";
import { RecomendationList } from "./RecomendationList";


type PropsType={
}


const Playlist:React.FC<PropsType>=(props)=>{
    return<div>
        <div>
            <div className="row">
                <div className="col-md-6">
                    <img 
                    style={{height:500}}
                    src="https://cdn.farmjournal.com/s3fs-public/CEDF9A00-B324-47E4-A2122E05443214C4.jpg"
                    className="w-100 img" />
                </div>
                <div 
                className="col-md-6 Playlist__Musics">
                    {[].map((m:MusicItemType)=><MusicItem {...m} />)}
                </div>
            </div>
            <div >
                <h4 className="Center">Crush40</h4>
                <div className="Center">
                    Author: @HellO
                </div>
                <div className="Center">
                    Rating: 8/10
                </div>
            </div>
        </div>
        <div>
            <div>
                <Reviews reviews={[]} />
            </div>
            <div>
                <RecomendationList recomendations={[]}/>
            </div>
        </div>
    </div>
}

export default Playlist
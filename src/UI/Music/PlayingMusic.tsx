import React from "react"
import { MusicPlayer } from "./Bricks/MusicPlayer"
import { InfoMusic } from "./Bricks/InfoMusic";
import { useState } from "react";
import { backendURL } from "../../Consts";
import { MusicDetailType } from "../../Types/music";


type PropsType = MusicDetailType & {
    
}

export const PlayingMusic: React.FC<PropsType> = (props) => {
    const bg = {
        background: `url(${backendURL+props.imgSrc}) no-repeat cover`,
        backgroundSize: '100% 100%'
    }

    return <div>
        <div className="row w-100" style={{padding:0}}>
            <div className="col-md-6" style={{paddingRight:0}}>
                <MusicPlayer {...props} imgSrc={props.imgSrc ? props.imgSrc : ''}/>
            </div>
            <div className="col-md-6" style={{paddingLeft:0}}>
                <InfoMusic
                    title={props.title}
                    author={props.author}
                    rating={
                        props.countRated!==0 ?
                        props.summaryRating/props.countRated :
                        '?'}
                    countRated={props.countRated}
                    />
            </div>
        </div>
    </div>
}


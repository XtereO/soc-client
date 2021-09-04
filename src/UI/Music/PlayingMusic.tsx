import React from "react"
import { MusicPlayer } from "./Bricks/MusicPlayer"
import { InfoMusic } from "./Bricks/InfoMusic";
import { useState } from "react";


type PropsType = {
}

export const PlayingMusic: React.FC<PropsType> = (props) => {

    const bg = {
        background: `url(https://донэллиот.рф/wp-content/uploads/2020/05/283.-2048x1280.jpg) no-repeat cover`,
        backgroundSize: '100% 100%'
    }

    return <div>
        <div className="row w-100" style={{padding:0}}>
            <div className="col-md-6" style={{paddingRight:0}}>
                <MusicPlayer />
            </div>
            <div className="col-md-6" style={{paddingLeft:0}}>
                <InfoMusic
                    title={"Title music"}
                    author={"author of this music"}
                    rating={7} />
            </div>
        </div>
    </div>
}


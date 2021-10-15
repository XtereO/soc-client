
import React, { useEffect, useState } from "react";
import { MusicItem, MusicItemType, PayloadType } from "../Musics/Bricks/MusicItem";
import { Reviews } from "../Music/Reviews";
import { RecomendationList } from "./RecomendationList";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { rateMusicAsync, removeFromSavedMusicAsync, saveMusicAsync, setActivePlaylistAsync, setMusicAsync } from "../../BLL/Reducers/playlistReducer";
import { lastItem } from "../../utils";
import { initSelector, messageSelector, playlistSelector } from "../../BLL/Selectors/playlistSelector";
import { setMusics } from "../../BLL/Reducers/playerReducer";

type PropsType={
}


const Playlist:React.FC<PropsType>=(props)=>{

    const history = useHistory()
    const dispatch = useDispatch()
    let playlist = useSelector(playlistSelector)
    let message = useSelector(messageSelector)
    let isInit = useSelector(initSelector)

    const musicJSX=playlist ? 
    playlist.musics.map(m=><MusicItem 
    {...m}
    message={message}
    isInit={isInit}
    onSave={()=>dispatch(saveMusicAsync(m.musicId))}
    onRemove={()=>dispatch(removeFromSavedMusicAsync(m.musicId))}
    onPlayMusic={()=>dispatch(setMusics(playlist ? playlist.musics : []))}
    setMusicAsync={(
        onClose:()=>void,payload:PayloadType
    )=>dispatch(setMusicAsync(m.musicId,onClose,payload))}
    rateMusicAsync={(
        title:string,rating:number,onClose:()=>void,review:string
    )=>dispatch(rateMusicAsync(m.musicId,title,rating,onClose,review))}
    />) 
    : []
    useEffect(()=>{
        const url = history.location.pathname
        const playlistId = lastItem(url.split('/'))

        dispatch(setActivePlaylistAsync(playlistId))
    },[history.location])

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
                    {musicJSX}
                </div>
            </div>
            <div >
                <h4 className="Center">Crush40</h4>
                <div className="Center">
                    Author: {playlist?.owner.shortNickname}
                </div>
                <div className="Center">
                    Rating: {
                    (playlist && playlist.countRated!==0) ?
                    playlist.summaryRating/playlist.countRated : 
                    '-'
                    }
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
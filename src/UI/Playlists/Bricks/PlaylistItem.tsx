import React from "react"
import { NavLink } from "react-router-dom"
import { backendURL } from "../../../Consts"
//@ts-ignore
import default_playlist from "../../../Media/default_playlist.jpg";


export type PlaylistItemType={
    title: string
    imgSrc: string
    playlistId: string
}

export const PlaylistItem:React.FC<PlaylistItemType>=({title,imgSrc,playlistId})=>{
    return<div className="row">
        <div className="col-3">
            <NavLink to={`/playlist/${playlistId}`}>
            <img  
            src={imgSrc ? backendURL+imgSrc : default_playlist}
            className="w-100 img rounded"/>
            </NavLink>
        </div>
        <div className="col-9">
            {title}
        </div>
    </div>
}
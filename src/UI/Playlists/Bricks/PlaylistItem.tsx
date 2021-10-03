import React, { useState } from "react"
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom"
import { myProfileSelector } from "../../../BLL/Selectors/profileSelector";
import { backendURL } from "../../../Consts"
//@ts-ignore
import default_playlist from "../../../Media/default_playlist.jpg";
import { PlaylistType } from "../../../Types/playlist";
import { SettingButton } from "../../Bricks/SettingButton";
import { RatePlaylistModal } from "./RatePlaylistModal";
import { SettingsPlaylistModal } from "./SettingsPlaylistModal";


export type PlaylistItemType=PlaylistType &{
    addMusicToPlaylist:(musicId:string)=>void
    removeMusicFromPlaylist:(musicId:string)=>void
    onRemove:()=>void
    onSave:()=>void
    setImg:(img:any, callback:()=>void)=>void
    setInfo:(isPublic:boolean, title:string, callback:()=>void)=>void
}

export const PlaylistItem:React.FC<PlaylistItemType>=({
    title,imgSrc,playlistId,
    ...props})=>{

    let myProfile = useSelector(myProfileSelector)
    
    let [showSettings,setShowSettings] = useState(false)
    const handleOpenSettings=()=>{
        setShowSettings(true)
    }
    const handleCloseSettings=()=>{
        setShowSettings(false)
    }
    let [showRating, setShowRating] = useState(false)
    const handleOpenRating=()=>{
        setShowRating(true)
    }
    const handleCloseRating=()=>{
        setShowRating(false)
    }

    return<div className="row">
        <div className="col-3">
            <NavLink to={`/playlist/${playlistId}`}>
            <img  
            src={imgSrc ? backendURL+imgSrc : default_playlist}
            className="w-100 img rounded"/>
            </NavLink>
        </div>
        <div className="col-9 row">
            <div className='col-6'>
                <h4>{title}</h4>
            </div>
            <div className='col-6 d-flex justify-content-end'>
            {props.owner.shortNickname===myProfile.shortNickname &&
                    <button
                    onClick={handleOpenSettings}
                    className='btn btn-light'>
                        <SettingButton />
                    </button>}
            {props.myReview ? 
                    <button 
                    onClick={handleOpenRating}
                    className='btn btn-warning text-white'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-star" viewBox="0 0 16 16">
                        <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
                        </svg>
                    </button>
                    :
                    <button 
                    onClick={handleOpenRating}
                    className='btn btn-outline-warning'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-star" viewBox="0 0 16 16">
                        <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
                        </svg>
                    </button>
                    }
            {props.isSaved ? 
                    <button
                    onClick={props.onRemove}
                    className='btn btn-outline-danger'
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                        </svg>
                    </button>
                    :
                    <button
                    onClick={props.onSave}
                    className='btn btn-outline-success'
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-cloud-plus" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M8 5.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 .5-.5z"/>
                        <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z"/>
                        </svg>
                    </button>}
            </div>
        </div>
        {showRating && 
        <RatePlaylistModal
        show={showRating}
        onClose={handleCloseRating}
        {...props} title={title}
        imgSrc={imgSrc} playlistId={playlistId}
        />}
        {showSettings && <SettingsPlaylistModal 
        onClose={handleCloseSettings}
        show={showSettings}
        playlistId={playlistId}
        title={title} imgSrc={imgSrc}
        {...props}
        setImg={(img:any)=>props.setImg(img, handleCloseSettings)}
        setInfo={(isPublic:boolean,title:string)=>props.setInfo(
            isPublic,title,handleCloseSettings)} 
        />}
    </div>
}
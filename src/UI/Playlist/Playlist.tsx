
import React, { useContext, useEffect, useState } from "react";
import { MusicItem, MusicItemType, PayloadType } from "../Musics/Bricks/MusicItem";
import { Reviews } from "../Music/Reviews";
import { RecomendationList } from "./RecomendationList";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addMusicToPlaylistAsync, rateMusicAsync, ratePlaylistAsync, removeFromPlaylistAsync, removeFromSavedMusicAsync, removeMusicFromPlaylistAsync, saveMusicAsync, savePlaylistAsync, setActivePlaylistAsync, setCountMusic, setMusicAsync, setMusicsAsync, setMusicsState, setPlaylistAsync, setReviewsAsync } from "../../BLL/Reducers/playlistReducer";
import { lastItem } from "../../utils";
import { filtersForSearchMusicsSelector, musicsSelector,countMusicsSelector, countReviewsSelector, initSelector, messageSelector, pageReviewsSelector, playlistSelector, reviewsSelector } from "../../BLL/Selectors/playlistSelector";
import { setMusics } from "../../BLL/Reducers/playerReducer";
import { backendURL } from "../../Consts";
import { Pagination } from "../Bricks/Pagination";
import { ModeContext } from "../../App";
import { myProfileSelector } from "../../BLL/Selectors/profileSelector";
import { SettingButton } from "../Bricks/SettingButton";
import { SettingsPlaylistModal } from "../Playlists/Bricks/SettingsPlaylistModal";
import { RatePlaylistModal } from "../Playlists/Bricks/RatePlaylistModal";
import { AddRemoveMusicToFromPlaylist } from "../Playlists/Bricks/AddRemoveMusicToFromPlaylist";
import { FilterGetMusicType, MusicType } from "../../Types/music";

type PropsType={
}


const Playlist:React.FC<PropsType>=(props)=>{

    const mode = useContext(ModeContext)
    const history = useHistory()
    const dispatch = useDispatch()
    let playlist = useSelector(playlistSelector)
    let message = useSelector(messageSelector)
    let isInit = useSelector(initSelector)
    let count = useSelector(countReviewsSelector)
    let reviews = useSelector(reviewsSelector)
    let page = useSelector(pageReviewsSelector)
    let myProfile = useSelector(myProfileSelector)
    let filters = useSelector(filtersForSearchMusicsSelector)
    let countMusics = useSelector(countMusicsSelector)
    let musics = useSelector(musicsSelector)

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
    useEffect(()=>{
        if(playlist){
            dispatch(setReviewsAsync(1,playlist.playlistId))
        }
    },[playlist?.playlistId])

    const handlerPageChange=(page:number)=>{
        //@ts-ignore
        dispatch(setReviewsAsync(page,playlist.playlistId as string))
    }

    let [showSettings,setShowSettings]=useState(false)
    const handleOpenSettings=()=>{
        setShowSettings(true)
    }
    const handleCloseSettings=()=>{
        setShowSettings(false)
    }

    let [showRating,setShowRating]=useState(false)
    const handleOpenRating=()=>{
        setShowRating(true)
    }
    const handleCloseRating=()=>{
        setShowRating(false)
    }

    const [showAddMenu,setShowAddMenu]=useState(false)
    const handleOpenAddMenu=()=>{
        setShowAddMenu(true)
    }
    const handleCloseAddMenu=()=>{
        setShowAddMenu(false)
    }

    return<div>
        <div>
            <div className='row my-4'>
                <div className='col-4'>
                    Playlist Page
                </div>
                <div className='col-8 d-flex justify-content-end'>
                {playlist?.owner.shortNickname === myProfile.shortNickname &&
                    <button
                        onClick={handleOpenSettings}
                        className='btn btn-light'>
                        <SettingButton />
                    </button>}
                {playlist?.owner.shortNickname === myProfile.shortNickname &&
                    <button
                        onClick={handleOpenAddMenu}
                        className='btn btn-outline-primary'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-folder" viewBox="0 0 16 16">
                            <path d="M.54 3.87.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.826a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31zM2.19 4a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4H2.19zm4.69-1.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707z" />
                        </svg>
                    </button>}
                {playlist?.myReview ?
                    <button
                        onClick={handleOpenRating}
                        className='btn btn-warning text-white'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-star" viewBox="0 0 16 16">
                            <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                        </svg>
                    </button>
                    :
                    <button
                        onClick={handleOpenRating}
                        className='btn btn-outline-warning'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-star" viewBox="0 0 16 16">
                            <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                        </svg>
                    </button>
                }
                {playlist?.isSaved ?
                    <button
                        onClick={()=>dispatch(removeFromPlaylistAsync(playlist ? playlist.playlistId : ''))}
                        className='btn btn-outline-danger'
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                        </svg>
                    </button>
                    :
                    <button
                        onClick={()=>dispatch(savePlaylistAsync(playlist ? playlist.playlistId : ''))}
                        className='btn btn-outline-success'
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-cloud-plus" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 5.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 .5-.5z" />
                            <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z" />
                        </svg>
                    </button>}
                </div>
            </div>
            <div className="row px-2">
                <div className="col-md-6">
                    <img 
                    style={{ 
                            height: mode ? 500 : 300 
                        }}
                    src={backendURL+playlist?.imgSrc}
                    className="w-100 img" />
                </div>
                <div 
                className="col-md-6  Playlist__Musics">
                    {musicJSX}
                </div>
            </div>
            <div >
                <h4 className="Center">{playlist?.title}</h4>
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
            <div className='mt-4'>
            <div  className="w-100 row">
                <div className="col-6">
                    <h5>Reviews:</h5>
                </div>
                <div className="col-6 d-flex justify-content-end">
                    <Pagination 
                    page={page}
                    portionSize={6}
                    count={count}
                    pageChange={handlerPageChange}
                    />
                </div>
            </div>
            {count >0 &&  <Reviews reviews={reviews} />}
            {count===0 && <div className="w-100 Center mt-4">
                Here haven't leave a reviews yet 
            </div>}
            </div>
        </div>
        {showAddMenu && playlist &&
            <AddRemoveMusicToFromPlaylist
                messageError={message}
                setActivePlaylist={()=>{
                    //@ts-ignore
                    dispatch(setActivePlaylistAsync(playlist.playlistId))
                }}
                //@ts-ignore
                playlist={{ ...playlist }}
                show={showAddMenu}
                closeHandler={handleCloseAddMenu}
                filters={filters}
                onFiltersSubmit={(filter: FilterGetMusicType) => {
                    dispatch(setMusicsAsync(playlist ? playlist.playlistId : '',filter ))
                }}
                count={countMusics} musics={musics}
                setMusics={(filter: FilterGetMusicType) => {
                    dispatch(setMusicsAsync(playlist ? playlist.playlistId : '',filter ))
                }}
                setMusicsSync={(musics: MusicType[]) => {
                    dispatch(setMusicsState(musics))
                }}
                setMusicsCount={(count: number) => {
                    dispatch(setCountMusic(count))
                }}
                addMusicToPlaylist={(muiscId: string) => {
                    dispatch(addMusicToPlaylistAsync(playlist ? playlist.playlistId : '',muiscId))
                }}
                removeMusicFromPlaylist={(musicId: string) => {
                    dispatch(removeMusicFromPlaylistAsync(playlist ? playlist.playlistId : '',musicId))
                }} />}
        {showRating && playlist &&
            <RatePlaylistModal
                ratePlaylistAsync={(playlistId:string,rating:number,review:string | null,
                    title:string,onClose:()=>void,
                    )=>dispatch(ratePlaylistAsync(
                        playlistId,rating,review,title,onClose))}
                show={showRating}
                onClose={handleCloseRating}
                {...playlist}
            />}
        {showSettings && playlist && 
        <SettingsPlaylistModal
            onClose={handleCloseSettings}
            show={showSettings}
            {...playlist}
            setImg={(img: any) => dispatch(setPlaylistAsync(
                {img},playlist ? playlist.playlistId : '',handleCloseSettings))}
            setInfo={(isPublic: boolean, title: string) => dispatch(setPlaylistAsync(
                {isPublic,title},playlist ? playlist.playlistId : '',handleCloseSettings))}
        />}
    </div>
}

export default Playlist
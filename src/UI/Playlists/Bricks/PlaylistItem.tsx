import React, { useState } from "react"
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom"
import { myProfileSelector } from "../../../BLL/Selectors/profileSelector";
import { backendURL } from "../../../Consts"
//@ts-ignore
import default_playlist from "../../../Media/default_playlist.jpg";
import { FilterGetMusicType, MusicType } from "../../../Types/music";
import { MinimilizeMusicType, PlaylistDetailType, PlaylistType } from "../../../Types/playlist";
import { SettingButton } from "../../Bricks/SettingButton";
import { AddRemoveMusicToFromPlaylist } from "./AddRemoveMusicToFromPlaylist";
import { RatePlaylistModal } from "./RatePlaylistModal";
import { SettingsPlaylistModal } from "./SettingsPlaylistModal";


export type PlaylistItemType = {
    messageError: string | null
    activePlaylist: PlaylistDetailType | null
    setActivePlaylist: (playlistId: string | null) => void
    playlist: PlaylistType
    filters: FilterGetMusicType
    countMusics: number //for add menu
    onFilterSubmit: (filters: FilterGetMusicType) => void
    musics: MinimilizeMusicType[]
    setMusicsCount: (count: number) => void
    setMusicsSync: (musics: MinimilizeMusicType[]) => void
    setMusics: (filters: FilterGetMusicType) => void
    addMusicToPlaylist: (musicId: string) => void
    removeMusicFromPlaylist: (musicId: string) => void
    onRemove: () => void
    onSave: () => void
    ratePlaylistAsync:(playlistId:string,rating:number,review:string | null,
        title:string,onClose:()=>void,
        )=>void
    setImg: (img: any, callback: () => void) => void
    setInfo: (isPublic: boolean, title: string, callback: () => void) => void
}

export const PlaylistItem: React.FC<PlaylistItemType> = ({
    playlist,
    ...props }) => {

    let myProfile = useSelector(myProfileSelector)

    let [showAddMenu, setShowAddMenu] = useState(false)
    const handleCloseAddMenu = () => {
        props.setActivePlaylist(null)
        setShowAddMenu(false)
    }
    const handleOpenAddMenu = () => {
        props.setActivePlaylist(playlist.playlistId)
        setShowAddMenu(true)
    }
    let [showSettings, setShowSettings] = useState(false)
    const handleOpenSettings = () => {
        setShowSettings(true)
    }
    const handleCloseSettings = () => {
        setShowSettings(false)
    }
    let [showRating, setShowRating] = useState(false)
    const handleOpenRating = () => {
        setShowRating(true)
    }
    const handleCloseRating = () => {
        setShowRating(false)
    }
    const getCountRated = () =>{
        const n = playlist.countRated
        return <div>Count Rated: {playlist.countRated}</div>
    }

    return <div 
    style={{
        display:'grid',
        gridTemplateColumns:'100px 1fr'
    }}
    className="">
        <div className="">
            <NavLink to={`/playlist/${playlist.playlistId}`}>
                <img
                    style={{height:100,width:100}}
                    src={playlist.imgSrc ? backendURL + playlist.imgSrc : default_playlist}
                    className="w-100 img rounded" />
            </NavLink>
        </div>
        <div
        style={{
            marginLeft: 10,
            display:'grid',
            gridTemplateColumns:'1fr 100px'
        }}>
            <div className=''>
                <h4>{playlist.title}</h4>
                <div style={{display:'flex', flexDirection:'column',
                justifyContent:'end'}}>
                

                <OverlayTrigger
    placement="bottom"
    overlay={<Tooltip id="button-tooltip-2">{<div>Count rated: {playlist.countRated}</div>}</Tooltip>}
  >
    {({ ref, ...triggerHandler }) => (
      <Button
        variant="light"
        {...triggerHandler}
        className="d-inline-flex align-items-center"
        style={{maxWidth:250,background:'transparent', border:'none'}}
      >
        <div ref={ref}>
            Rating: {playlist.countRated!==0 ? String(playlist.summaryRating/playlist.countRated).slice(0,3) : '?' }
        </div>
      </Button>
    )}
  </OverlayTrigger>
  <div className=''>
      <Button variant='light'
      className='d-inline-flex align-items-center'
      style={{maxWidth:250,background:'transparent',border:'none'}}
      >
      Count musics: {playlist.countMusics}
        </Button>
  </div>
                </div>
            </div>
            <div style={{width:100}} className=''>
                {playlist.owner.shortNickname === myProfile.shortNickname &&
                    <button
                        style={{height:50,width:50}}
                        onClick={handleOpenSettings}
                        className='btn btn-light'>
                        <SettingButton />
                    </button>}
                {playlist.owner.shortNickname === myProfile.shortNickname &&
                    <button
                        style={{height:50,width:50}}
                        onClick={handleOpenAddMenu}
                        className='btn btn-outline-primary'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-folder" viewBox="0 0 16 16">
                            <path d="M.54 3.87.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.826a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31zM2.19 4a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4H2.19zm4.69-1.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707z" />
                        </svg>
                    </button>}
                {playlist.myReview ?
                    <button
                        style={{height:50,width:50}}
                        onClick={handleOpenRating}
                        className='btn btn-warning text-white'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-star" viewBox="0 0 16 16">
                            <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                        </svg>
                    </button>
                    :
                    <button
                        style={{height:50,width:50}}
                        onClick={handleOpenRating}
                        className='btn btn-outline-warning'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-star" viewBox="0 0 16 16">
                            <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                        </svg>
                    </button>
                }
                {playlist.isSaved ?
                    <button
                        style={{height:50,width:50}}
                        onClick={props.onRemove}
                        className='btn btn-outline-danger'
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                        </svg>
                    </button>
                    :
                    <button
                        style={{height:50,width:50}}
                        onClick={props.onSave}
                        className='btn btn-outline-success'
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-cloud-plus" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 5.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 .5-.5z" />
                            <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z" />
                        </svg>
                    </button>}
            </div>
        </div>
        {showAddMenu && props.activePlaylist &&
            <AddRemoveMusicToFromPlaylist
                messageError={props.messageError}
                setActivePlaylist={()=>{
                    (props.setActivePlaylist(playlist.playlistId))
                }}
                playlist={{ ...props.activePlaylist }}
                show={showAddMenu}
                closeHandler={handleCloseAddMenu}
                filters={props.filters}
                onFiltersSubmit={(filter: FilterGetMusicType) => {
                    props.onFilterSubmit(filter)
                }}
                count={props.countMusics} musics={props.musics}
                setMusics={(filter: FilterGetMusicType) => {
                    props.setMusics(filter)
                }}
                setMusicsSync={(musics: MusicType[]) => {
                    props.setMusicsSync(musics)
                }}
                setMusicsCount={(count: number) => {
                    props.setMusicsCount(count)
                }}
                addMusicToPlaylist={(muiscId: string) => {
                    props.addMusicToPlaylist(muiscId)
                }}
                removeMusicFromPlaylist={(musicId: string) => {
                    props.removeMusicFromPlaylist(musicId)
                }} />}
        {showRating &&
            <RatePlaylistModal
                show={showRating}
                onClose={handleCloseRating}
                {...playlist}
                ratePlaylistAsync={props.ratePlaylistAsync}
            />}
        {showSettings && <SettingsPlaylistModal
            onClose={handleCloseSettings}
            show={showSettings}
            {...playlist}
            setImg={(img: any) => props.setImg(img, handleCloseSettings)}
            setInfo={(isPublic: boolean, title: string) => props.setInfo(
                isPublic, title, handleCloseSettings)}
        />}
    </div>
}
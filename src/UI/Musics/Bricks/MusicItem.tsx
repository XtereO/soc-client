import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { setActiveMusic, setPlayedMusicInterval, setPlayingMusic } from "../../../BLL/Reducers/playerReducer"
import { activeMusicDetailsSelector, activeMusicSettingsSelector  } from "../../../BLL/Selectors/playerSelector"
import { backendURL } from "../../../Consts"
import { MusicType } from "../../../Types/music"




export type MusicItemType = MusicType & {onPlayMusic:()=>void}

export const MusicItem: React.FC<MusicItemType> = (props) => {

    const dispatch = useDispatch()
    const activeMusicDetails = useSelector(activeMusicDetailsSelector)
    const activeMusicSettings = useSelector(activeMusicSettingsSelector)
    

    return <div className="row">
        <div className="col-2">
            <NavLink to={`/music/${props.musicId}`}>
                <img src={backendURL+props.imgSrc }
                className="img w-100 img-rounded" />
            </NavLink>
        </div>
        <div className="col-10">
            <h4>{props.title} - {props.author}</h4>
            <div className='d-flex '>
                <div>
                    {((!activeMusicDetails) || 
                    (props.musicId!==activeMusicDetails.musicId ||
                    (props.musicId===activeMusicDetails.musicId
                    && activeMusicSettings.isMusicPlay===false))) ?
                    <svg 
                    onClick={()=>{
                        if(activeMusicDetails && (props.musicId===activeMusicDetails.musicId)){
                            dispatch(setPlayingMusic(true))
                        }else{
                            props.onPlayMusic()
                            const audio = new Audio(backendURL+props.musicSrc)
                            audio.addEventListener('loadedmetadata',(e)=>{
                                dispatch(setActiveMusic(props,audio))
                            })
                        }
                    }}
                    xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"
                        className="bi bi-play 
        Body__SwitchButton
        Body__SwitchButton_active
        Body__SwitchButton_hover"
                        viewBox="0 0 16 16">
                        <path d="M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z" />
                    </svg> : 
                    <svg 
                    onClick={()=>{
                        dispatch(setPlayingMusic(false))
                    }}
                    xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" 
                    className="bi bi-pause
                        Body__SwitchButton
                        Body__SwitchButton_active
                        Body__SwitchButton_hover" 
                    viewBox="0 0 16 16">
                    <path d="M6 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5zm4 0a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z"/>
                  </svg>
                    }
                </div>
                <div
                    style={{ position: 'relative' }}
                    className="w-100 mt-3 px-4">
                    {props.musicId===activeMusicDetails?.musicId && 
                    <div 
                    onClick={(e)=>{
                        if(props.musicId===activeMusicDetails?.musicId){
                            //@ts-ignore
                            const coordinate:{width:number,left:number,x: number} = e.target.offsetParent.getBoundingClientRect()
                            const px=24
                            dispatch(setPlayedMusicInterval(((e.clientX-coordinate.x-px)/(coordinate.width-(2*px)))*activeMusicSettings.duration))
                        }
                    }}
                    style={{
                        width: 
                        `${activeMusicSettings.playedInterval/activeMusicSettings.duration*100}%`,
                        height: '3px', backgroundColor: 'pink'
                    }}>
                    </div>}
                    <div 
                    onClick={(e)=>{
                        if(props.musicId===activeMusicDetails?.musicId){
                            //@ts-ignore
                            const coordinate:{width:number,left:number,x: number} = e.target.offsetParent.getBoundingClientRect()
                            const px=24
                            dispatch(setPlayedMusicInterval(((e.clientX-coordinate.x-px)/(coordinate.width-(2*px)))*activeMusicSettings.duration))
                        }
                    }}
                    style={{
                        position: 'relative',
                        bottom: 3, 
                        left: `${
                            props.musicId===activeMusicDetails?.musicId ? activeMusicSettings.playedInterval/activeMusicSettings.duration*100 : 0}%`,
                            
                            width: `${props.musicId===activeMusicDetails?.musicId ? (1-(activeMusicSettings.playedInterval/activeMusicSettings.duration))*100 : 100}%`,
                        height: '3px', backgroundColor: 'gray'
                    }}>
                    </div>
                    {
                    props.musicId===activeMusicDetails?.musicId &&
                    <div 
                    style={{
                        position: 'relative',
                        bottom: 13, left: `${activeMusicSettings.playedInterval/activeMusicSettings.duration*100}%`,
                        height: 20, width: 20,
                        borderRadius: 20000,
                        backgroundColor: "red"
                    }}>
                    </div>}
                </div>
            </div>
        </div>
    </div>
}
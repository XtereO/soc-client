import { useDispatch, useSelector } from "react-redux"
import { setActiveMusic, setMode, setPlayedMusicInterval, setPlayingMusic } from "../../BLL/Reducers/playerReducer"
import { activeMusicDetailsSelector, activeMusicSettingsSelector, modeSelector, musicsSelector } from "../../BLL/Selectors/playerSelector"
import { backendURL } from "../../Consts"
import { MusicType } from "../../Types/music"
import { ModeType } from "../../Types/player"
import { MySelect } from "./MySelect"






type PropsType = {

}

export const MusicPlayer: React.FC<PropsType> = (props) => {

    const dispatch = useDispatch()
    let activeMusicDetails = useSelector(activeMusicDetailsSelector)
    let activeMusicSettings = useSelector(activeMusicSettingsSelector)
    let mode = useSelector(modeSelector)
    let musics = useSelector(musicsSelector)

    if (activeMusicDetails) {
        return <div className='w-100'>
            <div className='d-flex'>
                {mode === 'Usual' && <div
                    onClick={() => {
                        let newAudio: HTMLAudioElement;
                        let newMusic: MusicType;
                        let currentMusicId = 0
                        musics.forEach((m, index) => {
                            if (m.musicId === activeMusicDetails?.musicId) {
                                currentMusicId = index
                            }
                        })
                        if ((currentMusicId - 1) >= 0) {
                            newAudio = new Audio(backendURL + musics[currentMusicId - 1].musicSrc)
                            newMusic = musics[currentMusicId - 1]
                        } else {
                            newAudio = new Audio(backendURL + musics[musics.length-1].musicSrc)
                            newMusic = musics[musics.length-1]
                        }
                        dispatch(setPlayingMusic(false))
                        //@ts-ignore
                        newAudio.addEventListener('loadedmetadata', () => {
                            dispatch(setActiveMusic(newMusic, newAudio))
                        })
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
                    </svg>
                </div>}
                <div>
                    {(!activeMusicSettings.isMusicPlay) ?
                        <svg
                            onClick={() => {
                                dispatch(setPlayingMusic(true))
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
                            onClick={() => {
                                dispatch(setPlayingMusic(false))
                            }}
                            xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            className="bi bi-pause
                        Body__SwitchButton
                        Body__SwitchButton_active
                        Body__SwitchButton_hover"
                            viewBox="0 0 16 16">
                            <path d="M6 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5zm4 0a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z" />
                        </svg>
                    }
                </div>
                <div className='w-100'>
                    <div className='px-4 row '>
                        <div className='col-6'>
                            {activeMusicDetails.title} - {activeMusicDetails.author}
                        </div>
                        <div className='col-6 d-flex justify-content-end'>
                            <MySelect
                                value={mode}
                                onChange={(e) => dispatch(setMode(e.target.value as ModeType))}
                                options={['Shufle', 'Usual', 'Repeat']}
                            />
                        </div>
                    </div>
                    <div
                        style={{ position: 'relative' }}
                        className="w-100 mt-3 px-4">
                        <div
                            onClick={(e) => {
                                if (activeMusicDetails) {
                                    //@ts-ignore
                                    const coordinate: { width: number, left: number, x: number } = e.target.offsetParent.getBoundingClientRect()
                                    const px = 24
                                    dispatch(setPlayedMusicInterval(((e.clientX - coordinate.x - px) / (coordinate.width - (2 * px))) * activeMusicSettings.duration))
                                }
                            }}
                            style={{
                                width:
                                    `${activeMusicSettings.playedInterval / activeMusicSettings.duration * 100}%`,
                                height: '3px', backgroundColor: 'pink'
                            }}>
                        </div>
                        <div
                            onClick={(e) => {
                                if (activeMusicDetails) {
                                    //@ts-ignore
                                    const coordinate: { width: number, left: number, x: number } = e.target.offsetParent.getBoundingClientRect()
                                    const px = 24
                                    dispatch(setPlayedMusicInterval(((e.clientX - coordinate.x - px) / (coordinate.width - (2 * px))) * activeMusicSettings.duration))
                                }
                            }}
                            style={{
                                position: 'relative',
                                bottom: 3,
                                left: `${activeMusicDetails ? activeMusicSettings.playedInterval / activeMusicSettings.duration * 100 : 0}%`,

                                width: `${activeMusicDetails ? (1 - (activeMusicSettings.playedInterval / activeMusicSettings.duration)) * 100 : 100}%`,
                                height: '3px', backgroundColor: 'gray'
                            }}>
                        </div>
                        {
                            activeMusicDetails &&
                            <div
                                style={{
                                    position: 'relative',
                                    bottom: 10, left: `${activeMusicSettings.playedInterval / activeMusicSettings.duration * 100}%`,
                                    height: 10, width: 10,
                                    borderRadius: 20000,
                                    backgroundColor: "red"
                                }}>
                            </div>}

                    </div>
                </div>
                {mode === 'Usual' && <div
                        onClick={() => {
                            let newAudio: HTMLAudioElement;
                            let newMusic: MusicType;
                            let currentMusicId = 0
                            musics.forEach((m, index) => {
                                if (m.musicId === activeMusicDetails?.musicId) {
                                    currentMusicId = index
                                }
                            })
                            if ((currentMusicId + 1) < musics.length) {
                                newAudio = new Audio(backendURL + musics[currentMusicId + 1].musicSrc)
                                newMusic = musics[currentMusicId + 1]
                            } else {
                                newAudio = new Audio(backendURL + musics[0].musicSrc)
                                newMusic = musics[0]
                            }
                            dispatch(setPlayingMusic(false))
                            //@ts-ignore
                            newAudio.addEventListener('loadedmetadata', () => {
                                dispatch(setActiveMusic(newMusic, newAudio))
                            })
                        }}
                        className=''>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                        </svg>
                    </div>}
                    {mode === 'Shufle' && <div
                        onClick={() => {
                            let newAudio: HTMLAudioElement;
                            let newMusic: MusicType;
                            const filterMusics = musics.filter(m => m.musicId !== activeMusicDetails?.musicId)
                            const randomIndex = Math.round((filterMusics.length - 1) * (Math.random()))
                            newMusic = filterMusics[randomIndex]
                            newAudio = new Audio(backendURL+newMusic.musicSrc)
                            //@ts-ignore
                            newAudio.addEventListener('loadedmetadata', () => {
                                dispatch(setActiveMusic(newMusic, newAudio))
                            })
                        }}
                        className=''>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                        </svg>
                    </div>}
                    {mode === 'Repeat' && <div
                        onClick={() => {
                            dispatch(setPlayedMusicInterval(0.1))
                        }}
                        className=''>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-repeat" viewBox="0 0 16 16">
                            <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/>
                            <path fill-rule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"/>
                        </svg>
                    </div>}
            </div>

        </div>
    }
    return <div></div>
}
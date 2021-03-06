import React, { useEffect } from "react"
import { Filter } from "../Musics/Bricks/Filter"
import { useState } from "react"
import { Search } from "../Musics/Bricks/Search"
import { Content } from "../Musics/Bricks/Content";
import { SettingButton } from "../Bricks/SettingButton";
import { useDispatch, useSelector } from "react-redux";
import { activePlaylistSelector, countMusicSelector, countSelector, filtersForSearchMusicsSelector, filtersSelector, initSelector, messageSelector, musicsSelector, playlistsSelector } from "../../BLL/Selectors/playlistsSelector";
import { useHistory } from "react-router";
import { addMusicToPlaylistAsync, addPlaylistAsync, ratePlaylistAsync, removeFromPlaylistAsync, removeMusicFromPlaylistAsync, setActivePlaylistAsync, setCountMusic, setFilters, setFiltersMusic, setMusicsAsync, setMusicsState, setPlaylistAsync, setPlaylistsAsync } from "../../BLL/Reducers/playlistsReducer";
import { GetPlaylistsFiltersType, MinimilizeMusicType } from "../../Types/playlist";
import { PlaylistItem } from "./Bricks/PlaylistItem";
import { AddPlaylistModal } from "./Bricks/AddPlaylistModal";
import { savePlaylistAsync } from "../../BLL/Reducers/playlistsReducer";
import { FilterGetMusicType } from "../../Types/music";



type PropsType = {
    mode: boolean
}

const Playlists: React.FC<PropsType> = ({ mode }) => {

    const allFilters = {
        firstShow: [
            'new',
            'most rated',
            'old'
        ]
    }

    const history = useHistory()
    const message = useSelector(messageSelector)
    const isInit = useSelector(initSelector)
    const dispatch = useDispatch()
    const playlists = useSelector(playlistsSelector)
    const count = useSelector(countSelector)
    const countMusics = useSelector(countMusicSelector)
    const musics = useSelector(musicsSelector)
    const activePlaylist = useSelector(activePlaylistSelector)
    const filtersForMusic = useSelector(filtersForSearchMusicsSelector)
    const playlistsJSX = playlists.map(p=><div className='mt-1 mb-1'><PlaylistItem
        ratePlaylistAsync={(playlistId:string,rating:number,review:string | null,
            title:string,onClose:()=>void,
            )=>dispatch(ratePlaylistAsync(playlistId,
                rating,review,title,onClose))}
        setActivePlaylist={(playlistId:string | null)=>{
            dispatch(setActivePlaylistAsync(playlistId))
        }}
        messageError={message}
        filters={filtersForMusic}
        activePlaylist={activePlaylist}
        musics={musics}
        onFilterSubmit={(filters:FilterGetMusicType)=>{
            dispatch(setFiltersMusic(filters))
        }}
        setMusicsCount={(count:number)=>{
            dispatch(setCountMusic(count))
        }}
        setMusics={(filters:FilterGetMusicType)=>{
            dispatch(setMusicsAsync(p.playlistId,filters))
        }}
        setMusicsSync={(musics:MinimilizeMusicType[])=>{
            dispatch(setMusicsState(musics))
        }}
        countMusics={countMusics}
        addMusicToPlaylist={(
            musicId:string
        )=>dispatch(addMusicToPlaylistAsync(p.playlistId,musicId))}
        removeMusicFromPlaylist={(
            musicId:string
        )=>dispatch(removeMusicFromPlaylistAsync(p.playlistId,musicId))}
        setInfo={(isPublic:boolean, title:string, callback:()=>void)=>dispatch(
            setPlaylistAsync({isPublic,title},
            p.playlistId,callback))}
        setImg={(img:any, callback:()=>void)=>dispatch(setPlaylistAsync({img},
            p.playlistId, callback))}
        key={p.playlistId}
        onRemove={()=>dispatch(removeFromPlaylistAsync(p.playlistId))}
        onSave={()=>dispatch(savePlaylistAsync(p.playlistId))}
        playlist={p}/></div>)
    let [path, setPath] = useState('')
    let [isSearchMode, setSearchMode] = useState(true)
    let [showAddPlaylist,setShowAddPlaylist] = useState(false)
    const closeAddPlaylist = () =>{
        setShowAddPlaylist(false)
    }
    const openAddPlaylist = () =>{
        setShowAddPlaylist(true)
    }
    const filters = useSelector(filtersSelector)


    const handleChangeFilters=(firstShow:'new' | 'old' | 'most rated', 
    onlyMySaved:boolean, onlyMyCreated:boolean)=>{
        const newPath=`/playlists?page=${1}&size=${10}&title=${filters.title}&firstShow=${firstShow}&onlyMyCreated=${onlyMyCreated}&onlyMySaved=${onlyMySaved}`
        setPath(newPath)
        history.push(newPath)
    }
    const handleChangePage=(page: number)=>{
        const newPath=`/playlists?title=${filters.title}&size=${10}&page=${page}&onlyMySaved=${filters.onlyMySaved}&onlyMyCreated=${filters.onlyMyCreated}&firstShow=${filters.firstShow}`
        setPath(newPath)
        history.push(newPath)
    }
    const handleChangeTitle=(e:React.ChangeEvent<HTMLInputElement>)=>{
        dispatch(setFilters({...filters,title:e.target.value}))
    }
    const handleSubmitSearch=()=>{
        const newPath=`/playlists?page=${1}&size=${10}&title=${filters.title}&firstShow=${filters.firstShow}&onlyMySaved=${filters.onlyMySaved}&onlyMyCreated=${filters.onlyMyCreated}`
        setPath(newPath)
        history.push(newPath)
    } 
    useEffect(()=>{
        const url = new URLSearchParams(history.location.search)
        const page = url.get('page')
        const titleUrl = url.get('title')
        const size = url.get('size')
        const onlyMySaved = url.get('onlyMySaved')
        const onlyMyCreated = url.get('onlyMyCreated')
        const firstShow = url.get('firstShow') === 'most%20rated' ? 'most rated' : url.get('firstShow')
        
        if(!(page && size &&  onlyMyCreated && onlyMySaved && firstShow)){
            const newPath=`/playlists?title=${filters.title}&size=${filters.size}&page=${filters.page}&onlyMySaved=${filters.onlyMySaved}&onlyMyCreated=${filters.onlyMyCreated}&firstShow=${filters.firstShow}`
            setPath(newPath)
            history.push(newPath)
        }else{
            const newFilter = {
                page: (+page),
                size: (+size),
                title: titleUrl ? titleUrl : '',
                onlyMySaved: onlyMySaved==='true' ? true : false,
                onlyMyCreated: onlyMyCreated==='true' ? true : false,
                firstShow: firstShow as 'new' | 'old' | 'most rated'
            }
            dispatch(setFilters(newFilter))
            dispatch(setPlaylistsAsync(newFilter))
        }

    },[path])


    return <div>
        {
            mode ?
                <div className="row" >
                    <div className="col-8" style={{ borderRight: '1px solid blue' }}>
                        <Search 
                        value={filters.title}
                        handleChange={handleChangeTitle}
                        handleSubmit={handleSubmitSearch} 
                        handleOpenAddMenu={openAddPlaylist}
                        />
                        <Content
                            count={count}
                            items={playlistsJSX}
                            page={filters.page} pageChange={handleChangePage} />
                    </div>
                    <div className="col-4">
                       <Filter 
                       onSubmit={handleChangeFilters}
                       filters={filters}
                       allFilters={allFilters}/> 
                    </div>
                </div> :
                <div>
                    {isSearchMode ?
                        <div>
                            <div className="row">
                                <div className="col-9">
                                <Search 
                                value={filters.title}
                                handleChange={handleChangeTitle}
                                handleSubmit={handleSubmitSearch} 
                                handleOpenAddMenu={openAddPlaylist}
                                />
                                </div>
                                <div className="col-3">
                                    <SettingButton 
                                    onClick={()=>setSearchMode(false)} />
                                </div>
                            </div>
                            <Content 
                            count={count}
                            items={playlistsJSX}
                            page={filters.page} pageChange={handleChangePage} />
                        </div>
                        :
                        <div>
                            <Filter 
                            onSubmit={handleChangeFilters}
                            filters={filters}
                            allFilters={allFilters}/>
                            <div className="w-100 Center mt-4">
                            <button 
                            onClick={()=>setSearchMode(true)}
                            className="btn btn-light">
                                Back
                            </button>
                            </div>
                        </div>
                        }
                </div>
        }
        {showAddPlaylist && <AddPlaylistModal
        isInit={isInit}
        message={message}
        onSubmit={(title:string,isPublic:boolean,img?:any)=>{
            dispatch(addPlaylistAsync(
                title,isPublic,closeAddPlaylist,
                img
            ))
        }} 
        show={showAddPlaylist}
        closeHandler={closeAddPlaylist}
        />}
    </div>
}

export default Playlists
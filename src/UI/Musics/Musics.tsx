import React, { useEffect } from "react"
import { Filter } from "./Bricks/Filter"
import { useState } from "react"
import { Search } from "./Bricks/Search"
import { Content } from "./Bricks/Content";
import { SettingButton } from "../Bricks/SettingButton";
import { AddMusicMenu } from "./Bricks/AddMusicMenu"
import { MyToast } from "../Bricks/MyToast"
import { useDispatch, useSelector } from "react-redux";
import { rateMusicAsync, removeFromSavedMusicAsync, saveMusicAsync, setFilters, setMusicAsync, setMusicsAsync,  } from "../../BLL/Reducers/musicsReducer";
import { countSelector, filtersSelector, initSelector, musicsSelector } from "../../BLL/Selectors/musicsSelector";
import { Loader } from "../Bricks/Loader";
import { FilterGetMusicType, GenreType } from "../../Types/music";
import { MusicItem, PayloadType } from "./Bricks/MusicItem";
import { setActiveMusic, setMusics } from "../../BLL/Reducers/playerReducer";
import { useHistory } from "react-router";
import { messageSelector } from "../../BLL/Selectors/profileSelector";
 


type PropsType = {
    mode: boolean
}

const Musics: React.FC<PropsType> = ({ mode }) => {

    const dispatch = useDispatch()
    const history = useHistory()
    let [path, setPath] = useState('')
    const filters = useSelector(filtersSelector)

    const message = useSelector(messageSelector)
    const musics = useSelector(musicsSelector)
    const isInit = useSelector(initSelector)

    const MusicsJSX = musics.map(m=><div className='mt-2 mb-2'><MusicItem 
        message={message}
        isInit={isInit}
        rateMusicAsync={(
            title:string,rating:number,onClose:()=>void,review:string
        )=>dispatch(rateMusicAsync(m.musicId,title,rating,onClose,review))}
        setMusicAsync={(
            onClose:()=>void,payload:PayloadType
        )=>dispatch(setMusicAsync(m.musicId,onClose,payload))}
        key={m.musicId}
        onSave={()=>dispatch(saveMusicAsync(m.musicId))}
        onRemove={()=>dispatch(removeFromSavedMusicAsync(m.musicId))}
        onPlayMusic={()=>dispatch(setMusics(musics))} {...m} /></div>)
   
    useEffect(()=>{
        const url = new URLSearchParams(history.location.search)
        const page = url.get('page')
        const title = url.get('title')
        const size = url.get('size')
        const searchBy = url.get('searchBy')
        const onlyMySaved = url.get('onlyMySaved')
        const onlyMyCreated = url.get('onlyMyCreated')
        const genre = url.get('genre')
        const firstShow = url.get('firstShow') === 'most%20rated' ? 'most rated' : url.get('firstShow')
        
        if(!(page && size && searchBy && onlyMyCreated && onlyMySaved && genre && firstShow)){
            const newPath=`/musics?title=${filters.title}&searchBy=${filters.searchBy}&size=${filters.size}&page=${filters.page}&onlyMySaved=${filters.onlyMySaved}&onlyMyCreated=${filters.onlyMyCreated}&genre=${filters.genre}&firstShow=${filters.firstShow}`
            setPath(newPath)
            history.push(newPath)
        }else{
            const newFilter = {
                page: (+page),
                size: (+size),
                title: title ? title : '',
                searchBy: searchBy as 'title' | 'author',
                onlyMySaved: onlyMySaved==='true' ? true : false,
                onlyMyCreated: onlyMyCreated==='true' ? true : false,
                genre: genre as GenreType,
                firstShow: firstShow as 'new' | 'old' | 'most rated'
            }
            dispatch(setFilters(newFilter))
            dispatch(setMusicsAsync(newFilter))
        }

        
    },[path])

    //For search component
    const handleChangeTitle=(e:React.ChangeEvent<HTMLInputElement>)=>{
        dispatch(setFilters({...filters,title:e.target.value}))
    }
    const handleSubmitSearch=()=>{
        const newPath=`/musics?title=${filters.title}&searchBy=${filters.searchBy}&size=${filters.size}&page=${1}&onlyMySaved=${filters.onlyMySaved}&onlyMyCreated=${filters.onlyMyCreated}&genre=${filters.genre}&firstShow=${filters.firstShow}`
        history.push(newPath)
        setPath(newPath)
    }
    let [showMenuAddMusic, setShowMenuAddMusic] = useState(false)
    const handleCloseAddMenu=()=>{
        setShowMenuAddMusic(false)
    }
    const handleOpenAddMenu=()=>{
        setShowMenuAddMusic(true)
    }

    //For toast 
    let [showAddSuccessfullToast, setShowAddSuccessfullToast] = useState(false)
    const handleOpenAddToast=()=>{
        setShowAddSuccessfullToast(true)
        handleCloseAddMenu()
    }
    const handleCloseAddToast=()=>{
        setShowAddSuccessfullToast(false)
    }


    const allFilters = {
        firstShow: [
            'new',
            'most rated',
            'old'
        ],
        searchBy: [
            'title',
            'author'
        ],
        genre: [
            `Rock'n'roll`,
            'Metall',
            'Rep',
            'Other',
            'All',
            'Hip-hop'
        ]
    }
    const handleChangeFilters=(firstShow:'new' | 'old' | 'most rated',onlyMySaved:boolean,onlyMyCreated:boolean,searchBy:'title' | 'author' | undefined,genre:GenreType | undefined)=>{
        const newPath=`/musics?title=${filters.title}&searchBy=${searchBy}&size=${filters.size}&page=${1}&onlyMySaved=${onlyMySaved}&onlyMyCreated=${onlyMyCreated}&genre=${genre}&firstShow=${firstShow}`
        history.push(newPath)
        setPath(newPath)
    }

    let [isSearchMode, setSearchMode] = useState(true)
    const handlePageChange =(page: number)=>{
        const newPath=`/musics?title=${filters.title}&searchBy=${filters.searchBy}&size=${filters.size}&page=${page}&onlyMySaved=${filters.onlyMySaved}&onlyMyCreated=${filters.onlyMyCreated}&genre=${filters.genre}&firstShow=${filters.firstShow}`
        history.push(newPath)
        setPath(newPath)
    }
    const count = useSelector(countSelector)

    return <div>
        {
            mode ?
                <div className="row" >
                    <div className="col-8" style={{ borderRight: '1px solid blue' }}>
                        <Search 
                        value={filters.title}
                        handleSubmit={handleSubmitSearch}
                        handleChange={handleChangeTitle}
                        handleOpenAddMenu={handleOpenAddMenu} />
                        {isInit ? 
                            <Loader/> :
                            <Content
                            items={MusicsJSX}
                            count={count}
                            page={filters.page} pageChange={handlePageChange} />}
                    </div>
                    <div className="col-4">
                        <Filter 
                        onSubmit={handleChangeFilters}
                        filters={filters}
                        allFilters={allFilters} />
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
                                handleOpenAddMenu={handleOpenAddMenu}
                                 />
                                </div>
                                <div className="col-3">
                                    <SettingButton 
                                    onClick={()=>setSearchMode(false)} />
                                </div>
                            </div>
                            {isInit ? 
                            <Loader/> :
                            <Content
                            items={MusicsJSX}
                            count={count}
                            page={filters.page} pageChange={handlePageChange} />}
                        </div>
                        :
                        <div>
                            <Filter 
                            onSubmit={handleChangeFilters}
                            filters={filters} allFilters={allFilters} />
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
        <AddMusicMenu
        showToast={handleOpenAddToast}
        handleClose={handleCloseAddMenu}
        show={showMenuAddMusic}
        />
        <div 
        className="justify-content-end"
        style={{position:'fixed',bottom: 60}}>
        <MyToast 
        onClose={handleCloseAddToast}
        description={"Music add successfull"}
        show={showAddSuccessfullToast}  />
        </div>
    </div>
}

export default Musics
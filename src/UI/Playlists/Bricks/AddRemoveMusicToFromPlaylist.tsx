
import React, { useEffect, useState } from "react"
import { Modal } from "react-bootstrap"
import { FilterGetMusicType, GenreType, MusicType } from "../../../Types/music"
import { MinimilizeMusicType, PlaylistDetailType } from "../../../Types/playlist"
import { Filter } from "../../Musics/Bricks/Filter"
import {Content} from '../../Musics/Bricks/Content'
import { MyInput } from "../../Bricks/MyInput"
import { SettingButton } from "../../Bricks/SettingButton"
import { SearchButton } from "../../Bricks/SearchButton"
import { setActiveMusic } from "../../../BLL/Reducers/playerReducer"



type PropsType={
    playlist: PlaylistDetailType 
    messageError: string | null
    show: boolean
    closeHandler: ()=>void
    filters: FilterGetMusicType
    onFiltersSubmit:(filter:FilterGetMusicType)=>void
    count: number
    musics: MinimilizeMusicType[]
    setActivePlaylist: ()=>void
    setMusics: (filter:FilterGetMusicType)=>void
    setMusicsSync: (musics:MusicType[])=>void
    setMusicsCount: (count:number)=>void
    addMusicToPlaylist: (muiscId:string)=>void
    removeMusicFromPlaylist: (musicId:string)=>void
}

export const AddRemoveMusicToFromPlaylist:React.FC<PropsType>=(props)=>{
    
    let [mode,setMode] = useState<'add' | 'remove'>('add')

    const chooseRemoveMode=()=>{
        props.setActivePlaylist()
        props.onFiltersSubmit({...props.filters, page:1,title:''})
        setMode('remove')
        props.setMusicsSync(props.playlist.musics)
    }
    useEffect(()=>{
        debugger
        if(mode==='remove'){
            props.setMusicsSync(props.playlist.musics)
        }
    },[props.playlist.musics])
    const chooseAddMode=()=>{
        props.onFiltersSubmit({...props.filters, page:1,title:''})
        setMode('add')
        props.setMusics(props.filters)
    }
    let musicsJSX = props.musics.map((m:MinimilizeMusicType)=><div 
    className='card mt-2 p-2'>
        <div className='row'>
            <div className='col-6'>
                {m.title} - {m.author}
            </div>
            <div className='col-6 d-flex justify-content-end'>
                {(!m.isInPlaylist) && 
                <button 
                onClick={
                    ()=>props.addMusicToPlaylist(m.musicId)}
                className='btn btn-outline-success'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                    </svg>
                </button>}
                {m.isInPlaylist && 
                <button 
                onClick={
                    ()=>props.removeMusicFromPlaylist(m.musicId)}
                className='btn btn-outline-danger'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                </button>}
            </div>
        </div>
    </div>)
    
    let [isEditFiltersMode, setEditFiltersMode] = useState(false)
    let [title,setTitle] = useState<string>(props.filters.title)
    const handleChangeTitlte = (e:React.ChangeEvent<HTMLInputElement>) =>{
        setTitle(e.target.value)
    }
    const onSearchButtonSubmit=()=>{
        props.onFiltersSubmit({...props.filters,title,page:1})
    }

    const allFilters={
        firstShow: ['new', 'old', 'most rated'],
        searchBy: ['author','title'],
        genre: ['All', 'Rep', 'Hip-hop', `Rock'n'roll`, 'Metall', 'Other' ]
    }
    useEffect(()=>{
        if(mode==='add'){
            props.setMusics(props.filters)
        }
    },[props.filters])

    return<Modal
    show={props.show}
    onHide={props.closeHandler}
    >
        <Modal.Header>
            {mode==='add' &&
            <button 
            onClick={chooseRemoveMode}
            className='btn btn-outline-danger'>
                Go remove musics
            </button>}
            {mode==='remove' &&
            <button 
            onClick={chooseAddMode}
            className='btn btn-outline-success'>
                Go add musics
            </button>}
        </Modal.Header>
        
        <Modal.Body>
            {
                (!isEditFiltersMode) && mode==='add' &&
                <div className='Center'>
                    <MyInput 
                    value={title}
                    onChange={handleChangeTitlte}
                    />
                    <SearchButton
                    style={{borderRadius:20000}}
                    onClick={onSearchButtonSubmit}
                    />
                    <div className='mt-1'>
                    <SettingButton 
                    onClick={()=>setEditFiltersMode(true)}
                    />
                    </div>
                </div>
            }
            {
                isEditFiltersMode && mode==='add' &&
                    <div>
                    <Filter 
                    filters={props.filters} 
                    allFilters={allFilters}
                    onSubmit={(firstShow: "new" | "old" | "most rated", onlyMySaved: boolean, onlyMyCreated: boolean, searchBy?: "title" | "author", genre?: GenreType)=>{
                        props.onFiltersSubmit({
                            firstShow,onlyMySaved,
                            onlyMyCreated,
                            searchBy:searchBy as 'author' | 'title',
                            genre:genre as GenreType,
                            page:1,size:10,
                            title:props.filters.title
                    })
                    } }
                    />
                    <div className='Center mt-2'>
                        <button 
                        onClick={()=>setEditFiltersMode(false)}
                        className='btn btn-light'>
                            Back
                        </button>
                    </div>
                    </div>
            }
            {
                (!isEditFiltersMode) &&
                    <Content 
                    count={mode==='remove' ?
                     props.playlist.musics.length : props.count }
                    items={
                        mode==='add' ?
                        musicsJSX :
                        musicsJSX.slice((props.filters.page-1)*10,
                        props.filters.page*10)
                    } 
                    page={props.filters.page} 
                    pageChange={function (page: number): void {
                    props.onFiltersSubmit({...props.filters,page})
                } } />
            }
            {
                props.messageError &&
                <div className='Center text-danger'>
                    {props.messageError}
                </div> 
            }
        </Modal.Body>
    </Modal>
}
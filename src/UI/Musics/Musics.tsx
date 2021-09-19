import React from "react"
import { Filter } from "./Bricks/Filter"
import { useState } from "react"
import { Search } from "./Bricks/Search"
import { Content } from "./Bricks/Content";
import { SettingButton } from "../Bricks/SettingButton";
import { AddMusicMenu } from "./Bricks/AddMusicMenu"
import { MyToast } from "../Bricks/MyToast"
import { useDispatch, useSelector } from "react-redux";
import { setFilters, setMusicsAsync } from "../../BLL/Reducers/musicsReducer";
import { countSelector, filtersSelector, initSelector } from "../../BLL/Selectors/musicSelector";
import { Loader } from "../Bricks/Loader";
import { GenreType } from "../../Types/music";
 


type PropsType = {
    mode: boolean
}

const Musics: React.FC<PropsType> = ({ mode }) => {

    const dispatch = useDispatch()
    const filters = useSelector(filtersSelector)

    //For search component
    const handleChangeTitle=(e:React.ChangeEvent<HTMLInputElement>)=>{
        dispatch(setFilters({...filters,title: e.target.value}))
    }
    const handleSubmitSearch=()=>{
        dispatch(setMusicsAsync({...filters,page: 1}))
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
        //@ts-ignore
        dispatch(setMusicsAsync({
            firstShow,
            searchBy: searchBy ? searchBy : 'title',
            onlyMyCreated,
            onlyMySaved,
            genre: genre ? genre : 'All',
            page:1,
            size:10,title:filters.title
        }))
    }

    let [isSearchMode, setSearchMode] = useState(true)
    const handlePageChange =(page: number)=>{
        dispatch(setMusicsAsync({...filters,page: page}))
    }
    const count = useSelector(countSelector)
    const isInit = useSelector(initSelector)

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
                            items={[]}
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
                            items={[]}
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
import React from "react"
import { Filter } from "./Bricks/Filter"
import { useState } from "react"
import { Search } from "./Bricks/Search"
import { Content } from "./Bricks/Content";
import { SettingButton } from "../Bricks/SettingButton";
import { AddMusicMenu } from "./Bricks/AddMusicMenu"
import { MyToast } from "../Bricks/MyToast"
 


type PropsType = {
    mode: boolean
}

const Musics: React.FC<PropsType> = ({ mode }) => {

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


    const filters = {
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
            'rocknroll',
            'metall',
            'rep',
            'other'
        ]
    }

    let [page, pageChange] = useState(1)
    let [isSearchMode, setSearchMode] = useState(true)


    return <div>
        {
            mode ?
                <div className="row" >
                    <div className="col-8" style={{ borderRight: '1px solid blue' }}>
                        <Search 
                        handleOpenAddMenu={handleOpenAddMenu} />
                        <Content
                            items={[]}
                            page={page} pageChange={pageChange} />
                    </div>
                    <div className="col-4">
                        <Filter filters={filters} />
                    </div>
                </div> :
                <div>
                    {isSearchMode ?
                        <div>
                            <div className="row">
                                <div className="col-9">
                                <Search 
                                handleOpenAddMenu={handleOpenAddMenu}
                                 />
                                </div>
                                <div className="col-3">
                                    <SettingButton 
                                    onClick={()=>setSearchMode(false)} />
                                </div>
                            </div>
                            <Content items={[]}
                                page={page} pageChange={pageChange} />
                        </div>
                        :
                        <div>
                            <Filter filters={filters} />
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
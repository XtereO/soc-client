import React from "react"
import { Filter } from "../Musics/Bricks/Filter"
import { useState } from "react"
import { Search } from "../Musics/Bricks/Search"
import { Content } from "./Bricks/Content";
import { SettingButton } from "../Bricks/SettingButton";



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

    let [page, pageChange] = useState(1)
    let [isSearchMode, setSearchMode] = useState(true)


    return <div>
        {
            mode ?
                <div className="row" >
                    <div className="col-8" style={{ borderRight: '1px solid blue' }}>
                        <Search />
                        <Content
                            items={[]}
                            page={page} pageChange={pageChange} />
                    </div>
                    <div className="col-4">
                        Filter
                    </div>
                </div> :
                <div>
                    {isSearchMode ?
                        <div>
                            <div className="row">
                                <div className="col-9">
                                <Search />
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
                            Filter
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
    </div>
}

export default Playlists
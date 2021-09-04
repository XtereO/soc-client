import React from "react"
import { Pagination } from "../Bricks/Pagination"
import { MyInput } from "../Bricks/MyInput"
import { Plus } from "../Bricks/Plus"
import { SearchButton } from "../Bricks/SearchButton"
import { Filter } from "./Bricks/Filter"
import { MusicItem, MusicItemType } from "./Bricks/MusicItem"
import { useState } from "react"
import { Search } from "./Bricks/Search"
import { Content } from "./Bricks/Content";
import { SettingButton } from "../Bricks/SettingButton";



type PropsType = {
    mode: boolean
}

export const Musics: React.FC<PropsType> = ({ mode }) => {

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
                        <Search />
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
    </div>
}
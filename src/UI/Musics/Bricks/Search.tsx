import React from "react"
import { MyInput } from "../../Bricks/MyInput"
import { Pagination } from "../../Bricks/Pagination"
import { Plus } from "../../Bricks/Plus"
import { SearchButton } from "../../Bricks/SearchButton"
import { MusicItem, MusicItemType } from "./MusicItem"



type PropsType = {

}

export const Search: React.FC<PropsType> = (props) => {
    return <div>
        <div className="">
            <div className="d-flex">
                <MyInput style={{ width: '100%' }} />
                <SearchButton style={{ borderRadius: 20000 }} />
                <Plus style={{ width: 50 }} />
            </div>
        </div>
    </div>
}
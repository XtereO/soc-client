import React from "react"
import { MyInput } from "../../Bricks/MyInput"
import { Pagination } from "../../Bricks/Pagination"
import { Plus } from "../../Bricks/Plus"
import { SearchButton } from "../../Bricks/SearchButton"
import { MusicItem, MusicItemType } from "./MusicItem"



type PropsType = {
    handleSubmit? :()=>void
    handleChange?: (e:React.ChangeEvent<HTMLInputElement>)=>void
    value?: string
    handleOpenAddMenu?: ()=>void
}

export const Search: React.FC<PropsType> = ({
    handleOpenAddMenu,
    handleChange,
    handleSubmit,
    value
    }) => {
    return <div>
        <div className="">
            <div className="d-flex">
                <MyInput  
                onChange={handleChange}
                value={value}
                style={{ width: '100%' }} />
                <SearchButton 
                onClick={handleSubmit}
                style={{ borderRadius: 20000 }} />
                <Plus 
                onClick={handleOpenAddMenu ? handleOpenAddMenu : ()=>{}}
                style={{ width: 50 }} />
            </div> 
        </div>
    </div>
}
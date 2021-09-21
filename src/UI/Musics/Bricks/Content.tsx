
import React from "react";
import { Pagination } from "../../Bricks/Pagination";
import { MusicItem, MusicItemType } from "./MusicItem";




type PropsType={
    items: any //JSX elements
    page: number
    pageChange: (page: number)=>void
    count?: number
}

export const Content:React.FC<PropsType>=({items,page,count,pageChange})=>{
    return<div>
    <div>
        {items}
    </div>
    <div className="Center" style={{}}>
        <Pagination
            page={page} pageChange={pageChange}
            portionSize={10} count={count ? count : 0}
        />
    </div>
</div>
}
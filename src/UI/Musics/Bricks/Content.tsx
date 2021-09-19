
import React from "react";
import { Pagination } from "../../Bricks/Pagination";
import { MusicItem, MusicItemType } from "./MusicItem";




type PropsType={
    items: MusicItemType[]
    page: number
    pageChange: (page: number)=>void
    count?: number
}

export const Content:React.FC<PropsType>=({items,page,count,pageChange})=>{
    return<div>
    <div>
        {items.map((m: MusicItemType) => <MusicItem {...m} />)}
    </div>
    <div className="Center" style={{}}>
        <Pagination
            page={page} pageChange={pageChange}
            portionSize={10} count={count ? count : 0}
        />
    </div>
</div>
}
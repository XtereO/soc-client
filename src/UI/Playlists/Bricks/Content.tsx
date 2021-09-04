
import React from "react";
import { Pagination } from "../../Bricks/Pagination";
import { PlaylistItem, PlaylistItemType } from "./PlaylistItem";




type PropsType={
    items: PlaylistItemType[]
    page: number
    pageChange: (page: number)=>void
}

export const Content:React.FC<PropsType>=({items,page,pageChange})=>{
    return<div>
    <div>
        {items.map((m) => <PlaylistItem {...m} />)}
    </div>
    <div className="Center" style={{}}>
        <Pagination
            page={page} pageChange={pageChange}
            portionSize={5} count={51}
        />
    </div>
</div>
}
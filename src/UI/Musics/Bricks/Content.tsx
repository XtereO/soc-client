import React from "react";
import { Pagination } from "../../Bricks/Pagination";
import { MusicItem, MusicItemType } from "./MusicItem";




type PropsType={
    items: MusicItemType[]
    page: number
    pageChange: (page: number)=>void
}

export const Content:React.FC<PropsType>=({items,page,pageChange})=>{
    return<div>
    <div>
        {items.map((m: MusicItemType) => <MusicItem {...m} />)}
    </div>
    <div className="Center" style={{}}>
        <Pagination
            page={page} pageChange={pageChange}
            portionSize={5} count={51}
        />
    </div>
</div>
}
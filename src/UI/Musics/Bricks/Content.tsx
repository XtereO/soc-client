
import React from "react";
import { Pagination } from "../../Bricks/Pagination";




type PropsType={
    items: any //JSX elements
    page: number
    pageChange: (page: number)=>void
    count?: number
    size?: number
}

export const Content:React.FC<PropsType>=({items,page,count,pageChange, size})=>{
    return<div>
    <div>
        {items}
    </div>
    <div className="Center" style={{}}>
        <Pagination
            page={page} pageChange={pageChange}
            portionSize={size ? size : 10} count={count ? count : 0}
        />
    </div>
</div>
}
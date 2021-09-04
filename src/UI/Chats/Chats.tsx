import React, { useState } from "react"
import { Pagination } from "../Bricks/Pagination";
import { MySelect } from "../Bricks/MySelect";
import { ChatItem } from "./ChatItem";


type PropsType={}

const Chats:React.FC<PropsType>=(props)=>{
    
    let [page, changePage] = useState(1)

    return<div>
        <div className="w-100 justify-content-end d-flex">
            <div>
                <Pagination count={12} portionSize={5}
                page={page} pageChange={changePage} />
            </div>
            <div>
                <MySelect options={['group', 'discussion', 'dialog']} />
            </div>
        </div>
        <div>
            {[].map(c=><ChatItem {...c} />)}
        </div>
    </div>
}

export default Chats
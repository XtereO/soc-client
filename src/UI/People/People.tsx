import React from "react"
import { Pagination } from "../Bricks/Pagination";
import { MyInput } from "../Bricks/MyInput";
import { SearchButton } from "../Bricks/SearchButton";
import { useState } from "react";
import { PeopleItem, PeopleItemType } from "./PeopleItem";



type PropsType={

}

const People:React.FC<PropsType>=(props)=>{
    
    let [page,changePage]=useState(1)
    
    return<div>
        <div className="Center">
            <MyInput />
            <SearchButton />
        </div>
        <div className="Center">
            {[].map((p:PeopleItemType)=><PeopleItem {...p}/>)}
        </div>
        <div className="Center">
            <Pagination  
            count={93}
            portionSize={10}
            page={page} pageChange={changePage}
            />
        </div>
    </div>
}

export default People
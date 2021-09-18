import React, { useEffect } from "react"
import { Pagination } from "../Bricks/Pagination";
import { MyInput } from "../Bricks/MyInput";
import { SearchButton } from "../Bricks/SearchButton";
import { useState } from "react";
import { PeopleItem, PeopleItemType } from "../People/PeopleItem";
import { useDispatch, useSelector } from "react-redux";
import { followingSelector,pageSelector,countSelector, initSelector } from "../../BLL/Selectors/followingSelector";
import { setFollowersAsync } from "../../BLL/Reducers/followingReducer";
import { useHistory } from "react-router";


type PropsType={

}

const Following:React.FC<PropsType>=(props)=>{
    
    const dispatch = useDispatch()
    const history = useHistory()

    let isInit = useSelector(initSelector)
    let following = useSelector(followingSelector)
    let count = useSelector(countSelector)
    let page = useSelector(pageSelector)
    
    let [title,setTitle] = useState<string>('')
    let [path,setPath] = useState<string>('')
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
        setTitle(e.target.value)
    }
    const handleSubmit=()=>{
        history.push(`/following?title=${title}&page=${1}`)
        setPath(`/following?title=${title}&page=${1}`)
    }

    let changePage=(choosenPage:number)=>{
        history.push(`/following?title=${title}&page=${choosenPage}`)
        setPath(`/following?title=${title}&page=${choosenPage}`)
    }

    useEffect(()=>{
        const url = new URLSearchParams(history.location.search)
        const page = url.get('page')
        const title = url.get('title')

        if(!page){
            dispatch(setFollowersAsync())
        }else{
            dispatch(setFollowersAsync((title ? title : '' ),(+page)))
        }
    },[path])
    
    return<div>
        <div className="Center mt-2">
            <MyInput 
            value={title}
            onChange={handleChange}
            />
            <SearchButton onClick={handleSubmit} />
        </div>
        <div className="">
            {following.map((p:PeopleItemType)=>
            <div className="mt-2" >
                <PeopleItem {...p} isInit={isInit} />
            </div>)}
        </div>
        <div className="Center mt-2">
            <Pagination  
            count={count}
            portionSize={10}
            page={page} pageChange={changePage}
            />
        </div>
    </div>
}

export default Following
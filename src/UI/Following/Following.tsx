import React, { useEffect } from "react"
import { Pagination } from "../Bricks/Pagination";
import { MyInput } from "../Bricks/MyInput";
import { SearchButton } from "../Bricks/SearchButton";
import { useState } from "react";
import { PeopleItem, PeopleItemType } from "../People/PeopleItem";
import { useDispatch, useSelector } from "react-redux";
import { followingSelector,pageSelector,countSelector, initSelector } from "../../BLL/Selectors/followingSelector";
import { follow, setFollowingAsync, unfollow } from "../../BLL/Reducers/followingReducer";
import { useHistory } from "react-router";
import { ProfileType } from "../../Types/profile";


type PropsType={

}

const Following:React.FC<PropsType>=(props)=>{
    
    const dispatch = useDispatch()
    const history = useHistory()

    let isInit = useSelector(initSelector)
    let following = useSelector(followingSelector)
    let count = useSelector(countSelector)
    let page = useSelector(pageSelector)
    
    let [userId,setUserId] = useState('')
    let [title,setTitle] = useState<string>('')
    let [path,setPath] = useState<string>('')
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
        setTitle(e.target.value)
    }
    const handleSubmit=()=>{
        history.push(`/following?title=${title}&page=${1}&userId=${userId}`)
        setPath(`/following?title=${title}&page=${1}&userId=${userId}`)
    }

    let changePage=(choosenPage:number)=>{
        history.push(`/following?title=${title}&page=${choosenPage}&userId=${userId}`)
        setPath(`/following?title=${title}&page=${choosenPage}&userId=${userId}`)
    }

    useEffect(()=>{
        const url = new URLSearchParams(history.location.search)
        const page = url.get('page')
        const title = url.get('title')
        const userIdUrl = url.get('userId')
        if(userIdUrl){
            setUserId(userIdUrl)
        }

        if(!page){
            dispatch(setFollowingAsync())
        }else{
            dispatch(setFollowingAsync((title ? title : '' ),(+page),10,userId ? userId : (userIdUrl ? userIdUrl : '')))
        }
    },[path])
    
    return<div>
        <div className="Center mt-2">
            <MyInput 
            value={title}
            onChange={handleChange}
            />
            <SearchButton style={{borderRadius:20000}} onClick={handleSubmit} />
        </div>
        <div className="">
            {following.map((p:ProfileType)=>
            <div className="mt-2 px-2" >
                <PeopleItem {...p}
                follow={(userId:string)=>dispatch(follow(userId))}
                unfollow={(userId:string)=>dispatch(unfollow(userId))}
                isInit={isInit} />
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
import React, { useEffect } from "react"
import { Pagination } from "../Bricks/Pagination";
import { MyInput } from "../Bricks/MyInput";
import { SearchButton } from "../Bricks/SearchButton";
import { useState } from "react";
import { PeopleItem, PeopleItemType } from "../People/PeopleItem";
import { useDispatch, useSelector } from "react-redux";
import { followersSelector,pageSelector,countSelector, initSelector } from "../../BLL/Selectors/followersSelector";
import { follow, unfollow, setFollowersAsync } from "../../BLL/Reducers/followersReducer";
import { useHistory } from "react-router";
import { ProfileType } from "../../Types/profile";


type PropsType={

}

const Followers:React.FC<PropsType>=(props)=>{
    
    const dispatch = useDispatch()
    const history = useHistory()

    let isInit = useSelector(initSelector)
    let followers = useSelector(followersSelector)
    let count = useSelector(countSelector)
    let page = useSelector(pageSelector)
    
    let [userId,setUserId] = useState<string>('')
    let [title,setTitle] = useState<string>('')
    let [path,setPath] = useState<string>('')
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
        setTitle(e.target.value)
    }
    const handleSubmit=()=>{
        history.push(`/followers?title=${title}&page=${1}&userId=${userId}`)
        setPath(`/followers?title=${title}&page=${1}&userId=${userId}`)
    }

    let changePage=(choosenPage:number)=>{
        history.push(`/followers?title=${title}&page=${choosenPage}&userId=${userId}`)
        setPath(`/followers?title=${title}&page=${choosenPage}&userId=${userId}`)
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
            dispatch(setFollowersAsync())
        }else{
            dispatch(setFollowersAsync((title ? title : '' ),(+page),10,userId ? userId : (userIdUrl ? userIdUrl : '')))
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
            {followers.map((p:ProfileType)=><div className="mt-2 px-2" >
            <PeopleItem 
                {...p}
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

export default Followers
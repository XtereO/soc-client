import React, { useEffect } from "react"
import { Pagination } from "../Bricks/Pagination";
import { MyInput } from "../Bricks/MyInput";
import { SearchButton } from "../Bricks/SearchButton";
import { useState } from "react";
import { PeopleItem, PeopleItemType } from "./PeopleItem";
import { useDispatch, useSelector } from "react-redux";
import { peopleSelector,pageSelector,countSelector, initSelector } from "../../BLL/Selectors/peopleSelector";
import { setPeopleAsync } from "../../BLL/Reducers/peopleReducer";
import { useHistory } from "react-router";
import { myProfileSelector } from "../../BLL/Selectors/profileSelector";


type PropsType={

}

const People:React.FC<PropsType>=(props)=>{
    
    const dispatch = useDispatch()
    const history = useHistory()

    let isInit = useSelector(initSelector)
    let people = useSelector(peopleSelector)
    let count = useSelector(countSelector)
    let page = useSelector(pageSelector)
    
    let [title,setTitle] = useState<string>('')
    let [path,setPath] = useState<string>('')
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
        setTitle(e.target.value)
    }
    const handleSubmit=()=>{
        history.push(`/people?title=${title}&page=${1}`)
        setPath(`/people?title=${title}&page=${1}`)
    }

    let changePage=(choosenPage:number)=>{
        history.push(`/people?title=${title}&page=${choosenPage}`)
        setPath(`/people?title=${title}&page=${choosenPage}`)
    }

    useEffect(()=>{
        const url = new URLSearchParams(history.location.search)
        const page = url.get('page')
        const title = url.get('title')

        if(!page){
            dispatch(setPeopleAsync())
        }else{
            dispatch(setPeopleAsync((title ? title : '' ),(+page)))
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
            {people.map((p:PeopleItemType)=>
            <div className="mt-2" >
                <PeopleItem {...p} isInit={isInit}/>
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

export default People
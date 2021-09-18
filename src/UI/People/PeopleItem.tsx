

//@ts-ignore
import default_avatar from "../../Media/default_avatar.jpg";

import { backendURL } from "../../Consts";
import { useDispatch, useSelector } from "react-redux";
import { follow, unFollow } from "../../BLL/Reducers/peopleReducer";
import React from "react";
import { NavLink } from "react-router-dom";
import { initSelector } from "../../BLL/Selectors/peopleSelector";

export type PeopleItemType={
    userId: string | null
    firstName: string
    secondName: string
    shortNickname: string
    avatar: string | null
    isFollow: boolean | null
    isInit?: boolean
}

export const PeopleItem:React.FC<PeopleItemType>=(props)=>{

    const dispatch = useDispatch()

    const handleFollow=()=>{
        dispatch(follow(props.userId as string))
    }
    const handleUnfollow=()=>{
        dispatch(unFollow(props.userId as string))
    }

    return<div className="row MyCard">
        <div className="col-3">
            <NavLink to={`/home/${props.userId}`}>
            <img 
            className="img w-100 rounded"
            src={props.avatar ? backendURL+props.avatar : default_avatar} />
            </NavLink>
        </div>
        <div className="col-9">
            <div>
                First name: {props.firstName}
            </div>
            <div>
                Second name: {props.secondName}
            </div>
            <div>
                Short nickname: {props.shortNickname}
            </div>
        </div>
        <div className="w-100">
            {props.isFollow ? 
            <button
            disabled={props.isInit ? props.isInit : false} 
            onClick={handleUnfollow}
            className="btn btn-outline-danger w-100">
                unfollow
            </button> :
            <button 
            disabled={props.isInit ? props.isInit : false}
            onClick={handleFollow}
            className="btn btn-outline-success w-100">
                follow
            </button>
            }
        </div>
    </div>
}


//@ts-ignore
import default_avatar from "../../Media/default_avatar.jpg";

import { backendURL } from "../../Consts";
import React from "react";
import { NavLink } from "react-router-dom";

export type PeopleItemType = {
    userId: string | null
    firstName: string
    secondName: string
    shortNickname: string
    avatar: string | null
    isFollow: boolean | null
    isInit?: boolean
    aboutMe: string
    follow: (userId: string) => void
    unfollow: (userId: string) => void
}

export const PeopleItem: React.FC<PeopleItemType> = ({ follow, unfollow, ...props }) => {


    const handleFollow = () => {
        follow(props.userId as string)
    }
    const handleUnfollow = () => {
        unfollow(props.userId as string)
    }

    return <div className="MyCard">
        <div style={{
            display: 'grid',
            gridGap:'20px',
            gridTemplateColumns: '100px 1fr'
        }}>
            <div className="">
                <NavLink to={`/home/${props.userId}`}>
                    <img
                        className="img w-100 rounded"
                        src={props.avatar ? backendURL + props.avatar : default_avatar} />
                </NavLink>
            </div>
            <div className="">
                <div>
                    First name: {props.firstName}
                </div>
                <div>
                    Second name: {props.secondName}
                </div>
                <div>
                    Short nickname: {props.shortNickname}
                </div>
                <div>
                    {props.aboutMe && `Status: ${props.aboutMe}`}
                </div>
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
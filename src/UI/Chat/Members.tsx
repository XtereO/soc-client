import { Modal } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { backendURL } from "../../Consts";
import { ChatType } from "../../Types/chat";
import { ProfileDetailType, ProfileType } from "../../Types/profile";
//@ts-ignore
import default_avatar from '../../Media/default_avatar.jpg'
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followersSelector, pageSelector } from "../../BLL/Selectors/followersSelector";
import { countSelector } from "../../BLL/Selectors/chatSelector";
import { PeopleItemType } from "../People/PeopleItem";
import { setFollowersAsync } from "../../BLL/Reducers/followersReducer";
import { MyInput } from "../Bricks/MyInput";
import { SearchButton } from "../Bricks/SearchButton";
import { Pagination } from "../Bricks/Pagination";
import ReactTooltip from "react-tooltip";





type PropsType = {
    chat: ChatType
    myProfile: ProfileDetailType
    show: boolean
    handleClose: () => void
    addPermission: (userId: string) => void
    removePermission: (userId: string) => void
    removeCompanionFromChat: (userId: string) => void
    addMemberToChat: (userId: string) => void
}

export const Members: React.FC<PropsType> = ({ chat, myProfile,
    show, handleClose, addPermission, addMemberToChat,
    removePermission, removeCompanionFromChat }) => {


    const isUserHavePermission = chat.companions.filter(c => c.user.shortNickname === myProfile.shortNickname).length > 0 ? chat.companions.filter(c => c.user.shortNickname === myProfile.shortNickname)[0].isHavePermission : false
    const membersJSX = chat.companions.map(c => <UserItem
        removeCompanionChat={() => removeCompanionFromChat(c.user.userId)}
        isUserHavePermission={isUserHavePermission}
        addPermission={() => {
            addPermission(c.user.userId)
        }} removePermission={() => {
            removePermission(c.user.userId)
        }} unreadedMessages={c.count}
        {...c}
        user={c.user} />)

    let [mode, setMode] = useState<'edit' | 'add'>('edit')
    return <Modal
        show={show}
        onHide={handleClose}
    >
        <Modal.Header
            closeButton
        >
            Members
            {isUserHavePermission && chat.type === 'discussion'
                && mode === 'edit' && <button
                    className='btn btn-outline-primary'
                    onClick={() => setMode('add')}>
                    add members
                </button>}
            {isUserHavePermission && chat.type === 'discussion'
                && mode === 'add' && <button
                    className='btn btn-outline-primary'
                    onClick={() => setMode('edit')}>
                    edit
                </button>}
        </Modal.Header>
        <Modal.Body>
            {((chat.type === 'group') ||
                (mode === 'edit' && chat.type === 'discussion')) &&
                membersJSX}
            {chat.type === 'discussion' && mode === 'add' &&
                <SearchMember 
                companions={chat.companions.map(c=>c.user)}
                addMemberToChat={addMemberToChat} />}
        </Modal.Body>
    </Modal>
}


type SearchMembersType = {
    companions: ProfileType[]
    addMemberToChat: (userId: string) => void
}
export const SearchMember: React.FC<SearchMembersType> = ({
    addMemberToChat, companions
}) => {

    const dispatch = useDispatch()
    const followers = useSelector(followersSelector)
    const page = useSelector(pageSelector)
    const count = useSelector(countSelector)
    const [title, setTitle] = useState('')
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }
    const handleSubmit = () => {
        dispatch(setFollowersAsync(title, page))
    }
    const changePage = (page: number) => {
        dispatch(setFollowersAsync(title, page))
    }
    useEffect(() => {
        dispatch(setFollowersAsync(title, page))
    }, [])

    return <div>
        <div className="Center mt-2">
            <MyInput
                value={title}
                onChange={handleChange}
            />
            <SearchButton onClick={handleSubmit} />
        </div>
        <div className="">
            {followers.map((p: ProfileType) =>
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 50px'
                    }}
                    className="mt-2 MyCard" >
                    <div className='d-flex'>
                        <div className="CenterY"
                            style={{ width: 50 }}>
                            <NavLink to={`/home/${p.userId}`}>
                                <img
                                    style={{
                                        width: 50,
                                        height: 50,
                                        borderRadius: 20000
                                    }}
                                    src={p.avatar ?
                                        backendURL + p.avatar :
                                        default_avatar
                                    }
                                />
                            </NavLink>
                        </div>
                        <div className='CenterY'>
                            <div>
                                {p.firstName} {p.secondName}
                            </div>
                            <div>
                                <NavLink to={`/home/${p.userId}`}>
                                    {p.shortNickname}
                                </NavLink>
                            </div>
                        </div>
                    </div>
                    <div className='d-flex justify-content-end'>
                        <button
                            disabled={companions.some(c => c.shortNickname === p.shortNickname)}
                            onClick={() => addMemberToChat(p.userId ? p.userId : '')}
                            className='btn btn-outline-success'>
                            {
                                companions.some(c => c.shortNickname === p.shortNickname) ?
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-lg" viewBox="0 0 16 16">
                                        <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                                    </svg> :
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
                                    </svg>}
                        </button>
                    </div>
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

type UserType = {
    user: {
        userId: string
        firstName: string
        secondName: string
        shortNickname: string
        avatar: string | null
    }
    isHavePermission: boolean
    unreadedMessages: number
    isUserHavePermission: boolean
    addPermission: () => void
    removePermission: () => void
    removeCompanionChat: () => void
}
export const UserItem: React.FC<UserType> = ({ user, removePermission,
    addPermission, isHavePermission, removeCompanionChat,
    unreadedMessages, isUserHavePermission }) => {
        return <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 100px'
    }}
        className='MyCard mt-2'>
        <div className='d-flex'>
            <div className='CenterY'>
                <NavLink to={`/home/${user.userId}`}>
                    <img
                        style={{
                            width: 50,
                            height: 50,
                            borderRadius: 20000
                        }}
                        src={
                            user.avatar ?
                                backendURL + user.avatar :
                                default_avatar
                        } />
                </NavLink>
            </div>
            <div className='px-2'>
                <div className='d-flex'>
                    <div className='CenterY'>{`${user.firstName} ${user.secondName}`}</div>
                    <a data-tip data-for='global'>{unreadedMessages!==0 && <div 
                    className='mt-1 px-1 text-center CenterY'
                    style={{borderRadius:20000, marginLeft:5, height:30, minWidth:30, color:'white',
                    backgroundColor:'red'}}>
                    {unreadedMessages}
                </div>}</a>
                <ReactTooltip effect='solid' id='global' place='bottom' type='dark'>
                    Count unreaded messages: {unreadedMessages}
                </ReactTooltip>
                </div>
                <div>
                    <NavLink to={`/home/${user.userId}`}>
                        {user.shortNickname}
                    </NavLink>
                </div>
            </div>
        </div>
        <div className='d-flex justify-content-end'>
            {isUserHavePermission && <button
                onClick={removeCompanionChat}
                className='btn btn-outline-danger'>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z" />
                    <path fill-rule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z" />
                </svg>
            </button>}
            <button
                onClick={() => {
                    if (isHavePermission) {
                        removePermission()
                    } else {
                        addPermission()
                    }
                }}
                className={isHavePermission
                    ? 'btn btn-warning text-white' : 'btn btn-outline-warning'}
                disabled={(!isUserHavePermission)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-star" viewBox="0 0 16 16">
                    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                </svg>
            </button>
        </div>
    </div>
}

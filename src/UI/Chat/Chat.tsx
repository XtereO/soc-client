import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { joinGroup, leaveChat, setActiveChatAsync, setMessagesAsync, watchChat } from "../../BLL/Reducers/chatReducer";
import { chatSelector, countSelector, initSelector, messageSelector, messagesSelector, pageSelector } from "../../BLL/Selectors/chatSelector";
import { myProfileSelector } from "../../BLL/Selectors/profileSelector";
import { backendURL } from "../../Consts";
import { getLastItem } from "../../utils";
import { Loader } from "../Bricks/Loader";
import { Content } from "../Musics/Bricks/Content";
import { Message } from "./Message";
//@ts-ignore
import mount from "../../Media/mount.gif";


type PropsType = {

}

const Chat: React.FC<PropsType> = (props) => {

    const history = useHistory()
    const dispatch = useDispatch()
    const messages = useSelector(messagesSelector)
    const messagesJSX = messages.map(m => <Message {...m} />)
    const chat = useSelector(chatSelector)
    const page = useSelector(pageSelector)
    const message = useSelector(messageSelector)
    const isInit = useSelector(initSelector)
    const count = useSelector(countSelector)
    const myProfile = useSelector(myProfileSelector)

    useEffect(() => {

        const chatId = getLastItem(history.location.pathname.split('/'))
        dispatch(setActiveChatAsync(chatId, 1))

    }, [history.location.pathname])
    useEffect(() => {
        if(chat){
            dispatch(watchChat(chat.chatId))
        }
    },[messages])

    const handlePageChange = (page: number) => {
        dispatch(setActiveChatAsync(chat ? chat.chatId : '', page))
    }
    const handleLeaveChat = () =>{
        if(chat){
            dispatch(leaveChat(chat.chatId))
            history.push('/chats')
        }
    } 
    const handleJoinGroup = () =>{
        if(chat){
            dispatch(joinGroup)
        }
    }

    if (chat) {
        return <div>
            <div className="row">
                <div className='col-md-3'>
                <img 
                className='RoundImage'
                style={{width:50,height:50}}
                src={chat.avatar ? backendURL+chat.avatar : mount} />
                
                {chat.type}: {
                    chat.type==='dialog' ?
                    chat.companions.filter(c=>c.user.userId!==myProfile.userId)[0].user.firstName + ' ' +
                    chat.companions.filter(c=>c.user.userId!==myProfile.userId)[0].user.secondName  :
                    (chat.title ? chat.title : 'Without title')
                }
                </div>
                <div className='col-md-9 d-flex justify-content-end'>
                    {
                    (chat.companions.some(c=>c.user.shortNickname===myProfile.shortNickname)) &&
                    <button 
                    onClick={handleLeaveChat}
                    className='btn btn-outline-danger'>
                        leave
                    </button>}
                    { chat.type==='group' 
                      && (!chat.companions.some(c=>c.user.shortNickname===myProfile.shortNickname)) &&
                    <button
                    onClick={handleJoinGroup}
                    className='btn btn-outline-warning'
                    >
                        join
                    </button>}
                </div>
            </div>
            <div className='mt-2'>
                <Content
                    page={page}
                    count={count}
                    items={messagesJSX}
                    pageChange={handlePageChange}
                />
            </div>
            <div>
                <textarea className='form-control'>
                </textarea>
                <button
                    className="Center w-100 btn btn-success">
                    send
                </button>
            </div>
        </div>
    }
    return <Loader />
}

export default Chat
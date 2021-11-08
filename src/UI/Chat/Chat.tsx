import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { addCompanionToDiscussion, addPermission, joinGroup, leaveChat, removeCompanionFromChat, removePermission, sendMessage, setActiveChatAsync, setAvatar, setMessagesAsync, setTitle, watchChat } from "../../BLL/Reducers/chatReducer";
import { chatSelector, countSelector, initSelector, messageSelector, messagesSelector, pageSelector } from "../../BLL/Selectors/chatSelector";
import { myProfileSelector } from "../../BLL/Selectors/profileSelector";
import { backendURL } from "../../Consts";
import { getLastItem } from "../../utils";
import { Loader } from "../Bricks/Loader";
import { Content } from "../Musics/Bricks/Content";
import { Message } from "./Message";
//@ts-ignore
import mount from "../../Media/mount.gif";
import { SettingButton } from "../Bricks/SettingButton";
import { MainSettings } from "./MainSettings";
import { Members } from "./Members";


type PropsType = {

}

const Chat: React.FC<PropsType> = (props) => {

    
    const myProfile = useSelector(myProfileSelector)
    const history = useHistory()
    const dispatch = useDispatch()
    const messages = useSelector(messagesSelector)
    const messagesJSX = messages.map(m => <Message 
        isMyMessage={myProfile.shortNickname===m.companion.shortNickname}
        {...m} />)
    const chat = useSelector(chatSelector)
    const page = useSelector(pageSelector)
    const message = useSelector(messageSelector)
    const isInit = useSelector(initSelector)
    const count = useSelector(countSelector)

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
            dispatch(leaveChat(chat.chatId,()=>history.push('/chats')))
        }
    } 
    const handleJoinGroup = () =>{
        if(chat){
            dispatch(joinGroup(chat.chatId))
        }
    }
    const [textMessage,setTextMessage]=useState<string|null>(null)
    const handleTextMessage=(e:React.ChangeEvent<HTMLTextAreaElement>)=>{
        setTextMessage(e.target.value)
    }
    const handleSendMessage=()=>{
        if(chat && textMessage){
            setTextMessage(null)
            dispatch(sendMessage(chat.chatId,textMessage))
        }
    }
    const ref = useRef<HTMLDivElement>(null)
    useEffect(()=>{
        if(ref.current){
            ref.current.scrollIntoView({behavior:'smooth'})
        }
    },[ref.current])

    let [showMainSettings, setShowMainSettings] = useState(false)
    const handleCloseMainSettings = ()=>{
        setShowMainSettings(false)
    }
    const handleOpenMainSettings = ()=>{
        setShowMainSettings(true)
    }

    let [showMembers, setShowMembers] = useState(false)
    const handleCloseMembers = () =>{
        setShowMembers(false)
    }
    const handleOpenMembers = () =>{
        setShowMembers(true)
    }

    if (chat) {
        return <div>
            <div style={{
                display:'grid',
                gridTemplateColumns:'1fr 120px'
            }}>
                <div>
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
                <div className='d-flex justify-content-end'>
                {chat.type!=='dialog'&& <button 
                    onClick={handleOpenMembers}
                    className='btn btn-outline-primary'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-people" viewBox="0 0 16 16">
                            <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
                        </svg>
                    </button>
                    }
                    {chat.type!=='dialog' && 
                    chat.companions.filter(c=>c.user.shortNickname===myProfile.shortNickname).length>0
                    && chat.companions.filter(c=>c.user.shortNickname===myProfile.shortNickname)[0].isHavePermission &&
                    <button 
                    onClick={handleOpenMainSettings}
                    className='btn btn-light'>
                        <SettingButton />
                    </button>
                    }
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
            <div
            style={{
                height:500,
                overflowY:'scroll'
            }}
            className='mt-2'>
                <Content
                    page={page}
                    count={count}
                    items={[[...messagesJSX].reverse(),
                    <div ref={ref}></div>]}
                    pageChange={handlePageChange}
                />
            </div>
            <div
            className='mt-4'>
                <textarea 
                value={textMessage ? textMessage : ''}
                onChange={handleTextMessage}
                className='form-control'>
                </textarea>
                <button
                    onClick={handleSendMessage}
                    className="Center w-100 btn btn-success">
                    send
                </button>
            </div>
            {showMainSettings && <MainSettings setAvatar={(img: any)=> {
                dispatch(setAvatar(chat.chatId, img, handleCloseMainSettings))
            } } setTitle={(title: string)=> {
                dispatch(setTitle(chat.chatId,title, handleCloseMainSettings))
            } } title={chat.title} 
            handleClose={handleCloseMainSettings} 
            show={showMainSettings} isInit={isInit} message={message}            
            />}
            {showMembers && <Members 
            addMemberToChat = {(userId:string)=>{
                dispatch(addCompanionToDiscussion(chat.chatId,userId))
            }}
            chat={chat} 
            removeCompanionFromChat = {(userId:string)=>{
                dispatch(removeCompanionFromChat(chat.chatId,userId))
            }}
            myProfile = {myProfile}
            show={showMembers} 
            handleClose={handleCloseMembers} 
            addPermission={(userId: string)=> {
                dispatch(addPermission(chat.chatId,userId))
            } } removePermission={(userId: string)=> {
                dispatch(removePermission(chat.chatId, userId))
            } }            
            />}
        </div>
    }
    return <Loader />
}

export default Chat
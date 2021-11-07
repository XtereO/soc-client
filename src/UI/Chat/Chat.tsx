import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { joinGroup, leaveChat, sendMessage, setActiveChatAsync, setAvatar, setMessagesAsync, setTitle, watchChat } from "../../BLL/Reducers/chatReducer";
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
            dispatch(joinGroup)
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
        </div>
    }
    return <Loader />
}

export default Chat
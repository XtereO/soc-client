import React, { useEffect, useState } from "react"
import { Pagination } from "../Bricks/Pagination";
import { MySelect } from "../Bricks/MySelect";
import { ChatItem } from "./ChatItem";
import { useDispatch, useSelector } from "react-redux";
import { chatsSelector, countSelector, initSelector, messageSelector, onlyJoinedSelector, pageSelector, titleSelector, typeChatSelector } from "../../BLL/Selectors/chatsSelector";
import { Content } from "../Musics/Bricks/Content";

//@ts-ignore
import default_avatar from '../../Media/default_avatar.jpg'
//@ts-ignore
import default_group_avatar from '../../Media/mount.gif'
import { myProfileSelector } from "../../BLL/Selectors/profileSelector";
import { backendURL } from "../../Consts";
import { useHistory } from "react-router";
import { createChatAsync, PayloadChatType, setChatsAsync, setOnlyJoined, setPage, setTitle, setTypeChat } from "../../BLL/Reducers/chatsReducer";
import { TypeChatType } from "../../Types/chat";
import { Search } from "../Musics/Bricks/Search";
import { AddChatMenu } from "./AddChatMenu";
import { Loader } from "../Bricks/Loader"

type PropsType = {}

const Chats: React.FC<PropsType> = (props) => {

    const dispatch = useDispatch()
    const history = useHistory()
    let [path,setPath] = useState<string>('')
    const page = useSelector(pageSelector)
    const typeChat = useSelector(typeChatSelector)
    const title = useSelector(titleSelector)
    const onlyJoined = useSelector(onlyJoinedSelector)

    useEffect(()=>{
        const url = new URLSearchParams(history.location.search)
        const pageURL = url.get('page')
        const titleURL = url.get('title')
        const typeChatURL = url.get('typeChat')
        const onlyJoinedURL = url.get('onlyJoined')
        
        if(!(pageURL && typeChatURL && onlyJoinedURL)){
            const newPath=`/chats?title=${title}&page=${page}&typeChat=${typeChat}&onlyJoined=${onlyJoined}`
            setPath(newPath)
            history.push(newPath)
        }else{
            const newFilter = {
                page: (+pageURL),
                title: titleURL ? titleURL : '',
                typeChat: typeChatURL as TypeChatType,
                onlyJoined: onlyJoinedURL ? (!!onlyJoinedURL) : onlyJoined
            }
            dispatch(setTitle(newFilter.title))
            dispatch(setPage(newFilter.page))
            dispatch(setTypeChat(newFilter.typeChat))
            dispatch(setOnlyJoined(newFilter.onlyJoined))
            dispatch(setChatsAsync(newFilter.page,newFilter.title,newFilter.typeChat,newFilter.onlyJoined))
        }

        
    },[path])

    const count = useSelector(countSelector)
    const isInit = useSelector(initSelector)
    const message = useSelector(messageSelector)
    const myProfile = useSelector(myProfileSelector)
    const chats = useSelector(chatsSelector)
    const chatsJSX = chats.map(c => <ChatItem
        id={c.chatId} avatar={
            c.type === 'dialog' ?
                (c.companions.filter(f => f.user.userId !== myProfile.userId)[0].user.avatar ?
                    backendURL + c.companions.filter(f => f.user.userId !== myProfile.userId)[0].user.avatar :
                    default_avatar
                ) : (c.avatar ? backendURL + c.avatar : default_group_avatar)
        }
        title={
            c.type === 'dialog' ?
                (c.companions.filter(f => f.user.userId !== myProfile.userId)[0].user.firstName + ' '
                + c.companions.filter(f => f.user.userId !== myProfile.userId)[0].user.secondName
                ) : c.title
        } 
        lastMessage={c.lastMessage} />)

    const handleChangePage = (page: number) => {
        const newPath=`/chats?title=${title}&page=${page}&typeChat=${typeChat}&onlyJoined=${onlyJoined}`
        setPath(newPath)
        history.push(newPath)
    }
    const hadleChangeTypeChat = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newPath=`/chats?title=${''}&page=${1}&typeChat=${e.target.value}&onlyJoined=${onlyJoined}`
        setPath(newPath)
        history.push(newPath)
    }
    const handleSubmitSearch = () =>{
        const newPath=`/chats?title=${title}&page=${1}&typeChat=${typeChat}&onlyJoined=${onlyJoined}`
        setPath(newPath)
        history.push(newPath)
    }
    const handleChangeCheckboxGroup = (e:React.ChangeEvent<HTMLInputElement>) =>{
        debugger
        const newPath=`/chats?title=${''}&page=${1}&typeChat=${typeChat}&onlyJoined=${e.target.checked}`
        setPath(newPath)
        history.push(newPath)
    }
    const handleChangeTitle = (e:React.ChangeEvent<HTMLInputElement>)=>{
        dispatch(setTitle(e.target.value))
    }
    let [showAddMenu, setShowAddMenu] = useState(false)
    const handleOpenAddMenu = () =>{
        setShowAddMenu(true)
    }
    const handleCloseAddMenu = () =>{
        setShowAddMenu(false)
    }
    const handleSubmitCreateChat = (typeChat: TypeChatType, payload: PayloadChatType, callback: () => void)=> {
        dispatch(createChatAsync(typeChat, payload, callback))
    }

    return <div>
        <div className='row'>
            <div className='col-md-8'>
            <Search 
                value={title}
                handleSubmit={handleSubmitSearch}
                handleChange={handleChangeTitle}
                handleOpenAddMenu={handleOpenAddMenu} />
            </div>
            <div className="col-md-4 Center mt-2">
                <div>
                    <MySelect
                        value={typeChat}
                        onChange={hadleChangeTypeChat}
                        options={['dialog', 'discussion', 'group']} />
                </div>
                    {typeChat==='group' && 
                    <div>
                        <label htmlFor='onlyJoined'>
                            Only joined
                        </label>
                        <input
                        onChange={handleChangeCheckboxGroup} 
                        id='onlyJoined'
                        defaultChecked={onlyJoined}
                        type='checkbox' />
                    </div>
                    }
            </div>
        </div>
        <div className='mt-2'>
            {
            isInit ?
            <Loader /> :    
            <Content
                items={chatsJSX}
                page={page}
                count={count}
                pageChange={handleChangePage} />}
        </div>
        {showAddMenu && <AddChatMenu
            message={message}
            isInit={isInit}
            show={showAddMenu}
            onClose={handleCloseAddMenu} 
            onSubmit={handleSubmitCreateChat}        
        ></AddChatMenu>}
    </div>
}

export default Chats
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { setActiveChatAsync, setMessagesAsync } from "../../BLL/Reducers/chatReducer";
import { chatSelector, countSelector, initSelector, messageSelector, messagesSelector, pageSelector } from "../../BLL/Selectors/chatSelector";
import { myProfileSelector } from "../../BLL/Selectors/profileSelector";
import { backendURL } from "../../Consts";
import { getLastItem } from "../../utils";
import { Loader } from "../Bricks/Loader";
import { Content } from "../Musics/Bricks/Content";
import { Message } from "./Message";


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

    const handlePageChange = (page: number) => {
        dispatch(setActiveChatAsync(chat ? chat.chatId : '', page))
    }

    if (chat) {
        return <div>
            <div className="">
                {chat.type}: {
                    chat.type==='dialog' ?
                    backendURL+chat.companions.filter(c=>c.user.userId!==myProfile.userId)[0].user.avatar :
                    (chat.title ? chat.title : 'Without title')
                }
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
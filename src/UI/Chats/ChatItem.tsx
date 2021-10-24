import { useHistory } from "react-router-dom"
import { TypeChatType, MessageType } from "../../Types/chat"




type PropsType={
    id: string
    
    avatar: string
    title: string

 
    lastMessage?: MessageType
}


export const ChatItem:React.FC<PropsType>=(props)=>{
    
    const history = useHistory()

    return<div key={props.id} onClick={()=>history.push(`chat/${props.id}`)}
     className="ChatItem ChatItem_hover ChatItem_active row">
        <div className="col-3">
            <img 
            src={props.avatar}
            className="w-100 img RoundImage" />
        </div>
        <div className="col-9">
            <div>
                <h4>{props.title}</h4>
            </div>
            {props.lastMessage && 
            props.lastMessage.companion.firstName + ' '  
            + props.lastMessage.companion.secondName + ': '
            + props.lastMessage.textMessage}
        </div>
    </div>
}
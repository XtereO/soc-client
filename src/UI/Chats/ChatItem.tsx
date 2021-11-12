import { NavLink, useHistory } from "react-router-dom"
import { TypeChatType, MessageType } from "../../Types/chat"
import HtmlParse from "html-react-parser";



type PropsType={
    id: string
    
    avatar: string
    title: string
    unreadedMessages: number
 
    lastMessage?: MessageType
}


export const ChatItem:React.FC<PropsType>=(props)=>{
    
    const history = useHistory()

    return<div key={props.id} onClick={()=>history.push(`chat/${props.id}`)}
     style={{
        display:'grid',
        gridTemplateColumns:'100px 1fr',
        gridGap:'20px'
     }}
     
     className="ChatItem ChatItem_hover ChatItem_active">
        <div className="">
            <img 
            style={{
                height:100,
                width:100
            }}
            src={props.avatar}
            className="w-100 img RoundImage" />
        </div>
        <div className="">
            <div className='d-flex'>
                <h4>{props.title}</h4>
                {props.unreadedMessages!==0 && <div 
                className='mt-1 px-1 text-center CenterY'
                style={{borderRadius:20000, marginLeft:5, height:30, minWidth:30, color:'white',
                backgroundColor:'red'}}>
                    {props.unreadedMessages===1 ? 'new' : props.unreadedMessages }
                </div>}
            </div>
            {props.lastMessage && 
            <div className='d-flex'><div>{props.lastMessage.companion.firstName}  
            {' '+props.lastMessage.companion.secondName+': '}</div> 
            <div className='d-flex' style={{marginLeft:10 ,height:50}}>{HtmlParse(props.lastMessage.textMessage)}</div></div>}
        </div>
    </div>
}
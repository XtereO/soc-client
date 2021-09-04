import { useHistory } from "react-router-dom"




type PropsType={
    id: string
    type: string
    
    //leave empty for Dialog
    avatar: string
    title: string

 
    lastMessage: {
        companion: any
        textMessage: string
        date: string
    }
    companions:{
        count:number
        isHavePermission:boolean 
        user:any
    }[]
}


export const ChatItem:React.FC<PropsType>=(props)=>{
    
    const history = useHistory()

    return<div onClick={()=>history.push(`chat/${props.id}`)}
     className="ChatItem ChatItem_hover ChatItem_active row">
        <div className="col-3">
            <img 
            src={props.avatar}
            className="w-100 img RoundImage" />
        </div>
        <div className="col-9">
            {props.lastMessage.textMessage}
        </div>
    </div>
}
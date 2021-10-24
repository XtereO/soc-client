import { backendURL } from "../../Consts"
import { MessageType } from "../../Types/chat"




type PropsType={
} & MessageType

export const Message:React.FC<PropsType>=(props)=>{
    return<div className="card row">
        <div className="col-3">
            <img 
            className="RoundImage"
            src={backendURL + props.companion.avatar}/>
        </div>
        <div className="col-9">
            <div className='w-100'>
                {props.date}
            </div>
            <div>
                {props.companion.firstName+' '+props.companion.secondName}
            </div>
            <div>
                {props.textMessage}
            </div>
        </div>
    </div>
}
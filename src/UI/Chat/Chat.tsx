import React from "react"
import { Message } from "./Message";


type PropsType={

}

const Chat:React.FC<PropsType> = (props)=>{
    return<div>
        <div className="justify-content-end">
            Title dialog
        </div>
        <div>
            {[].map(m=><Message {...m}/>)}
        </div>
        <div>
            <textarea
            className="form-controls"
            >

            </textarea>
            <button 
            className="Center w-100 btn btn-success">
                send
            </button>
        </div>
    </div>
}

export default Chat
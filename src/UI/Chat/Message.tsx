



type PropsType={
    firstName: string
    avatar: string
    message: string
}

export const Message:React.FC<PropsType>=({firstName,avatar,message})=>{
    return<div className="card row">
        <div className="col-3">
            <img 
            className="RoundImage"
            src={avatar}/>
        </div>
        <div className="col-9">
            <div>
                {firstName}
            </div>
            <div>
                {message}
            </div>
        </div>
    </div>
}
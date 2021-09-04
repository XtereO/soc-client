


export type PeopleItemType={
    firstName: string
    secondName: string
    shortNickname: string
    avatar: string
}

export const PeopleItem:React.FC<PeopleItemType>=(props)=>{
    return<div className="card row">
        <div className="col-3">
            <img 
            className="img w-100"
            src={props.avatar} />
        </div>
        <div className="col-9">
            <div>
                First and second name: {props.firstName} {props.secondName}
            </div>
            <div>
                Short nickname: {props.shortNickname}
            </div>
        </div>
    </div>
}
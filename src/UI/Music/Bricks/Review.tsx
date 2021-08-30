


export type ReviewType={
    avatar: string
    firstName: string
    secondName: string
    review: string
    rating: number
}

export const Review:React.FC<ReviewType>=(props)=>{
    return<div className="card">
        <div className="card-header">
            <img
            src={props.avatar}
            style={{width:50, height:50}}
            />
            {props.firstName}
            {props.secondName}
        </div>
        <div className="card-body">
            {props.review}
        </div>
        <div className="card-footer justify-content-end">
            Rating {props.rating}/10
        </div>
    </div>
}
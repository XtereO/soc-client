import { backendURL } from "../../../Consts"
import { ReviewType } from "../../../Types/profile"




export const Review:React.FC<ReviewType>=(props)=>{
    return<div className="card">
        <div className="card-header">
            <img
            src={backendURL+props.user.avatar}
            style={{width:50, height:50}}
            />
            {props.user.firstName}
            {props.user.secondName}
        </div>
        <div className="card-body">
            {props.review}
        </div>
        <div className="card-footer justify-content-end">
            Rating {props.rating}/10
        </div>
    </div>
}
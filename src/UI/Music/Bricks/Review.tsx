import { backendURL } from "../../../Consts"
import { ReviewType } from "../../../Types/profile"




export const Review:React.FC<ReviewType>=(props)=>{
    return<div className="card">
        <div className="card-header">
            <div className="row">
            <div className='col-4'>
            <img
            src={backendURL+(props.user ? props.user.avatar : '')}
            style={{width:50, height:50, borderRadius:20000}}
            />
            </div>
            <div className='col-8 d-flex justify-content-end'>
                {props.user && `@${props.user.shortNickname}`}
            </div>
            </div>
        </div>
        <div className="card-body Center">
            {props.review ? props.review :
            'Review is empty'}
        </div>
        <div className="card-footer justify-content-end">
            Rating {props.rating}/10
        </div>
    </div>
}
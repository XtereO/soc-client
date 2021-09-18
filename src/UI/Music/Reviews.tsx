import { ReviewType } from "../../Types/profile"
import { Review } from "./Bricks/Review"




type PropsType={
    reviews: ReviewType[]
}

export const Reviews:React.FC<PropsType>=({reviews})=>{
    
    const reviewsJSX = reviews.map(r=><div className="col-md-6 mt-1">
        <Review {...r} />
        </div>) 
    
    return<div className="row px-2">
        {reviewsJSX ? reviewsJSX : "Not found :("}
    </div>
}


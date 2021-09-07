import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink, useHistory } from "react-router-dom"
import { Review } from "../Music/Bricks/Review"
import { profileSelector } from "../../BLL/Selectors/profileSelector";
import { setProfileAsync, setReviewsAsync } from "../../BLL/Reducers/profileReducer";


type PropsType = {}

const Home: React.FC<PropsType> = (props) => {

    let [isEditMode, setMode] = useState(false)
    const history = useHistory()
    const dispatch = useDispatch()
    let profile = useSelector(profileSelector)
    

    useEffect(()=>{
        const userId = history.location.pathname.slice(6,)
        dispatch(setProfileAsync(userId ? userId : ''))
        //@ts-ignore
        dispatch(setReviewsAsync(userId ? userId : profile.userId))
    },[])

    return <div>
        <div>
            {profile.shortNickname}
        </div>
        <div className="row">
            <div className="col-md-4">
                <img
                    src="https://ru-static.z-dn.net/files/db3/5bdb9e8a453d9353a37b338941278006.jpg"
                    className="RoundImage w-100" />
            </div>
            <div className="col-md-8">
                <div className="card p-4">
                    First name: {profile.firstName}
                </div>
                <div className="card p-4">
                    Second name: {profile.secondName}
                </div>
                <div
                    onDoubleClick={() => setMode(prev => !prev)}
                    style={{overflowY:'scroll'}}
                    className="card Home__Link Home__Link_hover p-4" >
                    {isEditMode ?
                        <textarea
                            onBlur={() => setMode(false)}
                            autoFocus={true}
                            className="form-control">
                            I create this site
                        </textarea>
                        :
                        <div>
                            About me: {profile.aboutMe}
                        </div>
                    }
                </div>
                <div 
                onClick={()=>history.push('/followers/id')}
                className="card Home__Link Home__Link_hover Home__Link_active p-4">
                    Followers: {profile.followers}     
                </div>
                <div 
                onClick={()=>history.push('/subscribers/id')}
                className="card Home__Link Home__Link_hover Home__Link_active p-4">
                    Subscribes: {profile.subscribers}
                </div>
            </div>
        </div>
        <div className="mt-4">
            <h5>Reviews:</h5>
            <div className="row">
                {[].map(m=><div className="col-md-6">
                    <Review {...m} />
                </div>)}
            </div>
        </div>
    </div>
}

export default Home
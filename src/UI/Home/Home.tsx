import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { Pagination } from "../Bricks/Pagination";
import { myProfileSelector, profileSelector } from "../../BLL/Selectors/profileSelector";
import { SetAboutMeAsync, setInit, setMessage, setProfileAsync, setReviewsAsync } from "../../BLL/Reducers/profileReducer";
import { EditModal } from "./EditModal";
import { MyToast } from "../Bricks/MyToast";
import { backendURL } from "../../Consts";
import { reviewsSelector, countSelector, pageSelector } from '../../BLL/Selectors/profileSelector' 
//@ts-ignore
import defaultAvatar from '../../Media/default_avatar.jpg'
import { Reviews } from "../Music/Reviews";

type PropsType = {}

const Home: React.FC<PropsType> = (props) => {

    //==========For=toasts==============================
    let [showNames, setShowNames] = useState(false)
    let [showAvatar, setShowAvatar] = useState(false)
    let [showPassword, setShowPassword] = useState(false)
    //==================================================

    let reviews = useSelector(reviewsSelector)
    let count = useSelector(countSelector)
    let page = useSelector(pageSelector)
    
    let [showModal, setShowModal] = useState(false)
    let [isEditMode, setMode] = useState(false)
    let onCloseModal=()=>{
        dispatch(setMessage(null))
        dispatch(setInit(false))
        setShowModal(false)
    }


    const history = useHistory()
    const dispatch = useDispatch()
    let profile = useSelector(profileSelector)
    let myProfile = useSelector(myProfileSelector)

    useEffect(() => {
        const userId = history.location.pathname.slice(6,)
        dispatch(setProfileAsync(userId ? userId : '', false))
        //@ts-ignore
        dispatch(setReviewsAsync(userId ? userId : myProfile.userId))
    }, [history.location.pathname])

    const handlerOpenTextArea = () => {
        setMode(true)
    }
    const handlerCloseTextArea = (e: any) => {
        dispatch(SetAboutMeAsync(e.target.value))
        setMode(false)
    }
    const handlerPageChange=(page:number)=>{
        dispatch(setReviewsAsync(profile.userId as string,page))
    }

    return <div>
        <div className="row mb-2">
            <div className="col-6">
                @{profile.shortNickname}
            </div>
            {
                myProfile.userId === profile.userId &&
                <div style={{ display: 'flex' }}
                    className="col-6 justify-content-end">
                    <button
                        className="btn btn-outline-primary"
                        onClick={() => setShowModal(true)}
                    >
                        Edit
                    </button>
                </div>}
        </div>
        <div className="row">
            <div className="col-md-4">
                <img
                    src={profile.avatar ? backendURL+profile.avatar :
                        defaultAvatar}
                    className="RoundImage w-100" />
            </div>
            <div className="col-md-8">
                <div
                    className="card p-4" >
                    <div>First name: {profile.firstName}</div>
                </div>
                <div
                    className="card p-4" >
                    Second name: {profile.secondName}
                </div>
                <div
                    onClick={
                        myProfile.userId === profile.userId ?
                            (isEditMode ? handlerCloseTextArea :
                                handlerOpenTextArea)
                            :
                            () => { }
                    }
                    style={{ overflowY: 'scroll' }}
                    className="card Home__Link Home__Link_hover p-4" >
                    {isEditMode ?
                        <textarea
                            onBlur={handlerCloseTextArea}
                            autoFocus={true}
                            className="form-control">
                            {profile.aboutMe}
                        </textarea>
                        :
                        <div>
                            About me: {profile.userId === myProfile.userId ?
                                myProfile.aboutMe : profile.aboutMe}
                        </div>
                    }
                </div>
                <div
                    onClick={() => history.push(`/followers?page=1&title=&userId=${profile.userId}`)}
                    className="card Home__Link Home__Link_hover Home__Link_active p-4">
                    Followers: {profile.followers}
                </div>
                <div
                    onClick={() => history.push(`/following?page=1&title=&userId=${profile.userId}`)}
                    className="card Home__Link Home__Link_hover Home__Link_active p-4">
                    Following: {profile.following}
                </div>
            </div>
        </div>
        <div className="mt-4">
            <div  className="w-100 row">
                <div className="col-6">
                    <h5>Reviews:</h5>
                </div>
                <div className="col-6 d-flex justify-content-end">
                    <Pagination 
                    page={page}
                    portionSize={6}
                    count={count}
                    pageChange={handlerPageChange}
                    />
                </div>
            </div>
            {count >0 &&  <Reviews reviews={reviews} />}
            {count===0 && <div className="w-100 Center mt-4">
                This user dont leave a reviews yet 
            </div>}
        </div>
        <EditModal
            showNamesToast={() => setShowNames(true)}
            showPasswordToast={() => setShowPassword(true)}
            showAvatarToast={() => setShowAvatar(true)}
            show={showModal} onClose={onCloseModal}
        />
        <div 
        className="justify-content-end"
        style={{ display:'flex',
        position: 'fixed', width: '82%',
         bottom: 60 }}>
        <div>
            <MyToast
                description={"Names change successfull"}
                onClose={() => setShowNames(false)}
                show={showNames} />
        </div>
        <div>
            <MyToast
                description={"Avatar change successfull"}
                onClose={() => setShowAvatar(false)}
                show={showAvatar} />
        </div>
        <div>
            <MyToast
                description={"Password change successfull"}
                onClose={() => setShowPassword(false)}
                show={showPassword} />
        </div>
        </div>
    </div>
}

export default Home


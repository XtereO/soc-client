import { useState } from "react"
import { useSelector } from "react-redux"
import { MyInput } from "../Bricks/MyInput"
import { MySelect } from "../Bricks/MySelect"
import { SettingButton } from "../Bricks/SettingButton"
import { authSelector } from "../../BLL/Selectors/authSelector";
import { myProfileSelector, profileSelector } from '../../BLL/Selectors/profileSelector'
import { backendURL } from "../../Consts"
//@ts-ignore
import defaultAvatar from '../../Media/default_avatar.jpg'
import { MusicPlayer } from "../Bricks/MusicPlayer"


type PropsType={}

export const HeaderRightSide:React.FC<PropsType>=(props)=>{

    const profile = useSelector(myProfileSelector)


    const isAuth = useSelector(authSelector)
    const [isShow,setShow] = useState(false)
    const options=[
        'People',
        'Musics',
        'Playlists'
    ]

    return<div className="w-100">
    <div className="w-100">
        {true ?  
        <div className='w-100'>
            <MusicPlayer />
        </div>
        :
        <div>(<SettingButton onClick={()=>setShow(prev=>!prev)}/>
        {
        isShow ? <MySelect options={options}/> 
        :
        <MyInput />
        })</div>}
        
    </div>
    {(isAuth && false) && <div className="col-4 row">
    <div className="col-6">
        <img
        className="Avatar"
        src={profile.avatar ? backendURL+profile.avatar : defaultAvatar} />
    </div>
    <div className="col-6">
        {profile.shortNickname}
    </div>
    </div>}
    {(!isAuth) && <div className="col-4 Center">Unauthorizate</div>}
</div>
}
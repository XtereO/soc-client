import { useState } from "react"
import { useSelector } from "react-redux"
import { MyInput } from "../Bricks/MyInput"
import { MySelect } from "../Bricks/MySelect"
import { SettingButton } from "../Bricks/SettingButton"
import { authSelector } from "../../BLL/Selectors/authSelector";


type PropsType={}

export const HeaderRightSide:React.FC<PropsType>=(props)=>{


    const isAuth = useSelector(authSelector)
    const [isShow,setShow] = useState(false)
    const options=[
        'People',
        'Musics',
        'Playlists'
    ]

    return<div className="d-flex row">
    <div className="col-8 Center d-flex">
        <SettingButton onClick={()=>setShow(prev=>!prev)}/>
        {
        isShow ? <MySelect options={options}/> 
        :
        <MyInput />
        }
        
    </div>
    {isAuth && <div className="col-4 row">
    <div className="col-6">
        <img
        className="Avatar"
        src="https://covers.gradio.lv/resize/big/uploaded/KVQ18E2NUk.jpg" />
    </div>
    <div className="col-6">
        Name
    </div>
    </div>}
    {(!isAuth) && <div className="col-4 Center">Unauthorizate</div>}
</div>
}
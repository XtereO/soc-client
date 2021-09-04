import React, { useEffect } from "react"
import { useState } from "react"
import { Login } from "./Login"
import { MyToast } from "../Bricks/MyToast";
import { Registrate } from "./Registrate";
import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "../../BLL/Selectors/authSelector";
import { setAuth, setLocalStorage } from "../../BLL/Reducers/authReducer";



type PropsType = {

}


export const Footer: React.FC<PropsType> = (props) => {

    let isAuth = useSelector(authSelector)
    const dispatch=useDispatch()
    useEffect(() => {
        //@ts-ignore
        const jwt = localStorage.getItem('token') ? (localStorage.getItem('token')) : null
        if (jwt) {
            dispatch(setAuth(true))
        } else {
            dispatch(setAuth(false))
        }
    }, [])
    const logout=()=>{
        dispatch(setAuth(false))
        dispatch(setLocalStorage(null))
        setLogoutToast(true)
    }

    let [loginShow, setLoginShow] = useState(false)
    let [registrateShow, setRegistrateShow] = useState(false)

    let [loginToast, setLoginToast] = useState(false)
    let [registrateToast, setRegistrateToast] = useState(false)

    let [logoutToast,setLogoutToast] = useState(false)

    return <div
        style={{ width: '100%', display: 'flex' }}
        className="bg-light justify-content-end p-2">
        {(!isAuth) &&
            <div>
                <button
                    onClick={() => setLoginShow(true)}
                    className="btn btn-outline-primary mx-1">
                    Login
                </button>
                <button
                    onClick={() => setRegistrateShow(true)}
                    className="btn btn-outline-warning mx-1">
                    Registrate
                </button></div>}

        {isAuth &&
            <div>
                <button 
                onClick={logout}
                className="btn btn-outline-danger mx-1">
                    Logout
                </button></div>}

        <Registrate
            showToast={() => setRegistrateToast(true)}
            show={registrateShow}
            handlerClose={() => setRegistrateShow(false)}
        />
        <Login
            showToast={() => setLoginToast(true)}
            show={loginShow}
            handlerClose={() => setLoginShow(false)} />
        <div
            style={{ position: 'fixed', bottom: 0 }}
        >
            <MyToast
                description={"Login successfull"}
                show={loginToast}
                onClose={() => setLoginToast(false)} />
        </div>
        <div
            style={{ position: 'fixed', bottom: 0 }}
        >
            <MyToast
                description={"Registrate successfull. Now you can enter"}
                show={registrateToast}
                onClose={() => setRegistrateToast(false)} />
        </div>
        <div
            style={{ position: 'fixed', bottom: 0 }}
        >
            <MyToast
                description={"Logout successfull"}
                show={logoutToast}
                onClose={() => setLogoutToast(false)} />
        </div>
    </div>
}
import React from "react"
import { Modal } from "react-bootstrap"
import { useSelector } from "react-redux"
import {initSelector, messageSelector, myProfileSelector} from '../../BLL/Selectors/profileSelector'
import { Loader } from "../Bricks/Loader"
import { EditAvatar } from "./Bricks/EditAvatar"
import { EditNames } from './Bricks/EditNames'
import { EditPassword } from "./Bricks/EditPassword"



type PropsType={
    show: boolean
    showNamesToast: ()=>void
    showPasswordToast: ()=>void
    showAvatarToast: ()=>void
    onClose:()=>void
}

export const EditModal:React.FC<PropsType> =(props)=>{

    let isInit = useSelector(initSelector)
    let message = useSelector(messageSelector)

    let showAvatarToast = () =>{
        props.showAvatarToast()
        props.onClose()
    }
    let showPasswordToast = () =>{
        props.showPasswordToast()
        props.onClose()
    }
    let showNamesToast = () =>{
        props.showNamesToast()
        props.onClose()
    }

    return<Modal 
    onHide={props.onClose}
    size='lg' show={props.show}>
        <Modal.Header closeButton={true}>
            <Modal.Title>
                Edit profile
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {isInit ? <Loader /> : 
            <div>
            <div className="card p-2 mt-2">
                <EditAvatar showToast={showAvatarToast}/>
            </div>
            <div className="card p-2 mt-2">
                <EditNames showToast={showNamesToast}/>
            </div>
            <div className="card p-2 mt-2">
                <EditPassword showToast={showPasswordToast}/>
            </div>
            </div>}
            {message && <div className="card p-2 mt-2 Center text-danger">
                {message}
            </div>}
        </Modal.Body>
    </Modal>
}
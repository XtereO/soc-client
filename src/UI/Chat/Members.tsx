import { Modal } from "react-bootstrap";
import { ChatType } from "../../Types/chat";
import { ProfileDetailType } from "../../Types/profile";






type PropsType = {
    chat: ChatType
    myProfile: ProfileDetailType
    show: boolean
    handleClose: () => void
    addPermission: (userId:string) => void
    removePermission: (userId:string) => void
}

export const Members:React.FC<PropsType> = ({chat,myProfile,show,handleClose,addPermission,removePermission}) =>{

    return<Modal
        show={show}
        onHide={handleClose}
    >
        <Modal.Header>
            Members
        </Modal.Header>
        <Modal.Body>

        </Modal.Body>
    </Modal>
}


type UserType = {
    userId: string
    firstName: string
    secondName: string
    shortNickname: string
    isHavePermission: boolean
    unreadedMesssage: number
    isUserHavePermission: boolean
    addPermission: ()=>void
    removePermission: ()=>void
}
export const UserItem:React.FC<UserType> = ({firstName,secondName,
    shortNickname,isHavePermission,unreadedMesssage,isUserHavePermission}) =>{
    return<div className='MyCard row'>
        <div className='col-6'>
            {}
        </div>
    </div>
}

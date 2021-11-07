import { Modal } from "react-bootstrap";
import { ChatType } from "../../Types/chat";
import { ProfileDetailType } from "../../Types/profile";






type PropsType = {
    chat: ChatType
    myProfile: ProfileDetailType
    show: boolean
    handleClose: () => void
    addPermission: (userId: string) => void
    removePermission: (userId: string) => void
}

export const Members: React.FC<PropsType> = ({ chat, myProfile, show, handleClose, addPermission, removePermission }) => {


    const isUserHavePermission = chat.companions.filter(c => c.user.shortNickname === myProfile.shortNickname).length > 0 ? chat.companions.filter(c => c.user.shortNickname === myProfile.shortNickname)[0].isHavePermission : false
    const membersJSX = chat.companions.map(c => <UserItem
        isUserHavePermission={isUserHavePermission}
        addPermission={() => {
            addPermission(c.user.userId)
        }} removePermission={() => {
            debugger
            removePermission(c.user.userId)
        }} unreadedMesssage={c.count}
        {...c}
        user={c.user} />)
    return <Modal
        show={show}
        onHide={handleClose}
    >
        <Modal.Header
            closeButton
        >
            Members
        </Modal.Header>
        <Modal.Body>
            {membersJSX}
        </Modal.Body>
    </Modal>
}


type UserType = {
    user: {
        userId: string
        firstName: string
        secondName: string
        shortNickname: string
    }
    isHavePermission: boolean
    unreadedMesssage: number
    isUserHavePermission: boolean
    addPermission: () => void
    removePermission: () => void
}
export const UserItem: React.FC<UserType> = ({ user, removePermission,
    addPermission, isHavePermission,
    unreadedMesssage, isUserHavePermission }) => {
    return <div className='MyCard row'>
        <div className='col-6 CenterY'>
            {`${user.firstName} ${user.secondName}`}
        </div>
        <div className='col-6 d-flex justify-content-end'>
            <button
                onClick={()=>{
                    if(isHavePermission){
                        removePermission()
                    }else{
                        addPermission()
                    }
                }}
                className={isHavePermission
                    ? 'btn btn-warning text-white' : 'btn btn-outline-warning'}
                disabled={(!isUserHavePermission)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-star" viewBox="0 0 16 16">
                    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                </svg>
            </button>
        </div>
    </div>
}

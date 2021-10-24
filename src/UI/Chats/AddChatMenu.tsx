
import { Formik } from "formik"
import React from "react"
import { Modal } from "react-bootstrap"
import { PayloadChatType } from "../../BLL/Reducers/chatsReducer"
import { TypeChatType } from "../../Types/chat"
import { Loader } from "../Bricks/Loader"
import { MyInput } from "../Bricks/MyInput"
import { MySelect } from "../Bricks/MySelect"



type PropsType = {
    show: boolean
    onClose: () => void
    message: string | null
    isInit: boolean
    onSubmit: (
        typeChat: TypeChatType,
        payload: PayloadChatType,
        callback: () => void) => void
}

export const AddChatMenu: React.FC<PropsType> = (
    { show, onClose, onSubmit, message, isInit }) => {
    return <Modal
        show={show}
        onHide={onClose}
    >
        <Modal.Header
            closeButton={true}
        >
            <Modal.Title>
                Create chat
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Formik
                initialValues={{
                    title: '' as string,
                    img: null as any,
                    typeChat: 'group' as TypeChatType
                }}
                onSubmit={(values) => {
                    onSubmit(values.typeChat, {...values,avatar:values.img}, onClose)
                }}
                validate={(values) => {
                    if (values.img && (!(values.img.type === "image/png" || values.img.type === "image/jpeg" || values.img.type === 'image/jpg'))) {
                        return { 'img': "This type of image dont support. Please use png or jpeg" }
                    }
                    return {}
                }}
            >
                {({
                    values,
                    errors,
                    handleSubmit,
                    handleChange,
                    setFieldValue
                }) => {
                    return <form onSubmit={handleSubmit}>
                        <div>
                            <div className="mt-2">
                                <h4 className="Center">
                                    Title
                                </h4>
                                <div className="Center">
                                    <MyInput
                                        required={true}
                                        name="title"
                                        value={values.title}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="mt-2">
                                <h4 className="Center">
                                    Type of chat
                                </h4>
                                <div className="Center">
                                    <MySelect
                                        options={['group', 'discussion']}
                                        name="typeChat"
                                        value={values.typeChat}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="mt-2">
                                <h4 className="Center">
                                    Image for chat
                                </h4>
                                <div className="Center">
                                    <MyInput
                                        type={'file'}
                                        onChange={(e) => {
                                            //@ts-ignore
                                            setFieldValue('img', e.target.files[0])
                                        }}
                                    />
                                </div>
                                <div className="Center text-danger">
                                    {errors.img && errors.img}
                                </div>
                            </div>
                            <div className="mt-2 w-100 Center">
                                {isInit ?
                                    <Loader /> :
                                    <button
                                        disabled={isInit}
                                        type="submit"
                                        className="btn btn-outline-success">
                                        Create
                                    </button>}
                            </div>
                            <div className="Center w-100 text-danger">
                                {message && (!isInit) && message}
                            </div>
                        </div>
                    </form>
                }}

            </Formik>
        </Modal.Body>
    </Modal>
}
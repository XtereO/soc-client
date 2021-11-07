import React from "react"
import { Formik } from "formik"
import { Modal } from "react-bootstrap"
import { setAvatar } from "../../../../express-tutorial/controllers/chat"
import { MyInput } from "../Bricks/MyInput"




type PropsType = {
    setAvatar: (img: any) => void
    setTitle: (title: string) => void
    title: string
    handleClose: () => void
    show: boolean
    isInit: boolean
    message: string | null
}

export const MainSettings: React.FC<PropsType> = ({ show, handleClose, title, setAvatar, setTitle, isInit, message }) => {
    return <Modal
        size='lg'
        onHide={handleClose}
        show={show}>
        <Modal.Header
            closeButton>
            Chat settings
        </Modal.Header>
        <Modal.Body>
            <div className="card p-2 mt-2">
                <Formik
                    initialValues={{ file: '' as any }}
                    validate={(values) => {
                        if (!(values.file.type === 'image/jpeg'
                            || values.file.type === 'image/png' ||
                            values.file.type === 'image/jpg')) {
                            return { 'file': 'We support only jpg and png image format' }
                        }
                    }}
                    onSubmit={(values) => {
                        setAvatar(values.file)
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleSubmit,
                        setFieldValue
                    }) => {
                        return <form onSubmit={handleSubmit}>
                            <div className="row w-100">
                                <h4
                                    className="col-md-6">
                                    Choice image
                                </h4>
                                <div
                                    className="col-md-6 mt-1 d-flex">
                                    <input
                                        required={true}
                                        onChange={(e) => {
                                            //@ts-ignore
                                            setFieldValue('file', e.target.files[0])
                                        }}
                                        className='form-control'
                                        type="file" />
                                    <button
                                        disabled={isInit}
                                        type='submit'
                                        className="btn btn-outline-success">
                                        Save
                                    </button>

                                </div>
                            </div>
                            <div className="w-100 Center text-danger mt-2">
                                {errors.file && touched.file && errors.file}
                            </div>
                        </form>
                    }}
                </Formik>
            </div>
            <div className='card p-2 mt-2'>
                <Formik

                    initialValues={{
                        title: title
                    }}
                    validate={(values) => {

                    }}
                    onSubmit={(values) => {
                        setTitle(values.title)
                    }}>
                    {({
                        values,
                        handleSubmit,
                        handleChange,
                        errors
                    }) => {
                        return <form onSubmit={handleSubmit}>
                            <div className="row mt-2">
                                <h4 className="w-100 Center">
                                    Change information
                                </h4>
                            </div>
                            <div className="row mt-2">
                                <div className="col-md-6 Center">
                                    Title
                                </div>
                                <div className="col-md-6">
                                    <MyInput
                                        required={true}
                                        onChange={handleChange}
                                        name='title'
                                        value={values.title}
                                        style={{ width: '100%' }}
                                    />
                                </div>
                            </div>
                            <div className="w-100 Center mt-2">
                                <button
                                    disabled={isInit}
                                    type='submit'
                                    className="btn btn-outline-success">
                                    Save
                                </button>
                            </div>
                        </form>
                    }}
                </Formik>
            </div>
        </Modal.Body>
    </Modal>
}
import { Formik } from "formik"
import React from "react"
import { Modal } from "react-bootstrap"





type PropsType={
    messageError: string | null
    show: boolean
    handleClose: ()=>void
    sendMessage: (textMessage:string)=>void
}

export const SendMessageModal:React.FC<PropsType> = ({show,handleClose,messageError,sendMessage}) =>{
    
    return<Modal 
    onHide={handleClose}
    show={show}>
        <Modal.Header closeButton>
            Send Message 
        </Modal.Header>
        <Modal.Body>
            <Formik
            onSubmit={(values)=>{
                sendMessage(values.textMessage)
            }}
            validate={()=>{}}
            initialValues = {{textMessage:'' as string}}
            >
                {({
                    values, 
                    handleChange,
                    handleSubmit
                })=>{
                    return<form onSubmit={handleSubmit}>
                        <textarea 
                        className='form-control'
                        value = {values.textMessage}
                        name='textMessage'
                        onChange={handleChange}
                        />
                        <button className='btn btn-success w-100'>
                            send
                        </button>
                        {messageError && <div className='text-danger mt-2 text-center'>
                            {messageError}
                        </div>}
                    </form>
                }}
            </Formik>
        </Modal.Body>
    </Modal>
}
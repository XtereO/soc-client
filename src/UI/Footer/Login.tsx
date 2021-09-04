import { Formik } from "formik"
import React from "react"
import { Modal } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { MyInput } from "../Bricks/MyInput"
import { initSelector, messageSelector } from '../../BLL/Selectors/authSelector'
import { login } from "../../BLL/Reducers/authReducer"
import {Loader} from '../Bricks/Loader'



type PropsType = {
    show: boolean
    handlerClose: () => void
    showToast: ()=>void
}

export const Login: React.FC<PropsType> = ({ show, handlerClose, showToast }) => {
    
    const dispatch = useDispatch()
    const message = useSelector(messageSelector)
    const isInit = useSelector(initSelector)

    return <Modal
        onHide={handlerClose}
        show={show}>
        <Modal.Header closeButton={true}>
            <Modal.Title>
                Login
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Formik 
            initialValues={{email:'',password:''}}
            validate={()=>{}}
            onSubmit={(values,)=>{
                const finishForm=()=>{
                    handlerClose()
                    showToast()
                }
                const {email, password} = values
                dispatch(login({email,password},finishForm))
            }}
            >
            {({
                values,
                errors,
                handleChange,
                handleSubmit
            })=>{
            return<form onSubmit={handleSubmit}>
            <div className="Center">
                Email
            </div>
            <div className="w-100 Center">
                <MyInput
                value={values.email}
                name="email"
                type="email"
                onChange={handleChange}
                required={true}
                style={{ width: '80%' }} />
            </div>
            <div className="Center mt-2">
                Password
            </div>
            <div className="w-100 Center">
                <MyInput
                name="password" 
                value={values.password}
                onChange={handleChange}
                type="password"
                required={true}
                style={{ width: '80%' }} />
            </div>
            <div className="mt-4 w-100">
                {isInit ? 
                <div className="Center">
                    <Loader />
                </div>
                :
                <div className="Center">
                <button type="submit"
                className="btn btn-outline-success">
                    Enter
                </button>
                </div>
                }
                {message && 
                <div className="text-danger Center">
                    {message}
                </div>
                }
            </div>
            </form>}}
            </Formik>
        </Modal.Body>
    </Modal>
}
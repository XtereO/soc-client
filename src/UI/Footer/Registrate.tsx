import { Formik } from "formik"
import React, { useEffect, useState } from "react"
import { Modal } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { confirmCode, registrate, setCode, setMessage } from "../../BLL/Reducers/authReducer"
import { codeSelector, initSelector, messageSelector } from "../../BLL/Selectors/authSelector"
import { RegistrateRequestType } from "../../Types/auth"
import { Loader } from "../Bricks/Loader"
import { MyInput } from "../Bricks/MyInput"




type PropsType = {
    show: boolean
    handlerClose: () => void
    showToast: () => void
}

export const Registrate: React.FC<PropsType> = ({ show, handlerClose, showToast }) => {

    let [page, setPage] = useState(1)

    let code = useSelector(codeSelector)
    let message = useSelector(messageSelector)
    let isInit = useSelector(initSelector)
    const dispatch = useDispatch() 

    //For input
    let [email,setEmail] = useState('')
    const handlerChangeEmail=(e:React.ChangeEvent<HTMLInputElement>)=>{  
        setEmail(e.target.value)
    }
    let [isGetCode, setGetCodeStatus] = useState(false)
    const getCode=()=>{
        setGetCodeStatus(true)
        dispatch(setCode())
    }
    useEffect(()=>{
        if(code && page===1){
            dispatch(confirmCode(email,String(code)))
        }
    },[code])

    let [codeInput,setCodeInput]=useState('')
    const handlerChangeCode=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setCodeInput(e.target.value)
    }
    const onClickConfirm=()=>{
        if(String(code)!==codeInput){
            dispatch(setMessage('Codes are not matching'))
        }else{
            setPage(2)
        }
    }





    return <Modal
        show={show}
        onHide={handlerClose}
    >
        <Modal.Header
            closeButton={true}
        >
            <Modal.Title>
                Registrate
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {page === 1 &&
                <div>
                    {(!isGetCode) && <div className="w-100">
                    <div className="Center">
                        Email
                    </div>
                    <div className="Center">
                        <MyInput
                        style={{width:'80%'}}
                        onChange={handlerChangeEmail}
                        value={email}
                        type='email'
                        required={true}
                        />
                    </div>
                    <div className="Center mt-2">
                        <button
                        onClick={getCode}
                        className="btn btn-outline-success">
                            Get code
                        </button>
                    </div>
                    <div 
                    className='Center Hint'>
                        On this email will send code
                    </div>
                    </div>}
                    {(isGetCode) && <div className="w-100">
                        <div className="Center">
                            Enter code from the message
                        </div>
                        <div className="Center">
                            <MyInput  
                            value={codeInput}
                            onChange={handlerChangeCode}
                            type="text"
                            required={true}
                            />
                        </div>
                        <div className="Center">
                            <button 
                            onClick={onClickConfirm}
                            className="btn btn-outline-success mt-2">
                                Confirm code
                            </button>
                        </div>
                        <div className="Center text-danger">
                            {message && message}
                        </div>
                    </div>}
                </div>
            }
            {page === 2 && 
                <div>
                    <Formik 
                    initialValues={{
                        firstName: '',
                        secondName: '',
                        shortNickname: '',
                        password: '',
                        passwordRepeat: ''
                    }}
                    validate={(values)=>{
                        if(values.password!==values.passwordRepeat){
                            return{password: 'Passwords are not matching'}
                        }
                        return {}
                    }}
                    onSubmit={(values)=>{
                        const finishRegistrate=()=>{
                            handlerClose()
                            showToast()
                        }
                        dispatch(registrate({
                            firstName: values.firstName,
                            secondName: values.secondName,
                            shortNickname: values.shortNickname,
                            password: values.password,
                            email
                        },finishRegistrate))
                    }}
                    >
                        {({
                            handleSubmit,
                            handleChange,
                            values,
                            errors,
                            touched
                        })=>{
                            return<form onSubmit={handleSubmit}>
                                <div className="w-100">
                                    <div className="Center">
                                        First name
                                    </div>
                                    <div className="Center">
                                        <MyInput
                                        required={true}
                                        style={{width:'80%'}}
                                        name="firstName"
                                        onChange={handleChange}
                                        value={values.firstName}
                                        />
                                    </div>
                                    <div className="Center mt-2">
                                        Second name
                                    </div>
                                    <div className="Center">
                                        <MyInput
                                        required={true}
                                        style={{width:'80%'}}
                                        name="secondName"
                                        onChange={handleChange}
                                        value={values.secondName}
                                        />
                                    </div>
                                    <div className="Center mt-2">
                                        Short nickname
                                    </div>
                                    <div className="Center">
                                        <MyInput 
                                        required={true}
                                        style={{width:'80%'}}
                                        name="shortNickname"
                                        onChange={handleChange}
                                        value={values.shortNickname}
                                        />
                                    </div>
                                    <div className="Center Hint">
                                        Include only six symbols
                                    </div>
                                    <div className="Center mt-2">
                                        Password
                                    </div>
                                    <div className="Center">
                                        <MyInput
                                        type="password" 
                                        required={true}
                                        style={{width:'80%'}}
                                        name="password"
                                        onChange={handleChange}
                                        value={values.password}
                                        />
                                    </div>
                                    <div className='Center mt-2'>
                                        Repeat password
                                    </div>
                                    <div className="Center">
                                        <MyInput 
                                        type='password'
                                        required={true}
                                        style={{width:'80%'}}
                                        name="passwordRepeat"
                                        onChange={handleChange}
                                        value={values.passwordRepeat}
                                        />
                                    </div>
                                    <div className="Center mt-4">
                                        {(!isInit) && <button 
                                        type="submit"
                                        className="btn btn-outline-success">
                                            Registrate
                                        </button>}
                                        {isInit && <Loader />}
                                    </div>
                                    <div className="Center text-danger mt-1">
                                        {touched.password && touched.passwordRepeat &&
                                        errors.password && errors.password}
                                        {message && message}
                                    </div>
                                </div>
                            </form>
                        }}
                    </Formik>
                </div>
            }
        </Modal.Body>
    </Modal>
}
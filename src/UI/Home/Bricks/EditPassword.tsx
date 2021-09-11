import { Formik } from "formik"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { setPasswordsAsync } from "../../../BLL/Reducers/profileReducer"
import { initSelector } from "../../../BLL/Selectors/profileSelector"
import { MyInput } from "../../Bricks/MyInput"



type PropsType={
    showToast:()=>void
}
export const EditPassword:React.FC<PropsType>=({showToast})=>{
    
    const isInit = useSelector(initSelector)
    const dispatch = useDispatch()

    return<Formik
        initialValues={{
            password: '',
            passwordRepeat: ''
        }}
        validate={(values)=>{
            if(values.password!==values.passwordRepeat){
                return {password: 'Passwords are not matching'}
            }
            return {}
        }}
        onSubmit={(values)=>{
            dispatch(setPasswordsAsync(values.password,values.passwordRepeat,showToast))
        }}
        >
        {({
            values,
            handleSubmit,
            handleChange,
            touched,
            errors
        })=>{
            return<form onSubmit={handleSubmit}>
                <div className="row mt-2">
                    <h4 className="w-100 Center">
                        Change Passwords
                    </h4>
                    <div className="col-md-6 Center">
                        Password    
                    </div>
                    <div className="col-md-6">
                        <MyInput  
                        required={true}
                        onChange={handleChange}
                        value={values.password}
                        name="password"
                        style={{width:'100%'}}
                        type='password'
                        />
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-md-6 Center">
                        Repeat password
                    </div>
                    <div className="col-md-6">
                        <MyInput 
                        required={true}
                        onChange={handleChange}
                        value={values.passwordRepeat}
                        name='passwordRepeat'
                        style={{width:'100%'}}
                        type='password'
                        />
                    </div>
                </div>
                <div className="w-100 Center mt-2">
                    <button 
                    disabled={isInit}
                    type="submit"
                    className="btn btn-outline-success">
                        Save
                    </button>
                </div>
                <div className="w-100 Center text-danger">
                    {touched.password && touched.passwordRepeat && 
                    errors.password && errors.password }
                </div>
            </form>
        }}
    </Formik>
}
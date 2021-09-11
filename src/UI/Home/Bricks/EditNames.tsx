import { Formik } from "formik"
import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setNamesAsync } from "../../../BLL/Reducers/profileReducer"
import { initSelector, messageSelector, myProfileSelector } from "../../../BLL/Selectors/profileSelector"
import { MyInput } from "../../Bricks/MyInput"
import {Loader} from '../../Bricks/Loader'



type PropsType={
    showToast:()=>void
}
export const EditNames:React.FC<PropsType>=({showToast})=>{
    
    let isInit = useSelector(initSelector)
    let myProfile = useSelector(myProfileSelector)
    let message = useSelector(messageSelector)
    const dispatch = useDispatch()


    return<Formik
        enableReinitialize
        initialValues={{
            firstName: myProfile.firstName,
            secondName: myProfile.secondName,
            shortNickname: myProfile.shortNickname
        }}
        validate={(values)=>{
            if(values.shortNickname.length!==6){
                return{shortNickname: 'Short nickname must include 6 symbols'}
            }
        }}
        onSubmit={(values)=>{
            dispatch(setNamesAsync(values,showToast))
        }}>
        {({
            values,
            handleSubmit,
            handleChange,
            errors
        })=>{
            return<form onSubmit={handleSubmit}>
                <div className="row mt-2">
                    <h4 className="w-100 Center">
                        Change names
                    </h4>
                    <div className="col-md-6 Center">
                        First name    
                    </div>
                    <div className="col-md-6">
                        <MyInput  
                        required={true}
                        onChange={handleChange}
                        name='firstName'
                        value={values.firstName}
                        style={{width:'100%'}}
                        />
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-md-6 Center">
                        Second name
                    </div>
                    <div className="col-md-6">
                        <MyInput 
                        required={true}
                        onChange={handleChange}
                        name='secondName'
                        value={values.secondName}
                        style={{width:'100%'}}
                        />
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-md-6 Center">
                        Short Nickname
                    </div>
                    <div className="col-md-6">
                        <MyInput 
                        onChange={handleChange}
                        name='shortNickname'
                        value={values.shortNickname}
                        style={{width:'100%'}}
                        required={true}
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
                <div className="w-100 Center text-danger">
                    {errors.shortNickname && errors.shortNickname}
                </div>
            </form>
        }}
    </Formik>
}
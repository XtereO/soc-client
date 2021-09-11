import { Formik } from "formik"
import { stringify } from "querystring"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { setAvatarAsync } from "../../../BLL/Reducers/profileReducer"
import { initSelector, messageSelector } from "../../../BLL/Selectors/profileSelector"
import { Loader } from "../../Bricks/Loader"



type PropsType={
    showToast:()=>void
}
export const EditAvatar:React.FC<PropsType>=({showToast})=>{
    
    const dispatch = useDispatch()
    const isInit = useSelector(initSelector)

    return<Formik
    initialValues={{file: null as  any}}
    validate={(values)=>{
        
        if(!(values.file.type==='image/jpeg' || values.file.type==="image/png" || values.file.type==="image/jpg")){
            return{file:'We dont support this image format'}
        }
        return {}
    }}
    onSubmit={(values)=>{
        dispatch(setAvatarAsync(values.file,showToast))
    }}
    >
    {({
        handleSubmit,
        setFieldValue,
        values,
        errors,touched
    })=>{
        return<form onSubmit={handleSubmit}>
            <div className="row w-100">
                <h4 
                className="col-md-6">
                    Choice picture
                </h4>
                <div 
                className="col-md-6 mt-1 d-flex">
                    <input
                    required={true}
                    onChange={(e)=>{
                        //@ts-ignore
                        setFieldValue('file',e.target.files[0])
                    }}
                    className="form-control"
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
}
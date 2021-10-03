import { Formik } from "formik"
import React from "react"




type PropsType={
    setImg:(img:any)=>void
    isInit: boolean
}

export const SetImgFile:React.FC<PropsType>=({isInit,setImg})=>{
    
    return<Formik
    initialValues={{file: '' as any}}
    validate={(values)=>{
        if((!(values.file.type==='image/jpeg' 
        || values.file.type==='image/png' ||
           values.file.type==='image/jpg')) ){
            return {'file': 'We support only jpg and png image format'}
        }
    }}
    onSubmit={(values)=>{
        setImg(values.file)
    }}
    >
        {({
            values,
            errors,
            touched,
            handleSubmit,
            setFieldValue
        })=>{
            return<form onSubmit={handleSubmit}>
                <div className="row w-100">
                <h4 
                className="col-md-6">
                    Choice image
                </h4>
                <div 
                className="col-md-6 mt-1 d-flex">
                    <input
                    required={true}
                    onChange={(e)=>{
                        //@ts-ignore
                        setFieldValue('file',e.target.files[0])
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
}




import { Formik } from "formik"
import React from "react"
import { MyInput } from "../../Bricks/MyInput"




type PropsType={
    setInfo:(isPublic:boolean, title:string)=>void
    isInit:boolean
    title:string
    isPublic: boolean
}
export const SetEditInfoPlaylist:React.FC<PropsType>=({
    setInfo,isInit,title,isPublic})=>{
    

    return<Formik
        
        initialValues={{
            isPublic: isPublic,
            title: title
        }}
        validate={(values)=>{
            
        }}
        onSubmit={(values)=>{
           setInfo(values.isPublic,values.title) 
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
                        Change information
                    </h4>
                    <div className="col-md-6 Center">
                        Title
                    </div>
                    <div className="col-md-6">
                        <MyInput 
                        required={true}
                        onChange={handleChange}
                        name='title'
                        value={values.title}
                        style={{width:'100%'}}
                        />
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-md-6 Center">
                        <label htmlFor='isPublic'>
                        Is public
                        </label>
                    </div>
                    <div className="col-md-6">
                        <input
                        id='isPublic'
                        type='checkbox'
                        onChange={handleChange}
                        name='isPublic'
                        defaultChecked={values.isPublic}
                        style={{width:'100%'}}
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
}
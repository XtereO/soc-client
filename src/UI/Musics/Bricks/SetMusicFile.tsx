import { Formik } from "formik"
import React from "react"
import { useDispatch } from "react-redux"
import { setMusicAsync } from "../../../BLL/Reducers/musicsReducer"




type PropsType={
    musicId: string
    onClose: ()=>void
    mode: 'Music' | 'Img'
    isInit: boolean
    setMusicAsync:(onClose:()=>void,payload:PayloadType)=>void
}
type PayloadType={img?:any,music?:any}

export const SetMusicFile:React.FC<PropsType>=({musicId,onClose,isInit,mode,...props})=>{
    

    return<Formik
    initialValues={{file: '' as any}}
    validate={(values)=>{
        if(mode==='Img' && (!(values.file.type==='image/jpeg' 
        || values.file.type==='image/png' ||
           values.file.type==='image/jpg')) ){
            return {'file': 'We support only jpg and png image format'}
        }if(mode==='Music' && (values.file.type!=='audio/mpeg')){
            return {'file': 'We support only mpeg music format(mp3)'}
        }
    }}
    onSubmit={(values)=>{
        props.setMusicAsync(
            onClose,
            {img:values.file,
            music:values.file}
        )
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
                    {mode==='Music' && 'Choice mp3'}
                    {mode==='Img' && 'Choice image'}
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
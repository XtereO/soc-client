import { Formik } from "formik"
import React from "react"
import { Modal } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { addPlaylistAsync } from "../../../BLL/Reducers/playlistsReducer"
import { initSelector, messageSelector } from "../../../BLL/Selectors/playlistsSelector"
import { Loader } from "../../Bricks/Loader"
import { MyInput } from "../../Bricks/MyInput"



type PropsType={
    isInit: boolean
    message: string | null
    onSubmit: (title:string,isPublic:boolean,img?:any)=>void
    show: boolean
    closeHandler:()=>void
}

export const AddPlaylistModal:React.FC<PropsType>=({show,closeHandler,onSubmit,message,isInit})=>{


    return<Modal
    show={show}
    onHide={closeHandler}
    >
        <Modal.Header
        closeButton={true}>
            <Modal.Title>
                Add playlist
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Formik
                initialValues={{title:'',isPublic:true,img:null as any}}
                validate={({img,isPublic})=>{
                    if(img && (img.type!=='image/png' && img.type!=='image/jpeg' && img.type!=='image/jpg')){
                        return{'img':'This type of image dont support. Please use png or jpeg'}    
                    }
                    return {}
                }}
                onSubmit={({title,img,isPublic})=>{
                    onSubmit(title,isPublic,img)                   
                }}
            >
                {({
                    values,
                    errors,
                    handleChange,
                    handleSubmit,
                    setFieldValue
                })=>{
                    return<form onSubmit={handleSubmit}>
                        <div>
                        <div className="mt-2"> 
                            <h4 className="Center">
                                Title
                            </h4>
                            <div className="Center">
                                <MyInput
                                required={true}
                                name="title"
                                value={values.title}
                                onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="mt-2">
                            <h4 className="Center">
                                Image for playlist
                            </h4>
                            <div className="Center">
                                <MyInput
                                type={'file'}
                                onChange={(e)=>{
                                    //@ts-ignore
                                    setFieldValue('img',e.target.files[0])
                                }}
                                />
                            </div>
                            <div className="Center text-danger">
                                {errors.img && errors.img}
                            </div>
                        </div>
                        <div className="mt-2 row"> 
                            <h4 className="Center col-6">
                                <label htmlFor='isPublic'>
                                    Show owner
                                </label>
                            </h4>
                            <div className="col-6 d-flex Center">
                                <input 
                                id='isPublic'
                                type='checkbox'
                                onChange={handleChange}
                                name='isPublic'
                                defaultChecked={values.isPublic} />
                            </div>
                        </div>
                        <div className="mt-2 w-100 Center">
                            {isInit ? 
                            <Loader /> :
                            <button 
                            disabled={isInit}
                            type="submit"
                            className="btn btn-outline-success">
                                Create 
                            </button>}
                        </div>
                        <div className="Center w-100 text-danger">
                            {message && (!isInit) && message}
                        </div>
                    </div>
                    </form>
                }}
            </Formik>
        </Modal.Body>
    </Modal>
}
import { Formik } from "formik"
import { Modal } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { addMusic } from "../../../BLL/Reducers/musicReducer"
import { GenreType } from "../../../Types/music"
import { MyInput } from "../../Bricks/MyInput"
import { MySelect } from "../../Bricks/MySelect"
import {initSelector, messageSelector} from '../../../BLL/Selectors/musicSelector'
import { Loader } from "../../Bricks/Loader";
import React from "react"


type PropsType={
    show: boolean
    handleClose: ()=>void
    showToast: ()=>void
}

export const AddMusicMenu:React.FC<PropsType>=({handleClose,show,showToast})=>{


    let isInit = useSelector(initSelector)
    let message = useSelector(messageSelector)

    const opts=[
        'Rep',
        'Hip-hop',
        `Rock'n'roll`,
        'Metall',
        'Other'
    ]

    const dispatch = useDispatch()
    
    return<Modal
    onHide={handleClose}
    show={show}
    >   
        <Modal.Header
        closeButton={true}
        >
            Add music 
        </Modal.Header>
        <Modal.Body>
            <Formik
            initialValues={{
                title: '',music: null as any,
                img: null as any,author: '',
                genre: 'Other' as GenreType
            }}
            validate={(values)=>{
                if(values.music && values.music.type!=="audio/mpeg"){
                    return {'music': "This type of music dont support"}
                }if(values.img && (!(values.img.type==="image/png" || values.img.type==="image/jpeg" || values.img.type==='image/jpg'))){
                    return {'img': "This type of img dont support"}
                }
                return {}
            }}
            onSubmit={(values)=>{
                dispatch(addMusic(
                    values.title,
                    values.music,
                    values.img,
                    values.author,
                    values.genre,showToast
                ))
            }}
            >
            {({
                values,
                errors,
                handleSubmit,
                handleChange,
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
                                Author
                            </h4>
                            <div className="Center">
                                <MyInput 
                                required={true}
                                name="author"
                                value={values.author}
                                onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="mt-2">
                            <h4 className="Center">
                                Music mp3
                            </h4>
                            <div className="Center">
                                <MyInput 
                                required={true}
                                type={'file'}
                                onChange={(e)=>{
                                    //@ts-ignore
                                    setFieldValue('music', e.target.files[0])
                                }}
                                />
                            </div>
                            <div className="Center text-danger">
                                {errors.music && errors.music}
                            </div>
                        </div>
                        <div className="mt-2">
                            <h4 className="Center">
                                Image for music
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
                        <div className="mt-2">
                            <h4 className="Center">
                                Genre
                            </h4>
                            <div className="Center">
                                <MySelect
                                    value={values.genre}
                                    name={'genre'}
                                    options={opts}
                                    onChange={handleChange}
                                />
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
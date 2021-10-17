import { Formik } from "formik"
import React from "react"
import { Modal } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import { MyInput } from "../../Bricks/MyInput";
import {messageSelector} from '../../../BLL/Selectors/playlistsSelector'
import { ratePlaylistAsync } from "../../../BLL/Reducers/playlistsReducer";
import { PlaylistType } from "../../../Types/playlist";



type PropsType= {
    title: string
    playlistId: string
    onClose: ()=>void
    show: boolean
    ratePlaylistAsync:(playlistId:string,rating:number,review:string | null,
        title:string,onClose:()=>void,
        )=>void
}

export const RatePlaylistModal:React.FC<PropsType>=(props)=>{

    const message = useSelector(messageSelector)
    const dispatch = useDispatch()

    return<Modal
        onHide={props.onClose}
        show={props.show}
    >
        <Modal.Header
        closeButton={true}
        >
            <Modal.Title>
                Rate playlist {props.title}
            </Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <Formik
            initialValues={{rating: 5, review: ''}}
            validate={(values)=>{
                if(values.rating>10 || values.rating<0){
                    return{'rating':'Rating must more than 0 and litle than 10'}
                }
            }}
            onSubmit={(values)=>{
                props.ratePlaylistAsync(props.playlistId,
                    (+values.rating),values.review ? values.review : null,
                    props.title,props.onClose,
                    )
            }}
            >
                {({
                    values,
                    errors,
                    handleChange,
                    handleSubmit
                })=>{
                    return<form onSubmit={handleSubmit}>
                        <div>
                            <h4 className="Center">
                                Rating
                            </h4>
                            <div className="Center">
                                <MyInput 
                                value={values.rating}
                                onChange={handleChange}
                                name='rating'
                                required={true}
                                type='number'
                                />
                            </div>
                            <div className='Center text-danger'>
                                {errors.rating && errors.rating}
                            </div>
                        </div>
                        <div className='mt-2'>
                            <h4 className="Center">
                                Review
                            </h4>
                            <div className='Center'>
                                <textarea
                                className='form-control'
                                onChange={handleChange}
                                name='review'
                                value={values.review}
                                >
                                </textarea>
                            </div>
                        </div>
                        <div className='Center mt-2'>
                            <button 
                            type='submit'
                            className='btn btn-outline-success'
                            >
                                Rate
                            </button>
                        </div>
                        <div className="Center text-danger">
                            {message && message}
                        </div>
                    </form>
                }}
            </Formik>
        </Modal.Body>
    </Modal>
}
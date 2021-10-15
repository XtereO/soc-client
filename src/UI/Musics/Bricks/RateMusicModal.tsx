import { Formik } from "formik"
import React from "react"
import { Modal } from "react-bootstrap"
import { MusicType } from "../../../Types/music"
import { MyInput } from "../../Bricks/MyInput";



type PropsType=MusicType & {
    onClose: ()=>void
    show: boolean
    message: string | null
    rateMusicAsync: (title:string,rating:number,onClose:()=>void,review:string)=>void
}

export const RateMusicModal:React.FC<PropsType>=(props)=>{


    return<Modal
        onHide={props.onClose}
        show={props.show}
    >
        <Modal.Header
        closeButton={true}
        >
            <Modal.Title>
                Rate {props.title} - {props.author}
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
                props.rateMusicAsync(
                    props.title,(+values.rating),
                    props.onClose,values.review) 
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
                            {props.message && props.message}
                        </div>
                    </form>
                }}
            </Formik>
        </Modal.Body>
    </Modal>
}
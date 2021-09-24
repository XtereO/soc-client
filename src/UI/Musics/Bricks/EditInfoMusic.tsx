



import { Formik } from "formik"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { setMusicAsync } from "../../../BLL/Reducers/musicsReducer"
import { initSelector, messageSelector, myProfileSelector } from "../../../BLL/Selectors/profileSelector"
import { GenreType } from "../../../Types/music"
import { MyInput } from "../../Bricks/MyInput"
import {MySelect} from '../../Bricks/MySelect'




type PropsType={
    onClose:()=>void
    isInit:boolean
    musicId:string
    author:string
    title:string
    genre:GenreType
}
export const EditInfoMusic:React.FC<PropsType>=({
    onClose,isInit,musicId,author,title,genre})=>{
    
    const dispatch = useDispatch()
    const options = [
        'Rep', 'Hip-hop', `Rock'n'roll`, 'Metall', 'Other'
    ]

    return<Formik
        enableReinitialize
        initialValues={{
            author: author,
            title: title,
            genre: genre
        }}
        validate={(values)=>{
            
        }}
        onSubmit={(values)=>{
            dispatch(setMusicAsync(musicId,onClose,values))
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
                        Author    
                    </div>
                    <div className="col-md-6">
                        <MyInput  
                        required={true}
                        onChange={handleChange}
                        name='author'
                        value={values.author}
                        style={{width:'100%'}}
                        />
                    </div>
                </div>
                <div className="row mt-2">
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
                        Genre
                    </div>
                    <div className="col-md-6">
                        <MySelect 
                        options={options}
                        onChange={handleChange}
                        name='shortNickname'
                        value={values.genre}
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
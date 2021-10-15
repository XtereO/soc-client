



import { Formik } from "formik"
import React from "react"
import { setMusicAsync } from "../../../BLL/Reducers/musicsReducer"
import { GenreType } from "../../../Types/music"
import { MyInput } from "../../Bricks/MyInput"
import {MySelect} from '../../Bricks/MySelect'




type PropsType={
    onClose:()=>void
    isInit:boolean
    musicId:string
    author:string | null
    title:string
    genre:GenreType
    setMusicAsync:(onClose:()=>void, payload:PayloadType)=>void
}
type PayloadType = {author?:string, genre?:GenreType, title?:string}
export const EditInfoMusic:React.FC<PropsType>=({
    onClose,isInit,author,title,genre,setMusicAsync})=>{
    
    const options = [
        'Rep', 'Hip-hop', `Rock'n'roll`, 'Metall', 'Other'
    ]

    return<Formik
        
        initialValues={{
            author: author ? author : '',
            title: title,
            genre: genre
        }}
        validate={(values)=>{
            
        }}
        onSubmit={(values)=>{
            setMusicAsync(onClose,values)
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
                        name='genre'
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
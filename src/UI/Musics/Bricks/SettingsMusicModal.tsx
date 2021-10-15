import { Modal } from "react-bootstrap";
import { GenreType, MusicType } from "../../../Types/music";
import {SetMusicFile} from './SetMusicFile'
import {useSelector} from 'react-redux'
import React from "react";
import {EditInfoMusic} from './EditInfoMusic'


type PropsType=MusicType & {
    onClose: ()=>void
    show: boolean
    setMusicAsync:(onClose:()=>void, payload:PayloadType)=>void
    isInit: boolean
}
type PayloadType={
    img?:any
    music?:any
    author?:string
    genre?:GenreType
    title?:string
}
export const SettingsMusicModal:React.FC<PropsType>=(props)=>{
    
    return<Modal
    onHide={props.onClose}
    show={props.show}
	size='lg'
    >
        <Modal.Header
        closeButton={true}
        >
            <Modal.Title>
                Music settings
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className='card p-2 mt-2'>
                <SetMusicFile 
                setMusicAsync={props.setMusicAsync}
                key={1}
                isInit={props.isInit}
                onClose={props.onClose}
                mode='Img' 
                musicId={props.musicId} />
            </div>
            <div className="card p-2 mt-2">
                <SetMusicFile 
                setMusicAsync={props.setMusicAsync}
                key={2}
                isInit={props.isInit}
                onClose={props.onClose}
                mode='Music'
                musicId={props.musicId}
                />
            </div>
            <div className='card p-2 mt-2'>
                <EditInfoMusic 
                setMusicAsync={props.setMusicAsync}
                musicId={props.musicId}
                onClose={props.onClose}
                isInit={props.isInit}
                author={props.author}
                genre={props.genre}
                title={props.title}
                />
            </div>
        </Modal.Body>
    </Modal>
}
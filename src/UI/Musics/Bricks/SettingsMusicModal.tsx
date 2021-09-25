import { Modal } from "react-bootstrap";
import { MusicType } from "../../../Types/music";
import {SetMusicFile} from './SetMusicFile'
import {initSelector} from '../../../BLL/Selectors/musicsSelector'
import {useSelector} from 'react-redux'
import React from "react";
import {EditInfoMusic} from './EditInfoMusic'


type PropsType=MusicType & {
    onClose: ()=>void
    show: boolean
}

export const SettingsMusicModal:React.FC<PropsType>=(props)=>{
    
    const isInit = useSelector(initSelector)

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
                key={1}
                isInit={isInit}
                onClose={props.onClose}
                mode='Img' 
                musicId={props.musicId} />
            </div>
            <div className="card p-2 mt-2">
                <SetMusicFile 
                key={2}
                isInit={isInit}
                onClose={props.onClose}
                mode='Music'
                musicId={props.musicId}
                />
            </div>
            <div className='card p-2 mt-2'>
                <EditInfoMusic 
                musicId={props.musicId}
                onClose={props.onClose}
                isInit={isInit}
                author={props.author}
                genre={props.genre}
                title={props.title}
                />
            </div>
        </Modal.Body>
    </Modal>
}
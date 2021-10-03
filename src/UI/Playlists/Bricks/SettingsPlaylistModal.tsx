import { Modal } from "react-bootstrap";
import {initSelector} from '../../../BLL/Selectors/playlistsSelector'
import {useSelector} from 'react-redux'
import React from "react";
import { PlaylistType } from "../../../Types/playlist";
import { SetEditInfoPlaylist } from "./SetEditInfoPlaylist";
import { SetImgFile } from "./SetImgFile";


type PropsType=PlaylistType & {
    onClose: ()=>void
    show: boolean
    setInfo:(isPublic:boolean,title:string)=>void
    setImg:(img:any)=>void
}

export const SettingsPlaylistModal:React.FC<PropsType>=(props)=>{
    
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
                Playlist settings
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className='card p-2 mt-2'>
                <SetImgFile setImg={props.setImg}
                isInit={isInit}/>
            </div>
            <div className="card p-2 mt-2">
                <SetEditInfoPlaylist 
                setInfo={props.setInfo}
                isInit={isInit}
                isPublic={props.isPublic}
                title={props.title}
                />
            </div>
        </Modal.Body>
    </Modal>
}
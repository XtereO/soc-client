import React, { useContext, useEffect } from "react"
import { Container, Nav, Navbar } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import {NavLink} from "react-router-dom"
import { setProfileAsync } from "../../BLL/Reducers/profileReducer"
import { authSelector } from "../../BLL/Selectors/authSelector"
import { HeaderLink } from "./HeaderLink"
import { HeaderRightSide } from "./HeaderRightSide"
import { ModeContext } from '../../App'
import { myProfileSelector } from "../../BLL/Selectors/profileSelector"

type PropsType = {}

export const Header:React.FC<PropsType> = (props) => {


    const mode = useContext(ModeContext)
    const dispatch = useDispatch()
    const auth = useSelector(authSelector)
    const myProfile = useSelector(myProfileSelector)
    useEffect(()=>{
        if(auth){
            dispatch(setProfileAsync('',true))
        }
    },[auth])

    const headerLinks = [
        {title: 'Home', link: '/home'},
        {title: 'Musics', link:'/musics'},
        {title: 'Playlists', link:'/playlists'},
        {title: 'People', link: '/people'},
        {title: 'Chats', link: '/chats', unreadedMessages: myProfile ? myProfile.unreadedMessages : 0 }
    ]
    return<Navbar className="sticky-top" bg="light" expand="lg">
        <Container>
            <Navbar.Brand>
                MSoc
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"></Navbar.Toggle>
            <Navbar.Collapse id="basic-navbar-nav">
                {
                headerLinks.map(h=><HeaderLink {...h} link={h.link}>
                    {h.title}
                </HeaderLink>)
                }
            </Navbar.Collapse>
            <div 
            style={{width: mode ? '35%' : '100%'}}
            >
                <HeaderRightSide/>
            </div>
        </Container>
    </Navbar>
}
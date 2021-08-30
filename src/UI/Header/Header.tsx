import React from "react"
import { Container, Nav, Navbar } from "react-bootstrap"
import {NavLink} from "react-router-dom"
import { HeaderLink } from "./HeaderLink"
import { HeaderRightSide } from "./HeaderRightSide"


type PropsType = {}

export const Header:React.FC<PropsType> = (props) => {

    const headerLinks = [
        {title: 'Home', link: '/home'},
        {title: 'Followers', link: '/followers'},
        {title: 'Subscribes', link: '/subscribes'},
        {title: 'People', link: '/people'},
        {title: 'Chats', link: '/chats'}
    ]
    return<Navbar className="sticky-top" bg="light" expand="lg">
        <Container>
            <Navbar.Brand>
                MSoc
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"></Navbar.Toggle>
            <Navbar.Collapse id="basic-navbar-nav">
                {
                headerLinks.map(h=><HeaderLink link={h.link}>
                    {h.title}
                </HeaderLink>)
                }
            </Navbar.Collapse>
            <div className="justify-content-end ">
                <HeaderRightSide/>
            </div>
        </Container>
    </Navbar>
}
import React from "react"
import { Nav } from "react-bootstrap"
import { NavLink } from "react-router-dom"


type PropsType={
    link: string
}

export const HeaderLink:React.FC<PropsType> = ({link, children})=>{
    return<Nav.Link className="Center">
    <NavLink 
    activeClassName="Header__Link_active"
    to={link} className="Header__Link Header__Link_hover">
        {children}
    </NavLink>
</Nav.Link>
}
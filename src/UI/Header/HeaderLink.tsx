import React from "react"
import { Nav } from "react-bootstrap"
import { NavLink } from "react-router-dom"


type PropsType={
    link: string
    unreadedMessages?: number
}

export const HeaderLink:React.FC<PropsType> = ({link, children, unreadedMessages})=>{
    
    

    return<Nav.Link className="Center">
    <NavLink
    style={{textDecoration:'none'}} 
    activeClassName="Header__Link_active"
    to={link} className="Header__Link Header__Link_hover d-flex">
        <div className='CenterY'>{children}</div>

        {(children==='Chats' && (!!unreadedMessages)) && (<div 
            className='mt-1 px-1 text-center CenterY'
            style={{borderRadius:20000, marginLeft:5, height:30, minWidth:30, color:'white',
            backgroundColor:'red'}}>
                {unreadedMessages}
            </div>)
        }

    </NavLink>
</Nav.Link>
}
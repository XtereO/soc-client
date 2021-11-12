import moment from "moment"
import { NavLink } from "react-router-dom"
import { backendURL } from "../../Consts"
import HtmlParse from 'html-react-parser'
import { MessageType } from "../../Types/chat"




type PropsType = {
    isMyMessage?: boolean
} & MessageType

export const Message: React.FC<PropsType> = (props) => {
    if (!props.isMyMessage) {
        return <div
            style={{
                display: 'grid',
                gridTemplateColumns: '100px 1fr'
            }}
            className="card my-2">
            <div className="">
                <NavLink to={`/home/${props.companion.userId}`}>
                    <img
                        className="RoundImage w-100"
                        src={backendURL + props.companion.avatar} />
                </NavLink>
            </div>
            <div className="">
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 200px'
                }}>
                    <div className='w-100'>
                        {props.companion.firstName + ' ' + props.companion.secondName}
                    </div>
                    <div>
                        {`
                    ${moment(props.date).format('DD')}.${moment(props.date).format('MM')}.${moment(props.date).format('YYYY')} - 
                    ${moment(props.date).format('HH')}:${moment(props.date).format('mm')}
                    `}
                    </div>
                </div>
                <div style={{ height: 50 }} className='d-flex'>
                    {HtmlParse(props.textMessage)}
                </div>
            </div>
        </div>
    }
    return <div
        style={{
            display: 'grid',
            gridTemplateColumns: '1fr 100px'
        }}
        className="card my-2">
        <div className="">
            <div style={{
                display: 'grid',
                gridTemplateColumns: '150px 1fr'
            }}>
                <div>
                    {`
                ${moment(props.date).format('DD')}.${moment(props.date).format('MM')}.${moment(props.date).format('YYYY')} - 
                ${moment(props.date).format('HH')}:${moment(props.date).format('mm')}
                `}
                </div>
                <div className='w-100 d-flex justify-content-end'>
                    {props.companion.firstName + ' ' + props.companion.secondName}
                </div>
            </div>
            <div style={{ height: 50 }} className='w-100 d-flex justify-content-end'>
                {HtmlParse(props.textMessage)}
            </div>
        </div>
        <div className="">
            <img
                className="RoundImage w-100"
                src={backendURL + props.companion.avatar} />
        </div>
    </div>
}
import moment from "moment"
import { backendURL } from "../../Consts"
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
                <img
                    className="RoundImage w-100"
                    src={backendURL + props.companion.avatar} />
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
                <div>
                    {props.textMessage}
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
                gridTemplateColumns: '200px 1fr'
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
            <div className='w-100 d-flex justify-content-end'>
                {props.textMessage}
            </div>
        </div>
        <div className="">
            <img
                className="RoundImage w-100"
                src={backendURL + props.companion.avatar} />
        </div>
    </div>
}
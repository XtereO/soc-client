import { NavLink } from "react-router-dom"
import { backendURL } from "../../../Consts"
import { ReviewType } from "../../../Types/profile"




export const Review: React.FC<ReviewType> = (props) => {
    return <div className="card">
        <div className="card-header">
            <div style={{
                display:'grid',
                gridTemplateColumns:'50px 1fr'
            }}>
                <div className='col-4'>
                    <NavLink to={`/home/${props.user ? props.user.userId : ''}`}>
                        <img
                            src={backendURL + (props.user ? props.user.avatar : '')}
                            style={{ width: 50, height: 50, borderRadius: 20000 }}
                        />
                    </NavLink>
                </div>
                <div className=''>
                    <div className='d-flex justify-content-end'>
                    <NavLink to={`/home/${props.user ? props.user.userId : ''}`}>
                        {props.user && `@${props.user.shortNickname}`}
                    </NavLink>
                    </div>
                    <div className="d-flex justify-content-end">
                        Rating {props.rating}/10
                    </div>
                </div>
            </div>
        </div>
        <div className="card-body Center">
            {props.review ? props.review :
                'Review is empty'}
        </div>
        <div className='card-footer Center p-2'>
                Review for {props.reviewFor}: <NavLink
                to={props.reviewFor==='Music' ? `/music/${props.idMusicOrPlaylist}` :
                `/playlist/${props.idMusicOrPlaylist}`
            }   className='ml-1'
                >
                    {props.titleMusicOrPlaylist}
                </NavLink>
            </div>
    </div>
}
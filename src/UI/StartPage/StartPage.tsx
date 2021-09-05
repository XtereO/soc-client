
//@ts-ignore
import musicSrc from "../../Media/music.jpg";
//@ts-ignore
import ratingSrc from '../../Media/ranking.jpg'

type PropsType={

}

export const StartPage:React.FC<PropsType>=(props)=>{
    return<div>
        <h3 className="Center">
            Start page
        </h3>
        <div className="row mt-4">
            <div className="col-md-6 Center">
                In our social network you may upload 
                your music and create your playlists
            </div>
            <div className="col-md-6">
                <img 
                src={musicSrc}
                className="img-fluid"
                />
            </div>
        </div>
        <div className='row mt-4'>
            <div className="col-md-6 Center">
                And you can rate this!
                Rating include review and points (1-10).
            </div>
            <div className="col-md-6">
                <img 
                src={ratingSrc}
                className="img-fluid"
                />
            </div>
        </div>
    </div>
}
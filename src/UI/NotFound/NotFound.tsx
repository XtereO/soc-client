
//@ts-ignore
import src from "../../Media/notFound.jpg";


type PropsType={

}

const NotFound:React.FC<PropsType>=(props)=>{
    return<div>
        <img className="w-100" src={src} />
    </div>
}

export default NotFound
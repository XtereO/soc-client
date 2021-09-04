
//@ts-ignore
import src from "../../Media/notFound.jpg";


type PropsType={

}

export const NotFound:React.FC<PropsType>=(props)=>{
    return<div>
        <img className="w-100" src={src} />
    </div>
}
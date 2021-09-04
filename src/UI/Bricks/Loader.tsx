
//@ts-ignore
import loaderSrc from "../../Media/loader.gif";

type PropsType={
}

export const Loader:React.FC<PropsType>=(props)=>{
    return<img 
    src={loaderSrc}
    className="w-100 img" />
}
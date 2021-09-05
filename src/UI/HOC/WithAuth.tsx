import { useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { JsxElement } from "typescript";
import { authSelector } from "../../BLL/Selectors/authSelector";




type PropsType={ //JSX element
}

export const WithAuth:React.FC<PropsType>=(props)=>{
    const isAuth = useSelector(authSelector)
    const history = useHistory()
    if(isAuth){
        return <div>{props.children}</div>
    }else{
        history.push('/start')
        return <Redirect to='/start'/>
    }
}
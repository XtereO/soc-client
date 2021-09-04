import { useSelector } from "react-redux";
import { Redirect } from "react-router";
import { JsxElement } from "typescript";
import { authSelector } from "../../BLL/Selectors/authSelector";




type PropsType={
    Component: any //JSX element
}

export const withAuth:React.FC<PropsType>=({Component})=>{
    const isAuth = useSelector(authSelector)
    if(isAuth){
        return<Component />
    }else{
        return <Redirect to='/start'/>
    }
}
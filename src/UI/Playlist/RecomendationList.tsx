
import { Recomendation, RecomendationType } from "./Recomendation";




type PropsType={
    recomendations: RecomendationType[]
}

export const RecomendationList:React.FC<PropsType>=({recomendations})=>{
    return<div className="row">
        {recomendations.map(r=><div className="col-3">
            <Recomendation {...r}/>
        </div>)}
    </div>
}
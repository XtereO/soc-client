import { Recomendation, RecomendationType } from "./Bricks/Recomendation"



type PropsType={
    recomendations: RecomendationType[]
}

export const RecomendationList:React.FC<PropsType>=({recomendations})=>{
    
    const recomendationsJSX = recomendations.map(r=><div className="col-md-4">
        <Recomendation {...r} />
        </div>)
    
    return<div className="row px-2">
        {recomendationsJSX ? recomendationsJSX : "Not found :("}
    </div>
}
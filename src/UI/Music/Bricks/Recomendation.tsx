



export type RecomendationType={
    avatar: string
    name: string
    author: string
}

export const Recomendation:React.FC<RecomendationType>=(props)=>{
    return<div className="card">
        <img 
        src={props.avatar}
        className="img-fluid rounded"/>
        <div className="card-body">
            {props.name} - {props.author}
        </div>
    </div>
}



export type RecomendationType={
    imageSrc: string
    name: string
    rating: number
}


export const Recomendation:React.FC<RecomendationType>=({name,rating,imageSrc})=>{
    return<div>
        <div>
            <img src={imageSrc} />
        </div>
        <div>
            Title: {name}
        </div>
        <div>
            Rating: {rating}/10
        </div>
    </div>
}
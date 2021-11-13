

type PropsType = {
    title: string
    author: string | null
    rating: number | string
    countRated: number
    countSaves: number
}
export const InfoMusic: React.FC<PropsType> = ({title,countSaves,author,rating,countRated}) => {
    
    return <div className="">
        <h4 className="Center">{title}</h4>
        <div className="Center">
            {author}
        </div>
        <div className="Center">
            Rating: {rating}/10
        </div>
        <div className='Center'>
            Count rated: {countRated}
        </div>
        <div className='Center'>
            Count saves: {countSaves}
        </div>
    </div>
}
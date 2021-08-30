

type PropsType = {
    title: string
    author: string
    rating: number
}
export const InfoMusic: React.FC<PropsType> = ({title,author,rating}) => {
    return <div className="">
        <h4 className="Center">{title}</h4>
        <div className="Center">
            {author}
        </div>
        <div className="Center">
            Rating: {rating}/10
        </div>
    </div>
}
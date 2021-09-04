


type PropsType={
    onClick?: ()=>void
    style?: any
}

export const Plus:React.FC<PropsType>=(props)=>{
    return<button 
    className="Plus Plus_hover Plus_active"
    {...props}>
        +
    </button>
}



type PropsType={
    onClick?: ()=>void
    style?: any
}

export const Plus:React.FC<PropsType>=(props)=>{
    return<button
    onClick={props.onClick}
    className="btn btn-outline-success" 
    style={{
        borderRadius:20000,
    }}>
        +
    </button>
}
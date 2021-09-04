import { useState } from "react"



type PropsType={
    page: number
    count: number //elements
    portionSize: number //count elements on one page
    pageChange: (page:number)=>void
}

export const Pagination:React.FC<PropsType>=({pageChange,page, count, portionSize})=>{
    
    let [portionNumber, setPortionNumber] = useState(1)
    
    let buttons=[]
    for(let i=1;i<=Math.ceil(count/portionSize);i++){
        buttons.push(<button 
        onClick={()=>pageChange(i)}
        className={page===i ? 'btn btn-danger' :
            'btn btn-outline-danger'}>
            {i}
        </button>)
    }

    
    return<div>
        {portionNumber>1 &&
        <button 
        onClick={()=>setPortionNumber(prev=>(prev-1))}
        className="btn btn-outline-danger"
        >
            {'<'}
        </button>}
            {[...buttons].slice((portionNumber-1)*5, portionNumber*5)}
        {(portionNumber)*5<Math.ceil(count/portionSize) &&
        <button
        onClick={()=>setPortionNumber(prev=>(prev+1))}
        className="btn btn-outline-danger"
        >
            {'>'}
        </button>}
    </div>
}




type PropsType={
    options: string[]
    style?: any
    name?: string
    value?: string
    id?: string
    onChange?: (e:React.ChangeEvent<HTMLSelectElement>)=>void
}

export const MySelect:React.FC<PropsType>=({options,...props})=>{
    return<select 
    {...props} className="Select 
    Select_focus Select_hover">
        {options.map(o=><option>{o}</option>)}
    </select>
}
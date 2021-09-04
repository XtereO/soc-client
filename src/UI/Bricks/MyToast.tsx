import { Toast } from "react-bootstrap"




type PropsType={
    description: string
    onClose:()=>void
    show: boolean
}

export const MyToast:React.FC<PropsType>=({description,...props})=>{
    return<Toast 
    delay={3000}
    autohide
    {...props}>
        <Toast.Header>
            <strong className="me-auto">Noticification</strong>
            <small>right now</small>
        </Toast.Header>
        <Toast.Body>
            {description}
        </Toast.Body>
    </Toast>
}
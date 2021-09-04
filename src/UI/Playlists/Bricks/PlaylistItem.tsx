

export type PlaylistItemType={
    name: string
    imageSrc: string
}

export const PlaylistItem:React.FC<PlaylistItemType>=({name,imageSrc})=>{
    return<div className="card row">
        <div className="col-3">
            <img  
            src={imageSrc}
            className="w-100 img rounded"/>
        </div>
        <div className="col-9">
            {name}
        </div>
    </div>
}
import React from "react"
import { MySelect } from "../../Bricks/MySelect"




type PropsType = {
    filters:{
        firstShow: string[]
        searchBy?: string[]
        genre?: string[]
    }
}

export const Filter: React.FC<PropsType> = ({filters}) => {
    return <div>
        <h4 className="Center">Filters</h4>
        <div>
            <div className="mt-4 row">
                <div className="col-6 Center">
                    First show:
                </div>
                <div className="col-6 Center">
                    <MySelect options={filters.firstShow} />
                </div>
            </div>
            {filters.searchBy && <div className="mt-4 row">
                <div className="col-6 Center">
                    Search by:
                </div>
                <div className="col-6 Center">
                    <MySelect options={filters.searchBy} />
                </div>
            </div>}
            {filters.genre && <div className="mt-4 row">
                <div className="col-6 Center">
                    Genre:
                </div>
                <div className="col-6 Center">
                    <MySelect options={filters.genre} />
                </div>
            </div>}
        </div>
    </div>
}
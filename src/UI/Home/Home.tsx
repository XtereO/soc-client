import { useState } from "react"
import { NavLink, useHistory } from "react-router-dom"
import { Review } from "../Music/Bricks/Review"




type PropsType = {}

const Home: React.FC<PropsType> = (props) => {

    let [isEditMode, setMode] = useState(false)
    const history = useHistory()

    return <div>
        <div>
            @ShortT
        </div>
        <div className="row">
            <div className="col-md-4">
                <img
                    src="https://ru-static.z-dn.net/files/db3/5bdb9e8a453d9353a37b338941278006.jpg"
                    className="RoundImage w-100" />
            </div>
            <div className="col-md-8">
                <div className="card p-4">
                    First name: Hola
                </div>
                <div className="card p-4">
                    Second name: Kola
                </div>
                <div
                    onDoubleClick={() => setMode(prev => !prev)}
                    style={{overflowY:'scroll'}}
                    className="card Home__Link Home__Link_hover p-4" >
                    {isEditMode ?
                        <textarea
                            onBlur={() => setMode(false)}
                            autoFocus={true}
                            className="form-control">
                            I create this site
                        </textarea>
                        :
                        <div>
                            About me: I create this site
                        </div>
                    }
                </div>
                <div 
                onClick={()=>history.push('/followers/id')}
                className="card Home__Link Home__Link_hover Home__Link_active p-4">
                    Followers: 34     
                </div>
                <div 
                onClick={()=>history.push('/subscribers/id')}
                className="card Home__Link Home__Link_hover Home__Link_active p-4">
                    Subscribes: 34     
                </div>
            </div>
        </div>
        <div className="mt-4">
            <h5>Reviews:</h5>
            <div className="row">
                {[].map(m=><div className="col-md-6">
                    <Review {...m} />
                </div>)}
            </div>
        </div>
    </div>
}

export default Home
import React from "react"
import { Route, Switch } from "react-router-dom"

import { WithSuspense } from "../HOC/WithSuspense"
import { WithAuth } from "../HOC/WithAuth";
import { StartPage } from "../StartPage/StartPage";
import { MyToast } from "../Bricks/MyToast";
import { useDispatch, useSelector } from "react-redux";
import { isShowToastSelector, toastMessageSelector } from "../../BLL/Selectors/authSelector";
import { setShowToast } from "../../BLL/Reducers/authReducer";

//@ts-ignore
const Playlists = React.lazy(() => import('../Playlists/Playlists'))
//@ts-ignore
const Playlist = React.lazy(() => import('../Playlist/Playlist'))
//@ts-ignore
const People = React.lazy(() => import('../People/People'))
//@ts-ignore
const Musics = React.lazy(() => import('../Musics/Musics'))
//@ts-ignore
const Music = React.lazy(() => import('../Music/Music'))
//@ts-ignore
const Home = React.lazy(() => import('../Home/Home'))
//@ts-ignore
const Chat = React.lazy(() => import('../Chat/Chat'))
//@ts-ignore
const Chats = React.lazy(() => import("../Chats/Chats"))
//@ts-ignore
const NotFound = React.lazy(() => import('../NotFound/NotFound'))
//@ts-ignore
const Followers = React.lazy(() => import('../Followers/Followers'))
//@ts-ignore
const Following = React.lazy(() => import('../Following/Following'))

type PropsType = {
    //true - pc, false - phone
    mode: boolean
}

export const Body: React.FC<PropsType> = ({ mode }) => {

    const isShowToast = useSelector(isShowToastSelector)
    const toastMessage = useSelector(toastMessageSelector)
    const dispatch = useDispatch()
    const onCloseToast=()=>{
        dispatch(setShowToast(false,null))
    }
    const routes = [
        {
            path: '/playlists',
            route: Playlists
        }, {
            path: '/playlist/:playlistId?',
            route: Playlist
        }, {
            path: '/people',
            route: People
        }, {
            path: '/musics',
            route: Musics
        }, {
            path: '/music/:musicId?',
            route: Music
        }, {
            path: '/home/:userId?',
            route: Home
        }, {
            route: Chat,
            path: '/chat/:chatId?'
        }, {
            route: Chats,
            path: '/chats'
        }, {
            route: Followers,
            path: '/followers'
        }, {
            route: Following,
            path: '/following'
        }, {
            route: NotFound,
            path: '*'
        }
    ]
    const routesJsx = routes.map(r => {
        const Component = r.route
        let Render: any;
        if (r.path === '/musics' || r.path === '/playlists') {
            Render = <WithAuth>
                <WithSuspense>
                    <Component mode={mode} />
                </WithSuspense>
            </WithAuth>
        } else {
            Render = <WithAuth>
                <WithSuspense>
                {/* @ts-ignore */}
                    <Component />
                </WithSuspense>
            </WithAuth>
        }
        return <Route
            render={() => Render}
            path={r.path} />
    })

    return <div className="container">
        <Switch>
            <Route path='/start' render={()=><StartPage/>} />
            {routesJsx}
        </Switch>
        <div 
        className="d-flex justify-content-end"
        style={{position:'fixed',bottom: 60,
        width:'82%'}}>
            <MyToast 
            onClose={onCloseToast}
            description={toastMessage}
            show={isShowToast}
            />
        </div>
    </div>
}
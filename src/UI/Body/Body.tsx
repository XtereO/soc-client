import React from "react"
import { Route, Switch } from "react-router-dom"

import { Music } from "../Music/Music"
import { Musics } from "../Musics/Musics"
import { People } from "../People/People"
import { Playlist } from "../Playlist/Playlist"
import { Playlists } from "../Playlists/Playlists"
import { Chat } from "../Chat/Chat";
import { Home } from "../Home/Home"
import { Subscribers } from "../Subscribers/Subscribers";
import { Followers } from "../Followers/Followers";
import { NotFound } from "../NotFound/NotFound"
import { WithSuspense } from "../HOC/WithSuspense"

//@ts-ignore
const Chats = React.lazy(()=>import("../Chats/Chats"))



type PropsType = {
    //true - pc, false - phone
    mode: boolean
}

export const Body: React.FC<PropsType> = ({ mode }) => {
    return <div className="container">
        <Switch>
            <Route path="/music/:musicId?" render={() => <Music />} />
            <Route path="/musics" render={() => <Musics mode={mode} />} />
            <Route path="/people" render={() => <People />} />
            <Route path="/playlists" render={() => <Playlists mode={mode} />} />
            <Route path="/playlist/:playlistId?" render={() => <Playlist />} />
            <Route path="/chats" render={() => <WithSuspense><Chats/></WithSuspense>} />
            <Route path="/chat/:chatId?" render={() => <Chat />} />
            <Route path="/home/:userId?" render={() => <Home />} />
            <Route path='/subscribers/:userId?' render={() => <Subscribers />} />
            <Route path='/followers/:userId?' render={() => <Followers />} />
            <Route path='*' render={() => <NotFound />} />
        </Switch>
    </div>
}
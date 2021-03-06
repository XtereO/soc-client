import { createStore, combineReducers,applyMiddleware  } from "redux";
import createSagaMiddleware  from "redux-saga";
import { all } from "redux-saga/effects";
import { authReducer } from "./Reducers/authReducer";
import { peopleReducer } from "./Reducers/peopleReducer";
import { profileReducer } from "./Reducers/profileReducer";
import { authWatcher } from "./Sagas/authWatcher";
import { profileWatcher } from "./Sagas/profileWatcher";
import { peopleWatcher } from "./Sagas/peopleWatcher";
import { followersWatcher } from "./Sagas/followersWatcher";
import { followingWatcher } from "./Sagas/followingWatcher";
import { followersReducer } from "./Reducers/followersReducer";
import { followingReducer } from "./Reducers/followingReducer";
import { musicsReducer } from "./Reducers/musicsReducer";
import { musicsWatcher } from "./Sagas/musicsWatcher";
import { playerReducer } from "./Reducers/playerReducer";
import { playlistsReducer } from "./Reducers/playlistsReducer";
import { playlistsWatcher } from "./Sagas/playlistsWatcher";
import { playlistReducer } from "./Reducers/playlistReducer";
import { playlistWatcher } from "./Sagas/playlistWatcher";
import { musicReducer } from "./Reducers/musicReducer";
import { musicWatcher } from "./Sagas/musicWatcher";
import { chatsReducer } from "./Reducers/chatsReducer";
import { chatsWatcher } from "./Sagas/chatsWatcher";
import { chatReducer } from "./Reducers/chatReducer";
import { chatWatcher, setLastMessageWatcher } from "./Sagas/chatWatcher";

const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    people: peopleReducer,
    followers: followersReducer,
    following: followingReducer,
    musics: musicsReducer,
    player: playerReducer,
    playlists: playlistsReducer,
    playlist: playlistReducer,
    music: musicReducer,
    chats: chatsReducer,
    chat: chatReducer
})
//@ts-ignore
const composeEnhancers=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>

const sagaMiddleware = createSagaMiddleware()

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)))

function* rootSaga(){
    yield all([
        authWatcher(),
        profileWatcher(),
        peopleWatcher(),
        followersWatcher(),
        followingWatcher(),
        musicsWatcher(),
        playlistsWatcher(),
        playlistWatcher(),
        musicWatcher(),
        chatsWatcher(),
        chatWatcher(),
        setLastMessageWatcher()
    ])
}
sagaMiddleware.run(rootSaga)

//@ts-ignore
window.store=store
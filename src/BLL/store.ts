import { createStore, combineReducers,applyMiddleware  } from "redux";
import createSagaMiddleware  from "redux-saga";
import { all } from "redux-saga/effects";
import { authReducer } from "./Reducers/authReducer";
import { profileReducer } from "./Reducers/profileReducer";
import { authWatcher } from "./Sagas/authWatcher";
import { profileWatcher } from "./Sagas/profileWatcher";

const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer
})
type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>

const sagaMiddleware = createSagaMiddleware()

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))

function* rootSaga(){
    yield all([
        authWatcher(),
        profileWatcher()
    ])
}
sagaMiddleware.run(rootSaga)
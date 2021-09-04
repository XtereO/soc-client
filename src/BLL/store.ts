import { createStore, combineReducers,applyMiddleware  } from "redux";
import createSagaMiddleware  from "redux-saga";
import { all } from "redux-saga/effects";
import { authReducer } from "./Reducers/authReducer";
import { authWatcher } from "./Sagas/authWatcher";

const rootReducer = combineReducers({
    auth: authReducer
})
type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>

const sagaMiddleware = createSagaMiddleware()

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))

function* rootSaga(){
    yield all([
        authWatcher()
    ])
}
sagaMiddleware.run(rootSaga)
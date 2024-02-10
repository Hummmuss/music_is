import {applyMiddleware, createStore} from "redux";
import createSagaMiddleware from 'redux-saga'
import reducer from "./reducers"
import rootSaga from "./sagas";

const SagaMiddleware = createSagaMiddleware({})


const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(
        applyMiddleware(SagaMiddleware)
    )
);
SagaMiddleware.run(rootSaga)
export default store
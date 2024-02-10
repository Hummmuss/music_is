import {put, call} from 'redux-saga/effects'
import {check, getAllPlaylistsByUser, getOneUser} from "../../http/API";

export function* checkUserAuthSaga() {
    const data = yield call(check);
    if (data.success) {
        const id = data.token.id;
        const user = yield call(getOneUser, id);
        if (user.success === true) {
            const playlists = yield call(getAllPlaylistsByUser, id)
            yield put({type: 'SET_USER', payload: user.user})
            yield put({type: 'SET_PLAYLISTS', payload: playlists})
            yield put({type: 'SET_AUTH_STATUS', payload: true})
        }
    }
    yield put({type: 'SET_AUTH_MESSAGE', payload: data.message})
    yield put({type: 'SET_IS_LOADING', payload: false})
}



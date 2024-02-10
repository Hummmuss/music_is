import {call, put} from 'redux-saga/effects'
import {createPlaylist, getAllPlaylistsByUser, getOneUser, registration} from "../../http/API";

export function* registrationSaga(action) {
    const {payload: username, email, password} = action;
    yield put({type: 'SET_IS_LOADING', payload: true})
    const data = yield call(registration, username, email, password);
    yield put({type: 'SET_AUTH_MESSAGE', payload: data.message})
    if (data.success) {
        const id = data.token.id;
        const user = yield call(getOneUser, id);
        if (user.success === true) {
            yield call(createPlaylist, 'favourite', id)
            const playlists = yield call(getAllPlaylistsByUser, id)
            yield put({type: 'SET_USER', payload: user.user})
            yield put({type: 'SET_PLAYLISTS', payload: playlists})
            yield put({type: 'SET_AUTH_STATUS', payload: true})
        }
    }
    yield put({type: 'SET_IS_LOADING', payload: false})
    yield put({type: 'SET_SHOW_MESSAGE', payload: true})
}


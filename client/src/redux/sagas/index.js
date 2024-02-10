import {takeEvery} from 'redux-saga/effects'

import {checkUserAuthSaga} from "./checkUserSaga";
import {registrationSaga} from "./registrationSaga";
import {loginSaga} from "./loginSaga";

export function* watcherSaga() {
    yield takeEvery('check', checkUserAuthSaga);
    yield takeEvery('registration', registrationSaga);
    yield takeEvery('login', loginSaga);

}

export default function* rootSaga() {
    yield watcherSaga()
}
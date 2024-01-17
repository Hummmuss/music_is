import {makeAutoObservable} from "mobx";
export default class User {
    constructor() {
        this._isAuth = false;
        this._userId = 0;
        this._user = {};
    }

    set isAuth (bool) {
        this._isAuth = bool;
    }
    get isAuth () {
        return this._isAuth
    }

    set userId (int) {
        this._userId = int;
    }

    get userId () {
        return this._userId;
    }

    set user (user) {
        this._user = user;
    }

    get user () {
        return this._user;
    }
}

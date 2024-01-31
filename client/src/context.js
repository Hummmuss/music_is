import {makeAutoObservable} from "mobx";
export default class User {
    constructor() {
        this._isAuth = false;
        this._userId = 0;
        makeAutoObservable(this)
    }
    setIsAuth (bool) {
        this._isAuth = bool;
    }
    get isAuth () {
        return this._isAuth
    }
    setUserId (id) {
        this._userId = id;
    }
    get userId () {
        return this._userId;
    }
}

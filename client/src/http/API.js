import {$authHost, $host} from "./index";
import { jwtDecode } from "jwt-decode";
export const getAllPlaylists = async () => {
    const {data} = await $authHost.get('api/playlist')
    return data
}

export const registration = async (username, email, password) => {
    const {data} = await $host.post('api/user/registration', {username, email, password})
    if (data.result.success === true) {
        localStorage.setItem('token', data.result.token)
        return jwtDecode(data.result.token)
    }
    else {
        return data.result.message
    }
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password})
    if (data.result.success === true) {
        localStorage.setItem('token', data.token)
        return jwtDecode(data.result.token)
    }
    else {
        console.log(data)
        return data.result.message
    }
}
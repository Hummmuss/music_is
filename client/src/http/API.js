import {$authHost, $host} from "./index";
import {jwtDecode} from "jwt-decode";


//users
export const registration = async (username, email, password) => {
    const {data} = await $host.post('api/user/registration', {username, email, password})
    if (data.success === true) {
        localStorage.setItem('token', data.token)
        return {
            success: data.success,
            token: jwtDecode(data.token)
        }
    } else {
        return {
            message: data.message,
            success: data.success,
        }
    }
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password})
    console.log(data)
    if (data.success === true) {
        localStorage.setItem('token', data.token)
        return {
            success: data.success,
            token: jwtDecode(data.token)
        }
    } else {
        return {
            message: data.message,
            success: data.success,
        }
    }
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/check/auth')
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}


//playlists
export const createPlaylist = async (name, userID) => {
    const {data} = await $authHost.post('api/playlist', {name, userID})
    return data
}

export const getAllPlaylists = async () => {
    const {data} = await $authHost.get('api/playlist')
    return data
}

export const getAllPlaylistsByUser = async (userID) => {
    console.log(userID)
    const {data} = await $authHost.get('api/playlist/' + userID)
    console.log(data)
    return data
}

export const deletePlaylist = async (id) => {
    const {data} = await $authHost.delete('api/playlist/' + {id})
    return data
}

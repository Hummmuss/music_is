const initial = {
    playlists: [],
    user: {},
    isAuth: false,
    authMessage: undefined,
    isLoading: true,
    showMessage: false
}

export default function reducer(state = initial, action) {
    switch (action.type) {
        case 'SET_PLAYLISTS': {
            return {
                ...state,
                playlists: [
                    ...action.payload
                ]
            }
        }
        case 'SET_USER': {
            return {
                ...state,
                user: {
                    ...action.payload
                }
            }
        }
        case 'SET_AUTH_STATUS': {
            return {
                ...state,
                isAuth: action.payload
            }
        }
        case 'SET_AUTH_MESSAGE': {
            return {
                ...state,
                authMessage: action.payload
            }
        }
        case 'SET_IS_LOADING': {
            return {
                ...state,
                isLoading: action.payload
            }
        }
        case 'SET_SHOW_MESSAGE': {
            return {
                ...state,
                showMessage: action.payload
            }
        }
        default:
            return state;
    }
}

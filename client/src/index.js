import React, {createContext} from 'react';
import App from './App';
import ReactDOM from 'react-dom/client';
console.log(process.env.REACT_APP_API_URL)
import store from './redux'
import {Provider} from 'react-redux'

export const Context = createContext(null)
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <Provider store = {store}>
        <App />
    </Provider>
)

import React, {createContext} from 'react';
import App from './App';
import ReactDOM from 'react-dom/client';
console.log(process.env.REACT_APP_API_URL)
import User from './context'

export const Context = createContext(null)
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <Context.Provider value={{
        user: new User(),
    }}>
        <App />
    </Context.Provider>

)

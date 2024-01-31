import React, {useContext, useState} from 'react';
import {observer} from "mobx-react";
import {BrowserRouter} from "react-router-dom";
import Header from "./components/Header";
import AppRouter from "./Router";
import {check} from "./http/API";
import {Context} from "./index";
import "./styles/main.scss"


const App = observer(() => {
    const {user} = useContext(Context);
    const [isLoading, setIsLoading] = useState(true);
    console.log("rerender!")

    check().then(data => {
        user.setUserId(data.id);
        user.setIsAuth(true);
    }).finally(() => setIsLoading(false))


    console.log(user.isAuth);

    if (isLoading) {
        return (
            <div className="lds-ripple">
                <div></div>
                <div></div>
            </div>
        );
    } else {
        return (
            <BrowserRouter>
                <Header user={user}/>
                <AppRouter/>
            </BrowserRouter>
        );
    }
});

export default App;
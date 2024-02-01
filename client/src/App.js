import React, {useContext, useEffect, useState} from 'react';
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

    useEffect(() => {
        setTimeout(() => {
            check().then(data => {
                console.log(data)
                if (data.success === true) {
                    user.setUserId(data.token.id)
                    user.setIsAuth(true)
                } else {
                    console.log("unauthorized")
                    user.setIsAuth(false)
                }
            }).finally(() => setIsLoading(false))
        }, 1000)
    }, [user])


    if (isLoading) {
        return (
            <div className="wrapper">
                <span className="loader"></span>
            </div>
        );
    }
    console.log(user.isAuth)
    return (
        <div>
            <BrowserRouter>
                <Header user={user}/>
                <AppRouter user={user}/>
            </BrowserRouter>
        </div>
    );

});

export default App;
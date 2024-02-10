import React, {useEffect} from 'react';
import "./styles/main.scss"
import {useDispatch, useSelector} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import Header from "./components/Header";
import AppRouter from "./Router";



const App = () => {
    const dispatch = useDispatch();

    const isLoading =  useSelector(state => state.isLoading);

    useEffect(() => {
        const check = () => {
            dispatch({ type: 'check' });
        };

        check();

    }, [dispatch]);

    console.log(isLoading);

    if (isLoading) {
        return (
            <div className="wrapper">
                <span className="loader"></span>
            </div>
        );
    }

    return (
        <div>
            <BrowserRouter>
                <Header/>
                <AppRouter/>
            </BrowserRouter>
        </div>
    );
};

export default App;
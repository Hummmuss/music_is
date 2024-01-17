import React from 'react';
import {observer} from "mobx-react-lite";
import {BrowserRouter} from "react-router-dom";
import Header from "./components/Header";
import AppRouter from "./Router";

const App = observer(() => {
    return (
        <BrowserRouter>
            <Header/>
            <AppRouter/>
        </BrowserRouter>
    );
});

export default App;